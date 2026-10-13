"use client";

import { useTransition, useState } from "react";
import { adminLogin } from "@/app/actions/admin";
import { TurnstileField, isClientTurnstileEnabled } from "@/components/TurnstileField";

export function AdminLoginPanel() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState("");

  const submit = (formData: FormData) => {
    setError(null);
    if (isClientTurnstileEnabled() && !turnstileToken) {
      setError("Please complete the security check before continuing.");
      return;
    }

    startTransition(async () => {
      const result = await adminLogin(formData);
      if (result?.error) {
        setError(result.error);
        setTurnstileToken("");
      }
    });
  };

  return (
    <form action={submit} className="grid gap-5 rounded-2xl border border-ivory/15 bg-ink/75 p-6 sm:p-8 backdrop-blur-md shadow-2xl">
      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-950/40 p-3.5 text-xs sm:text-sm text-red-200" role="alert">
          {error}
        </div>
      )}
      <div className="grid gap-1.5">
        <label htmlFor="admin-email" className="text-xs font-semibold uppercase tracking-wider text-ivory/70">
          Admin Email
        </label>
        <input
          id="admin-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="admin@editandproofread.com"
          className="h-11 rounded-lg border border-ivory/15 bg-ivory/5 px-3.5 text-sm text-ivory placeholder:text-ivory/30 transition-colors duration-200 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30 disabled:opacity-50"
        />
      </div>
      <div className="grid gap-1.5">
        <label htmlFor="admin-password" className="text-xs font-semibold uppercase tracking-wider text-ivory/70">
          Admin Password
        </label>
        <input
          id="admin-password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          placeholder="••••••••••••"
          className="h-11 rounded-lg border border-ivory/15 bg-ivory/5 px-3.5 text-sm text-ivory placeholder:text-ivory/30 transition-colors duration-200 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30 disabled:opacity-50"
        />
      </div>
      <TurnstileField token={turnstileToken} onTokenChange={setTurnstileToken} onError={setError} theme="dark" />
      <button 
        type="submit"
        disabled={isPending}
        className="mt-2 inline-flex h-11 items-center justify-center rounded-lg bg-gold px-7 text-sm font-semibold text-ink shadow-sm transition-all duration-200 hover:bg-ivory active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold disabled:opacity-50"
      >
        {isPending ? "Authenticating..." : "Access Desk"}
      </button>
    </form>
  );
}
