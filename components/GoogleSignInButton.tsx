"use client";

import { useState, useTransition } from "react";
import { signInWithGoogle } from "@/app/actions/auth";

type GoogleSignInButtonProps = {
  nextPath?: string;
  label?: string;
  className?: string;
  compact?: boolean;
  onError?: (message: string) => void;
};

export function GoogleSignInButton({
  nextPath = "/dashboard",
  label = "Continue with Google",
  className = "",
  compact = false,
  onError,
}: GoogleSignInButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [localError, setLocalError] = useState<string | null>(null);

  const handleGoogleSignIn = () => {
    setLocalError(null);
    onError?.("");

    startTransition(async () => {
      try {
        const result = await signInWithGoogle(nextPath);
        if (result?.error) {
          setLocalError(result.error);
          onError?.(result.error);
          return;
        }
        if (result?.url) {
          window.location.assign(result.url);
        }
      } catch {
        const fallbackMsg = "Unable to connect to Google Sign-In. Please try again or use your email.";
        setLocalError(fallbackMsg);
        onError?.(fallbackMsg);
      }
    });
  };

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={isPending}
        className={`inline-flex ${
          compact ? "min-h-11 px-5 text-xs" : "min-h-12 px-6 text-sm"
        } w-full items-center justify-center gap-3 rounded-full border border-hairline bg-white font-semibold text-ink shadow-sm transition duration-200 ease-premium-out hover:border-primary hover:bg-surface-soft hover:text-primary active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      >
        {isPending ? (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary/30 border-t-primary" aria-hidden="true" />
        ) : (
          <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.79-.07-1.54-.19-2.27h-11.3v4.51h6.47c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.54-5.17 3.54-8.97z"
            />
            <path
              fill="#34A853"
              d="M12.255 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96h-4.01v3.14C3.515 21.3 7.565 24 12.255 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.535 14.24c-.24-.72-.38-1.49-.38-2.24s.14-1.52.38-2.24V6.62h-4.01a11.996 11.996 0 0 0 0 10.76l4.01-3.14z"
            />
            <path
              fill="#EA4335"
              d="M12.255 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C18.205 1.19 15.495 0 12.255 0 7.565 0 3.515 2.7 1.525 6.62l4.01 3.14c.95-2.85 3.6-4.96 6.72-4.96z"
            />
          </svg>
        )}
        <span>{isPending ? "Connecting to Google..." : label}</span>
      </button>
      {localError && !onError ? (
        <p className="mt-2 text-xs text-red-700" role="alert">
          {localError}
        </p>
      ) : null}
    </div>
  );
}
