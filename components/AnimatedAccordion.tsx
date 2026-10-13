"use client";

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

function AccordionRow({
  item,
  isOpen,
  onToggle,
  tone,
}: {
  item: AccordionItem;
  isOpen: boolean;
  onToggle: () => void;
  tone: "light" | "dark" | "card";
}) {
  const isDark = tone === "dark";
  const isCard = tone === "card";

  if (isCard) {
    return (
      <div className="overflow-hidden rounded-xl border border-hairline bg-canvas shadow-[0_8px_28px_rgba(17,17,15,0.025)] transition-[border-color,box-shadow] duration-200 ease-out hover:border-primary/25 hover:shadow-[0_14px_44px_rgba(17,17,15,0.045)]">
        <button
          type="button"
          onClick={onToggle}
          className="group flex w-full cursor-pointer items-center justify-between gap-5 p-5 text-left text-base font-semibold leading-6 text-ink transition-colors duration-200 hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary sm:p-6 sm:text-lg"
          aria-expanded={isOpen}
        >
          <span className="pr-4">{item.question}</span>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-primary/15 bg-primary/10 text-primary transition-transform duration-200">
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-200 ease-out ${isOpen ? "rotate-180" : "rotate-0"}`}
              strokeWidth={3}
            />
          </span>
        </button>
        <div
          className={`grid transition-[grid-template-rows,opacity] duration-200 ease-out ${
            isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
          aria-hidden={!isOpen}
        >
          <div className="overflow-hidden">
            <div className="border-t border-hairline px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
              <p className="max-w-3xl text-sm leading-7 text-body sm:text-base">
                {item.answer}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`border-b ${isDark ? "border-ivory/10" : "border-ink/10"} last:border-b-0`}>
      <button
        type="button"
        onClick={onToggle}
        className={`group flex w-full cursor-pointer items-center justify-between gap-6 py-7 text-left text-xl transition-colors duration-200 ease-out ${
          isDark ? "text-ivory hover:text-gold" : "text-ink hover:text-primary"
        } focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary`}
        aria-expanded={isOpen}
      >
        <span className="pr-4">{item.question}</span>
        <span
          className={`grid h-9 w-9 shrink-0 place-items-center border rounded-full transition-transform duration-200 ease-out ${
            isDark ? "border-ivory/10 text-gold" : "border-ink/12 text-primary"
          }`}
        >
          <span
            className={`block text-lg leading-none transition-transform duration-200 ease-out ${
              isOpen ? "rotate-45" : "rotate-0"
            }`}
          >
            +
          </span>
        </span>
      </button>
      <div
        className={`grid transition-[grid-template-rows,opacity] duration-200 ease-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
        aria-hidden={!isOpen}
      >
        <div className="overflow-hidden">
          <div className="pb-7">
            <div className="relative pl-5">
              <div
                className={`absolute left-0 top-0 h-full w-px bg-gradient-to-b ${
                  isDark ? "from-gold/40" : "from-primary/40"
                } to-transparent`}
              />
              <p className={`max-w-2xl text-base font-light leading-7 ${isDark ? "text-ivory/70" : "text-body"}`}>
                {item.answer}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AnimatedAccordion({ items, tone = "light" }: AnimatedAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (tone === "card") {
    return (
      <div className="grid gap-3">
        {items.map((item, index) => (
          <AccordionRow
            key={item.question}
            item={item}
            isOpen={openIndex === index}
            onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            tone="card"
          />
        ))}
      </div>
    );
  }

  return (
    <div>
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
