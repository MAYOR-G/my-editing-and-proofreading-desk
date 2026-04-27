"use client";

import { useTransition, useState } from "react";
import { adminLogin } from "@/app/actions/admin";

export function AdminLoginPanel() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const submit = (formData: FormData) => {
    setError(null);
    startTransition(async () => {
      const result = await adminLogin(formData);
      if (result?.error) {
        setError(result.error);
      }
    });
  };

  return (
    <form action={submit} className="grid gap-5 border border-ivory/10 bg-ink/50 p-6 sm:p-8 backdrop-blur-md">
      {error && (
        <div className="border border-red-900/50 bg-red-900/20 p-3 text-sm text-red-200">
          {error}
        </div>
      )}
      <label className="grid gap-2 text-sm text-ivory/70">
        Admin Email
        <input name="email" type="email" required className="min-h-12 border border-ivory/10 bg-ivory/5 px-4 text-base text-ivory focus:border-gold outline-none transition" />
      </label>
      <label className="grid gap-2 text-sm text-ivory/70">
        Admin Password
        <input name="password" required className="min-h-12 border border-ivory/10 bg-ivory/5 px-4 text-base text-ivory focus:border-gold outline-none transition" type="password" />
      </label>
      <button 
        disabled={isPending}
        className="mt-2 inline-flex min-h-12 items-center justify-center bg-gold px-7 text-sm text-ink transition duration-200 ease-premium-out hover:bg-ivory active:scale-[0.98] disabled:opacity-50"
      >
        {isPending ? "Authenticating..." : "Access Desk"}
      </button>
    </form>
  );
}
