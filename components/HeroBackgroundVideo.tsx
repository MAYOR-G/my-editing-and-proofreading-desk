"use client";

import { useEffect, useRef, useState } from "react";

const HERO_VIDEO_URL = "https://pub-9f4f9c9b1b3e477aba4991ccfd92f1ae.r2.dev/intro.mp4";

type HeroBackgroundVideoProps = {
  className?: string;
};

export function HeroBackgroundVideo({ className = "" }: HeroBackgroundVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const reducedData = window.matchMedia("(prefers-reduced-data: reduce)").matches;

    if (reducedMotion || reducedData) {
      return;
    }

    let cancelled = false;
    let idleId: number | null = null;
    let timerId: ReturnType<typeof globalThis.setTimeout> | null = null;

    const loadVideo = () => {
      if (!cancelled) {
        setShouldLoad(true);
      }
    };

    const scheduleLoad = () => {
      if ("requestIdleCallback" in window) {
        idleId = window.requestIdleCallback(loadVideo, { timeout: 1200 });
        return;
      }

      timerId = globalThis.setTimeout(loadVideo, 250);
    };

    const node = containerRef.current;
    if (!node || !("IntersectionObserver" in window)) {
      scheduleLoad();
      return () => {
        cancelled = true;
        if (timerId !== null) {
          globalThis.clearTimeout(timerId);
        }
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          scheduleLoad();
        }
      },
      { rootMargin: "320px" }
    );

    observer.observe(node);

    return () => {
      cancelled = true;
      observer.disconnect();

      if (idleId !== null && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }

      if (timerId !== null) {
        globalThis.clearTimeout(timerId);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden bg-ink ${className}`} aria-hidden="true">
      {shouldLoad ? (
        <video
          className="h-full w-full object-cover opacity-45 saturate-[0.72] contrast-[0.92]"
          muted
          playsInline
          loop
          autoPlay
          preload="none"
          poster="/assets/premium_desk.png"
          disablePictureInPicture
        >
          <source src={HERO_VIDEO_URL} type="video/mp4" />
        </video>
      ) : null}
    </div>
  );
}
