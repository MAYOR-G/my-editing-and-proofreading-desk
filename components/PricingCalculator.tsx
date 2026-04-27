"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useMemo, useState } from "react";

const services = [
  { id: "proofreading", label: "Proofreading", rate: 0.018, note: "Grammar, spelling, punctuation, consistency." },
  { id: "editing", label: "Editing", rate: 0.032, note: "Clarity, flow, structure, tone, sentence polish." },
  { id: "transcribing", label: "Transcribing", rate: 0.026, note: "Clean transcript preparation from supplied material." },
  { id: "formatting", label: "Formatting", rate: 0.014, note: "Headings, spacing, references, document presentation." },
  { id: "translation", label: "Translation", rate: 0.048, note: "Meaning-sensitive translation with editorial polish." },
  { id: "writing-support", label: "Writing support", rate: 0.055, note: "Developmental guidance, reframing, and draft shaping." }
];

const turnarounds = [
  { id: "7", label: "7 days", multiplier: 1.35, note: "Priority handling for near deadlines." },
  { id: "14", label: "14 days", multiplier: 1.0, note: "Balanced pace for careful editorial work." },
  { id: "28", label: "4 weeks", multiplier: 0.82, note: "Best value for flexible timelines." }
];

const quickCounts = [1000, 2500, 5000, 10000];

function currency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2
  }).format(value);
}

