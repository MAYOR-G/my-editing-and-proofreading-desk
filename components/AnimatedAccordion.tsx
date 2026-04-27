"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, type ReactNode } from "react";

type AccordionItem = {
  question: string;
  answer: string;
};

type AnimatedAccordionProps = {
  items: AccordionItem[];
};

function AccordionRow({ item, isOpen, onToggle }: { item: AccordionItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-ink/10 last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        className="group flex w-full cursor-pointer items-center justify-between gap-6 py-7 text-left text-xl text-ink transition duration-200 ease-premium-out hover:text-gold-deep"
        aria-expanded={isOpen}
      >
        <span className="pr-4">{item.question}</span>
        <span className="grid h-9 w-9 shrink-0 place-items-center border border-ink/12 text-gold-deep transition-all duration-300 ease-premium-out group-hover:border-gold group-hover:shadow-gold-glow">
          <motion.span
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="block text-lg leading-none"
          >
            +
          </motion.span>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-7">
              <div className="relative pl-5">
                <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-gold/50 to-transparent" />
                <p className="max-w-2xl text-base font-light leading-7 text-charcoal/65">
                  {item.answer}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function AnimatedAccordion({ items }: AnimatedAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="border-t border-ink/10">
      {items.map((item, index) => (
        <AccordionRow
          key={item.question}
          item={item}
          isOpen={openIndex === index}
          onToggle={() => setOpenIndex(openIndex === index ? null : index)}
        />
      ))}
    </div>
  );
}
