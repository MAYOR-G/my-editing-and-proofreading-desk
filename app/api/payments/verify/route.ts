import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import {
  getProvider,
  isPaymentProviderName,
  isProviderEnabled,
  ProviderUnavailableError,
  type PaymentProviderName,
} from "@/lib/payment";
import { sendPaymentSuccessEmail, sendEditorNotificationEmail } from "@/lib/email";
import { checkRateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

// Use service role to bypass RLS — verification is a trusted server operation
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/**
 * GET /api/payments/verify?reference=xxx&provider=paystack
 * 
 * Verifies a payment with the provider after user redirect.
 * Updates project status ONLY if provider confirms success.
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const reference = searchParams.get("reference");
    const provider = searchParams.get("provider") as PaymentProviderName | null;

    if (!reference || !provider) {
      return NextResponse.json(
        { error: "Missing reference or provider" },
        { status: 400 }
      );
    }

    if (!isPaymentProviderName(provider)) {
      return NextResponse.json(
        { error: "Invalid provider" },
        { status: 400 }
      );
    }

    if (!isProviderEnabled(provider)) {
      return NextResponse.json(
        { error: "This payment option will be available soon.", verified: false, code: "provider_not_available" },
        { status: 503 }
      );
    }

    const rateLimit = await checkRateLimit(`payment:verify:${reference}`, 12, 60);
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: "Too many verification attempts. Please wait a moment and try again." },
        { status: 429 }
      );
    }

    // ─── Find the project by reference ─────────────────────────────
    const { data: project, error: fetchError } = await supabase
      .from("projects")
      .select("id, friendly_id, client_id, price, payment_status, payment_provider, payment_currency, payment_verified_at, service_type, word_count, turnaround")
      .eq("transaction_reference", reference)
      .single();

    if (fetchError || !project) {
      return NextResponse.json(
        { error: "Project not found for this reference" },
        { status: 404 }
      );
    }

    if (project.payment_provider !== provider) {
      return NextResponse.json(
        { error: "Payment provider mismatch", verified: false },
        { status: 400 }
      );
    }

    // ─── Idempotency: already verified ─────────────────────────────
    if (project.payment_status === "paid" && project.payment_verified_at) {
      return NextResponse.json({
        verified: true,
        already_processed: true,
        project_id: project.id,
        friendly_id: project.friendly_id,
      });
    }

    // ─── Verify with provider ──────────────────────────────────────
    const paymentProvider = getProvider(provider as PaymentProviderName);
    const verifyResult = await paymentProvider.verify(reference);

    if (!verifyResult.success) {
      if (verifyResult.status === "failed" || verifyResult.status === "abandoned") {
        await supabase
          .from("projects")
          .update({ payment_status: verifyResult.status === "abandoned" ? "cancelled" : "failed" })
          .eq("id", project.id)
          .eq("payment_status", "pending");

        await supabase
          .from("payment_records")
          .update({
            status: verifyResult.status === "abandoned" ? "cancelled" : "failed",
            raw_provider_response: verifyResult.raw ?? null,
          })
          .eq("order_id", project.id)
          .eq("transaction_reference", reference);
      }

      return NextResponse.json({
        verified: false,
        status: verifyResult.status,
        project_id: project.id,
      });
    }

    // ─── Amount verification ───────────────────────────────────────
    const expectedAmountCents = Math.round(project.price * 100);
    if (verifyResult.amount !== expectedAmountCents) {
      console.error(
        `Amount mismatch: expected ${expectedAmountCents}, got ${verifyResult.amount} for ref ${reference}`
      );
      return NextResponse.json(
        { error: "Payment amount mismatch", verified: false },
        { status: 400 }
      );
    }

    // ─── Update project as paid ────────────────────────────────────
    const { error: updateError } = await supabase
      .from("projects")
      .update({
        payment_status: "paid",
        transaction_id: verifyResult.transactionId,
        payment_verified_at: new Date().toISOString(),
      })
      .eq("id", project.id)
      .eq("payment_status", "pending"); // Prevent double-update

    if (updateError) {
      console.error("Failed to update project payment status:", updateError);
    }

    const { error: paymentRecordError } = await supabase
      .from("payment_records")
      .update({
        status: "paid",
        transaction_id: verifyResult.transactionId,
        paid_at: verifyResult.paidAt || new Date().toISOString(),
        raw_provider_response: verifyResult.raw ?? null,
        updated_at: new Date().toISOString(),
      })
      .eq("order_id", project.id)
      .eq("transaction_reference", reference);

    if (paymentRecordError) {
      console.warn("Failed to update payment record:", paymentRecordError.message);
    }

    // ─── Send emails ───────────────────────────────────────────────
    const { data: profile } = await supabase
      .from("profiles")
      .select("email")
      .eq("id", project.client_id)
      .single();

    if (profile?.email) {
      // Fire-and-forget — don't block response
      sendPaymentSuccessEmail(profile.email, project.friendly_id, project.price).catch(
        (err) => console.error("Email send error:", err)
      );
      sendEditorNotificationEmail(
        project.friendly_id,
        project.word_count,
        project.service_type,
        project.turnaround
      ).catch((err) => console.error("Editor notification error:", err));
    }

    return NextResponse.json({
      verified: true,
      project_id: project.id,
      friendly_id: project.friendly_id,
      amount: project.price,
      currency: project.payment_currency,
    });
  } catch (error: any) {
    console.error("Payment verification error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof ProviderUnavailableError
            ? "This payment option will be available soon."
            : error.message || "Verification failed",
      },
      { status: error instanceof ProviderUnavailableError ? 503 : 500 }
    );
  }
}
