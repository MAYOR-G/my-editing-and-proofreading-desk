"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
const reviews = [
  { name: "Amara K.", role: "Master's Student", text: "The editor did more than correct grammar. My argument became clearer, the structure felt stronger, and the final paper sounded more confident." },
  { name: "Northline Studio", role: "Business Client", text: "Our proposal was polished into something sharper and easier for stakeholders to understand. The edits felt professional without changing our intent." },
  { name: "Dr. Elena R.", role: "Researcher", text: "I appreciated how detailed the comments were. The editor improved the flow while still keeping the work in my own voice." },
  { name: "Marcus L.", role: "Author", text: "My manuscript felt cleaner, more organized, and easier to read. The feedback helped me see where the writing was unclear." },
  { name: "Tomi A.", role: "Undergraduate Student", text: "The service helped me submit with more confidence. The corrections were clear, respectful, and focused on improving the quality of the work." },
  { name: "K. Bennett", role: "Professional Client", text: "They handled our document carefully and confidentially. The final version was polished, precise, and ready to share with our client." },
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
          {/* Subtle Quote Mark */}
          <div className="absolute top-8 left-8 text-6xl font-display text-primary/10 leading-none">"</div>
          
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
            <p className="text-xs uppercase tracking-[0.2em] text-primary font-bold">Testimonials</p>
            <span className="w-4 h-1 bg-accent rounded-full" />
          </div>
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
