import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";
import { calculatePrice, normalizeSelectedServices, validateAutomaticPricing, isWritingSupportService } from "@/lib/pricing";
import { sendEditorNotificationEmail, sendProjectSubmittedEmail } from "@/lib/email";
import { checkRateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

function traceId() {
  return `sub_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

function isSchemaMismatchError(error: { code?: string; message?: string; details?: string | null } | null) {
  if (!error) return false;
  const text = `${error.message || ""} ${error.details || ""}`.toLowerCase();
  return error.code === "PGRST204" || error.code === "42703" || text.includes("schema cache") || text.includes("could not find") || text.includes("column");
}

function isMissingOptionalProjectColumn(error: { code?: string; message?: string; details?: string | null } | null) {
  if (!isSchemaMismatchError(error)) return false;
  const text = `${error?.message || ""} ${error?.details || ""}`.toLowerCase();
  return /target_journal|detected_word_count|adjusted_word_count|final_word_count/.test(text);
}

export async function POST(request: Request) {
  const trace = traceId();

  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Please sign in again before submitting.", code: "auth_required", trace_id: trace }, { status: 401 });
    }

    const rateLimit = await checkRateLimit(`project:submit:${user.id}`, 8, 60);
    if (!rateLimit.success) {
      return NextResponse.json({ error: "Too many submissions. Please wait a moment and try again.", code: "rate_limited", trace_id: trace }, { status: 429 });
    }

    const body = await request.json();
    const selectedServices = normalizeSelectedServices(Array.isArray(body.selected_services) ? body.selected_services : body.service_type || []);
    const finalWordCount = Math.max(1, Math.round(Number(body.final_word_count || body.word_count) || 0));
    const detectedWordCount = Math.max(1, Math.round(Number(body.detected_word_count || finalWordCount) || 0));
    const adjustedWordCount = body.adjusted_word_count ? Math.max(1, Math.round(Number(body.adjusted_word_count) || 0)) : null;
    const filePath = String(body.file_path || "");

    if (!selectedServices.length || !body.turnaround || !finalWordCount || !filePath) {
      return NextResponse.json({ error: "Some project details are missing. Please review and submit again.", code: "missing_fields", trace_id: trace }, { status: 400 });
    }

    if (!filePath.startsWith(`${user.id}/`)) {
      return NextResponse.json({ error: "We could not confirm the uploaded file. Please upload it again.", code: "invalid_file_path", trace_id: trace }, { status: 400 });
    }

    const timelineValidation = isWritingSupportService(selectedServices) ? { allowed: true } : validateAutomaticPricing(finalWordCount, body.turnaround);
    if (!timelineValidation.allowed) {
      return NextResponse.json({
        error: timelineValidation.message || "This document requires a custom editorial timeline. Please contact our editors.",
        code: timelineValidation.contactRequired ? "custom_quote_required" : "invalid_timeline",
        trace_id: trace,
      }, { status: 422 });
    }

    const supabaseAdmin = createSupabaseAdminClient();
    const { data: profile } = await supabaseAdmin
      .from("profiles")
      .select("email, full_name")
      .eq("id", user.id)
      .single();

    if (!profile?.email) {
      return NextResponse.json({ error: "We could not find your client profile. Please sign out and sign in again.", code: "profile_not_found", trace_id: trace }, { status: 400 });
    }

    const priceBreakdown = calculatePrice(finalWordCount, selectedServices, body.turnaround);
    const targetJournalValue = typeof body.target_journal === "string" && body.target_journal.trim() ? body.target_journal.trim() : null;
    const projectInsert = {
      client_id: user.id,
      title: body.title || "Untitled Project",
      service_type: priceBreakdown.serviceType,
      selected_services: priceBreakdown.serviceTypes,
      document_type: body.document_type || "Other",
      target_journal: targetJournalValue,
      formatting_style: body.formatting_style || "None / Standard Consistency",
      formatting_instructions: body.formatting_instructions || null,
      translation_preference: body.translation_preference || null,
      translation_target_language: body.translation_target_language || null,
      english_type: body.english_type || "No preference",
      turnaround: priceBreakdown.turnaroundLabel,
      turnaround_days: priceBreakdown.turnaroundDays,
      turnaround_hours: priceBreakdown.turnaroundDays * 24,
      detected_word_count: detectedWordCount,
      adjusted_word_count: adjustedWordCount,
      final_word_count: finalWordCount,
      word_count: finalWordCount,
      price: priceBreakdown.finalTotal,
      calculated_price: priceBreakdown.calculatedPrice,
      subtotal: priceBreakdown.subtotal,
      service_charge_percentage: priceBreakdown.serviceChargePercentage,
      service_charge_amount: priceBreakdown.serviceChargeAmount,
      final_price: priceBreakdown.finalTotal,
      minimum_applied: priceBreakdown.minimumApplied,
      client_notes: body.client_notes || "",
      upload_file_path: filePath,
      uploaded_file_path: filePath,
      status: "Pending",
      payment_status: "pending",
      payment_provider: null,
      selected_payment_method: null,
      payment_reference: null,
      transaction_reference: null,
      payment_currency: "USD",
    };

    let { data: project, error } = await supabaseAdmin
      .from("projects")
      .insert(projectInsert)
      .select()
      .single();

    if (isMissingOptionalProjectColumn(error)) {
      const retryInsert: Partial<typeof projectInsert> = { ...projectInsert };
      delete retryInsert.target_journal;
      delete retryInsert.detected_word_count;
      delete retryInsert.adjusted_word_count;
      delete retryInsert.final_word_count;
      const retry = await supabaseAdmin.from("projects").insert(retryInsert).select().single();
      project = retry.data;
      error = retry.error;
    }

    if (error || !project) {
      console.error(`[${trace}] Project submission failed:`, error);
      return NextResponse.json({ error: "We could not submit your project. Please try again or contact support.", code: "project_submit_failed", trace_id: trace }, { status: 500 });
    }

    sendProjectSubmittedEmail(profile.email, {
      clientName: profile.full_name,
      friendlyId: project.friendly_id,
      service: project.service_type,
      wordCount: project.word_count,
      turnaround: project.turnaround,
      paymentStatus: "Unpaid",
    }).catch((err) => console.error("Project submission email error:", err));

    sendEditorNotificationEmail({
      friendlyId: project.friendly_id,
      clientName: profile.full_name,
      clientEmail: profile.email,
      amount: project.price,
      currency: project.payment_currency,
      wordCount: project.word_count,
      service: project.service_type,
      targetJournal: project.target_journal,
      turnaround: project.turnaround,
      paymentStatus: "unpaid",
      documentPath: project.uploaded_file_path || project.upload_file_path,
      projectUrl: `${new URL(request.url).origin}/admin/projects?project=${project.id}`,
      paid: false,
    }).catch((err) => console.error("Unpaid project notification error:", err));

    return NextResponse.json({
      success: true,
      project_id: project.id,
      friendly_id: project.friendly_id,
      amount: project.price,
      subtotal: project.subtotal,
      service_charge_amount: project.service_charge_amount,
      service_charge_percentage: project.service_charge_percentage,
      final_total: project.final_price || project.price,
      payment_status: project.payment_status,
      status: project.status,
      trace_id: trace,
    });
  } catch (error) {
    console.error(`[${trace}] Project submission error:`, error);
    return NextResponse.json({ error: "We could not submit your project. Please try again or contact support.", code: "submit_unexpected", trace_id: trace }, { status: 500 });
  }
}
