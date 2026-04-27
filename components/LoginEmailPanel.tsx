"use client";

import { useTransition, useState } from "react";
import { login } from "@/app/actions/auth";
import Link from "next/link";

export function LoginEmailPanel() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const submit = (formData: FormData) => {
    setError(null);
    startTransition(async () => {
      const result = await login(formData);
      if (result?.error) {
        setError(result.error);
      }
    });
  };

  return (
    <form action={submit} className="border border-ink/10 bg-paper p-6 shadow-[0_24px_80px_rgba(17,17,15,0.055)] sm:p-8">
      <p className="text-xs uppercase tracking-[0.28em] text-gold-deep">Client access</p>
      <h2 className="mt-4 font-display text-4xl leading-tight text-ink">Enter your credentials to open your desk.</h2>
      
      {error && (
        <div className="mt-4 flex items-start gap-3 border border-red-900/20 bg-red-50 p-3 text-sm text-red-800">
          <svg viewBox="0 0 20 20" className="mt-0.5 h-4 w-4 shrink-0 text-red-600" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </div>
      )}

      <div className="mt-8 grid gap-5">
        <label className="grid gap-2 text-sm text-charcoal/70">
          Email address
          <input
            name="email"
            required
            type="email"
            autoComplete="email"
            placeholder="client@example.com"
            className="min-h-[3.25rem] border border-ink/12 bg-ivory px-4 text-base text-ink placeholder:text-charcoal/35 transition duration-200 ease-premium-out focus:border-gold focus:shadow-[0_0_0_3px_rgba(176,138,60,0.08)]"
          />
        </label>
        <label className="grid gap-2 text-sm text-charcoal/70">
          Password
          <input
            name="password"
            required
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            className="min-h-[3.25rem] border border-ink/12 bg-ivory px-4 text-base text-ink placeholder:text-charcoal/35 transition duration-200 ease-premium-out focus:border-gold focus:shadow-[0_0_0_3px_rgba(176,138,60,0.08)]"
          />
        </label>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <Link
          href="/forgot-password"
          className="text-sm text-charcoal/55 transition duration-200 hover:text-gold-deep"
        >
          Forgot password?
        </Link>
      </div>
      
      <button 
        disabled={isPending}
        className="mt-6 min-h-12 w-full bg-ink px-6 text-sm text-ivory transition duration-200 ease-premium-out hover:bg-gold-deep active:scale-[0.99] disabled:opacity-50"
      >
        {isPending ? (
          <span className="flex items-center justify-center gap-2">
            <span className="h-3.5 w-3.5 animate-spin rounded-full border border-ivory/30 border-t-ivory" />
            Authenticating...
          </span>
        ) : (
          "Continue to dashboard"
        )}
      </button>

      <p className="mt-6 text-center text-sm text-charcoal/50">
        New here? <Link href="/signup" className="text-gold-deep transition hover:text-ink">Create an account</Link>
      </p>
    </form>
  );
}
