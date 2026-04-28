import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
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

/**
 * POST /api/payments/initialize
 * 
 * Creates a project (pending) and initializes a payment transaction.
 * Price is ALWAYS calculated server-side — frontend price is ignored.
 * 
 * Body: { provider, service_type, turnaround, word_count, file_path, title, client_notes, document_type, formatting_style, english_type }
 */
export async function POST(request: Request) {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const rateLimit = await checkRateLimit(`payment:init:${user.id}`, 8, 60);
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: "Too many payment attempts. Please wait a moment and try again." },
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
        { error: "Invalid payment provider." },
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
        { error: "Missing required fields: service_type, turnaround, word_count, file_path" },
        { status: 400 }
      );
    }

    if (typeof file_path !== "string" || !file_path.startsWith(`${user.id}/`)) {
      return NextResponse.json(
        { error: "We could not confirm the uploaded file. Please upload it again." },
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
    const { data: profile } = await supabase
      .from("profiles")
      .select("email")
      .eq("id", user.id)
      .single();

    if (!profile?.email) {
      return NextResponse.json(
        { error: "User profile not found" },
        { status: 400 }
      );
    }

    // ─── Create project in DB (pending status) ─────────────────────
    const { data: project, error: insertError } = await supabase
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
      console.error("Project creation error:", insertError);
      if (isSchemaMismatchError(insertError)) {
        return setupError("Checkout needs a database update before payment can continue. Please contact support.");
      }

      return NextResponse.json(
        { error: "We could not prepare your order. Please try again or contact support." },
        { status: 500 }
      );
    }

    const { error: paymentRecordError } = await supabase
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
      console.warn("Payment record creation skipped:", paymentRecordError.message);
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
      console.error("Payment provider initialization error:", paymentError);
      await supabase
        .from("projects")
        .update({ payment_status: "failed" })
        .eq("id", project.id)
        .eq("payment_status", "pending");

      return NextResponse.json(
        { error: "We could not start secure checkout. Please try again or contact support.", code: "payment_provider_failed" },
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
    console.error("Payment initialization error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof ProviderUnavailableError
            ? "This payment option will be available soon."
            : "We could not prepare your order. Please try again or contact support.",
      },
      { status: error instanceof ProviderUnavailableError ? 503 : 500 }
    );
  }
}
