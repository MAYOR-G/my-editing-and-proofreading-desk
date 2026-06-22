"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
const reviewStandards = [
  { name: "Clarity", role: "Sentence and paragraph level", text: "Editors identify unclear wording, unnecessary repetition, and weak transitions so the reader can follow the document without guessing." },
  { name: "Structure", role: "Document level", text: "Sections, headings, and argument flow are reviewed for order, balance, and a clear connection to the document's purpose." },
  { name: "Correctness", role: "Final quality control", text: "Grammar, punctuation, spelling, terminology, and internal consistency are checked before the edited file is returned." },
  { name: "Voice", role: "Writer-led decisions", text: "Changes are made with the writer's intent in view. Comments are used when a choice should remain with the author." },
  { name: "Confidentiality", role: "Private document handling", text: "Uploaded material is handled only for the requested service and delivered through the client's secure project workspace." },
  { name: "Transparency", role: "Visible editorial trail", text: "Track Changes and useful comments show what was improved and where the writer may need to make a final decision." },
];

function ReviewSlot({ reviewA, reviewB, interval }: { reviewA: any, reviewB: any, interval: number }) {
  const [showA, setShowA] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setShowA((prev) => !prev);
    }, interval);
    return () => clearInterval(timer);
  }, [interval]);

  const activeReview = showA ? reviewA : reviewB;

  return (
    <div className="relative w-full h-[320px] perspective-1000">
      <AnimatePresence mode="wait">
        <motion.div
          key={showA ? "A" : "B"}
          initial={{ rotateX: -90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          exit={{ rotateX: 90, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 bg-white border border-ink/5 rounded-3xl p-10 flex flex-col justify-between shadow-[0_20px_60px_rgba(15,59,127,0.06)]"
          style={{ transformOrigin: "center center" }}
        >
          <div className="absolute top-8 left-8 h-1 w-12 rounded-full bg-primary/15" aria-hidden="true" />
          
          <p className="text-charcoal/90 font-display text-lg italic leading-relaxed relative z-10 pt-4">
            {activeReview.text}
          </p>
          <div className="mt-8 border-t border-ink/5 pt-6 relative z-10">
            <p className="font-bold text-sm text-ink">{activeReview.name}</p>
            <p className="text-xs text-accent uppercase tracking-wider mt-1 font-semibold">{activeReview.role}</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export function FlippingReviews() {
  return (
    <section className="bg-ivory py-32 px-5 sm:px-10 overflow-hidden relative">
      <div className="max-w-screen-xl mx-auto relative z-10">
        <div className="text-center mb-20 flex flex-col items-center">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-4 h-1 bg-accent rounded-full" />
            <p className="text-xs uppercase tracking-[0.2em] text-primary font-bold">Editorial standards</p>
            <span className="w-4 h-1 bg-accent rounded-full" />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl text-ink">What you can expect</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <ReviewSlot reviewA={reviewStandards[0]} reviewB={reviewStandards[3]} interval={5000} />
          <ReviewSlot reviewA={reviewStandards[1]} reviewB={reviewStandards[4]} interval={7000} />
          <ReviewSlot reviewA={reviewStandards[2]} reviewB={reviewStandards[5]} interval={6000} />
        </div>
      </div>
    </section>
  );
}
