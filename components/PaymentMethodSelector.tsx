"use client";

import { PAYMENT_PROVIDERS, type PaymentProviderName } from "@/lib/payment";
import type { PaymentSettings } from "@/lib/payment-settings";

type PaymentReadiness = Record<PaymentProviderName, { configured: boolean; message: string | null }>;

type PaymentMethodSelectorProps = {
  value: PaymentProviderName | "";
  onChange: (provider: PaymentProviderName | "") => void;
  settings: PaymentSettings | null;
  readiness: PaymentReadiness | null;
  disabled?: boolean;
};

type PaymentOption = {
  provider: PaymentProviderName;
  label: string;
  description: string;
  statusLabel?: string;
  cardBadges?: string[];
};

const paymentOptions: PaymentOption[] = [
  {
    provider: "paystack",
    label: "Pay with Card",
    description: "Secure card checkout",
    cardBadges: ["Visa", "Mastercard"],
  },
  {
    provider: "paypal",
    label: "PayPal",
    description: "PayPal wallet checkout",
    statusLabel: "Coming soon",
  },
  {
    provider: "stripe",
    label: "Wire Transfer",
    description: "Bank transfer option",
    statusLabel: "Coming soon",
  },
];

export function getPaymentMethodLabel(provider: PaymentProviderName | "" | null | undefined) {
  if (!provider) return "Select payment method";
  return paymentOptions.find((option) => option.provider === provider)?.label || "Selected payment method";
}

function isOptionEnabled(option: PaymentOption, settings: PaymentSettings | null, readiness: PaymentReadiness | null) {
  const providerConfig = PAYMENT_PROVIDERS.find((item) => item.id === option.provider);
  return Boolean(
    settings?.[`${option.provider}_enabled`] &&
      readiness?.[option.provider]?.configured !== false &&
      providerConfig?.status === "available"
  );
}

export function PaymentMethodSelector({ value, onChange, settings, readiness, disabled = false }: PaymentMethodSelectorProps) {
  return (
    <div className="grid gap-3" role="radiogroup" aria-label="Payment method">
      {paymentOptions.map((option) => {
        const enabled = isOptionEnabled(option, settings, readiness);
        const selected = value === option.provider;
        const statusLabel = enabled ? null : option.statusLabel || "Unavailable";

        return (
          <button
            key={option.provider}
            type="button"
            role="radio"
            aria-checked={selected}
            disabled={disabled || !enabled}
            onClick={() => {
              if (enabled) onChange(option.provider);
            }}
            className={`group flex min-h-[5.25rem] w-full items-center justify-between gap-4 rounded-2xl border px-4 py-3 text-left transition duration-200 ease-premium-out sm:px-5 ${
              selected
                ? "border-primary bg-primary/[0.06] shadow-[0_14px_35px_rgba(23,74,124,0.1)]"
                : enabled
                  ? "border-hairline bg-surface-soft hover:border-primary/45 hover:bg-white"
                  : "cursor-not-allowed border-hairline bg-surface-soft/60 opacity-65"
            }`}
          >
            <span className="flex min-w-0 items-center gap-3">
              <span
                className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border ${
                  selected ? "border-primary bg-primary" : "border-charcoal/25 bg-white"
                }`}
                aria-hidden="true"
              >
                {selected ? <span className="h-2 w-2 rounded-full bg-white" /> : null}
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-ink">{option.label}</span>
                <span className="mt-1 block text-xs text-charcoal/58">{option.description}</span>
              </span>
            </span>

            <span className="flex shrink-0 flex-wrap justify-end gap-2">
              {option.cardBadges?.map((badge) => (
                <span key={badge} className="rounded-full border border-primary/15 bg-white px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-primary">
                  {badge}
                </span>
              ))}
              {statusLabel ? (
                <span className="rounded-full border border-ink/10 bg-white px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-charcoal/55">
                  {statusLabel}
                </span>
              ) : null}
            </span>
          </button>
        );
      })}
    </div>
  );
}
