"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useMemo, useState } from "react";
import { SERVICE_OPTIONS, TURNAROUND_OPTIONS, calculatePrice, validateAutomaticPricing } from "@/lib/pricing";

const quickCounts = [1000, 2500, 5000, 10000];

function currency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2
  }).format(value);
}

export function PricingCalculator({ compact = false }: { compact?: boolean }) {
  const [serviceLabel, setServiceLabel] = useState("Editing");
  const [turnaroundDays, setTurnaroundDays] = useState(14);
  const [wordCount, setWordCount] = useState(3500);

  const safeWordCount = Math.max(1, Math.min(60000, wordCount || 1));
  const selectedService = SERVICE_OPTIONS.find((service) => service.label === serviceLabel) ?? SERVICE_OPTIONS[1];
  const selectedTurnaround = TURNAROUND_OPTIONS.find((turnaround) => turnaround.days === turnaroundDays) ?? TURNAROUND_OPTIONS[13];

  const priceBreakdown = useMemo(() => calculatePrice(safeWordCount, selectedService.label, selectedTurnaround.days), [safeWordCount, selectedService.label, selectedTurnaround.days]);
  const validation = validateAutomaticPricing(safeWordCount, selectedTurnaround.days);
  const price = priceBreakdown.finalPrice;

  return (
    <div className="relative overflow-hidden border border-hairline bg-canvas shadow-[0_24px_80px_rgba(17,17,15,0.06)] rounded-2xl">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/55 to-transparent" aria-hidden="true" />
      <div className="grid border-b border-hairline text-xs uppercase tracking-[0.24em] text-body sm:grid-cols-3">
        {["Estimate", "Review", "Upload"].map((item, index) => (
          <div key={item} className="flex min-h-14 items-center gap-4 border-b border-hairline px-5 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
            <span className="font-display text-2xl text-primary/55">{String(index + 1).padStart(2, "0")}</span>
            <span>{item}</span>
          </div>
        ))}
      </div>

      <div className="grid gap-0 lg:grid-cols-[1.12fr_0.88fr]">
        <section className="relative bg-canvas p-5 sm:p-7 lg:p-8">
          <div className="absolute right-8 top-8 hidden h-20 w-20 border border-primary/16 lg:block" aria-hidden="true" />
          <div className="relative">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-primary">Service type</p>
                <h3 className="mt-3 max-w-xl font-display text-[clamp(1.95rem,4vw,3.2rem)] leading-[1.04] text-ink">
                  Compose a live estimate.
                </h3>
              </div>
              <span className="w-fit border-y border-hairline py-3 text-xs uppercase tracking-[0.2em] text-body">
                Updates instantly
              </span>
            </div>

            <div className="mt-7 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
              {SERVICE_OPTIONS.map((service) => {
                const active = service.label === serviceLabel;

                return (
                  <button
                    key={service.label}
                    type="button"
                    onClick={() => setServiceLabel(service.label)}
                    className={`group min-h-20 border px-4 py-4 text-left transition duration-200 ease-premium-out active:scale-[0.99] rounded-xl ${
                      active ? "border-primary bg-surface-soft text-ink shadow-[0_16px_50px_rgba(0,82,255,0.10)]" : "border-hairline bg-surface-soft/60 text-body hover:border-primary/55 hover:bg-surface-soft hover:text-ink"
                    }`}
                    aria-pressed={active}
                  >
                    <span className="flex items-center justify-between gap-4">
                      <span className="text-sm font-medium">{service.label}</span>
                      <span className={`h-px w-8 transition duration-200 ease-premium-out ${active ? "bg-primary" : "bg-hairline group-hover:bg-primary/60"}`} />
                    </span>
                    <span className="mt-3 block text-xs leading-5 text-body">{service.note}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 grid gap-7 xl:grid-cols-[0.92fr_1.08fr]">
              <div>
                <label htmlFor="word-count" className="text-xs uppercase tracking-[0.28em] text-primary">
                  Word count
                </label>
                <div className="mt-4 flex min-h-16 items-center border border-hairline bg-canvas px-4 shadow-[0_14px_50px_rgba(17,17,15,0.035)] rounded-xl">
                  <input
                    id="word-count"
                    type="number"
                    inputMode="numeric"
                  min={250}
                    max={60000}
                    step={50}
                    value={wordCount}
                    onChange={(event) => setWordCount(Math.min(60000, Math.max(1, Number(event.target.value) || 1)))}
                    className="w-full bg-transparent font-display text-3xl leading-none text-ink outline-none [appearance:textfield] sm:text-4xl [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  />
                  <span className="text-sm text-body">words</span>
                </div>
                <input
                  aria-label="Adjust word count"
                  type="range"
                  min={250}
                  max={50000}
                  step={250}
                  value={Math.min(safeWordCount, 50000)}
                  onChange={(event) => setWordCount(Number(event.target.value))}
                  className="mt-4 w-full accent-[#0052ff]"
                />
                <div className="mt-3 grid grid-cols-4 gap-2">
                  {quickCounts.map((count) => (
                    <button
                      key={count}
                      type="button"
                      onClick={() => setWordCount(count)}
                      className={`min-h-10 border px-2 text-xs transition duration-200 ease-premium-out hover:border-primary hover:text-ink active:scale-[0.98] rounded-lg ${
                        safeWordCount === count ? "border-primary bg-primary/10 text-ink" : "border-hairline bg-canvas text-body"
                      }`}
                    >
                      {count >= 10000 ? "10k" : `${count / 1000}k`}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-primary">Turnaround</p>
                <div className="mt-4 border border-hairline bg-canvas p-4 rounded-xl">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-medium text-ink">{selectedTurnaround.label}</span>
                    <span className="text-xs uppercase tracking-[0.18em] text-body">{selectedTurnaround.multiplier > 1 ? "Timeline premium" : selectedTurnaround.multiplier < 1 ? "Flexible timeline" : "Standard"}</span>
                  </div>
                  <input
                    aria-label="Adjust turnaround"
                    type="range"
                    min={1}
                    max={28}
                    step={1}
                    value={turnaroundDays}
                    onChange={(event) => setTurnaroundDays(Number(event.target.value))}
                    className="mt-5 w-full accent-[#0052ff]"
                  />
                  <div className="mt-3 grid grid-cols-4 gap-2">
                    {[1, 2, 3, 7, 14, 28].map((days) => {
                      const option = TURNAROUND_OPTIONS.find((item) => item.days === days)!;
                      return (
                        <button
                          key={days}
                          type="button"
                          onClick={() => setTurnaroundDays(days)}
                          className={`min-h-10 border px-2 text-xs transition duration-200 ease-premium-out hover:border-primary hover:text-ink active:scale-[0.98] rounded-lg ${
                            turnaroundDays === days ? "border-primary bg-primary/10 text-ink" : "border-hairline bg-canvas text-body"
                          }`}
                        >
                          {option.label.replace(" / 28 days", "")}
                        </button>
                      );
                    })}
                  </div>
                  <p className="mt-3 text-xs leading-5 text-body">{selectedTurnaround.note} Maximum automatic timeline is 4 weeks / 28 days.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <aside className="relative overflow-hidden border-t border-hairline bg-surface-soft p-6 text-ink shadow-[0_24px_70px_rgba(17,17,15,0.06)] sm:p-8 lg:border-l lg:border-t-0 lg:p-9 rounded-br-2xl">
          <div className="absolute right-0 top-0 h-40 w-40 border-b border-l border-primary/12" aria-hidden="true" />
          <p className="text-xs uppercase tracking-[0.28em] text-primary">Estimated order</p>
          <div className="relative mt-8 border-y border-hairline py-8">
            <div className="min-h-[5.7rem] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={`${selectedService.label}-${selectedTurnaround.days}-${safeWordCount}-${Math.round(price * 100)}`}
                  initial={{ opacity: 0, y: 18, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -18, filter: "blur(4px)" }}
                  transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
                  className="font-display text-[clamp(2.2rem,7vw,5.1rem)] leading-none text-ink tabular-nums"
                >
                  {currency(price)}
                </motion.p>
              </AnimatePresence>
            </div>
            <p className="mt-4 text-sm leading-6 text-body">
              Estimated from {safeWordCount.toLocaleString()} words for {selectedService.label.toLowerCase()} with {selectedTurnaround.label.toLowerCase()} delivery.
            </p>
            {!validation.allowed ? (
              <p className="mt-4 border border-primary/25 bg-primary/10 p-3 text-sm leading-6 text-primary rounded-lg">{validation.message}</p>
            ) : null}
          </div>

          <div className="mt-7 grid gap-4 text-sm text-body">
            {[
              ["Service", selectedService.label],
              ["Word count", safeWordCount.toLocaleString()],
              ["Turnaround", selectedTurnaround.label],
              ["Payment step", "Secure checkout after upload"]
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between gap-6 border-b border-hairline pb-3">
                <span>{label}</span>
                <span className="text-right text-ink">{value}</span>
              </div>
            ))}
          </div>

          <div className="mt-7 border border-hairline bg-canvas p-4 rounded-xl">
            <p className="text-xs uppercase tracking-[0.24em] text-primary">Next step</p>
            <p className="mt-3 text-sm leading-6 text-body">
              Upload your supported file to confirm the word count. Payment is recorded only after server-side verification.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <Link href="/login" className="inline-flex min-h-12 items-center justify-center bg-primary rounded-full px-6 text-sm font-medium text-white transition duration-200 ease-premium-out hover:bg-primary-active active:scale-[0.98]">
              Start priced upload
            </Link>
            {!compact ? (
              <Link href="/pricing" className="inline-flex min-h-12 items-center justify-center border border-hairline rounded-full px-6 text-sm font-medium text-ink transition duration-200 ease-premium-out hover:border-primary hover:text-primary active:scale-[0.98]">
                Pricing details
              </Link>
            ) : null}
          </div>
        </aside>
      </div>
    </div>
  );
}
