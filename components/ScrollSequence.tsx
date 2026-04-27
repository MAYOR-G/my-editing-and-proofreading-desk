"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
const FRAME_COUNT = 240;
const serviceWords = ["proofreading", "editing", "formatting", "translation"];
const supportSignals = [
  {
    label: "Global Reach",
    detail: "Editorial support for international students, researchers, authors, and teams."
  },
  {
    label: "Scientific Journals",
    detail: "Clearer manuscripts, stronger language, and publication-aware refinement."
  },
  {
    label: "Academic Papers",
    detail: "Essays, theses, dissertations, and proposals shaped for scholarly readability."
  },
  {
    label: "Business Reports",
    detail: "Professional documents polished for trust, tone, and executive clarity."
  }
];
const editorialCards = [
  {
    label: "Academics",
    title: "Scientific editing and publication.",
    body: "Research articles, proposals, dissertations, and manuscripts refined for clarity, precision, and scholarly confidence.",
    image: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&w=1400&q=85"
  },
  {
    label: "Authors",
    title: "Editing for fiction and non-fiction authors.",
    body: "Narrative flow, sentence rhythm, consistency, and readability improved without flattening the author’s voice.",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1400&q=85"
  },
  {
    label: "Businesses",
    title: "Professional editing for business documents and teams.",
    body: "Reports, profiles, proposals, and client-facing documents sharpened for trust and executive readability.",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1400&q=85"
  },
  {
    label: "Students",
    title: "Academic editing for essays, theses, and dissertations.",
    body: "Careful support for high-stakes submissions where structure, grammar, and argument must hold together.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=85"
  }
];

function framePath(index: number) {
  return `/assets/sequence/ezgif-frame-${String(index).padStart(3, "0")}.jpg`;
}

function smoothstep(start: number, end: number, value: number) {
  const amount = Math.min(1, Math.max(0, (value - start) / (end - start)));
  return amount * amount * (3 - 2 * amount);
}

function SignalIcon({ index }: { index: number }) {
  const common = "stroke-current";

  if (index === 0) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 text-charcoal/48">
        <circle cx="12" cy="12" r="8.5" fill="none" className={common} strokeWidth="1.4" />
        <path d="M3.8 12h16.4M12 3.5c2.2 2.4 3.4 5.2 3.4 8.5S14.2 18.1 12 20.5M12 3.5C9.8 5.9 8.6 8.7 8.6 12s1.2 6.1 3.4 8.5" fill="none" className={common} strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    );
  }

  if (index === 1) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 text-charcoal/48">
        <path d="M9 4h6M12 4v7.2M8.2 19.5h7.6M10.1 11.2 6.4 18a1 1 0 0 0 .9 1.5h9.4a1 1 0 0 0 .9-1.5l-3.7-6.8" fill="none" className={common} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9.2 15.2h5.6" fill="none" className={common} strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    );
  }

  if (index === 2) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 text-charcoal/48">
        <path d="M5.5 5.5h8.8a3.2 3.2 0 0 1 3.2 3.2v9.8H8.7a3.2 3.2 0 0 0-3.2-3.2V5.5Z" fill="none" className={common} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8.3 8.8h6.4M8.3 11.6h5" fill="none" className={common} strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 text-charcoal/48">
      <path d="M4.5 18.5h15M6.5 18.5v-7h3.5v7M10.8 18.5V7h3.5v11.5M15.2 18.5v-5h3.5v5" fill="none" className={common} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.2 7.8h3.8M12 4.8h3.8M17.8 10h2" fill="none" className={common} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function drawContain(context: CanvasRenderingContext2D, image: HTMLImageElement, width: number, height: number, progress: number) {
  const imageRatio = image.naturalWidth / image.naturalHeight;
  const canvasRatio = width / height;
  let drawWidth = width;
  let drawHeight = height;

  if (imageRatio > canvasRatio) {
    drawHeight = width / imageRatio;
  } else {
    drawWidth = height * imageRatio;
  }

  const visualScale = width < 768 ? 1.08 : width < 1200 ? 1.03 : 1;
  drawWidth *= visualScale;
  drawHeight *= visualScale;

  const landingShift = width * (width < 768 ? 0.1 : 0.3) * smoothstep(0.36, 0.92, progress);
  const x = (width - drawWidth) / 2 - landingShift;
  const y = (height - drawHeight) / 2;
  context.clearRect(0, 0, width, height);
  context.drawImage(image, x, y, drawWidth, drawHeight);
}

