import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";
import {
  calculatePrice,
  calculateServerPrice,
  generateReference,
  getProvider,
  getSafeAppUrl,
  isPaymentProviderName,
  isProviderEnabled,
  parseTurnaroundDays,
  ProviderUnavailableError,
  validateAutomaticPricing,
  type PaymentProviderName,
} from "@/lib/payment";
import { checkRateLimit } from "@/lib/rate-limit";

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

function setupError(message: string, status = 500) {
  return NextResponse.json(
    {
      error: message,
      code: "checkout_setup_required",
    },
    { status }
  );
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
 * Body: { provider, service_type, turnaround, word_count, file_path, title, client_notes, document_type, formatting_style, english_type }
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
      service_type,
      turnaround,
      word_count,
      file_path,
      title,
      client_notes,
      document_type,
      formatting_style,
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
    if (!isProviderEnabled(paymentProviderName)) {
      return NextResponse.json(
        {
          error: "This payment option will be available soon.",
          code: "provider_not_available",
          provider: paymentProviderName,
          trace_id: trace,
        },
        { status: 503 }
      );
    }

    if (paymentProviderName === "paystack" && !process.env.PAYSTACK_SECRET_KEY) {
      console.error("Paystack setup error: PAYSTACK_SECRET_KEY is missing.");
      return setupError("Checkout is not fully configured yet. Please contact support before trying payment again.", 503);
    }

    if (!service_type || !turnaround || !word_count || !file_path) {
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

    const safeWordCount = Math.max(1, Math.round(Number(word_count) || 0));
    const timelineValidation = validateAutomaticPricing(safeWordCount, turnaround);
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
    const priceBreakdown = calculatePrice(safeWordCount, service_type, turnaround);
    const price = calculateServerPrice(safeWordCount, service_type, turnaround);
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
    const { data: project, error: insertError } = await supabaseAdmin
      .from("projects")
      .insert({
        client_id: user.id,
        title: title || "Untitled Project",
        service_type: priceBreakdown.serviceType,
        document_type: document_type || "Other",
        formatting_style: formatting_style || "None / Standard Consistency",
        english_type: english_type || "No preference",
        turnaround: priceBreakdown.turnaroundLabel,
        turnaround_days: priceBreakdown.turnaroundDays,
        turnaround_hours: priceBreakdown.turnaroundDays * 24,
        word_count: safeWordCount,
        price,
        calculated_price: priceBreakdown.calculatedPrice,
        final_price: priceBreakdown.finalPrice,
        minimum_applied: priceBreakdown.minimumApplied,
        client_notes: client_notes || "",
        upload_file_path: file_path,
        uploaded_file_path: file_path,
        status: "In Progress",
        payment_status: "pending",
        payment_provider: paymentProviderName,
        payment_reference: reference,
        transaction_reference: reference,
        payment_currency: currency,
      })
      .select()
      .single();

    if (insertError) {
      console.error(`[${trace}] Project creation error:`, insertError);
      if (isSchemaMismatchError(insertError)) {
        return NextResponse.json(
          { error: "Checkout needs a database update before payment can continue. Please contact support.", code: "checkout_setup_required", trace_id: trace },
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
          word_count: safeWordCount,
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
            : "We could not prepare your order. Please try again or contact support.",
        code: error instanceof ProviderUnavailableError ? "provider_not_available" : "checkout_unexpected",
        trace_id: trace,
      },
      { status: error instanceof ProviderUnavailableError ? 503 : 500 }
    );
  }
}
