"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const INTRO_RATE = 1.75;
const MAX_INTRO_MS = 5200;
const FALLBACK_MS = 1400;

let introPlayedThisRuntime = false;

export function IntroGate() {
  const [visible, setVisible] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [fallback, setFallback] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const finishedRef = useRef(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    const shouldSkip = window.location.search.includes("skipIntro=1");
    if (shouldSkip) {
      introPlayedThisRuntime = true;
      return;
    }
    if (!introPlayedThisRuntime) {
      setVideoReady(false);
      setFallback(false);
      setVisible(true);
    }
  }, [reducedMotion]);

  useEffect(() => {
    if (!visible) {
      return;
    }

    finishedRef.current = false;
    const maxTimer = window.setTimeout(finishIntro, MAX_INTRO_MS);
    const playTimer = window.setTimeout(() => {
      const video = videoRef.current;

      if (!video) {
        setFallback(true);
        window.setTimeout(finishIntro, FALLBACK_MS);
        return;
      }

      video.playbackRate = INTRO_RATE;
      const playAttempt = video.play();

      if (playAttempt) {
        playAttempt.catch(() => {
          setFallback(true);
          window.setTimeout(finishIntro, FALLBACK_MS);
        });
      }
    }, 80);

    return () => {
      window.clearTimeout(maxTimer);
      window.clearTimeout(playTimer);
    };
  }, [visible]);

  function finishIntro() {
    if (finishedRef.current) {
      return;
    }

    finishedRef.current = true;
    introPlayedThisRuntime = true;
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-ivory"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(4px)" }}
          transition={{ duration: 0.85, ease: [0.23, 1, 0.32, 1] }}
          aria-label="Opening brand animation"
          role="status"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(176,138,60,0.13),transparent_34%),linear-gradient(180deg,#fffdf7_0%,#fbf6eb_54%,#f1e8d8_100%)]" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/35 to-transparent" />

          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: videoReady || fallback ? 0 : 1 }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="absolute left-1/2 top-1/2 h-px w-40 -translate-x-1/2 -translate-y-1/2 bg-gold/35" />
          </motion.div>

          <video
            ref={videoRef}
            src="/assets/intro.mp4"
            className="absolute inset-0 z-10 h-full w-full object-contain object-center mix-blend-multiply sm:scale-[1.03] sm:object-cover"
            autoPlay
            muted
            playsInline
            preload="auto"
            onLoadedMetadata={(event) => {
              event.currentTarget.playbackRate = INTRO_RATE;
            }}
            onCanPlay={() => setVideoReady(true)}
            onEnded={finishIntro}
            onError={() => {
              setFallback(true);
              window.setTimeout(finishIntro, FALLBACK_MS);
            }}
          />

          <AnimatePresence>
            {fallback ? (
              <motion.div
                className="absolute inset-0 z-20 grid place-items-center bg-ivory/88 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
              >
                <div className="relative h-24 w-44">
                  <Image src="/assets/logo.png" alt="My Editing and Proofreading Desk" fill priority sizes="176px" className="object-contain" />
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <div className="pointer-events-none absolute bottom-10 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-4">
            <div className="relative h-12 w-24 opacity-65">
              <Image src="/assets/logo.png" alt="" fill priority sizes="96px" className="object-contain" />
            </div>
            <span className="text-xs uppercase tracking-[0.36em] text-charcoal/50">{fallback ? "Opening the desk" : "Preparing the desk"}</span>
          </div>

          <button
            type="button"
            onClick={finishIntro}
            className="absolute right-5 top-5 z-30 min-h-10 border border-ink/10 bg-ivory/62 px-4 text-xs uppercase tracking-[0.2em] text-charcoal/58 backdrop-blur-md transition duration-200 ease-premium-out hover:border-gold hover:text-ink active:scale-[0.98]"
          >
            Skip
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
