"use client";

import { FormEvent, useState } from "react";

type SubmitState = "idle" | "sending" | "success" | "error";

export function NewsletterSubscribeForm() {
  const [state, setState] = useState<SubmitState>("idle");
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "sending") return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = String(formData.get("email") || "").trim();
    const website = String(formData.get("website") || "").trim();

    setState("sending");
    setFeedback("Subscribing...");

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || "We could not subscribe this email right now.");
      }

      setState("success");
      setFeedback("Subscribed. Please check your email for a confirmation message.");
      form.reset();
    } catch (error) {
      setState("error");
      setFeedback(error instanceof Error ? error.message : "We could not subscribe this email right now.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-5 grid gap-3" aria-label="Subscribe for editorial updates">
      <label className="sr-only" htmlFor="newsletter-email">Email address</label>
      <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="Email address"
          className="min-h-12 min-w-0 flex-1 rounded-full border border-hairline/15 bg-white/[0.06] px-4 text-sm text-surface-soft placeholder:text-surface-soft/38 outline-none transition focus:border-primary focus:bg-white/[0.09]"
        />
        <label className="hidden" aria-hidden="true" tabIndex={-1}>
          Website
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
        <button
          type="submit"
          disabled={state === "sending"}
          className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-full bg-primary px-6 text-sm font-bold text-white transition hover:bg-primary-active disabled:cursor-not-allowed disabled:opacity-60"
        >
          {state === "sending" ? "Subscribing..." : "Subscribe"}
        </button>
      </div>
      {feedback ? (
        <p
          aria-live="polite"
          className={`text-xs leading-5 ${
            state === "success" ? "text-surface-soft/72" : state === "error" ? "text-status-danger" : "text-surface-soft/55"
          }`}
        >
          {feedback}
        </p>
      ) : null}
    </form>
  );
}
