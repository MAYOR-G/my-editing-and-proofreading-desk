"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

type AccordionItem = {
  question: string;
  answer: string;
};

type AnimatedAccordionProps = {
  items: AccordionItem[];
  tone?: "light" | "dark" | "card";
};

function AccordionRow({ item, isOpen, onToggle, tone }: { item: AccordionItem; isOpen: boolean; onToggle: () => void; tone: "light" | "dark" | "card" }) {
  const isDark = tone === "dark";
  const isCard = tone === "card";
  
  if (isCard) {
    return (
      <div className="overflow-hidden rounded-xl border border-hairline bg-canvas shadow-[0_8px_28px_rgba(17,17,15,0.025)] transition-all duration-200 ease-premium-out hover:border-primary/25 hover:shadow-[0_14px_44px_rgba(17,17,15,0.045)]">
        <button
          type="button"
          onClick={onToggle}
          className="group flex w-full cursor-pointer items-center justify-between gap-5 p-5 text-left text-base font-semibold leading-6 text-ink transition-colors hover:text-primary sm:p-6 sm:text-lg"
          aria-expanded={isOpen}
        >
          <span className="pr-4">{item.question}</span>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-primary/15 bg-primary/10 text-primary transition-transform duration-300">
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            >
              <ChevronDown className="w-4 h-4" strokeWidth={3} />
            </motion.div>
          </span>
        </button>
        <motion.div
          initial={false}
          animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
          className="overflow-hidden"
          aria-hidden={!isOpen}
        >
          <div className="border-t border-hairline px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
            <p className="max-w-3xl text-sm leading-7 text-body sm:text-base">
              {item.answer}
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`border-b ${isDark ? "border-ivory/10" : "border-ink/10"} last:border-b-0`}>
      <button
        type="button"
        onClick={onToggle}
        className={`group flex w-full cursor-pointer items-center justify-between gap-6 py-7 text-left text-xl transition duration-200 ease-premium-out ${isDark ? "text-ivory hover:text-gold" : "text-ink hover:text-gold-deep"}`}
        aria-expanded={isOpen}
      >
        <span className="pr-4">{item.question}</span>
        <span className={`grid h-9 w-9 shrink-0 place-items-center border transition duration-300 ease-premium-out ${isDark ? "border-ivory/10 text-gold group-hover:border-gold group-hover:shadow-[0_0_15px_rgba(176,138,60,0.3)]" : "border-ink/12 text-gold-deep group-hover:border-gold group-hover:shadow-gold-glow"}`}>
          <motion.span
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="block text-lg leading-none"
          >
            +
          </motion.span>
        </span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
        className="overflow-hidden"
        aria-hidden={!isOpen}
      >
        <div className="pb-7">
          <div className="relative pl-5">
            <div className={`absolute left-0 top-0 h-full w-px bg-gradient-to-b ${isDark ? "from-gold/40" : "from-gold/50"} to-transparent`} />
            <p className={`max-w-2xl text-base font-light leading-7 ${isDark ? "text-ivory/70" : "text-charcoal/65"}`}>
              {item.answer}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function AnimatedAccordion({ items, tone = "light" }: AnimatedAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (tone === "card") {
    return (
      <div className="flex flex-col gap-4">
        {items.map((item, index) => (
          <AccordionRow
            key={item.question}
            item={item}
            isOpen={openIndex === index}
            onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            tone={tone}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={`border-t ${tone === "dark" ? "border-ivory/10" : "border-ink/10"}`}>
      {items.map((item, index) => (
        <AccordionRow
          key={item.question}
          item={item}
          isOpen={openIndex === index}
          onToggle={() => setOpenIndex(openIndex === index ? null : index)}
          tone={tone}
        />
      ))}
    </div>
  );
}
