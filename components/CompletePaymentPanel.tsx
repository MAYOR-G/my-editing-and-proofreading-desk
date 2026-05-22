"use client";

import { useEffect, useMemo, useState } from "react";
import { PAYMENT_PROVIDERS, type PaymentProviderName } from "@/lib/payment";
import type { PaymentSettings } from "@/lib/payment-settings";

type PaymentReadiness = Record<PaymentProviderName, { configured: boolean; message: string | null }>;

export function CompletePaymentPanel({ projectId }: { projectId: string }) {
  const [provider, setProvider] = useState<PaymentProviderName | "">("");
  const [settings, setSettings] = useState<PaymentSettings | null>(null);
  const [readiness, setReadiness] = useState<PaymentReadiness | null>(null);
  const [loadingSettings, setLoadingSettings] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    async function loadSettings() {
      try {
        const response = await fetch("/api/payment-settings", { cache: "no-store" });
        const data = await response.json();
        if (!response.ok || !data.success || !data.settings) throw new Error(data.error || "Payment methods could not be loaded.");
        if (cancelled) return;
        setSettings(data.settings);
        setReadiness(data.readiness || null);
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : "Payment methods could not be loaded.");
      } finally {
        if (!cancelled) setLoadingSettings(false);
      }
    }
    loadSettings();
    return () => {
      cancelled = true;
    };
  }, []);

  const availableProviders = useMemo(() => {
    if (!settings) return [];
    return PAYMENT_PROVIDERS.filter((item) => settings[`${item.id}_enabled`] && readiness?.[item.id]?.configured !== false);
  }, [readiness, settings]);

  async function startPayment() {
    if (!provider) {
      setError("Please choose a payment method.");
      return;
    }

    setSubmitting(true);
    setError("");
    try {
      const response = await fetch("/api/payments/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ project_id: projectId, provider }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.error || "We could not start payment.");
      window.location.href = data.authorization_url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "We could not start payment.");
      setSubmitting(false);
    }
  }

  if (loadingSettings) {
    return <p className="text-sm text-charcoal/60">Loading payment methods...</p>;
  }

  if (!availableProviders.length) {
    return <p className="text-sm text-charcoal/60">No payment method is currently available. Please contact support.</p>;
  }

  return (
    <div className="grid gap-4">
      <label className="grid gap-2 text-sm font-medium text-ink">
        Payment method
        <select
          value={provider}
          onChange={(event) => {
            setProvider(event.target.value as PaymentProviderName | "");
            setError("");
          }}
          className="min-h-12 rounded-xl border border-hairline bg-surface-soft px-4 text-ink transition focus:border-primary focus:bg-white"
        >
          <option value="">Select payment method...</option>
          {availableProviders.map((item) => (
            <option key={item.id} value={item.id}>{item.label}</option>
          ))}
        </select>
      </label>
      {error ? <p className="rounded-xl border border-red-500/25 bg-red-500/10 p-4 text-sm text-red-700">{error}</p> : null}
      <button
        type="button"
        onClick={startPayment}
        disabled={submitting || !provider}
        className="min-h-12 rounded-full bg-cta px-6 text-sm font-semibold text-white transition hover:bg-cta-active disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? "Starting payment..." : provider ? "Complete payment" : "Select payment method"}
      </button>
    </div>
  );
}
