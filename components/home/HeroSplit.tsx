"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Users, Clock, History } from "lucide-react";

const heroVideos = [
  {
    title: "Human Editorial Review",
    src: "https://pub-9f4f9c9b1b3e477aba4991ccfd92f1ae.r2.dev/202605121029%20(1).mp4",
    poster: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Professional Editing Desk",
    src: "/videos/hero-editorial-review.mp4",
    poster: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1600&auto=format&fit=crop",
  },
] as const;

const flipWords = [
  "Scientific Editing",
  "Proofreading",
  "Academic Editing",
  "Non-Academic Editing",
  "Business Proposals",
  "Copy Editing"
];

const focusAreas = [
  "Human Editorial Review",
  "Academic Editing",
  "Business Proposals",
  "Scientific Documents",
  "CV & Résumé Review",
  "Research Papers",
  "Reference Checks",
  "Formatting Support"
];

const features = [
  { text: "Confidential Handling", shortText: "Private", icon: ShieldCheck },
  { text: "Subject-Matter Experts", shortText: "Experts", icon: Users },
  { text: "On-Time Delivery", shortText: "On time", icon: Clock },
  { text: "Track Changes", shortText: "Changes", icon: History }
];

function HeroVideoFrame({ objectPosition }: { objectPosition: string }) {
  const [videoIndex, setVideoIndex] = useState(0);
  const activeVideo = heroVideos[videoIndex];
  const playNextVideo = () => {
    setVideoIndex((currentIndex) => (currentIndex + 1) % heroVideos.length);
  };

  return (
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: `url("${activeVideo.poster}")` }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent z-10 opacity-70" />
      <video
        key={activeVideo.src}
        src={activeVideo.src}
        poster={activeVideo.poster}
        autoPlay
        muted
        playsInline
        preload="metadata"
        onEnded={playNextVideo}
        onError={playNextVideo}
        aria-label={activeVideo.title}
        className={`absolute inset-0 h-full w-full object-cover ${objectPosition}`}
      />
    </div>
  );
}

export function HeroSplit() {
  const [wordIndex, setWordIndex] = useState(0);
  const [focusIndex, setFocusIndex] = useState(0);

  useEffect(() => {
    const wordTimer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % flipWords.length);
    }, 3000);
    return () => clearInterval(wordTimer);
  }, []);

  useEffect(() => {
    const focusTimer = setInterval(() => {
      setFocusIndex((prev) => (prev + 1) % focusAreas.length);
    }, 3400);
    return () => clearInterval(focusTimer);
  }, []);

  return (
    <section className="relative z-20 flex min-h-[70vh] w-full max-w-full flex-col overflow-x-clip bg-paper pt-16 pb-20 text-ink lg:min-h-[84vh] lg:overflow-visible lg:pt-24 lg:pb-28">
      <svg width="0" height="0" className="absolute pointer-events-none">
        <defs>
          <clipPath id="wave-clip" clipPathUnits="objectBoundingBox">
            <path d="M0.18,0 L1,0 L1,1 L0,1 C0.02,0.62 0.18,0.42 0.18,0 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=2400&auto=format&fit=crop"
          alt=""
          aria-hidden="true"
          fill
          className="object-cover opacity-10"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-paper/95 via-paper/90 to-paper/80" />
      </div>

      {/* Subtle Background Elements */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 z-0 h-[22rem] w-[22rem] -translate-x-1/2 rounded-full bg-primary/5 blur-[100px] sm:h-[600px] sm:w-[600px] sm:blur-[120px] lg:left-1/4 lg:translate-x-0" />

      {/* Desktop Full Bleed Media */}
      <div className="hidden lg:block absolute top-16 bottom-0 right-0 w-[60vw] z-10 overflow-hidden rounded-l-[3rem] shadow-[0_24px_70px_rgba(15,59,127,0.08)]" style={{ clipPath: 'url(#wave-clip)', WebkitClipPath: 'url(#wave-clip)' }}>
        <motion.div 
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 w-full h-full"
        >
          <HeroVideoFrame objectPosition="[object-position:52%_48%]" />
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
              Professional editing and proofreading services for <span className="text-primary italic">important</span> documents.
            </h1>
            <p className="mb-5 max-w-xl text-base leading-8 text-charcoal/80 sm:text-lg">
              Human-led editing for academic papers, business documents, manuscripts, applications, and professional writing that needs clarity, structure, and polish.
            </p>
            <div className="text-lg sm:text-xl text-charcoal font-medium leading-relaxed max-w-xl mb-12 flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <span className="opacity-80">Specialist support for:</span>
              <span className="relative inline-flex h-8 w-full max-w-[18rem] overflow-hidden font-display text-primary text-xl sm:text-2xl">
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
              </span>
            </div>

            <div className="flex max-w-sm flex-col gap-5 mb-6 sm:max-w-none sm:flex-row lg:mb-7">
              <Link href="/submit" className="group inline-flex h-14 w-full items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-ivory transition-all hover:bg-primary-light hover:scale-[1.02] shadow-[0_8px_20px_rgba(15,59,127,0.15)] hover:shadow-[0_12px_25px_rgba(15,59,127,0.25)] sm:w-auto sm:px-10">
                Submit Your Document
                <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <Link href="/services" className="inline-flex h-14 w-full items-center justify-center rounded-full border-2 border-primary/20 bg-transparent px-6 text-sm font-semibold text-primary transition-all hover:border-primary hover:bg-primary/5 sm:w-auto sm:px-10">
                View Editing Services
              </Link>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="relative mb-8 w-full max-w-sm overflow-hidden rounded-2xl border border-primary/10 bg-ivory/82 px-5 py-4 shadow-[0_16px_40px_rgba(15,59,127,0.08)] backdrop-blur-md sm:max-w-md lg:mb-0"
            >
              <div className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-primary" />
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.24em] text-accent">Focus Area</p>
              <div className="relative h-8 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={focusAreas[focusIndex]}
                    initial={{ y: 14, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -14, opacity: 0 }}
                    transition={{ duration: 0.45, ease: "easeInOut" }}
                    className="absolute inset-x-0 top-0 font-display text-xl leading-8 text-ink sm:text-2xl"
                  >
                    {focusAreas[focusIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Mobile Side: Hero Media */}
        <div className="lg:hidden w-full relative h-[360px] flex items-center justify-center mt-2 min-[420px]:h-[400px] sm:h-[430px]">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full h-full bg-ivory shadow-2xl overflow-hidden rounded-[2rem] border border-ink/5 group"
          >
            <HeroVideoFrame objectPosition="[object-position:50%_48%]" />
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
                <feature.icon className="w-4 h-4 text-primary" strokeWidth={2.5} aria-hidden="true" />
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
