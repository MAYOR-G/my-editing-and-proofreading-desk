"use client";

import { useTransition, useState } from "react";
import { resetPasswordForEmail } from "@/app/actions/auth";
import Link from "next/link";

export function ForgotPasswordPanel() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const submit = (formData: FormData) => {
    setError(null);
    setSuccess(null);
    startTransition(async () => {
      const result = await resetPasswordForEmail(formData);
      if (result?.error) {
        setError(result.error);
      } else if (result?.success) {
        setSuccess(result.message || "Check your email for the reset link.");
      }
    });
  };

  return (
    <form action={submit} className="mx-auto grid max-w-2xl gap-5 border border-ink/10 bg-paper p-6 sm:p-8">
      {error && (
        <div className="border border-red-900/30 bg-red-50 p-3 text-sm text-red-800">
          {error}
        </div>
      )}
      {success && (
        <div className="border border-green-900/30 bg-green-50 p-4 text-center">
          <svg className="mx-auto h-8 w-8 text-green-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <p className="text-base font-medium text-green-900 mb-1">Check your email</p>
          <p className="text-sm text-green-800">{success}</p>
        </div>
      )}
      
      {!success && (
        <>
          <label className="grid gap-2 text-sm text-charcoal/70">
            Email
            <input name="email" required className="min-h-12 border border-ink/10 bg-ivory px-4 text-base text-ink" type="email" autoComplete="email" />
          </label>
          <button 
            disabled={isPending}
            className="mt-2 inline-flex min-h-12 items-center justify-center bg-ink px-7 text-sm text-ivory transition duration-200 ease-premium-out hover:bg-gold-deep active:scale-[0.98] disabled:opacity-50"
          >
            {isPending ? "Sending..." : "Send reset link"}
          </button>
        </>
      )}
      
      <p className="mt-4 text-center text-sm text-charcoal/60">
        Remembered your password? <Link href="/login" className="underline hover:text-ink">Log in</Link>
      </p>
    </form>
  );
}
