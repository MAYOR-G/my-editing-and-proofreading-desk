import { createSupabaseAdminClient } from "@/lib/supabase-admin";
import { PAYMENT_PROVIDERS, type PaymentProviderName } from "@/lib/payment";

export type PaymentSettings = Record<`${PaymentProviderName}_enabled`, boolean>;

export const DEFAULT_PAYMENT_SETTINGS: PaymentSettings = {
  paystack_enabled: true,
  flutterwave_enabled: false,
  stripe_enabled: false,
  paypal_enabled: false,
};

const SETTINGS_ID = "default";

function isMissingPaymentSettingsTable(error: { code?: string; message?: string } | null) {
  if (!error) return false;
  const message = error.message?.toLowerCase() || "";
  return error.code === "PGRST205" || message.includes("payment_settings") || message.includes("schema cache");
}

export function normalizePaymentSettings(input: Partial<PaymentSettings> | null | undefined): PaymentSettings {
  return {
    paystack_enabled: Boolean(input?.paystack_enabled ?? DEFAULT_PAYMENT_SETTINGS.paystack_enabled),
    flutterwave_enabled: Boolean(input?.flutterwave_enabled ?? DEFAULT_PAYMENT_SETTINGS.flutterwave_enabled),
    stripe_enabled: Boolean(input?.stripe_enabled ?? DEFAULT_PAYMENT_SETTINGS.stripe_enabled),
    paypal_enabled: Boolean(input?.paypal_enabled ?? DEFAULT_PAYMENT_SETTINGS.paypal_enabled),
  };
}

export function enabledProviderIds(settings: PaymentSettings): PaymentProviderName[] {
  return PAYMENT_PROVIDERS
    .filter((provider) => settings[`${provider.id}_enabled`])
    .map((provider) => provider.id);
}

export function isProviderVisible(provider: PaymentProviderName, settings: PaymentSettings) {
  return settings[`${provider}_enabled`];
}

export async function getPaymentSettings(): Promise<PaymentSettings> {
  const supabaseAdmin = createSupabaseAdminClient();
  const { data, error } = await supabaseAdmin
    .from("payment_settings")
    .select("paystack_enabled, flutterwave_enabled, stripe_enabled, paypal_enabled")
    .eq("id", SETTINGS_ID)
    .maybeSingle();

  if (error) {
    if (isMissingPaymentSettingsTable(error)) {
      return DEFAULT_PAYMENT_SETTINGS;
    }

    throw error;
  }

  if (data) {
    return normalizePaymentSettings(data);
  }

  const { data: inserted, error: insertError } = await supabaseAdmin
    .from("payment_settings")
    .insert({ id: SETTINGS_ID, ...DEFAULT_PAYMENT_SETTINGS })
    .select("paystack_enabled, flutterwave_enabled, stripe_enabled, paypal_enabled")
    .single();

  if (insertError) {
    if (isMissingPaymentSettingsTable(insertError)) {
      return DEFAULT_PAYMENT_SETTINGS;
    }

    throw insertError;
  }

  return normalizePaymentSettings(inserted);
}

export async function updatePaymentSettings(settings: PaymentSettings): Promise<PaymentSettings> {
  const supabaseAdmin = createSupabaseAdminClient();
  const normalized = normalizePaymentSettings(settings);
  const { data, error } = await supabaseAdmin
    .from("payment_settings")
    .upsert({ id: SETTINGS_ID, ...normalized, updated_at: new Date().toISOString() }, { onConflict: "id" })
    .select("paystack_enabled, flutterwave_enabled, stripe_enabled, paypal_enabled")
    .single();

  if (error) {
    throw error;
  }

  return normalizePaymentSettings(data);
}
