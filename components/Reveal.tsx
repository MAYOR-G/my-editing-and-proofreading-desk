"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type ReactNode, useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

type RevealVariant = "fadeUp" | "fadeLeft" | "fadeRight" | "scale";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: RevealVariant;
};

const variantConfig: Record<RevealVariant, { from: gsap.TweenVars }> = {
  fadeUp: { from: { autoAlpha: 0, y: 28 } },
  fadeLeft: { from: { autoAlpha: 0, x: -28 } },
  fadeRight: { from: { autoAlpha: 0, x: 28 } },
  scale: { from: { autoAlpha: 0, scale: 0.96 } }
};

export function Reveal({ children, className, delay = 0, variant = "fadeUp" }: RevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const config = variantConfig[variant];

  useGSAP(
    () => {
      const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (isReducedMotion) {
        gsap.set(containerRef.current, { autoAlpha: 1, y: 0, x: 0, scale: 1 });
        return;
      }

      gsap.fromTo(
        containerRef.current,
        config.from,
        {
          autoAlpha: 1,
          y: 0,
          x: 0,
          scale: 1,
          duration: 1,
          delay: delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 90%",
            once: true,
          },
        }
      );
    },
    { scope: containerRef }
  );

  return <div ref={containerRef} className={className}>{children}</div>;
}
