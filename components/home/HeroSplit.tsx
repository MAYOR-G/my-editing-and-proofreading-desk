"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Users, Clock, History } from "lucide-react";

const heroContexts = [
  { id: "academic", title: "Academic Excellence", image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1600&auto=format&fit=crop" },
  { id: "business", title: "Corporate & Business", image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1600&auto=format&fit=crop" },
  { id: "authors", title: "Authors & Publishers", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1600&auto=format&fit=crop" },
  { id: "editorial-review", title: "Human Editorial Review", image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1600&auto=format&fit=crop" }
];

const flipWords = [
  "Scientific Editing",
  "Proofreading",
  "Academic Editing",
  "Non-Academic Editing",
  "Business Proposals",
  "Copy Editing"
];

const features = [
  { text: "100% Confidential", shortText: "Private", icon: ShieldCheck },
  { text: "Subject-Matter Experts", shortText: "Experts", icon: Users },
  { text: "On-Time Delivery", shortText: "On time", icon: Clock },
  { text: "Track Changes", shortText: "Changes", icon: History }
];

export function HeroSplit() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroContexts.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const wordTimer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % flipWords.length);
    }, 3000);
    return () => clearInterval(wordTimer);
  }, []);

  return (
    <section className="relative z-20 flex min-h-[70vh] w-full max-w-full flex-col overflow-x-clip bg-paper pt-16 pb-20 text-ink lg:min-h-[85vh] lg:overflow-visible lg:pt-24 lg:pb-32">
      <svg width="0" height="0" className="absolute pointer-events-none">
        <defs>
          <clipPath id="wave-clip" clipPathUnits="objectBoundingBox">
            <path d="M0.3,0 L1,0 L1,1 L0,1 C0,0.5 0.3,0.5 0.3,0 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=2400&auto=format&fit=crop"
          alt="Editing Background"
          fill
          className="object-cover opacity-10"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-r from-paper/95 via-paper/90 to-paper/80" />
      </div>

      {/* Subtle Background Elements */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 z-0 h-[22rem] w-[22rem] -translate-x-1/2 rounded-full bg-primary/5 blur-[100px] sm:h-[600px] sm:w-[600px] sm:blur-[120px] lg:left-1/4 lg:translate-x-0" />

      {/* Desktop Full Bleed Image */}
      <div className="hidden lg:block absolute top-0 right-0 w-[55vw] h-full z-10" style={{ clipPath: 'url(#wave-clip)', WebkitClipPath: 'url(#wave-clip)' }}>
        <motion.div 
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 w-full h-full"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent z-10 opacity-70" />
              <Image
                src={heroContexts[currentIndex].image}
                alt={heroContexts[currentIndex].title}
                fill
                className="object-cover"
                priority
                unoptimized
              />
              <div className="absolute bottom-20 left-20 right-8 z-20 flex justify-between items-end">
                <div className="bg-ivory/95 backdrop-blur-md border border-ink/5 p-6 rounded-2xl shadow-xl">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-accent mb-2 font-bold">Focus Area</p>
                  <p className="text-2xl font-display text-ink">{heroContexts[currentIndex].title}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="absolute top-1/2 -translate-y-1/2 right-10 z-30 flex flex-col gap-3">
            {heroContexts.map((_, idx) => (
              <div
                key={idx}
                className={`w-1.5 transition-all duration-500 rounded-full ${idx === currentIndex ? "h-10 bg-ivory" : "h-4 bg-ivory/40"}`}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Main Split Area */}
      <div className="relative z-10 mx-auto flex w-full max-w-screen-2xl flex-1 flex-col px-5 sm:px-10 lg:flex-row">

        {/* Left Side: Copy & CTAs */}
        <div className="relative z-20 flex w-full min-w-0 flex-col justify-center py-10 lg:w-[50%] lg:pr-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-full"
          >
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-primary mb-6 font-semibold flex items-center gap-3">
              <span className="w-8 h-[1px] bg-primary" />
              Premium Editorial Desk
            </p>
            <h1 className="max-w-[12ch] font-display text-[2.55rem] leading-[1.08] tracking-tight mb-8 text-ink min-[420px]:text-5xl sm:max-w-3xl lg:max-w-none lg:text-6xl">
              Clarity and precision for your most <span className="text-primary italic">important</span> documents.
            </h1>
            <div className="text-lg sm:text-xl text-charcoal font-medium leading-relaxed max-w-xl mb-12 flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <span className="opacity-80">Expert support for:</span>
              <span className="relative inline-flex h-8 max-w-full overflow-hidden font-display text-primary text-xl sm:text-2xl">
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={wordIndex}
                    initial={{ y: 25, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -25, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute whitespace-nowrap drop-shadow-sm"
                  >
                    {flipWords[wordIndex]}
                  </motion.span>
                </AnimatePresence>
                {/* Invisible element to maintain width */}
                <span className="invisible whitespace-nowrap">{flipWords[wordIndex]}</span>
              </span>
            </div>

            <div className="flex max-w-sm flex-col gap-5 mb-16 sm:max-w-none sm:flex-row">
              <Link href="/dashboard/uploads" className="group inline-flex h-14 w-full items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-ivory transition-all hover:bg-primary-light hover:scale-[1.02] shadow-[0_8px_20px_rgba(15,59,127,0.15)] hover:shadow-[0_12px_25px_rgba(15,59,127,0.25)] sm:w-auto sm:px-10">
                Submit Your Document
                <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <Link href="/services" className="inline-flex h-14 w-full items-center justify-center rounded-full border-2 border-primary/20 bg-transparent px-6 text-sm font-semibold text-primary transition-all hover:border-primary hover:bg-primary/5 sm:w-auto sm:px-10">
                View Our Services
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Mobile Side: Dynamic Context Slider */}
        <div className="lg:hidden w-full relative h-[450px] flex items-center justify-center mt-6">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full h-full bg-ivory shadow-2xl overflow-hidden rounded-[2rem] border border-ink/5 group"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent z-10 opacity-80" />
                <Image
                  src={heroContexts[currentIndex].image}
                  alt={heroContexts[currentIndex].title}
                  fill
                  className="object-cover"
                  priority
                  unoptimized
                />
                <div className="absolute bottom-6 left-6 right-6 z-20 flex justify-between items-end">
                  <div className="bg-ivory/95 backdrop-blur-md border border-ink/5 p-4 rounded-2xl shadow-xl">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-accent mb-2 font-bold">Focus Area</p>
                    <p className="text-lg font-display text-ink">{heroContexts[currentIndex].title}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="absolute top-6 right-6 z-30 flex flex-col gap-2">
              {heroContexts.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-1 transition-all duration-500 rounded-full ${idx === currentIndex ? "h-6 bg-ivory" : "h-2 bg-ivory/40"}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Trust Features Bar */}
      <div className="absolute left-1/2 bottom-0 z-50 w-full max-w-screen-xl -translate-x-1/2 translate-y-1/2 px-5 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10px" }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 items-center justify-center gap-4 bg-ivory border border-ink/5 rounded-[2rem] px-5 py-6 shadow-[0_20px_40px_rgba(15,59,127,0.08)] sm:flex sm:flex-wrap sm:gap-10 sm:px-6"
        >
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-center justify-center gap-3 text-[10px] sm:text-xs uppercase tracking-[0.15em] text-charcoal font-semibold">
              <div className="grid place-items-center w-8 h-8 rounded-full bg-primary/10 border border-primary/20">
                <feature.icon className="w-4 h-4 text-primary" strokeWidth={2.5} />
              </div>
              <span className="hidden sm:inline-block">{feature.text}</span>
              <span className="sm:hidden">{feature.shortText}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
