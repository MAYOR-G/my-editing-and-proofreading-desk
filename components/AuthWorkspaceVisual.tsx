"use client";

import { motion } from "framer-motion";

const documentPages = [
  { label: "Draft", status: "editing", lines: 6 },
  { label: "Reviewed", status: "review", lines: 5 },
  { label: "Final", status: "complete", lines: 7 }
];

const floatingTags = ["Clarity", "Tone", "Structure", "Grammar", "Flow"];

export function AuthWorkspaceVisual() {
  return (
    <div className="relative min-h-[28rem] overflow-hidden border border-ink/10 bg-paper/60 p-5 shadow-[0_30px_100px_rgba(17,17,15,0.06)]">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "linear-gradient(rgba(17,17,15,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(17,17,15,0.15) 1px, transparent 1px)",
          backgroundSize: "48px 48px"
        }}
        aria-hidden="true"
      />
      {/* Gold radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_35%,rgba(176,138,60,0.10),transparent_45%)]" aria-hidden="true" />

      {/* Floating document stack */}
      <div className="relative mx-auto mt-8 h-[22rem] max-w-[22rem] [perspective:900px]">
        {documentPages.map((page, index) => (
          <motion.div
            key={page.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
              rotateX: 4,
              rotateZ: (index - 1) * 3.5,
              x: (index - 1) * 16,
              translateY: index * 12
            }}
            transition={{
              delay: 0.3 + index * 0.15,
              duration: 0.8,
              ease: [0.23, 1, 0.32, 1]
            }}
            className="absolute inset-x-4 top-6 border border-ink/10 bg-ivory p-5 shadow-[0_18px_60px_rgba(17,17,15,0.07)]"
            style={{ zIndex: 10 - index }}
          >
            <div className="flex items-center justify-between border-b border-ink/10 pb-3">
              <span className="text-[0.65rem] uppercase tracking-[0.24em] text-charcoal/42">
                {page.label}
              </span>
              <span
                className={`h-2 w-2 rounded-full ${
                  page.status === "complete"
                    ? "bg-status-success"
                    : page.status === "review"
                      ? "bg-status-warning"
                      : "bg-gold/60"
                }`}
              />
            </div>
            <div className="mt-4 grid gap-[5px]">
              {Array.from({ length: page.lines }).map((_, lineIndex) => {
                const widths = ["w-11/12", "w-8/12", "w-10/12", "w-7/12", "w-9/12", "w-6/12", "w-10/12"];
                return (
                  <span
                    key={lineIndex}
                    className={`block h-px ${widths[lineIndex % widths.length]} bg-ink/[0.11]`}
                  />
                );
              })}
            </div>
          </motion.div>
        ))}

        {/* Animated pen stroke */}
        <svg
          viewBox="0 0 200 120"
          className="pointer-events-none absolute -bottom-2 left-1/2 h-28 w-52 -translate-x-1/2 text-gold-deep/50"
          aria-hidden="true"
        >
          <path
            d="M15 85 C 45 55, 70 95, 100 65 S 155 35, 185 55"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="editorial-ink-draw"
          />
        </svg>
      </div>

      {/* Floating tags */}
      <div className="absolute left-4 top-12 grid gap-2" aria-hidden="true">
        {floatingTags.slice(0, 3).map((tag, index) => (
          <motion.span
            key={tag}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.8 + index * 0.12,
              duration: 0.6,
              ease: [0.23, 1, 0.32, 1]
            }}
            className="flex items-center gap-2 text-[0.6rem] uppercase tracking-[0.22em] text-charcoal/38 editorial-drift"
            style={{ animationDelay: `${index * 0.4}s` }}
          >
            <span className="h-1.5 w-1.5 bg-gold/60" />
            {tag}
          </motion.span>
        ))}
      </div>

      {/* Trust indicators */}
      <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between" aria-hidden="true">
        <div className="flex items-center gap-2">
          <span className="h-px w-8 bg-gold/40" />
          <span className="text-[0.6rem] uppercase tracking-[0.2em] text-charcoal/35">
            Secure workspace
          </span>
        </div>
        <div className="grid h-8 w-8 place-items-center border border-ink/10 bg-ivory/80">
          <svg viewBox="0 0 24 24" className="h-4 w-4 text-gold-deep/60" fill="none" stroke="currentColor" strokeWidth="1.6">
            <rect x="3" y="11" width="18" height="10" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}
