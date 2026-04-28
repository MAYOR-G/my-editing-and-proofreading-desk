import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";
import { getSafeAppUrl } from "@/lib/payment";

export const dynamic = "force-dynamic";

const PROJECT_COLUMNS = [
  "id",
  "client_id",
  "title",
  "service_type",
  "document_type",
  "formatting_style",
  "english_type",
  "turnaround",
  "turnaround_days",
  "turnaround_hours",
  "word_count",
  "price",
  "calculated_price",
  "final_price",
  "minimum_applied",
  "upload_file_path",
  "uploaded_file_path",
  "payment_status",
  "payment_provider",
  "payment_reference",
  "transaction_reference",
  "payment_currency",
].join(",");

export async function GET() {
  const env = {
    NEXT_PUBLIC_SUPABASE_URL: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
    SUPABASE_SERVICE_ROLE_KEY: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
    PAYSTACK_SECRET_KEY: Boolean(process.env.PAYSTACK_SECRET_KEY),
    PAYSTACK_WEBHOOK_SECRET: Boolean(process.env.PAYSTACK_WEBHOOK_SECRET),
    PAYMENT_ACTIVE_PROVIDER: process.env.PAYMENT_ACTIVE_PROVIDER || "paystack",
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || null,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || null,
    callback_base_url: getSafeAppUrl(),
  };

  const checks: Record<string, unknown> = {
    env,
    webhook: {
      endpoint_configured_in_paystack: "manual_check_required",
      signature_secret_configured: Boolean(process.env.PAYSTACK_WEBHOOK_SECRET || process.env.PAYSTACK_SECRET_KEY),
      dedicated_webhook_secret_configured: Boolean(process.env.PAYSTACK_WEBHOOK_SECRET),
      required_for_initialize: false,
      endpoint: `${getSafeAppUrl()}/api/webhooks/paystack`,
    },
    upload: {
      endpoint: `${getSafeAppUrl()}/api/uploads/document`,
      uses_server_side_storage_upload: true,
    },
  };

  try {
    const supabase = createSupabaseAdminClient();
    const [projects, paymentRecords, buckets] = await Promise.all([
      supabase.from("projects").select(PROJECT_COLUMNS).limit(1),
      supabase.from("payment_records").select("id,order_id,user_id,provider,transaction_reference,amount,currency,status").limit(1),
      supabase.storage.listBuckets(),
    ]);

    checks.supabase = {
      projects_schema: {
        ok: !projects.error,
        code: projects.error?.code || null,
        message: projects.error?.message || null,
      },
      payment_records_schema: {
        ok: !paymentRecords.error,
        code: paymentRecords.error?.code || null,
        message: paymentRecords.error?.message || null,
      },
      buckets: {
        ok: !buckets.error,
        names: buckets.data?.map((bucket) => bucket.name).sort() || [],
        error: buckets.error?.message || null,
      },
    };
  } catch (error) {
    checks.supabase = {
      ok: false,
      message: error instanceof Error ? error.message : "Supabase health check failed.",
    };
  }

  try {
    const response = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "HEAD",
      cache: "no-store",
    });

    checks.paystack_network = {
      reachable: response.status === 401 || response.status === 405 || response.ok,
      status: response.status,
    };
  } catch (error) {
    checks.paystack_network = {
      reachable: false,
      message: error instanceof Error ? error.message : "Paystack network check failed.",
    };
  }

  return NextResponse.json(checks);
}
