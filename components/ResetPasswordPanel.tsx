"use client";

import { useTransition, useState } from "react";
import { updatePassword } from "@/app/actions/auth";

export function ResetPasswordPanel() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const submit = (formData: FormData) => {
    setError(null);
    startTransition(async () => {
      const result = await updatePassword(formData);
      if (result?.error) {
        setError(result.error);
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
      <label className="grid gap-2 text-sm text-charcoal/70">
        New Password
        <input name="password" required className="min-h-12 border border-ink/10 bg-ivory px-4 text-base text-ink" type="password" autoComplete="new-password" minLength={6} />
      </label>
      <button 
        disabled={isPending}
        className="mt-2 inline-flex min-h-12 items-center justify-center bg-ink px-7 text-sm text-ivory transition duration-200 ease-premium-out hover:bg-gold-deep active:scale-[0.98] disabled:opacity-50"
      >
        {isPending ? "Updating..." : "Update password"}
      </button>
    </form>
  );
}
