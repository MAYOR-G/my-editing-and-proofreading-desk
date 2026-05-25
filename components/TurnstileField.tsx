"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const turnstileEnabled = Boolean(turnstileSiteKey) && process.env.NODE_ENV === "production";

declare global {
  interface Window {
    turnstile?: {
      render: (
        element: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback": () => void;
          "error-callback": () => void;
          theme?: "light" | "dark" | "auto";
          size?: "normal" | "compact" | "flexible";
        }
      ) => string;
      reset: (widgetId?: string) => void;
    };
  }
}

type TurnstileFieldProps = {
  token: string;
  onTokenChange: (token: string) => void;
  onError?: (message: string) => void;
  theme?: "light" | "dark" | "auto";
  className?: string;
};

export function isClientTurnstileEnabled() {
  return turnstileEnabled;
}

export function TurnstileField({ token, onTokenChange, onError, theme = "light", className }: TurnstileFieldProps) {
  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [ready, setReady] = useState(false);

  function renderTurnstile() {
    if (!turnstileEnabled || !turnstileSiteKey || !turnstileRef.current || !window.turnstile || widgetIdRef.current) return;

    widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
      sitekey: turnstileSiteKey,
      theme,
      size: "flexible",
      callback: onTokenChange,
      "expired-callback": () => onTokenChange(""),
      "error-callback": () => {
        onTokenChange("");
        onError?.("Security verification failed. Please try again.");
      },
    });
    setReady(true);
  }

  useEffect(() => {
    renderTurnstile();
  }, []);

  useEffect(() => {
    if (!token && widgetIdRef.current) {
      window.turnstile?.reset(widgetIdRef.current);
    }
  }, [token]);

  if (!turnstileEnabled) return null;

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onLoad={renderTurnstile}
      />
      <input type="hidden" name="turnstileToken" value={token} />
      <div className={className || "rounded-xl border border-hairline bg-surface-soft/70 p-3"}>
        <div ref={turnstileRef} className="min-h-[65px]" />
        {!ready ? <p className="mt-2 text-xs text-charcoal/55">Loading security check...</p> : null}
      </div>
    </>
  );
}