export function ScrollSequence() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const requestedRef = useRef<number | null>(null);
  const currentFrameRef = useRef(0);
  const phaseRef = useRef<"opening" | "settled">("opening");
  const [ready, setReady] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);
  const [phase, setPhase] = useState<"opening" | "settled">("opening");
  const [wordIndex, setWordIndex] = useState(0);

  const frameSources = useMemo(() => {
    return Array.from({ length: FRAME_COUNT }, (_, index) => framePath(index + 1));
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const images: HTMLImageElement[] = [];
    let cancelled = false;
    let loaded = 0;

    const loadImage = (src: string, index: number) => {
      const image = new window.Image();
      image.decoding = "async";
      if (index < 4) {
        image.fetchPriority = "high";
      }
      image.src = src;
      image.onload = () => {
        loaded += 1;
        if (!cancelled && (loaded > 4 || index === 0)) {
          setReady(true);
        }
      };
      images[index] = image;
    };

    if (prefersReduced) {
      loadImage(frameSources[FRAME_COUNT - 1], FRAME_COUNT - 1);
      imagesRef.current = images;
      return () => {
        cancelled = true;
      };
    }

    /* Load first 8 frames immediately for fast first paint */
    frameSources.slice(0, 8).forEach(loadImage);

    /* Load remaining frames progressively in batches to avoid network flooding */
    const BATCH_SIZE = 24;
    const timers: number[] = [];
    const remaining = frameSources.slice(8);
    for (let i = 0; i < remaining.length; i += BATCH_SIZE) {
      const batch = remaining.slice(i, i + BATCH_SIZE);
      const delay = 1200 + (i / BATCH_SIZE) * 200;
      timers.push(window.setTimeout(() => {
        if (!cancelled) {
          batch.forEach((src, offset) => loadImage(src, offset + i + 8));
        }
      }, delay));
    }

    imagesRef.current = images;

    return () => {
      cancelled = true;
      timers.forEach(window.clearTimeout);
    };
  }, [frameSources]);

  useEffect(() => {
    if (phase !== "opening") {
      return;
    }

    const interval = window.setInterval(() => {
      setWordIndex((index) => (index + 1) % serviceWords.length);
    }, 1700);

    return () => window.clearInterval(interval);
  }, [phase]);

  useEffect(() => {
    if (phase !== "settled") {
      setCardIndex(0);
      return;
    }

    const interval = window.setInterval(() => {
      setCardIndex((index) => (index + 1) % editorialCards.length);
    }, 3000);

    return () => window.clearInterval(interval);
  }, [phase]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section || !ready) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    const getProgress = () => {
      const rect = section.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      return scrollable > 0 ? Math.min(1, Math.max(0, -rect.top / scrollable)) : 0;
    };

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "high";
      renderFrame(currentFrameRef.current, getProgress());
    };

    const renderFrame = (frame: number, progress: number) => {
      const fallbackDirection = frame > currentFrameRef.current ? -1 : 1;
      let image = imagesRef.current[frame];

      if (!image?.complete) {
        for (let step = 1; step < FRAME_COUNT; step += 1) {
          const fallback = imagesRef.current[frame + step * fallbackDirection] || imagesRef.current[frame - step * fallbackDirection];
          if (fallback?.complete) {
            image = fallback;
            break;
          }
        }
      }

      if (!image?.complete) {
        return;
      }

      const rect = canvas.getBoundingClientRect();
      drawContain(context, image, rect.width, rect.height, progress);
      currentFrameRef.current = frame;
    };

    const updateFromScroll = () => {
      requestedRef.current = null;
      const progress = getProgress();
      const frame = Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(progress * (FRAME_COUNT - 1))));
      const nextPhase = progress > 0.38 ? "settled" : "opening";

      if (nextPhase !== phaseRef.current) {
        phaseRef.current = nextPhase;
        setPhase(nextPhase);
      }

      renderFrame(frame, progress);
    };

    const requestUpdate = () => {
      if (requestedRef.current !== null) {
        return;
      }
      requestedRef.current = window.requestAnimationFrame(updateFromScroll);
    };

    resizeCanvas();
    updateFromScroll();

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", resizeCanvas);
      if (requestedRef.current !== null) {
        window.cancelAnimationFrame(requestedRef.current);
      }
    };
  }, [ready]);

  return (
    <section ref={sectionRef} className="relative min-h-[265vh] border-b border-ink/10 bg-ivory">
      <div className="sticky top-0 min-h-screen overflow-hidden bg-ivory">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-100 contrast-[1.08] saturate-[1.04] transition-opacity duration-300" width={1920} height={1080} aria-hidden="true" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,253,247,0.66)_0%,rgba(255,253,247,0.46)_36%,rgba(255,253,247,0.86)_72%,rgba(255,253,247,0.98)_100%)] sm:bg-[linear-gradient(90deg,rgba(255,253,247,0.58)_0%,rgba(255,253,247,0.32)_42%,rgba(255,253,247,0.16)_72%,rgba(255,253,247,0.64)_100%)] lg:bg-[linear-gradient(90deg,rgba(255,253,247,0.34)_0%,rgba(255,253,247,0.10)_34%,rgba(255,253,247,0.02)_55%,rgba(255,253,247,0.46)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_49%_46%,rgba(176,138,60,0.045),transparent_34%)]" />

        {!ready ? (
          <div className="absolute inset-0 z-30 grid place-items-center bg-ivory">
            <div className="flex flex-col items-center gap-5">
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-gold/50 to-transparent editorial-pulse" />
              <span className="text-xs uppercase tracking-[0.28em] text-charcoal/45 editorial-pulse">Preparing the desk</span>
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-gold/30 to-transparent editorial-pulse" style={{ animationDelay: '0.5s' }} />
            </div>
          </div>
        ) : null}

        <div className="relative z-10 flex min-h-screen items-center px-5 pb-10 pt-24 sm:px-8 lg:pb-0">
          <div className="mx-auto grid w-full min-w-0 max-w-7xl items-center gap-10 lg:grid-cols-[0.92fr_1.08fr]">
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: phase === "opening" ? 1 : 0, y: phase === "opening" ? 0 : -18 }}
              transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
              className="relative w-full min-w-0 max-w-[calc(100vw-2.5rem)] border border-ink/10 bg-ivory/94 p-5 shadow-[0_24px_80px_rgba(17,17,15,0.07)] backdrop-blur-md sm:max-w-[34rem] sm:p-6 lg:col-start-2 lg:row-start-1 lg:justify-self-end lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none lg:backdrop-blur-0"
              aria-hidden={phase !== "opening"}
            >
              <Image
                src="/assets/logo.png"
                alt="My Editing and Proofreading Desk"
                width={104}
                height={58}
                priority
                sizes="(max-width: 639px) 28vw"
                className="pointer-events-none absolute right-5 top-6 h-auto w-[clamp(4.75rem,24vw,6.25rem)] opacity-85 sm:hidden"
              />
              <p className="mb-6 text-xs uppercase tracking-[0.32em] text-gold-deep">Premium editorial desk</p>
              <h1 className="max-w-[8.5ch] text-wrap font-display text-[clamp(2.15rem,9.8vw,2.75rem)] leading-[0.96] text-ink sm:max-w-[11ch] sm:text-[clamp(3.25rem,7vw,5.9rem)] sm:leading-[0.92]">
                Editorial care for documents that matter.
              </h1>
              <div className="mt-7 flex min-h-12 min-w-0 flex-wrap items-center gap-x-4 gap-y-2 border-y border-ink/10 py-3">
                <span className="shrink-0 text-xs uppercase tracking-[0.26em] text-charcoal/45">Focused on</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={serviceWords[wordIndex]}
                    initial={{ opacity: 0, y: 10, filter: "blur(3px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -10, filter: "blur(3px)" }}
                    transition={{ duration: 0.38, ease: [0.23, 1, 0.32, 1] }}
                    className="font-display text-2xl leading-none text-gold-deep sm:text-3xl"
                  >
                    {serviceWords[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
              <p className="mt-7 max-w-[20.5rem] text-base leading-7 text-charcoal/72 sm:max-w-lg sm:text-lg sm:leading-8">
                A refined editorial platform for academic, business, manuscript, and personal documents that need to read with confidence.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="/login" className="inline-flex min-h-12 w-full items-center justify-center bg-ink px-7 text-sm text-ivory transition duration-200 ease-premium-out hover:bg-gold-deep active:scale-[0.98] sm:w-auto">
                  Start a project
                </a>
                <a href="/services" className="inline-flex min-h-12 w-full items-center justify-center border border-ink/15 bg-ivory/96 px-7 text-sm text-ink transition duration-200 ease-premium-out hover:border-gold hover:text-gold-deep active:scale-[0.98] sm:w-auto lg:bg-transparent">
                  Explore services
                </a>
              </div>
            </motion.div>

            <motion.aside
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: phase === "settled" ? 1 : 0, x: phase === "settled" ? 0 : -18 }}
              transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
              className={`hidden w-full max-w-[24.5rem] lg:col-start-1 lg:row-start-1 lg:block ${phase === "settled" ? "" : "pointer-events-none"}`}
              aria-hidden={phase !== "settled"}
            >
              <div className="mb-6 flex items-center gap-4">
                <p className="shrink-0 text-xs uppercase tracking-[0.32em] text-gold-deep">Editorial coverage</p>
                <span className="h-px flex-1 bg-gradient-to-r from-gold/35 to-transparent" aria-hidden="true" />
              </div>
              <div className="relative grid gap-3.5 pl-4">
                <span className="absolute bottom-6 left-0 top-6 w-px bg-gradient-to-b from-gold/5 via-gold/35 to-gold/5" aria-hidden="true" />
                {supportSignals.map((item, index) => (
                  <motion.div
                    key={item.label}
                    animate={{
                      opacity: phase === "settled" ? 1 : 0,
                      y: phase === "settled" ? 0 : 10
                    }}
                    transition={{ delay: index * 0.06, duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
                    className="group relative overflow-hidden border border-ink/10 bg-ivory/76 p-5 shadow-[0_18px_65px_rgba(17,17,15,0.045)] backdrop-blur-md transition duration-300 ease-premium-out hover:-translate-y-0.5 hover:border-gold/40 hover:bg-ivory/94 hover:shadow-[0_24px_80px_rgba(17,17,15,0.075)]"
                  >
                    <span className="absolute -left-4 top-1/2 h-2.5 w-2.5 -translate-y-1/2 border border-gold/55 bg-ivory shadow-[0_0_0_5px_rgba(255,253,247,0.72)]" aria-hidden="true" />
                    <span className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-transparent via-gold/35 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" aria-hidden="true" />
                    <div className="flex items-start gap-4">
                      <span className="grid h-10 w-10 shrink-0 place-items-center border border-ink/10 bg-paper/70 text-charcoal/48 transition duration-200 ease-premium-out group-hover:border-gold/50 group-hover:bg-gold/10 group-hover:text-gold-deep">
                        <SignalIcon index={index} />
                      </span>
                      <span className="min-w-0">
                        <span className="mb-2 block text-[0.64rem] uppercase tracking-[0.24em] text-charcoal/36 transition duration-200 group-hover:text-gold-deep/70">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="block font-display text-[1.7rem] leading-none text-ink">{item.label}</span>
                      </span>
                    </div>
                    <p className="mt-4 border-t border-ink/10 pt-3 text-[0.92rem] leading-6 text-charcoal/64 transition duration-200 group-hover:border-gold/20 group-hover:text-charcoal/76">{item.detail}</p>
                  </motion.div>
                ))}
              </div>
            </motion.aside>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: phase === "settled" ? 1 : 0, y: phase === "settled" ? 0 : 18 }}
              transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
              className={`w-full min-w-0 max-w-[37rem] lg:col-start-2 lg:row-start-1 lg:-mt-24 lg:justify-self-end xl:-mt-28 ${phase === "settled" ? "" : "pointer-events-none"}`}
              aria-hidden={phase !== "settled"}
            >
              <p className="text-xs uppercase tracking-[0.28em] text-gold-deep">Editorial paths</p>
              <div className="relative mt-6 min-h-[32rem] sm:min-h-[31rem]">
                {editorialCards.map((card, index) => {
                  const active = index === cardIndex;
                  const offset = index - cardIndex;

                  return (
                    <motion.article
                      key={card.label}
                      animate={{
                        opacity: active ? 1 : 0.2,
                        x: active ? 0 : offset * 24,
                        y: active ? 0 : Math.abs(offset) * 14,
                        rotate: active ? 0 : offset * 2.2,
                        scale: active ? 1 : 0.95 - Math.min(Math.abs(offset), 2) * 0.02,
                        zIndex: active ? 20 : 10 - Math.abs(offset)
                      }}
                      transition={{ duration: 0.62, ease: [0.23, 1, 0.32, 1] }}
                      className="absolute inset-x-0 top-0 overflow-hidden border border-ink/10 bg-ivory shadow-[0_26px_90px_rgba(17,17,15,0.14)]"
                    >
                      <div className="relative aspect-[1.32] overflow-hidden bg-linen sm:aspect-[1.42]">
                        <Image src={card.image} alt="" fill unoptimized sizes="(min-width: 1024px) 38vw, 90vw" className="object-cover" />
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,17,15,0.24),transparent_34%,rgba(17,17,15,0.06))]" />
                        <span className="absolute left-5 top-5 border border-ivory/45 bg-ink/28 px-4 py-2 text-xs uppercase tracking-[0.3em] text-ivory backdrop-blur-md sm:left-7 sm:top-7">
                          {card.label}
                        </span>
                      </div>
                      <div className="border-t border-ink/10 bg-ivory p-5 sm:p-6">
                        <div className="flex items-start justify-between gap-6">
                          <h2 className="max-w-md font-display text-[clamp(1.55rem,6vw,2.2rem)] leading-[1.02] text-ink sm:text-[clamp(1.75rem,2.15vw,2.35rem)]">{card.title}</h2>
                          <span className="hidden font-display text-2xl text-gold-deep/42 sm:block">{String(index + 1).padStart(2, "0")}</span>
                        </div>
                        <p className="mt-3 max-w-md text-[0.82rem] leading-5 text-charcoal/66">{card.body}</p>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
              <div className="mt-6 grid grid-cols-4 gap-2" aria-hidden="true">
                {editorialCards.map((item, index) => (
                  <span key={item.label} className={`h-px transition-colors duration-300 ${index === cardIndex ? "bg-gold-deep" : "bg-ink/15"}`} />
                ))}
              </div>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}
