import { NextResponse } from "next/server";
import { PaystackProvider } from "@/lib/payment";
import { sendDocumentReceivedEmail, sendEditorNotificationEmail, sendPaymentSuccessEmail } from "@/lib/email";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";

/**
 * POST /api/webhooks/paystack
 * 
 * Paystack webhook handler.
 * Validates HMAC SHA-512 signature before processing.
 * Idempotent — checks payment_verified_at before updating.
 */
type PaymentRecordLookup = {
  order_id: string;
  amount: number | string | null;
  currency: string | null;
  provider: string | null;
  status: string | null;
};

export async function POST(request: Request) {
  try {
    const supabase = createSupabaseAdminClient();

    // ─── Validate webhook signature ────────────────────────────────
    // Clone the request since we need to read the body twice
    const clonedRequest = request.clone();
    const webhookData = await PaystackProvider.validateWebhook(clonedRequest);

    if (!webhookData) {
      return NextResponse.json(
        { error: "Invalid webhook signature or unsupported event" },
        { status: 401 }
      );
    }

    const { reference, amount, transactionId, currency } = webhookData;
    const verified = await PaystackProvider.verify(reference);

    if (!verified.success) {
      console.warn(`Paystack webhook: server verification failed for reference ${reference}`);
      return NextResponse.json({ received: true });
    }

    // ─── Find project ──────────────────────────────────────────────
    let paymentRecord: PaymentRecordLookup | null = null;
    let { data: project, error: fetchError } = await supabase
      .from("projects")
      .select("id, friendly_id, client_id, title, price, payment_status, payment_provider, payment_currency, payment_verified_at, service_type, target_journal, word_count, turnaround, uploaded_file_path, upload_file_path")
      .eq("transaction_reference", reference)
      .maybeSingle();

    if (fetchError || !project) {
      const { data: record, error: recordError } = await supabase
        .from("payment_records")
        .select("order_id, amount, currency, provider, status")
        .eq("transaction_reference", reference)
        .maybeSingle();

      if (recordError || !record?.order_id) {
        console.warn(`Paystack webhook: project not found for reference ${reference}`);
        // Return 200 to prevent Paystack from retrying
        return NextResponse.json({ received: true });
      }

      paymentRecord = record as PaymentRecordLookup;
      const fallback = await supabase
        .from("projects")
        .select("id, friendly_id, client_id, title, price, payment_status, payment_provider, payment_currency, payment_verified_at, service_type, target_journal, word_count, turnaround, uploaded_file_path, upload_file_path")
        .eq("id", paymentRecord.order_id)
        .single();

      project = fallback.data;
      fetchError = fallback.error;

      if (fetchError || !project) {
        console.warn(`Paystack webhook: fallback project not found for reference ${reference}`);
        return NextResponse.json({ received: true });
      }
    }

    const recordedProvider = paymentRecord?.provider || project.payment_provider;
    if (recordedProvider !== "paystack") {
      console.warn(`Paystack webhook: provider mismatch for reference ${reference}`);
      return NextResponse.json({ received: true });
    }

    // ─── Idempotency check ─────────────────────────────────────────
    if (project.payment_status === "paid" && project.payment_verified_at) {
      // Already processed — acknowledge silently
      return NextResponse.json({ received: true, already_processed: true });
    }

    // ─── Amount verification ───────────────────────────────────────
    const expectedAmount = Number(paymentRecord?.amount ?? project.price);
    const expectedAmountCents = Math.round(expectedAmount * 100);
    if (amount !== expectedAmountCents || verified.amount !== expectedAmountCents) {
      console.error(
        `Paystack webhook amount mismatch: expected ${expectedAmountCents}, got ${amount}/${verified.amount} for ref ${reference}`
      );
      return NextResponse.json(
        { error: "Amount mismatch" },
        { status: 400 }
      );
    }

    // ─── Update project ────────────────────────────────────────────
    const { data: updatedProjects, error: updateError } = await supabase
      .from("projects")
      .update({
        payment_status: "paid",
        transaction_id: transactionId,
        payment_verified_at: new Date().toISOString(),
      })
      .eq("id", project.id)
      .neq("payment_status", "paid")
      .select("id"); // Only update and notify once.

    if (updateError) {
      console.error("Paystack webhook: failed to update project:", updateError);
    }

    const processedNow = Boolean(updatedProjects?.length);

    const { error: paymentRecordError } = await supabase
      .from("payment_records")
      .update({
        status: "paid",
        transaction_id: verified.transactionId || transactionId,
        paid_at: verified.paidAt || new Date().toISOString(),
        raw_provider_response: verified.raw ?? webhookData.raw ?? null,
        updated_at: new Date().toISOString(),
      })
      .eq("order_id", project.id)
      .eq("transaction_reference", reference);

    if (paymentRecordError) {
      console.warn("Paystack webhook: failed to update payment record:", paymentRecordError.message);
    }

    // ─── Send notification emails ──────────────────────────────────
    const { data: profile } = await supabase
      .from("profiles")
      .select("email, full_name")
      .eq("id", project.client_id)
      .single();

    if (processedNow && profile?.email) {
      const paidAt = verified.paidAt || new Date().toISOString();
      sendPaymentSuccessEmail(profile.email, {
        clientName: profile.full_name,
        friendlyId: project.friendly_id,
        service: project.service_type,
        targetJournal: project.target_journal,
        wordCount: project.word_count,
        turnaround: project.turnaround,
        amount: expectedAmount,
        currency: paymentRecord?.currency || project.payment_currency,
        paymentDate: new Date(paidAt).toLocaleString(),
        paymentMethod: verified.channel || project.payment_provider,
      }).catch(
        (err) => console.error("Paystack webhook email error:", err)
      );
      sendDocumentReceivedEmail(profile.email, {
        clientName: profile.full_name,
        friendlyId: project.friendly_id,
        documentName: project.title,
        service: project.service_type,
        targetJournal: project.target_journal,
        turnaround: project.turnaround,
      }).catch((err) => console.error("Document received email error:", err));
      sendEditorNotificationEmail({
        friendlyId: project.friendly_id,
        clientName: profile.full_name,
        clientEmail: profile.email,
        amount: expectedAmount,
        currency: paymentRecord?.currency || project.payment_currency,
        wordCount: project.word_count,
        service: project.service_type,
        targetJournal: project.target_journal,
        turnaround: project.turnaround,
        paymentStatus: "paid",
        documentPath: project.uploaded_file_path || project.upload_file_path,
      }).catch((err) => console.error("Editor notification error:", err));
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Paystack webhook error:", error);
    // Always return 200 to prevent infinite retries
    return NextResponse.json({ received: true });
  }
}
