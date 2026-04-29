"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const serviceWords = [
  ["Proofreading", "Final-page confidence"],
  ["Editing", "Sharper structure and tone"],
  ["Formatting", "Submission-ready polish"],
  ["Translation", "Meaning carried cleanly"],
];

const editorialModes = [
  {
    label: "Academic",
    title: "Research drafts shaped for clarity.",
    body: "Articles, theses, dissertations, proposals, and scholarship refined with calm editorial judgment.",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1500&q=82",
  },
  {
    label: "Business",
    title: "Reports that read with authority.",
    body: "Profiles, proposals, presentations, and executive documents sharpened for trust and decision-making.",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1500&q=82",
  },
  {
    label: "Authors",
    title: "Manuscripts refined without losing voice.",
    body: "Long-form drafts, books, essays, and personal work edited for rhythm, flow, and reader confidence.",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1500&q=82",
  },
  {
    label: "Education",
    title: "Documents prepared for serious review.",
    body: "Student, institutional, and professional education documents made clearer, cleaner, and more persuasive.",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1500&q=82",
  },
];

const proofingLanes = ["Argument", "Grammar", "Voice", "Structure", "Citation", "Delivery"];

export function ScrollSequence() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const reducedMotion = useReducedMotion();
  const activeMode = editorialModes[activeIndex];
  const activeWord = serviceWords[wordIndex];

  const chooseLane = (index: number) => {
    setActiveIndex(index % editorialModes.length);
    setWordIndex(index % serviceWords.length);
  };

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % editorialModes.length);
      setWordIndex((index) => (index + 1) % serviceWords.length);
    }, 4000);

    return () => window.clearInterval(interval);
  }, [reducedMotion]);

  return (
    <section className="relative isolate overflow-hidden border-b border-ink/10 bg-ivory px-5 pb-14 pt-24 sm:px-8 sm:pb-16 lg:min-h-[88vh] lg:pb-20 lg:pt-24">
      <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,253,247,0.98)_0%,rgba(248,244,236,0.76)_48%,rgba(255,253,247,0.94)_100%)]" aria-hidden="true" />
      <div className="absolute inset-0 opacity-[0.065] [background-image:linear-gradient(rgba(17,17,15,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(17,17,15,0.12)_1px,transparent_1px)] [background-size:72px_72px]" aria-hidden="true" />
      <div className="absolute -right-24 top-20 h-72 w-72 border border-gold/20" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 h-px w-2/3 bg-gradient-to-r from-gold/45 via-ink/10 to-transparent" aria-hidden="true" />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
        <div className="max-w-2xl">
          <p className="text-[0.68rem] uppercase tracking-[0.3em] text-gold-deep sm:text-xs">Premium editorial desk</p>
          <h1 className="mt-5 max-w-[14ch] font-display text-[clamp(2.45rem,4.9vw,5.05rem)] leading-[0.98] text-ink">
            Editorial care for documents that matter.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-charcoal/72 sm:text-[1.05rem] sm:leading-8">
            A refined editorial platform for academic, business, manuscript, and personal documents that need to read with confidence.
          </p>

          <div className="mt-8 overflow-hidden border-y border-ink/10 py-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-5">
              <span className="text-[0.68rem] uppercase tracking-[0.26em] text-charcoal/45 sm:text-xs">Focused on</span>
              <span className="relative block min-h-[2.35rem] overflow-hidden font-display text-[clamp(1.65rem,3.7vw,2.55rem)] leading-none text-gold-deep">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={activeWord[0]}
                    className="block"
                    initial={reducedMotion ? false : { y: 32, opacity: 0, rotateX: -24 }}
                    animate={{ y: 0, opacity: 1, rotateX: 0 }}
                    exit={reducedMotion ? undefined : { y: -28, opacity: 0, rotateX: 20 }}
                    transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {activeWord[0]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </div>
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={activeWord[1]}
                className="mt-2 text-xs uppercase tracking-[0.2em] text-charcoal/48 sm:text-sm"
                initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                {activeWord[1]}
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/login" className="inline-flex min-h-12 items-center justify-center bg-ink px-7 text-sm text-ivory transition duration-200 ease-premium-out hover:bg-gold-deep active:scale-[0.98]">
              Start a project
            </Link>
            <Link href="/services" className="inline-flex min-h-12 items-center justify-center border border-ink/15 bg-ivory/80 px-7 text-sm text-ink transition duration-200 ease-premium-out hover:border-gold hover:text-gold-deep active:scale-[0.98]">
              Explore services
            </Link>
          </div>
        </div>

        <div className="relative lg:pl-4">
          <div className="relative min-h-[27rem] overflow-hidden border border-ink/10 bg-paper shadow-[0_22px_80px_rgba(17,17,15,0.09)] sm:min-h-[30rem] lg:min-h-[32rem]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeMode.label}
                className="absolute inset-0"
                initial={reducedMotion ? false : { opacity: 0, scale: 1.035 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reducedMotion ? undefined : { opacity: 0, scale: 0.985 }}
                transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src={activeMode.image}
                  alt=""
                  fill
                  priority={activeIndex === 0}
                  sizes="(min-width: 1024px) 52vw, 94vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,17,15,0.08)_0%,rgba(17,17,15,0.26)_55%,rgba(17,17,15,0.72)_100%)]" aria-hidden="true" />
              </motion.div>
            </AnimatePresence>

            <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-4 p-4 sm:p-6">
              <div className="border border-ivory/40 bg-ink/30 px-3 py-2.5 text-[0.66rem] uppercase tracking-[0.25em] text-ivory backdrop-blur-md sm:text-xs">
                {activeMode.label}
              </div>
              <div className="hidden grid-cols-3 gap-1 sm:grid" aria-hidden="true">
                {proofingLanes.slice(0, 6).map((lane, index) => (
                  <span key={lane} className="h-1.5 w-10 bg-ivory/40" style={{ opacity: index % editorialModes.length === activeIndex ? 0.95 : 0.42 }} />
                ))}
              </div>
            </div>

            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
              <div className="max-w-lg border border-ink/5 bg-ivory p-5 text-ink shadow-2xl sm:p-7">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={activeMode.title}
                    initial={reducedMotion ? false : { opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reducedMotion ? undefined : { opacity: 0, y: -10 }}
                    transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <h2 className="font-display text-[clamp(1.45rem,2.7vw,2.15rem)] leading-[1.05] text-ink">{activeMode.title}</h2>
                    <p className="mt-3 text-sm leading-6 text-charcoal/70 sm:text-[0.95rem] sm:leading-7">{activeMode.body}</p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
            {proofingLanes.map((lane, index) => (
              <button
                key={lane}
                type="button"
                aria-pressed={index % editorialModes.length === activeIndex}
                onClick={() => chooseLane(index)}
                className="group min-h-12 border border-ink/10 bg-ivory/80 px-3 text-left text-[0.68rem] uppercase tracking-[0.16em] text-charcoal/50 shadow-[0_10px_34px_rgba(17,17,15,0.03)] transition duration-200 ease-premium-out hover:border-gold/40 hover:text-gold-deep active:scale-[0.99] aria-pressed:border-gold/50 aria-pressed:bg-paper aria-pressed:text-gold-deep sm:min-h-[3.25rem] sm:px-4 sm:text-xs sm:tracking-[0.18em]"
              >
                <span className="mr-2 font-display text-sm text-gold-deep/80 sm:mr-3 sm:text-base">{String(index + 1).padStart(2, "0")}</span>
                {lane}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
