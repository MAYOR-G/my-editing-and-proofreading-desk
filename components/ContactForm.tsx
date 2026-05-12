"use client";

import { FormEvent, useState } from "react";
import { SUPPORT_EMAIL } from "@/lib/contact-info";

type ContactFormProps = {
  source?: string;
  defaultName?: string;
  defaultEmail?: string;
  compact?: boolean;
};

type SubmitState = "idle" | "sending" | "success" | "error";

export function ContactForm({ source = "Contact Form", defaultName = "", defaultEmail = "", compact = false }: ContactFormProps) {
  const [state, setState] = useState<SubmitState>("idle");
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setState("sending");
    setFeedback("Sending...");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source,
          name: formData.get("name"),
          email: formData.get("email"),
          subject: formData.get("subject"),
          organization: formData.get("organization"),
          service: formData.get("service"),
          wordCount: formData.get("wordCount"),
          turnaround: formData.get("turnaround"),
          message: formData.get("message"),
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || `We couldn't send your message right now. Please try again or email ${SUPPORT_EMAIL}.`);
      }

      setState("success");
      setFeedback("Message sent successfully. Our team will get back to you soon.");
      form.reset();
    } catch (error) {
      setState("error");
      setFeedback(error instanceof Error ? error.message : `We couldn't send your message right now. Please try again or email ${SUPPORT_EMAIL}.`);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`${compact ? "grid gap-5" : "min-w-0 rounded-2xl border border-hairline bg-canvas p-6 shadow-[0_24px_90px_rgba(17,17,15,0.055)] sm:p-8 lg:p-10"}`}>
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

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <button
            disabled={state === "sending"}
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-7 text-sm font-medium text-white transition duration-200 ease-premium-out hover:bg-primary-active active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {state === "sending" ? "Sending..." : compact ? "Send support message" : "Submit inquiry"}
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
