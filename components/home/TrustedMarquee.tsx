"use client";

import { motion } from "framer-motion";

const trustLogos = [
  "Harvard University",
  "MIT Press",
  "Stanford Journals",
  "Oxford Academic",
  "Nature Publishing",
  "Elsevier",
  "The Lancet",
  "Cambridge University Press"
];

export function TrustedMarquee() {
  return (
    <section className="bg-paper py-16 border-y border-ink/5 overflow-hidden flex flex-col items-center">
      <p className="text-[10px] uppercase tracking-[0.2em] text-ink/40 mb-8 font-semibold">Trusted by Researchers At</p>
      
      <div className="relative w-full flex overflow-hidden">
        {/* Gradient Masks for smooth fade out at edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-paper to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-paper to-transparent z-10" />
        
        <motion.div
          className="flex whitespace-nowrap gap-16 items-center"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 30, // Slow, premium scroll
          }}
        >
          {/* Double the array for seamless infinite scroll */}
          {[...trustLogos, ...trustLogos].map((logo, idx) => (
            <span key={idx} className="text-xl md:text-2xl font-display text-ink/30 tracking-tight shrink-0 px-8">
              {logo}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
