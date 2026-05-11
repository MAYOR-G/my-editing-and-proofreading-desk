"use client";

import { useState, useTransition } from "react";
import { PAYMENT_PROVIDERS, type PaymentProviderName } from "@/lib/payment";
import { type PaymentSettings } from "@/lib/payment-settings";

type PaymentSettingsFormProps = {
  initialSettings: PaymentSettings;
  readiness: Record<PaymentProviderName, { configured: boolean; message: string | null }>;
};

const providerDetails: Record<PaymentProviderName, string> = {
  paystack: "Card, bank transfer, USSD, and mobile money checkout.",
  flutterwave: "Global and African payment rails.",
  paypal: "PayPal wallet and card checkout.",
  stripe: "International card and wallet payments.",
};

export function PaymentSettingsForm({ initialSettings, readiness }: PaymentSettingsFormProps) {
  const [settings, setSettings] = useState(initialSettings);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const toggleProvider = (provider: PaymentProviderName) => {
    setSettings((current) => ({
      ...current,
      [`${provider}_enabled`]: !current[`${provider}_enabled`],
    }));
    setMessage(null);
    setError(null);
  };

  const saveSettings = () => {
    startTransition(async () => {
      setMessage(null);
      setError(null);

      try {
        const response = await fetch("/api/admin/payment-settings", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ settings }),
        });
        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.error || "Payment settings could not be saved.");
        }

        setSettings(data.settings);
        setMessage("Payment methods updated.");
      } catch (err: any) {
        setError(err.message || "Payment settings could not be saved.");
      }
    });
  };

  return (
    <section id="payment-methods" className="mt-8 border border-ink/10 bg-ivory/90 p-6">
      <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-gold-deep">Payment Methods</p>
          <h2 className="mt-2 font-display text-4xl text-ink">Payment Methods</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-charcoal/68">
            Choose which payment methods are available to users during checkout.
          </p>
        </div>
        <button
          type="button"
          onClick={saveSettings}
          disabled={isPending}
          className="min-h-11 rounded-full bg-cta px-6 text-sm font-semibold text-white shadow-[0_14px_32px_rgba(31,143,90,0.16)] transition hover:bg-cta-active disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? "Saving..." : "Save changes"}
        </button>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {PAYMENT_PROVIDERS.map((provider) => {
          const enabled = settings[`${provider.id}_enabled`];
          const providerReady = readiness[provider.id];

          return (
            <button
              key={provider.id}
              type="button"
              onClick={() => toggleProvider(provider.id)}
              className={`border p-5 text-left transition duration-200 ease-premium-out ${
                enabled
                  ? "border-primary bg-primary/10 shadow-[0_18px_42px_rgba(23,74,124,0.10)]"
                  : "border-ink/10 bg-paper hover:border-primary/30"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-lg font-semibold text-ink">{provider.label}</p>
                  <p className="mt-2 text-sm leading-6 text-charcoal/62">{providerDetails[provider.id]}</p>
                </div>
                <span
                  className={`flex h-7 w-12 shrink-0 items-center rounded-full border p-1 transition ${
                    enabled ? "justify-end border-primary bg-primary" : "justify-start border-ink/10 bg-ivory"
                  }`}
                  aria-hidden="true"
                >
                  <span className={`h-5 w-5 rounded-full ${enabled ? "bg-white" : "bg-charcoal/35"}`} />
                </span>
              </div>
              <p className={`mt-5 text-xs uppercase tracking-[0.18em] ${enabled ? "text-primary" : "text-charcoal/45"}`}>
                {enabled ? "Enabled" : "Disabled"}
              </p>
              {enabled && providerReady && !providerReady.configured ? (
                <p className="mt-3 border border-red-500/20 bg-red-500/10 p-3 text-xs leading-5 text-red-700">
                  Enabled, but API keys are missing.
                </p>
              ) : null}
            </button>
          );
        })}
      </div>

      {message ? <p className="mt-4 border border-cta/25 bg-cta-soft p-3 text-sm text-cta">{message}</p> : null}
      {error ? <p className="mt-4 border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-700">{error}</p> : null}
    </section>
  );
}
