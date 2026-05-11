"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, Info, Sparkles } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  CUSTOM_REVIEW_MESSAGE,
  SERVICE_OPTIONS,
  TURNAROUND_OPTIONS,
  TURNAROUND_SUPPORT_MESSAGE,
  calculatePrice,
  getNextValidTurnaroundDays,
  getStandardTurnaroundDays,
  getTurnaroundAdjustmentNotice,
  getTurnaroundLimitMessage,
  getValidTurnaroundOptions,
  isCustomReviewRequired,
  isTurnaroundAllowedForWordCount,
  isWritingSupportService,
  validateAutomaticPricing
} from "@/lib/pricing";

const quickCounts = [1000, 2500, 5000, 10000];
const guidanceMessages = [
  "Documents above 50,000 words require a custom review. Contact support for the best timeline and quote.",
  "Your final checkout is confirmed after your uploaded file is reviewed and the word count is verified.",
  "Faster turnaround may increase the estimate depending on your document length.",
  "Longer timelines do not reduce the standard editing price. They simply give editors more room for careful review.",
  "For large or complex documents, our team can recommend the best editing plan before checkout."
];
const turnaroundMilestones = [
  { day: 1, label: "24h" },
  { day: 3, label: "3 days" },
  { day: 7, label: "7 days" },
  { day: 14, label: "14 days" },
  { day: 28, label: "4 weeks" }
];

function currency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2
  }).format(value);
}

function formatTurnaroundLabel(days: number) {
  if (days === 1) return "24 hours";
  if (days === 2) return "48 hours";
  if (days === 28) return "4 weeks";
  return `${days} days`;
}

function getSliderAdjustmentNotice(wordCount: number, requestedDays: number) {
  if (requestedDays < 28 && wordCount > 30000) {
    return "Documents above 30,000 words require a 4-week review window. We’ve adjusted the turnaround for this word count.";
  }
  if (requestedDays === 1 && wordCount > 5000) {
    return "24-hour turnaround is available for documents up to 5,000 words. We’ve selected the nearest available timeline for this word count.";
  }
  if (requestedDays >= 2 && requestedDays < 7 && wordCount > 10000) {
    return "This document length requires a longer review window. We’ve adjusted the turnaround to a suitable timeline.";
  }
  return getTurnaroundAdjustmentNotice(wordCount, requestedDays) || TURNAROUND_SUPPORT_MESSAGE;
}