export function PricingCalculator({ compact = false }: { compact?: boolean }) {
  const [serviceId, setServiceId] = useState("editing");
  const [turnaroundId, setTurnaroundId] = useState("14");
  const [wordCount, setWordCount] = useState(3500);

  const safeWordCount = Math.min(50000, Math.max(250, wordCount || 250));
  const selectedService = services.find((service) => service.id === serviceId) ?? services[1];
  const selectedTurnaround = turnarounds.find((turnaround) => turnaround.id === turnaroundId) ?? turnarounds[1];

  const price = useMemo(() => {
    const subtotal = safeWordCount * selectedService.rate * selectedTurnaround.multiplier;
    return Math.max(35, subtotal);
  }, [selectedService.rate, selectedTurnaround.multiplier, safeWordCount]);

  const pricePerWord = selectedService.rate * selectedTurnaround.multiplier;

  return (
    <div className="relative overflow-hidden border border-ink/10 bg-ivory shadow-[0_32px_110px_rgba(17,17,15,0.075)]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/55 to-transparent" aria-hidden="true" />
      <div className="grid border-b border-ink/10 text-xs uppercase tracking-[0.24em] text-charcoal/46 sm:grid-cols-3">
        {["Estimate", "Review", "Upload"].map((item, index) => (
          <div key={item} className="flex min-h-14 items-center gap-4 border-b border-ink/10 px-5 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
            <span className="font-display text-2xl text-gold-deep/55">{String(index + 1).padStart(2, "0")}</span>
            <span>{item}</span>
          </div>
        ))}
      </div>

      <div className="grid gap-0 lg:grid-cols-[1.12fr_0.88fr]">
        <section className="relative bg-paper/55 p-5 sm:p-7 lg:p-9">
          <div className="absolute right-8 top-8 hidden h-24 w-24 border border-gold/20 lg:block" aria-hidden="true" />
          <div className="relative">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-gold-deep">Service type</p>
                <h3 className="mt-3 max-w-xl font-display text-[clamp(2.15rem,5vw,4rem)] leading-none text-ink">
                  Compose a live estimate.
                </h3>
              </div>
              <span className="w-fit border-y border-ink/10 py-3 text-xs uppercase tracking-[0.2em] text-charcoal/48">
                Updates instantly
              </span>
            </div>

            <div className="mt-8 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
              {services.map((service) => {
                const active = service.id === serviceId;

                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => setServiceId(service.id)}
                    className={`group min-h-24 border px-4 py-4 text-left transition duration-200 ease-premium-out active:scale-[0.99] ${
                      active ? "border-gold bg-ivory text-ink shadow-[0_16px_50px_rgba(176,138,60,0.10)]" : "border-ink/10 bg-ivory/62 text-charcoal/68 hover:border-gold/55 hover:bg-ivory hover:text-ink"
                    }`}
                    aria-pressed={active}
                  >
                    <span className="flex items-center justify-between gap-4">
                      <span className="text-sm font-medium">{service.label}</span>
                      <span className={`h-px w-8 transition duration-200 ease-premium-out ${active ? "bg-gold" : "bg-ink/12 group-hover:bg-gold/60"}`} />
                    </span>
                    <span className="mt-3 block text-xs leading-5 text-charcoal/54">{service.note}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-9 grid gap-7 xl:grid-cols-[0.92fr_1.08fr]">
              <div>
                <label htmlFor="word-count" className="text-xs uppercase tracking-[0.28em] text-gold-deep">
                  Word count
                </label>
                <div className="mt-4 flex min-h-16 items-center border border-ink/10 bg-ivory px-4 shadow-[0_14px_50px_rgba(17,17,15,0.035)]">
                  <input
                    id="word-count"
                    type="number"
                    inputMode="numeric"
                    min={250}
                    max={50000}
                    step={50}
                    value={wordCount}
                    onChange={(event) => setWordCount(Math.min(50000, Math.max(250, Number(event.target.value) || 250)))}
                    className="w-full bg-transparent font-display text-4xl leading-none text-ink outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  />
                  <span className="text-sm text-charcoal/50">words</span>
                </div>
                <input
                  aria-label="Adjust word count"
                  type="range"
                  min={250}
                  max={20000}
                  step={250}
                  value={Math.min(safeWordCount, 20000)}
                  onChange={(event) => setWordCount(Number(event.target.value))}
                  className="mt-4 w-full accent-[#7b6026]"
                />
                <div className="mt-3 grid grid-cols-4 gap-2">
                  {quickCounts.map((count) => (
                    <button
                      key={count}
                      type="button"
                      onClick={() => setWordCount(count)}
                      className={`min-h-10 border px-2 text-xs transition duration-200 ease-premium-out hover:border-gold hover:text-ink active:scale-[0.98] ${
                        safeWordCount === count ? "border-gold bg-gold/10 text-ink" : "border-ink/10 bg-ivory text-charcoal/66"
                      }`}
                    >
                      {count >= 10000 ? "10k" : `${count / 1000}k`}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-gold-deep">Turnaround</p>
                <div className="mt-4 grid gap-2">
                  {turnarounds.map((turnaround) => {
                    const active = turnaround.id === turnaroundId;

                    return (
                      <button
                        key={turnaround.id}
                        type="button"
                        onClick={() => setTurnaroundId(turnaround.id)}
                        className={`grid min-h-16 grid-cols-[auto_1fr_auto] items-center gap-x-4 border px-4 text-left transition duration-200 ease-premium-out active:scale-[0.99] ${
                          active ? "border-gold bg-ivory text-ink shadow-[0_16px_50px_rgba(176,138,60,0.08)]" : "border-ink/10 bg-ivory/62 text-charcoal/68 hover:border-gold/55 hover:bg-ivory hover:text-ink"
                        }`}
                        aria-pressed={active}
                      >
                        <span className={`h-2.5 w-2.5 ${active ? "bg-gold-deep" : "bg-ink/18"}`} />
                        <span>
                          <span className="block text-sm font-medium">{turnaround.label}</span>
                          <span className="mt-1 block text-xs text-charcoal/54">{turnaround.note}</span>
                        </span>
                        <span className="hidden text-xs text-charcoal/45 sm:block">{turnaround.multiplier > 1 ? "Priority" : turnaround.multiplier < 1 ? "Value" : "Standard"}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        <aside className="relative overflow-hidden bg-ink p-6 text-ivory shadow-[0_28px_90px_rgba(17,17,15,0.18)] sm:p-8 lg:p-10">
          <div className="absolute right-0 top-0 h-40 w-40 border-b border-l border-gold/18" aria-hidden="true" />
          <p className="text-xs uppercase tracking-[0.28em] text-gold">Estimated order</p>
          <div className="relative mt-8 border-y border-ivory/12 py-8">
            <div className="min-h-[5.7rem] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={`${selectedService.id}-${selectedTurnaround.id}-${safeWordCount}-${Math.round(price * 100)}`}
                  initial={{ opacity: 0, y: 18, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -18, filter: "blur(4px)" }}
                  transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
                  className="font-display text-[clamp(2.25rem,9vw,6.9rem)] leading-none text-ivory tabular-nums"
                >
                  {currency(price)}
                </motion.p>
              </AnimatePresence>
            </div>
            <p className="mt-4 text-sm leading-6 text-ivory/58">
              Estimated from {safeWordCount.toLocaleString()} words at {currency(pricePerWord)} per word, adjusted for {selectedTurnaround.label.toLowerCase()} delivery.
            </p>
          </div>

          <div className="mt-7 grid gap-4 text-sm text-ivory/68">
            {[
              ["Service", selectedService.label],
              ["Word count", safeWordCount.toLocaleString()],
              ["Turnaround", selectedTurnaround.label],
              ["Minimum order", "$35.00"],
              ["Payment step", "Secure checkout after upload"]
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between gap-6 border-b border-ivory/10 pb-3">
                <span>{label}</span>
                <span className="text-right text-ivory">{value}</span>
              </div>
            ))}
          </div>

          <div className="mt-7 border border-ivory/12 bg-ivory/[0.055] p-4">
            <p className="text-xs uppercase tracking-[0.24em] text-gold">Next step</p>
            <p className="mt-3 text-sm leading-6 text-ivory/62">
              Upload your supported file to confirm the word count. Payment is recorded only after server-side verification via Paystack or Flutterwave.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <Link href="/login" className="inline-flex min-h-12 items-center justify-center bg-gold px-6 text-sm text-ink transition duration-200 ease-premium-out hover:bg-ivory active:scale-[0.98]">
              Start priced upload
            </Link>
            {!compact ? (
              <Link href="/pricing" className="inline-flex min-h-12 items-center justify-center border border-ivory/16 px-6 text-sm text-ivory transition duration-200 ease-premium-out hover:border-gold hover:text-gold active:scale-[0.98]">
                Pricing details
              </Link>
            ) : null}
          </div>
        </aside>
      </div>
    </div>
  );
}
