"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Users, Clock, History } from "lucide-react";

const heroContexts = [
  { id: "academic", title: "Academic Excellence", image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1600&auto=format&fit=crop" },
  { id: "business", title: "Corporate & Business", image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1600&auto=format&fit=crop" },
  { id: "authors", title: "Authors & Publishers", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1600&auto=format&fit=crop" }
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
  { text: "100% Confidential", icon: ShieldCheck },
  { text: "Subject-Matter Experts", icon: Users },
  { text: "On-Time Delivery", icon: Clock },
  { text: "Track Changes", icon: History }
];

export function HeroSplit() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroContexts.length);
    }, 4000); // 4-second delay for images
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const wordTimer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % flipWords.length);
    }, 3000); // Flip word every 3s
    return () => clearInterval(wordTimer);
  }, []);

  return (
    <section className="relative w-full min-h-[45vh] lg:min-h-[40vh] flex flex-col bg-ivory text-ink pt-16 lg:pt-24 pb-10 lg:pb-10">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=2400&auto=format&fit=crop"
          alt="Editing Background"
          fill
          className="object-cover opacity-20"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ivory/95 via-ivory/90 to-ivory/80" />
      </div>

      {/* Subtle Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gold/10 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* Main Split Area */}
      <div className="flex-1 flex flex-col lg:flex-row w-full max-w-screen-2xl mx-auto px-5 sm:px-10 z-10 relative">

        {/* Left Side: Copy & CTAs */}
        <div className="flex-1 flex flex-col justify-center py-10 lg:pr-16 xl:pr-24 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-xs uppercase tracking-[0.3em] text-gold-deep mb-6 font-semibold flex items-center gap-3">
              <span className="w-8 h-[1px] bg-gold-deep" />
              Premium Editorial Desk
            </p>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight mb-8 text-ink">
              Clarity and precision for your most <span className="text-gold-deep italic">critical</span> documents.
            </h1>
            <div className="text-xl sm:text-2xl text-charcoal font-medium leading-relaxed max-w-xl mb-12 flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <span className="opacity-80">Expert solution for:</span>
              <span className="relative inline-flex h-10 overflow-hidden font-display text-gold-deep text-2xl sm:text-3xl">
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

            <div className="flex flex-col sm:flex-row gap-5 mb-16">
              <Link href="/login" className="group inline-flex h-14 items-center justify-center rounded-full bg-ink px-10 text-sm font-semibold text-ivory transition-all hover:bg-charcoal hover:scale-[1.02] shadow-[0_8px_20px_rgba(20,20,20,0.15)] hover:shadow-[0_12px_25px_rgba(20,20,20,0.25)]">
                Upload Document
                <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <Link href="/services" className="inline-flex h-14 items-center justify-center rounded-full border-2 border-ink/10 bg-transparent px-10 text-sm font-semibold text-ink transition-all hover:border-gold-deep hover:text-gold-deep hover:bg-gold-deep/5">
                Explore Services
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Dynamic Context Slider */}
        <div className="flex-1 relative min-h-[500px] lg:min-h-0 lg:my-10 flex items-center justify-center lg:justify-end">
          <div className="relative w-full max-w-lg aspect-[4/5] bg-paper shadow-2xl overflow-hidden rounded-2xl border border-ink/5 group">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                {/* Image Overlay to ensure text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent z-10 opacity-80" />

                <Image
                  src={heroContexts[currentIndex].image}
                  alt={heroContexts[currentIndex].title}
                  fill
                  className="object-cover"
                  priority
                  unoptimized // Since using external Unsplash urls
                />

                {/* Floating Context Label */}
                <div className="absolute bottom-8 left-8 right-8 z-20 flex justify-between items-end">
                  <div className="bg-ink/80 backdrop-blur-lg border border-ivory/10 p-5 rounded-xl shadow-lg">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-gold mb-2 font-semibold">Focus Area</p>
                    <p className="text-xl font-display text-ivory">{heroContexts[currentIndex].title}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slider Indicators */}
            <div className="absolute top-8 right-8 z-30 flex flex-col gap-2">
              {heroContexts.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-1 transition-all duration-500 rounded-full ${idx === currentIndex ? "h-6 bg-gold" : "h-2 bg-ivory/40"}`}
                />
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* Overlapping Horizontal Features Bar */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 z-30 w-full max-w-screen-xl mx-auto px-5 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-10 bg-ink border border-ink/10 rounded-[2rem] px-6 py-6 shadow-2xl"
        >
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-center gap-3 text-[10px] sm:text-xs uppercase tracking-[0.15em] text-ivory font-medium">
              <div className="grid place-items-center w-8 h-8 rounded-full bg-charcoal border border-gold/20">
                <feature.icon className="w-4 h-4 text-gold" strokeWidth={2} />
              </div>
              <span className="hidden sm:inline-block">{feature.text}</span>
              <span className="sm:hidden">{feature.text.split(" ")[0]}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
