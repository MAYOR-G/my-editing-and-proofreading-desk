import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";
import {
  calculatePrice,
  calculateServerPrice,
  generateReference,
  getProvider,
  getProviderConfig,
  getProviderReadiness,
  getSafeAppUrl,
  isPaymentProviderName,
  isWritingSupportService,
  normalizeSelectedServices,
  parseTurnaroundDays,
  ProviderConfigurationError,
  ProviderUnavailableError,
  validateAutomaticPricing,
  type PaymentProviderName,
} from "@/lib/payment";
import { checkRateLimit } from "@/lib/rate-limit";
import { getPaymentSettings, isProviderVisible } from "@/lib/payment-settings";

function isSchemaMismatchError(error: { code?: string; message?: string; details?: string | null } | null) {
  if (!error) return false;

  const text = `${error.message || ""} ${error.details || ""}`.toLowerCase();
  return (
    error.code === "PGRST204" ||
    error.code === "42703" ||
    text.includes("schema cache") ||
    text.includes("could not find") ||
    text.includes("column")
  );
}

function isMissingColumnError(error: { code?: string; message?: string; details?: string | null } | null, column: string) {
  if (!isSchemaMismatchError(error)) return false;
  const text = `${error?.message || ""} ${error?.details || ""}`.toLowerCase();
  return text.includes(column.toLowerCase());
}

