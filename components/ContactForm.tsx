"use client";

import Script from "next/script";
import { FormEvent, useEffect, useRef, useState } from "react";
import { SUPPORT_EMAIL } from "@/lib/contact-info";

type ContactFormProps = {
  source?: string;
  defaultName?: string;
  defaultEmail?: string;
  compact?: boolean;
};

type SubmitState = "idle" | "sending" | "success" | "error";

const attachmentAccept = ".doc,.docx,.pdf,.txt,.rtf,.odt,.csv,.xls,.xlsx,.ppt,.pptx,.zip,.png,.jpg,.jpeg,.webp";
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

export function ContactForm({ source = "Contact Form", defaultName = "", defaultEmail = "", compact = false }: ContactFormProps) {
  const [state, setState] = useState<SubmitState>("idle");
  const [feedback, setFeedback] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileRef = useRef<HTMLDivElement>(null);
  const turnstileWidgetId = useRef<string | null>(null);

  function renderTurnstile() {
    if (!turnstileEnabled || !turnstileSiteKey || !turnstileRef.current || !window.turnstile || turnstileWidgetId.current) return;

    turnstileWidgetId.current = window.turnstile.render(turnstileRef.current, {
      sitekey: turnstileSiteKey,
      theme: "light",
      size: "flexible",
      callback: (token) => setTurnstileToken(token),
      "expired-callback": () => setTurnstileToken(""),
      "error-callback": () => {
        setTurnstileToken("");
        setState("error");
        setFeedback("Verification could not be completed. Please refresh the page and try again.");
      },
    });
  }

  useEffect(() => {
    renderTurnstile();
  }, []);

  function resetVerification() {
    setTurnstileToken("");
    if (turnstileWidgetId.current) {
      window.turnstile?.reset(turnstileWidgetId.current);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "sending") return;
    const form = event.currentTarget;
    const formData = new FormData(form);

    if (turnstileEnabled && !turnstileToken) {
      setState("error");
      setFeedback("Please complete the quick verification before sending your message.");
      return;
    }

    setState("sending");
    setFeedback("Sending...");

    try {
      const attachment = formData.get("attachment");
      const hasAttachment = attachment instanceof File && attachment.size > 0;
      const body = hasAttachment
        ? formData
        : JSON.stringify({
            source,
            name: formData.get("name"),
            email: formData.get("email"),
            subject: formData.get("subject"),
            organization: formData.get("organization"),
            service: formData.get("service"),
            wordCount: formData.get("wordCount"),
            turnaround: formData.get("turnaround"),
            message: formData.get("message"),
            website: formData.get("website"),
            turnstileToken,
          });

      if (hasAttachment) {
        formData.set("source", source);
        formData.set("turnstileToken", turnstileToken);
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: hasAttachment ? undefined : { "Content-Type": "application/json" },
        body,
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || `We couldn't send your message right now. Please try again or email ${SUPPORT_EMAIL}.`);
      }

      setState("success");
      setFeedback("Message sent successfully. Our team will get back to you soon.");
      form.reset();
      resetVerification();
    } catch (error) {
      setState("error");
      setFeedback(error instanceof Error ? error.message : `We couldn't send your message right now. Please try again or email ${SUPPORT_EMAIL}.`);
      resetVerification();
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`${compact ? "grid gap-5" : "min-w-0 rounded-2xl border border-hairline bg-canvas p-6 shadow-[0_24px_90px_rgba(17,17,15,0.055)] sm:p-8 lg:p-10"}`}>
      {turnstileEnabled ? (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          strategy="afterInteractive"
          onLoad={renderTurnstile}
        />
      ) : null}

      {!compact ? (
        <>
          <p className="text-xs uppercase tracking-[0.24em] text-primary">Inquiry form</p>
          <h2 className="mt-3 font-display text-3xl leading-tight text-ink">Tell us about your project.</h2>
        </>
      ) : null}

      <div className={`${compact ? "grid gap-5" : "mt-8 grid gap-6"}`}>
        <div className="grid gap-6 sm:grid-cols-2">
          <label className="grid min-w-0 gap-2 text-sm font-medium text-ink">
            Full name *
            <input
              name="name"
              required
              type="text"
              autoComplete="name"
              defaultValue={defaultName}
              placeholder="Your full name"
              className="min-h-12 w-full rounded-xl border border-hairline bg-surface-soft px-4 text-base text-ink placeholder:text-body transition duration-200 ease-premium-out focus:border-primary focus:shadow-[0_0_0_3px_rgba(0,82,255,0.08)]"
            />
          </label>
          <label className="grid min-w-0 gap-2 text-sm font-medium text-ink">
            Email address *
            <input
              name="email"
              required
              type="email"
              autoComplete="email"
              defaultValue={defaultEmail}
              placeholder="you@email.com"
              className="min-h-12 w-full rounded-xl border border-hairline bg-surface-soft px-4 text-base text-ink placeholder:text-body transition duration-200 ease-premium-out focus:border-primary focus:shadow-[0_0_0_3px_rgba(0,82,255,0.08)]"
            />
          </label>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <label className="grid min-w-0 gap-2 text-sm font-medium text-ink">
            Organization / Company
            <input name="organization" type="text" placeholder="Optional" className="min-h-12 w-full rounded-xl border border-hairline bg-surface-soft px-4 text-base text-ink placeholder:text-body transition duration-200 ease-premium-out focus:border-primary focus:shadow-[0_0_0_3px_rgba(0,82,255,0.08)]" />
          </label>
          <label className="grid min-w-0 gap-2 text-sm font-medium text-ink">
            Subject
            <input name="subject" type="text" placeholder={compact ? "Support question" : "Project inquiry"} className="min-h-12 w-full rounded-xl border border-hairline bg-surface-soft px-4 text-base text-ink placeholder:text-body transition duration-200 ease-premium-out focus:border-primary focus:shadow-[0_0_0_3px_rgba(0,82,255,0.08)]" />
          </label>
        </div>

        {!compact ? (
          <>
            <div className="grid gap-6 sm:grid-cols-2">
              <label className="grid min-w-0 gap-2 text-sm font-medium text-ink">
                Service interest
                <select name="service" className="min-h-12 w-full appearance-none rounded-xl border border-hairline bg-surface-soft px-4 text-base text-ink transition duration-200 ease-premium-out focus:border-primary focus:shadow-[0_0_0_3px_rgba(0,82,255,0.08)]">
                  <option value="">Select a service...</option>
                  <option value="Academic Editing">Academic Editing</option>
                  <option value="Business Editing">Business & Corporate Editing</option>
                  <option value="Proofreading">Proofreading</option>
                  <option value="Formatting">Formatting</option>
                  <option value="Translation">Translation</option>
                  <option value="Other">Other Inquiry</option>
                </select>
              </label>
              <label className="grid min-w-0 gap-2 text-sm font-medium text-ink">
                Estimated word count
                <input name="wordCount" type="number" placeholder="e.g. 5000" className="min-h-12 w-full rounded-xl border border-hairline bg-surface-soft px-4 text-base text-ink placeholder:text-body transition duration-200 ease-premium-out focus:border-primary focus:shadow-[0_0_0_3px_rgba(0,82,255,0.08)]" />
              </label>
            </div>

            <label className="grid min-w-0 gap-2 text-sm font-medium text-ink">
              Preferred turnaround
              <select name="turnaround" className="min-h-12 w-full appearance-none rounded-xl border border-hairline bg-surface-soft px-4 text-base text-ink transition duration-200 ease-premium-out focus:border-primary focus:shadow-[0_0_0_3px_rgba(0,82,255,0.08)]">
                <option value="24 to 48 hours">24 to 48 hours</option>
                <option value="3 to 5 days">3 to 5 days</option>
                <option value="7 to 10 days">7 to 10 days</option>
                <option value="10 to 28 days">10 to 28 days</option>
                <option value="Flexible or Not sure">Flexible or Not sure</option>
              </select>
            </label>
          </>
        ) : null}

        <label className="grid min-w-0 gap-2 text-sm font-medium text-ink">
          {compact ? "Support message *" : "Project overview & message *"}
          <textarea
            name="message"
            required
            rows={compact ? 6 : 5}
            placeholder={compact ? "Tell us what you need help with..." : "Please describe your document, target audience, and any specific editorial focus areas..."}
            className="min-h-36 w-full resize-y rounded-xl border border-hairline bg-surface-soft p-4 text-base text-ink placeholder:text-body transition duration-200 ease-premium-out focus:border-primary focus:shadow-[0_0_0_3px_rgba(0,82,255,0.08)]"
          />
        </label>

        <label className="grid min-w-0 gap-2 text-sm font-medium text-ink">
          Attach document <span className="text-xs font-normal text-body">Optional</span>
          <input
            name="attachment"
            type="file"
            accept={attachmentAccept}
            className="min-h-12 w-full rounded-xl border border-hairline bg-surface-soft px-4 py-3 text-sm text-ink file:mr-4 file:rounded-full file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
          />
          <span className="text-xs font-normal leading-5 text-body">
            PDF, Word, text, spreadsheet, presentation, image, or ZIP files up to 25MB.
          </span>
        </label>

        <label className="hidden" aria-hidden="true" tabIndex={-1}>
          Website
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>

        {turnstileEnabled ? (
          <div className="rounded-xl border border-hairline bg-surface-soft/70 p-3">
            <div ref={turnstileRef} className="min-h-[65px]" />
          </div>
        ) : process.env.NODE_ENV === "production" ? (
          <p className="rounded-xl border border-status-warning/25 bg-status-warning-light p-4 text-sm leading-6 text-status-warning">
            Verification is not configured yet. Add the Turnstile site key before accepting public messages.
          </p>
        ) : null}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="submit"
            disabled={state === "sending"}
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-7 text-sm font-medium text-white transition duration-200 ease-premium-out hover:bg-primary-active active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            <span className="inline-flex items-center justify-center gap-2">
              {state === "sending" ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden="true" />
              ) : null}
              {state === "sending" ? "Sending..." : compact ? "Send support message" : "Submit inquiry"}
            </span>
          </button>
          <p className="text-xs text-body">
            {compact ? SUPPORT_EMAIL : "We'll respond within one business day."}
          </p>
        </div>

        {feedback ? (
          <p
            aria-live="polite"
            className={`rounded-xl border p-4 text-sm leading-6 ${
              state === "success"
                ? "border-cta/25 bg-cta-soft text-ink"
                : state === "error"
                  ? "border-status-danger/25 bg-status-danger-light text-status-danger"
                  : "border-primary/20 bg-primary/10 text-primary"
            }`}
          >
            {feedback}
          </p>
        ) : null}
      </div>
    </form>
  );
}
