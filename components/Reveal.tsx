"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type ReactNode, useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

type RevealVariant = "fadeUp" | "fadeDown" | "fadeLeft" | "fadeRight" | "scale" | "clipUp" | "softBlur";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: RevealVariant;
};

const variantConfig: Record<RevealVariant, { from: gsap.TweenVars; to?: gsap.TweenVars }> = {
  fadeUp: { from: { autoAlpha: 0, y: 54 } },
  fadeDown: { from: { autoAlpha: 0, y: -38 } },
  fadeLeft: { from: { autoAlpha: 0, x: -72 } },
  fadeRight: { from: { autoAlpha: 0, x: 72 } },
  scale: { from: { autoAlpha: 0, scale: 0.94 } },
  clipUp: {
    from: { autoAlpha: 0, y: 34, clipPath: "inset(18% 0% 0% 0%)" },
    to: { clipPath: "inset(0% 0% 0% 0%)" }
  },
  softBlur: {
    from: { autoAlpha: 0, y: 24, filter: "blur(10px)" },
    to: { filter: "blur(0px)" }
  }
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
          ...config.to,
          duration: variant === "clipUp" ? 1.05 : 0.9,
          delay: delay,
          ease: "expo.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 86%",
            once: true,
          },
        }
      );
    },
    { scope: containerRef }
  );

  return <div ref={containerRef} className={className}>{children}</div>;
}