function traceId() {
  return `chk_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

/**
 * POST /api/payments/initialize
 * 
 * Creates a project (pending) and initializes a payment transaction.
 * Price is ALWAYS calculated server-side — frontend price is ignored.
 * 
 * Body: { provider, selected_services, service_type, turnaround, word_count, file_path, title, client_notes, document_type, target_journal, formatting_style, formatting_instructions, translation_preference, translation_target_language, english_type }
 */
export async function POST(request: Request) {
  const trace = traceId();

  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Please sign in again before checkout.", code: "auth_required", trace_id: trace },
        { status: 401 }
      );
    }

    const supabaseAdmin = createSupabaseAdminClient();

    const rateLimit = await checkRateLimit(`payment:init:${user.id}`, 8, 60);
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: "Too many payment attempts. Please wait a moment and try again.", code: "rate_limited", trace_id: trace },
        { status: 429 }
      );
    }

    const body = await request.json();
    const {
      provider,
      selected_services,
      service_type,
      turnaround,
      word_count,
      detected_word_count,
      adjusted_word_count,
      final_word_count,
      file_path,
      title,
      client_notes,
      document_type,
      target_journal,
      formatting_style,
      formatting_instructions,
      translation_preference,
      translation_target_language,
      english_type,
    } = body;

    // ─── Validate inputs ───────────────────────────────────────────
    if (!isPaymentProviderName(provider)) {
      return NextResponse.json(
        { error: "Invalid payment provider.", code: "invalid_provider", trace_id: trace },
        { status: 400 }
      );
    }

    const paymentProviderName = provider as PaymentProviderName;
    const paymentSettings = await getPaymentSettings();
    if (!isProviderVisible(paymentProviderName, paymentSettings)) {
      return NextResponse.json(
        {
          error: "This payment method is not currently available. Please choose another option or contact support.",
          code: "provider_not_available",
          provider: paymentProviderName,
          trace_id: trace,
        },
        { status: 503 }
      );
    }

    const readiness = getProviderReadiness(paymentProviderName);
    if (!readiness.configured) {
      console.error(`${getProviderConfig(paymentProviderName).label} setup error: API keys are missing.`);
      return NextResponse.json(
        {
          error: `${getProviderConfig(paymentProviderName).label} is currently unavailable. Please contact support or try another payment method.`,
          code: "provider_not_configured",
          provider: paymentProviderName,
          trace_id: trace,
        },
        { status: 503 }
      );
    }

    const submittedServices = Array.isArray(selected_services) ? selected_services : service_type ? [service_type] : [];
    if (submittedServices.length === 0) {
      return NextResponse.json(
        { error: "Please select at least one service.", code: "missing_services", trace_id: trace },
        { status: 400 }
      );
    }

    const selectedServices = normalizeSelectedServices(submittedServices);

    if (!turnaround || !word_count || !file_path) {
      return NextResponse.json(
        { error: "Some checkout details are missing. Please review your order and try again.", code: "missing_checkout_fields", trace_id: trace },
        { status: 400 }
      );
    }

    if (typeof file_path !== "string" || !file_path.startsWith(`${user.id}/`)) {
      return NextResponse.json(
        { error: "We could not confirm the uploaded file. Please upload it again.", code: "invalid_file_path", trace_id: trace },
        { status: 400 }
      );
    }

    const detectedWordCount = Math.max(1, Math.round(Number(detected_word_count || word_count) || 0));
    const adjustedWordCount = adjusted_word_count ? Math.max(1, Math.round(Number(adjusted_word_count) || 0)) : null;
    const finalWordCount = Math.max(1, Math.round(Number(final_word_count || word_count) || 0));
    const timelineValidation = isWritingSupportService(selectedServices) ? { allowed: true } : validateAutomaticPricing(finalWordCount, turnaround);
    if (!timelineValidation.allowed) {
      return NextResponse.json(
        {
          error: timelineValidation.message || "This document requires a custom editorial timeline. Please contact our editors for a tailored quote.",
          code: timelineValidation.contactRequired ? "custom_quote_required" : "invalid_timeline",
          trace_id: trace,
        },
        { status: 422 }
      );
    }

    // ─── Calculate price SERVER-SIDE (never trust frontend) ────────
    const priceBreakdown = calculatePrice(finalWordCount, selectedServices, turnaround);
    const price = calculateServerPrice(finalWordCount, selectedServices, turnaround);
    const currency = "USD";
    const amountInCents = Math.round(price * 100);

    // ─── Generate unique reference ─────────────────────────────────
    const reference = generateReference();

    // ─── Get user email for payment ────────────────────────────────
    const { data: profile } = await supabaseAdmin
      .from("profiles")
      .select("email")
      .eq("id", user.id)
      .single();

    if (!profile?.email) {
      console.error(`[${trace}] Checkout profile lookup failed for user ${user.id}`);
      return NextResponse.json(
        { error: "We could not find your client profile. Please sign out and sign in again.", code: "profile_not_found", trace_id: trace },
        { status: 400 }
      );
    }

    // ─── Create project in DB (pending status) ─────────────────────
    const targetJournalValue = typeof target_journal === "string" && target_journal.trim() ? target_journal.trim() : null;
    const projectInsert = {
      client_id: user.id,
      title: title || "Untitled Project",
      service_type: priceBreakdown.serviceType,
      selected_services: priceBreakdown.serviceTypes,
      document_type: document_type || "Other",
      target_journal: targetJournalValue,
      formatting_style: formatting_style || "None / Standard Consistency",
      formatting_instructions: formatting_instructions || null,
      translation_preference: translation_preference || null,
      translation_target_language: translation_target_language || null,
      english_type: english_type || "No preference",
      turnaround: priceBreakdown.turnaroundLabel,
      turnaround_days: priceBreakdown.turnaroundDays,
      turnaround_hours: priceBreakdown.turnaroundDays * 24,
      detected_word_count: detectedWordCount,
      adjusted_word_count: adjustedWordCount,
      final_word_count: finalWordCount,
      word_count: finalWordCount,
      price,
      calculated_price: priceBreakdown.calculatedPrice,
      subtotal: priceBreakdown.subtotal,
      service_charge_percentage: priceBreakdown.serviceChargePercentage,
      service_charge_amount: priceBreakdown.serviceChargeAmount,
      final_price: priceBreakdown.finalTotal,
      minimum_applied: priceBreakdown.minimumApplied,
      client_notes: client_notes || "",
      upload_file_path: file_path,
      uploaded_file_path: file_path,
      status: "In Progress",
      payment_status: "pending",
      payment_provider: paymentProviderName,
      selected_payment_method: paymentProviderName,
      payment_reference: reference,
      transaction_reference: reference,
      payment_currency: currency,
    };

    let { data: project, error: insertError } = await supabaseAdmin
      .from("projects")
      .insert(projectInsert)
      .select()
      .single();

    const optionalProjectColumns = ["target_journal", "detected_word_count", "adjusted_word_count", "final_word_count"] as const;
    if (optionalProjectColumns.some((column) => isMissingColumnError(insertError, column))) {
      console.warn(`[${trace}] An optional checkout metadata column is missing; retrying checkout without optional metadata fields.`);
      const projectInsertWithoutTargetJournal: Partial<typeof projectInsert> = { ...projectInsert };
      delete projectInsertWithoutTargetJournal.target_journal;
      delete projectInsertWithoutTargetJournal.detected_word_count;
      delete projectInsertWithoutTargetJournal.adjusted_word_count;
      delete projectInsertWithoutTargetJournal.final_word_count;
      const retry = await supabaseAdmin
        .from("projects")
        .insert(projectInsertWithoutTargetJournal)
        .select()
        .single();
      project = retry.data;
      insertError = retry.error;
    }

    if (insertError) {
      console.error(`[${trace}] Project creation error:`, insertError);
      if (isSchemaMismatchError(insertError)) {
        return NextResponse.json(
          { error: "Checkout is temporarily unavailable while we finish a database update. Please contact support if this continues.", code: "checkout_setup_required", trace_id: trace },
          { status: 500 }
        );
      }

      return NextResponse.json(
        { error: "We could not create your order. Please try again or contact support.", code: "order_create_failed", trace_id: trace },
        { status: 500 }
      );
    }

    const { error: paymentRecordError } = await supabaseAdmin
      .from("payment_records")
      .insert({
        order_id: project.id,
        user_id: user.id,
        provider: paymentProviderName,
        transaction_reference: reference,
        amount: price,
        currency,
        status: "pending",
      });

    if (paymentRecordError) {
      console.warn(`[${trace}] Payment record creation skipped:`, paymentRecordError.message);
    }

    // ─── Initialize payment with provider ──────────────────────────
    const siteUrl = getSafeAppUrl();
    const callbackUrl = `${siteUrl}/dashboard/payment/success?reference=${encodeURIComponent(reference)}&provider=${paymentProviderName}`;

    const paymentProvider = getProvider(paymentProviderName);
    let result;
    try {
      result = await paymentProvider.initialize({
        email: profile.email,
        amount: amountInCents,
        currency,
        reference,
        callbackUrl,
        metadata: {
          project_id: project.id,
          friendly_id: project.friendly_id,
          service_type: priceBreakdown.serviceType,
          selected_services: priceBreakdown.serviceTypes,
          target_journal: targetJournalValue,
          detected_word_count: detectedWordCount,
          adjusted_word_count: adjustedWordCount,
          final_word_count: finalWordCount,
          word_count: finalWordCount,
          subtotal: priceBreakdown.subtotal,
          service_charge_percentage: priceBreakdown.serviceChargePercentage,
          service_charge_amount: priceBreakdown.serviceChargeAmount,
          final_total: priceBreakdown.finalTotal,
          turnaround_days: parseTurnaroundDays(priceBreakdown.turnaroundLabel),
        },
      });
    } catch (paymentError) {
      console.error(`[${trace}] Payment provider initialization error:`, paymentError);
      await supabaseAdmin
        .from("projects")
        .update({ payment_status: "failed" })
        .eq("id", project.id)
        .eq("payment_status", "pending");

      if (paymentError instanceof ProviderUnavailableError || paymentError instanceof ProviderConfigurationError) {
        return NextResponse.json(
          {
            error: paymentError.message,
            code: paymentError instanceof ProviderConfigurationError ? "provider_not_configured" : "provider_not_available",
            trace_id: trace,
          },
          { status: 503 }
        );
      }

      return NextResponse.json(
        { error: "We could not start secure checkout. Please try again or contact support.", code: "payment_provider_failed", trace_id: trace },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      authorization_url: result.authorizationUrl,
      reference: result.reference,
      project_id: project.id,
      price,
      subtotal: priceBreakdown.subtotal,
      service_charge_percentage: priceBreakdown.serviceChargePercentage,
      service_charge_amount: priceBreakdown.serviceChargeAmount,
      final_total: priceBreakdown.finalTotal,
      calculated_price: priceBreakdown.calculatedPrice,
      minimum_applied: priceBreakdown.minimumApplied,
      currency,
    });
  } catch (error: any) {
    console.error(`[${trace}] Payment initialization error:`, error);
    return NextResponse.json(
      {
        error:
          error instanceof ProviderUnavailableError
            ? "This payment option will be available soon."
            : error instanceof ProviderConfigurationError
              ? error.message
            : "We could not prepare your order. Please try again or contact support.",
        code: error instanceof ProviderUnavailableError ? "provider_not_available" : error instanceof ProviderConfigurationError ? "provider_not_configured" : "checkout_unexpected",
        trace_id: trace,
      },
      { status: error instanceof ProviderUnavailableError || error instanceof ProviderConfigurationError ? 503 : 500 }
    );
  }
}
