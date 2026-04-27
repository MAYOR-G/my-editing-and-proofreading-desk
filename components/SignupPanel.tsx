"use client";

import { useTransition, useState } from "react";
import { signup } from "@/app/actions/auth";
import Link from "next/link";

function getPasswordStrength(password: string): { level: number; label: string; color: string } {
  if (!password) return { level: 0, label: "", color: "" };
  let score = 0;
  if (password.length >= 6) score++;
  if (password.length >= 10) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { level: 1, label: "Weak", color: "bg-status-danger" };
  if (score <= 2) return { level: 2, label: "Fair", color: "bg-status-warning" };
  if (score <= 3) return { level: 3, label: "Good", color: "bg-status-info" };
  return { level: 4, label: "Strong", color: "bg-status-success" };
}

export function SignupPanel() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [password, setPassword] = useState("");

  const strength = getPasswordStrength(password);

  const submit = (formData: FormData) => {
    setError(null);
    setSuccess(null);
    startTransition(async () => {
      const result = await signup(formData);
      if (result?.error) {
        setError(result.error);
      } else if (result?.success) {
        setSuccess(result.message || "Success");
      }
    });
  };

  return (
    <form action={submit} className="grid gap-5 border border-ink/10 bg-paper p-6 shadow-[0_24px_80px_rgba(17,17,15,0.055)] sm:p-8">
      <div>
        <p className="text-xs uppercase tracking-[0.28em] text-gold-deep">Create account</p>
        <h2 className="mt-3 font-display text-3xl leading-tight text-ink">Set up your editorial workspace.</h2>
      </div>

      {error && (
        <div className="flex items-start gap-3 border border-red-900/20 bg-red-50 p-3 text-sm text-red-800">
          <svg viewBox="0 0 20 20" className="mt-0.5 h-4 w-4 shrink-0 text-red-600" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </div>
      )}
      {success && (
        <div className="border border-green-900/20 bg-green-50 p-5 text-center">
          <svg className="mx-auto h-8 w-8 text-status-success mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <p className="text-base font-medium text-green-900 mb-1">Verify your email</p>
          <p className="text-sm text-green-800">{success}</p>
        </div>
      )}
      
      {!success && (
        <>
          <label className="grid gap-2 text-sm text-charcoal/70">
            Full name
            <input 
              name="full_name" 
              required 
              type="text" 
              autoComplete="name"
              placeholder="Your full name"
              className="min-h-12 border border-ink/10 bg-ivory px-4 text-base text-ink placeholder:text-charcoal/30 transition duration-200 ease-premium-out focus:border-gold focus:shadow-[0_0_0_3px_rgba(176,138,60,0.08)]" 
            />
          </label>
          <label className="grid gap-2 text-sm text-charcoal/70">
            Email
            <input 
              name="email" 
              required 
              type="email" 
              autoComplete="email"
              placeholder="your@email.com"
              className="min-h-12 border border-ink/10 bg-ivory px-4 text-base text-ink placeholder:text-charcoal/30 transition duration-200 ease-premium-out focus:border-gold focus:shadow-[0_0_0_3px_rgba(176,138,60,0.08)]" 
            />
          </label>
          <label className="grid gap-2 text-sm text-charcoal/70">
            Password
            <input 
              name="password" 
              required 
              type="password" 
              autoComplete="new-password" 
              minLength={6}
              placeholder="Minimum 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="min-h-12 border border-ink/10 bg-ivory px-4 text-base text-ink placeholder:text-charcoal/30 transition duration-200 ease-premium-out focus:border-gold focus:shadow-[0_0_0_3px_rgba(176,138,60,0.08)]" 
            />
            {/* Password strength indicator */}
            {password && (
              <div className="flex items-center gap-3">
                <div className="flex flex-1 gap-1">
                  {[1, 2, 3, 4].map((level) => (
                    <div
                      key={level}
                      className={`h-1 flex-1 transition-all duration-300 ${
                        level <= strength.level ? strength.color : "bg-ink/10"
                      }`}
                    />
                  ))}
                </div>
                <span className={`text-xs ${
                  strength.level <= 1 ? "text-status-danger" : 
                  strength.level <= 2 ? "text-status-warning" : 
                  strength.level <= 3 ? "text-status-info" : "text-status-success"
                }`}>
                  {strength.label}
                </span>
              </div>
            )}
          </label>

          <button 
            disabled={isPending}
            className="mt-2 inline-flex min-h-12 w-full items-center justify-center bg-ink px-7 text-sm text-ivory transition duration-200 ease-premium-out hover:bg-gold-deep active:scale-[0.98] disabled:opacity-50"
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                <span className="h-3.5 w-3.5 animate-spin rounded-full border border-ivory/30 border-t-ivory" />
                Creating account...
              </span>
            ) : (
              "Sign up"
            )}
          </button>

          <p className="text-center text-sm text-charcoal/50">
            Already have an account? <Link href="/login" className="text-gold-deep transition hover:text-ink">Log in</Link>
          </p>
        </>
      )}
    </form>
  );
}
