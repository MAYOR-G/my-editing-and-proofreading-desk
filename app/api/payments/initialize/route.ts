import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import {
  calculateServerPrice,
  generateReference,
  getProvider,
  getSafeAppUrl,
  isPaymentProviderName,
  isProviderEnabled,
  ProviderUnavailableError,
  type PaymentProviderName,
} from "@/lib/payment";
import { checkRateLimit } from "@/lib/rate-limit";

/**
 * POST /api/payments/initialize
 * 
 * Creates a project (pending) and initializes a payment transaction.
 * Price is ALWAYS calculated server-side — frontend price is ignored.
 * 
 * Body: { provider, service_type, turnaround, word_count, file_path, title, client_notes, document_type, formatting_style }
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

    if (!service_type || !turnaround || !word_count || !file_path) {
      return NextResponse.json(
        { error: "Missing required fields: service_type, turnaround, word_count, file_path" },
        { status: 400 }
      );
    }

    const safeWordCount = Math.min(50000, Math.max(250, Number(word_count) || 0));
    if (safeWordCount < 250) {
      return NextResponse.json(
        { error: "Word count must be at least 250" },
        { status: 400 }
      );
    }

    // ─── Calculate price SERVER-SIDE (never trust frontend) ────────
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
        service_type,
        turnaround,
        word_count: safeWordCount,
        price,
        client_notes: client_notes || "",
        upload_file_path: file_path,
        status: "In Progress",
        payment_status: "pending",
        payment_provider: paymentProviderName,
        transaction_reference: reference,
        payment_currency: currency,
      })
      .select()
      .single();

    if (insertError) {
      console.error("Project creation error:", insertError);
      return NextResponse.json(
        { error: "Failed to create project" },
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
    const result = await paymentProvider.initialize({
      email: profile.email,
      amount: amountInCents,
      currency,
      reference,
      callbackUrl,
      metadata: {
        project_id: project.id,
        friendly_id: project.friendly_id,
        service_type,
        word_count: safeWordCount,
      },
    });

    return NextResponse.json({
      success: true,
      authorization_url: result.authorizationUrl,
      reference: result.reference,
      project_id: project.id,
      price,
      currency,
    });
  } catch (error: any) {
    console.error("Payment initialization error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof ProviderUnavailableError
            ? "This payment option will be available soon."
            : error.message || "Payment initialization failed",
      },
      { status: error instanceof ProviderUnavailableError ? 503 : 500 }
    );
  }
}