export function PricingCalculator({ compact = false }: { compact?: boolean }) {
  const [serviceLabel, setServiceLabel] = useState("Editing");
  const [turnaroundDays, setTurnaroundDays] = useState(14);
  const [wordCount, setWordCount] = useState(3500);
  const [notice, setNotice] = useState("");
  const [serviceOpen, setServiceOpen] = useState(false);
  const [guidanceIndex, setGuidanceIndex] = useState(0);
  const serviceSelectorRef = useRef<HTMLDivElement>(null);

  const safeWordCount = Math.max(1, Math.round(Number(wordCount) || 1));
  const selectedService = SERVICE_OPTIONS.find((service) => service.label === serviceLabel) ?? SERVICE_OPTIONS[1];
  const isWritingSupport = isWritingSupportService(selectedService.label);
  const customReviewRequired = !isWritingSupport && isCustomReviewRequired(safeWordCount);
  const validTurnaroundOptions = useMemo(() => getValidTurnaroundOptions(safeWordCount, selectedService.label), [safeWordCount, selectedService.label]);
  const selectedTurnaround = TURNAROUND_OPTIONS.find((turnaround) => turnaround.days === turnaroundDays) ?? TURNAROUND_OPTIONS[13];

  const priceBreakdown = useMemo(() => calculatePrice(safeWordCount, selectedService.label, selectedTurnaround.days), [safeWordCount, selectedService.label, selectedTurnaround.days]);
  const validation = isWritingSupport ? { allowed: true } : validateAutomaticPricing(safeWordCount, selectedTurnaround.days);
  const price = priceBreakdown.finalPrice;
  const standardDays = getStandardTurnaroundDays(safeWordCount);
  const turnaroundProgress = ((Math.min(28, Math.max(1, turnaroundDays)) - 1) / 27) * 100;
  const paceLabel = isWritingSupport
    ? "Fixed package"
    : selectedTurnaround.days < standardDays
      ? "Rush estimate"
      : selectedTurnaround.days === standardDays
        ? "Recommended"
        : "Flexible pace";

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!serviceSelectorRef.current?.contains(event.target as Node)) {
        setServiceOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setServiceOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const timer = window.setInterval(() => {
      setGuidanceIndex((current) => (current + 1) % guidanceMessages.length);
    }, 5600);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isWritingSupport || customReviewRequired) return;
    if (isTurnaroundAllowedForWordCount(safeWordCount, turnaroundDays, selectedService.label)) return;

    const nextDays = getNextValidTurnaroundDays(safeWordCount, turnaroundDays, selectedService.label);
    const nextNotice = getSliderAdjustmentNotice(safeWordCount, turnaroundDays);
    setTurnaroundDays(nextDays);
    if (nextNotice) setNotice(nextNotice);
  }, [customReviewRequired, isWritingSupport, safeWordCount, selectedService.label, turnaroundDays]);

  const handleWordCountChange = (value: number) => {
    const nextCount = Math.max(1, Math.round(Number(value) || 1));
    setWordCount(nextCount);
    if (nextCount > 50000 && wordCount <= 50000) setNotice(CUSTOM_REVIEW_MESSAGE);
    if (nextCount <= 50000 && notice) setNotice("");
  };

  const handleTurnaroundSelect = (days: number) => {
    if (!isTurnaroundAllowedForWordCount(safeWordCount, days, selectedService.label)) {
      const nextDays = getNextValidTurnaroundDays(safeWordCount, days, selectedService.label);
      setTurnaroundDays(nextDays);
      setNotice(getSliderAdjustmentNotice(safeWordCount, days));
      return;
    }
    setTurnaroundDays(days);
    setNotice("");
  };

  return (
    <div className="relative overflow-visible rounded-[1.35rem] border border-hairline bg-canvas shadow-[0_24px_80px_rgba(17,17,15,0.06)]">
      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-primary/55 to-transparent" aria-hidden="true" />
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline px-5 py-4 sm:px-6 lg:px-7">
        <div>
          <p className="text-xs uppercase tracking-[0.26em] text-primary">Live estimate</p>
          <h2 className="mt-1 font-display text-2xl leading-tight text-ink sm:text-3xl">Build your price</h2>
        </div>
        <div className="flex flex-wrap gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-body">
          {["Choose", "Review", "Upload"].map((item, index) => (
            <span key={item} className="rounded-full border border-hairline bg-surface-soft px-3 py-2">
              {index + 1}. {item}
            </span>
          ))}
        </div>
      </div>

      <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_minmax(21rem,0.48fr)]">
        <section className="relative z-20 bg-canvas p-5 sm:p-6 lg:p-7">
          <div className="grid gap-5">
            <div ref={serviceSelectorRef} className="relative">
              <p className="text-xs uppercase tracking-[0.24em] text-primary">Service</p>
              <button
                type="button"
                onClick={() => setServiceOpen((open) => !open)}
                className="mt-3 flex min-h-14 w-full items-center justify-between gap-4 rounded-xl border border-hairline bg-surface-soft px-4 text-left shadow-[0_12px_34px_rgba(17,17,15,0.035)] transition duration-200 ease-premium-out hover:border-primary/45 hover:bg-canvas"
                aria-expanded={serviceOpen}
                aria-haspopup="listbox"
              >
                <span className="min-w-0">
                  <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-body">Select service</span>
                  <span className="mt-1 block truncate text-base font-medium text-ink">{selectedService.label}</span>
                </span>
                <ChevronDown className={`h-5 w-5 shrink-0 text-primary transition duration-200 ${serviceOpen ? "rotate-180" : ""}`} aria-hidden="true" />
              </button>

              <AnimatePresence>
                {serviceOpen ? (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
                    className="absolute left-0 right-0 top-[calc(100%+0.6rem)] z-50 max-h-[24rem] overflow-y-auto rounded-2xl border border-hairline bg-canvas p-2 shadow-[0_26px_90px_rgba(17,17,15,0.14)]"
                    role="listbox"
                  >
                    {SERVICE_OPTIONS.map((service) => {
                      const active = service.label === serviceLabel;

                      return (
                        <button
                          key={service.label}
                          type="button"
                          onClick={() => {
                            setServiceLabel(service.label);
                            setServiceOpen(false);
                            if (service.label === "Writing Support") setNotice("Writing Support is offered as a fixed service package.");
                            else setNotice("");
                          }}
                          className={`grid w-full grid-cols-[1fr_auto] items-center gap-3 rounded-xl px-3 py-2.5 text-left transition duration-200 ease-premium-out hover:bg-surface-soft ${
                            active ? "bg-surface-soft text-ink" : "text-body"
                          }`}
                          aria-selected={active}
                          role="option"
                        >
                          <span>
                            <span className="block text-sm font-semibold text-ink">{service.label}</span>
                            <span className="mt-0.5 block text-xs leading-5 text-body">{service.note}</span>
                          </span>
                          {active ? <Check className="h-4 w-4 text-primary" aria-hidden="true" /> : null}
                        </button>
                      );
                    })}
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>

            <div className="grid gap-5 xl:grid-cols-[0.92fr_1.08fr]">
              <div>
                <label htmlFor="word-count" className="text-xs uppercase tracking-[0.24em] text-primary">
                  Word count
                </label>
                <div className={`mt-3 flex min-h-14 items-center rounded-xl border border-hairline bg-canvas px-4 shadow-[0_12px_34px_rgba(17,17,15,0.035)] ${isWritingSupport ? "opacity-55" : ""}`}>
                  <input
                    id="word-count"
                    type="number"
                    inputMode="numeric"
                    min={1}
                    step={50}
                    value={wordCount}
                    disabled={isWritingSupport}
                    onChange={(event) => handleWordCountChange(Number(event.target.value))}
                    className="w-full bg-transparent font-display text-2xl leading-none text-ink outline-none [appearance:textfield] sm:text-3xl [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  />
                  <span className="text-sm text-body">words</span>
                </div>
                <div className="mt-3 grid grid-cols-4 gap-2">
                  {quickCounts.map((count) => (
                    <button
                      key={count}
                      type="button"
                      onClick={() => handleWordCountChange(count)}
                      disabled={isWritingSupport}
                      className={`min-h-9 rounded-full border px-2 text-xs font-medium transition duration-200 ease-premium-out hover:border-primary hover:text-ink active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-45 ${
                        safeWordCount === count ? "border-primary bg-primary/10 text-ink" : "border-hairline bg-canvas text-body"
                      }`}
                    >
                      {count >= 10000 ? "10k" : `${count / 1000}k`}
                    </button>
                  ))}
                </div>
                {isWritingSupport ? (
                  <p className="mt-3 rounded-xl border border-primary/20 bg-primary/10 p-3 text-xs leading-5 text-primary">
                    Fixed package. Word count does not change this estimate.
                  </p>
                ) : null}
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-primary">Turnaround</p>
                <div className={`mt-3 rounded-xl border border-hairline bg-canvas p-4 shadow-[0_12px_34px_rgba(17,17,15,0.035)] ${isWritingSupport ? "opacity-55" : ""}`}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="block font-display text-3xl leading-none text-ink">{isWritingSupport ? "Fixed" : formatTurnaroundLabel(selectedTurnaround.days)}</span>
                      <span className="mt-2 block text-xs leading-5 text-body">
                        {isWritingSupport ? "Timeline set after review." : `Standard for this word count is ${formatTurnaroundLabel(standardDays)}.`}
                      </span>
                    </div>
                    <span className={`rounded-full border px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] ${
                      selectedTurnaround.days === standardDays && !isWritingSupport
                        ? "border-primary/25 bg-primary/10 text-primary"
                        : "border-hairline bg-surface-soft text-body"
                    }`}>
                      {paceLabel}
                    </span>
                  </div>

                  <div className="mt-5">
                    <input
                      aria-label="Select turnaround from 24 hours to 4 weeks"
                      type="range"
                      min={1}
                      max={28}
                      step={1}
                      value={turnaroundDays}
                      disabled={isWritingSupport || customReviewRequired}
                      onChange={(event) => handleTurnaroundSelect(Number(event.target.value))}
                      title={!isWritingSupport && !customReviewRequired ? getTurnaroundLimitMessage(turnaroundDays) || undefined : undefined}
                      className="h-2 w-full cursor-pointer appearance-none rounded-full bg-hairline outline-none transition disabled:cursor-not-allowed disabled:opacity-50 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:shadow-[0_5px_18px_rgba(23,74,124,0.28)] [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-[0_5px_18px_rgba(23,74,124,0.28)]"
                      style={{
                        background: `linear-gradient(90deg, #174a7c ${turnaroundProgress}%, #dee1e6 ${turnaroundProgress}%)`
                      }}
                    />
                    <div className="mt-3 flex items-center justify-between text-[0.68rem] font-medium text-body">
                      {turnaroundMilestones.map((milestone) => (
                        <button
                          key={milestone.day}
                          type="button"
                          onClick={() => handleTurnaroundSelect(milestone.day)}
                          disabled={isWritingSupport || customReviewRequired}
                          className={`rounded-full px-1.5 py-1 transition duration-200 ease-premium-out hover:text-primary disabled:cursor-not-allowed disabled:opacity-45 ${
                            turnaroundDays === milestone.day ? "bg-primary/10 text-primary" : ""
                          }`}
                        >
                          {milestone.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <p className="mt-3 text-xs leading-5 text-body">
                    {isWritingSupport
                      ? "Writing Support uses a fixed package price."
                      : customReviewRequired
                        ? "A custom review is needed before choosing a timeline."
                        : selectedTurnaround.note}
                  </p>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-hairline bg-surface-soft p-5 shadow-[0_18px_60px_rgba(17,17,15,0.035)]">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent" aria-hidden="true" />
              <div className="grid gap-4 sm:grid-cols-[auto_1fr] sm:items-start">
                <span className="grid h-10 w-10 place-items-center rounded-full border border-primary/20 bg-canvas text-primary">
                  <Info className="h-4 w-4" aria-hidden="true" />
                </span>
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Pricing guidance</p>
                    <span className="inline-flex items-center gap-1 rounded-full border border-hairline bg-canvas px-2.5 py-1 text-[0.68rem] font-medium text-body">
                      <Sparkles className="h-3 w-3 text-primary" aria-hidden="true" />
                      Helpful while you estimate
                    </span>
                  </div>
                  <div className="mt-3 min-h-[3rem] overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={guidanceIndex}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.32, ease: [0.23, 1, 0.32, 1] }}
                        className="max-w-3xl text-sm leading-6 text-body"
                      >
                        {guidanceMessages[guidanceIndex]}
                      </motion.p>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <aside className="relative z-10 border-t border-hairline bg-surface-soft p-5 text-ink shadow-[0_24px_70px_rgba(17,17,15,0.05)] sm:p-6 lg:sticky lg:top-28 lg:self-start lg:border-l lg:border-t-0 lg:p-7">
          <p className="text-xs uppercase tracking-[0.24em] text-primary">Estimated price</p>
          <div className="relative mt-5 border-y border-hairline py-5">
            <div className="min-h-[3.4rem] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={`${selectedService.label}-${selectedTurnaround.days}-${safeWordCount}-${Math.round(price * 100)}`}
                  initial={{ opacity: 0, y: 18, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -18, filter: "blur(4px)" }}
                  transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
                  className="font-display text-[clamp(2.1rem,5vw,3.6rem)] leading-none text-ink tabular-nums"
                >
                  {customReviewRequired ? "Custom review" : currency(price)}
                </motion.p>
              </AnimatePresence>
            </div>
            <p className="mt-3 text-sm leading-6 text-body">
              {isWritingSupport
                ? "Writing Support is offered as a fixed service package."
                : customReviewRequired
                  ? "Your document is above 50,000 words. Please contact support so we can confirm the best timeline and final quote."
                  : `Estimated from ${safeWordCount.toLocaleString()} words for ${selectedService.label.toLowerCase()} with ${selectedTurnaround.label.toLowerCase()} delivery.`}
            </p>
            {notice || customReviewRequired || !validation.allowed ? (
              <div className="mt-4 rounded-xl border border-primary/25 bg-primary/10 p-3 text-sm leading-6 text-primary">
                <p>{customReviewRequired ? CUSTOM_REVIEW_MESSAGE : notice || validation.message}</p>
                {customReviewRequired ? (
                  <Link href="/contact" className="mt-3 inline-flex min-h-10 items-center justify-center rounded-full border border-primary/35 px-4 text-xs font-semibold uppercase tracking-[0.14em] text-primary transition hover:bg-primary hover:text-white">
                    Request Custom Quote
                  </Link>
                ) : null}
              </div>
            ) : null}
          </div>

          <div className="mt-5 grid gap-3 text-sm text-body">
            {[
              ["Service", selectedService.label],
              ["Word count", isWritingSupport ? "Not required for fixed package" : safeWordCount.toLocaleString()],
              ["Turnaround", isWritingSupport ? "Custom service package" : selectedTurnaround.label],
              ["Payment step", "Secure checkout after upload"]
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between gap-6 border-b border-hairline pb-2.5">
                <span>{label}</span>
                <span className="text-right text-ink">{value}</span>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-xl border border-hairline bg-canvas p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-primary">Next step</p>
            <p className="mt-2 text-sm leading-6 text-body">
              {customReviewRequired
                ? "For documents above 50,000 words, our team will confirm timeline and pricing before checkout."
                : "Upload your file so we can verify the word count before checkout."}
            </p>
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            {customReviewRequired ? (
              <Link href="/contact" className="inline-flex min-h-12 items-center justify-center bg-primary rounded-full px-6 text-sm font-medium text-white transition duration-200 ease-premium-out hover:bg-primary-active active:scale-[0.98]">
                Contact Support
              </Link>
            ) : (
              <Link href="/login" className="inline-flex min-h-12 items-center justify-center bg-primary rounded-full px-6 text-sm font-medium text-white transition duration-200 ease-premium-out hover:bg-primary-active active:scale-[0.98]">
                Start Secure Upload
              </Link>
            )}
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
