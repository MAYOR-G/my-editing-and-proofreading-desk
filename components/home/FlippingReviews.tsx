"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionLabel } from "@/components/SectionLabel";

const reviews = [
  { name: "Dr. Sarah Jenkins", role: "Astrophysics Researcher", text: "The editing was impeccable. They caught structural flaws I missed and preserved my academic voice perfectly." },
  { name: "Michael T.", role: "PhD Candidate", text: "Saved my dissertation. The formatting was flawless and the turnaround time was exactly as promised." },
  { name: "Elena R.", role: "Author", text: "I was nervous about losing my tone, but the editor enhanced my manuscript brilliantly. Highly recommended." },
  { name: "Prof. James Chen", role: "Economics Faculty", text: "We submit all our department's journal articles here first. The quality check is unmatched." },
  { name: "Amanda K.", role: "Postdoc Fellow", text: "Fast, confidential, and incredibly thorough. The track changes helped me learn from their edits." },
  { name: "David L.", role: "Corporate Executive", text: "Our business proposals look much more polished. Professionalism at its peak." },
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
          className="absolute inset-0 bg-ink border border-ivory/10 rounded-3xl p-10 flex flex-col justify-between shadow-2xl"
          style={{ transformOrigin: "center center" }}
        >
          {/* Subtle Quote Mark */}
          <div className="absolute top-8 left-8 text-6xl font-display text-gold/10 leading-none">"</div>
          
          <p className="text-ivory/90 font-display text-lg italic leading-relaxed relative z-10 pt-4">
            {activeReview.text}
          </p>
          <div className="mt-8 border-t border-ivory/5 pt-6 relative z-10">
            <p className="font-bold text-sm text-ivory">{activeReview.name}</p>
            <p className="text-xs text-gold uppercase tracking-wider mt-1">{activeReview.role}</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export function FlippingReviews() {
  return (
    <section className="bg-ivory py-32 px-5 sm:px-10 overflow-hidden">
      <div className="max-w-screen-xl mx-auto">
        <div className="text-center mb-20">
          <p className="text-xs uppercase tracking-[0.3em] text-gold-deep mb-4 font-semibold">Testimonials</p>
          <h2 className="font-display text-4xl sm:text-5xl text-ink">Client Experiences</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <ReviewSlot reviewA={reviews[0]} reviewB={reviews[3]} interval={5000} />
          <ReviewSlot reviewA={reviews[1]} reviewB={reviews[4]} interval={7000} />
          <ReviewSlot reviewA={reviews[2]} reviewB={reviews[5]} interval={6000} />
        </div>
      </div>
    </section>
  );
}
