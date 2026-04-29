"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const reference = searchParams.get("reference") || searchParams.get("trxref");
  const provider = searchParams.get("provider") || "paystack";
  const transactionId = searchParams.get("transaction_id");

  const [status, setStatus] = useState<"verifying" | "success" | "failed">("verifying");
  const [projectInfo, setProjectInfo] = useState<{ friendly_id?: string; amount?: number; currency?: string; reference?: string } | null>(null);

  useEffect(() => {
    if (!reference || !provider) {
      setStatus("failed");
      return;
    }

    const params = new URLSearchParams({ reference, provider });
    if (transactionId) params.set("transaction_id", transactionId);

    fetch(`/api/payments/verify?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.verified) {
          setStatus("success");
          setProjectInfo({ friendly_id: data.friendly_id, amount: data.amount, currency: data.currency, reference });
          setTimeout(() => router.push("/dashboard/active"), 5000);
        } else {
          setStatus("failed");
        }
      })
      .catch(() => setStatus("failed"));
  }, [reference, provider, transactionId, router]);

  return (
    <div className="min-h-screen bg-ink flex items-center justify-center p-6">
      <div className="max-w-lg w-full text-center">
        {status === "verifying" && (
          <div className="animate-in fade-in duration-500">
            <div className="mx-auto h-20 w-20 rounded-full border-2 border-gold/30 flex items-center justify-center mb-8">
              <svg className="h-10 w-10 text-gold animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
            </div>
            <h1 className="font-display text-4xl text-ivory mb-4">Verifying Payment</h1>
            <p className="text-ivory/60">Please wait while we confirm your transaction...</p>
          </div>
        )}

        {status === "success" && (
          <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div className="mx-auto h-20 w-20 rounded-full bg-green-500/20 border-2 border-green-500/40 flex items-center justify-center mb-8">
              <svg className="h-10 w-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            </div>
            <h1 className="font-display text-4xl text-ivory mb-4">Payment Successful</h1>
            <p className="text-ivory/60 mb-8">Your project <span className="text-gold font-semibold">{projectInfo?.friendly_id}</span> has been confirmed and queued for editorial review.</p>
            {projectInfo?.amount && (
              <div className="border border-ivory/10 bg-ivory/5 p-6 mb-8 mx-auto max-w-sm">
                <p className="text-xs uppercase tracking-widest text-gold mb-2">Amount Paid</p>
                <p className="font-display text-3xl text-ivory">${projectInfo.amount.toFixed(2)} <span className="text-sm text-ivory/40">{projectInfo.currency}</span></p>
                <div className="mt-5 grid gap-2 border-t border-ivory/10 pt-4 text-left text-xs text-ivory/50">
                  <p>Provider: <span className="text-ivory">Paystack</span></p>
                  <p>Reference: <span className="break-all text-ivory">{projectInfo.reference}</span></p>
                </div>
              </div>
            )}
            <p className="text-ivory/40 text-sm mb-6">Redirecting to your dashboard in 5 seconds...</p>
            <Link href="/dashboard/active" className="inline-flex min-h-12 items-center justify-center bg-gold px-8 text-sm text-ink font-semibold transition hover:bg-ivory active:scale-[0.98]">
              Go to Dashboard Now
            </Link>
          </div>
        )}

        {status === "failed" && (
          <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div className="mx-auto h-20 w-20 rounded-full bg-red-500/20 border-2 border-red-500/40 flex items-center justify-center mb-8">
              <svg className="h-10 w-10 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </div>
            <h1 className="font-display text-4xl text-ivory mb-4">Payment Not Completed</h1>
            <p className="text-ivory/60 mb-8">Your payment could not be verified. This may be due to a cancelled transaction or a temporary issue.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/dashboard/uploads" className="inline-flex min-h-12 items-center justify-center bg-gold px-8 text-sm text-ink font-semibold transition hover:bg-ivory active:scale-[0.98]">Try Again</Link>
              <Link href="/dashboard" className="inline-flex min-h-12 items-center justify-center border border-ivory/20 px-8 text-sm text-ivory transition hover:border-gold hover:text-gold active:scale-[0.98]">Back to Dashboard</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
