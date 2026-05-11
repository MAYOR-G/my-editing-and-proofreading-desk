"use client";

import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

type CountUpNumberProps = {
  target: number;
  suffix?: string;
  prefix?: string;
  start?: number;
  duration?: number;
  className?: string;
};

export function CountUpNumber({
  target,
  suffix = "",
  prefix = "",
  start = 1,
  duration = 1.15,
  className
}: CountUpNumberProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-12% 0px" });
  const prefersReducedMotion = useReducedMotion();
  const value = useMotionValue(start);
  const displayValue = useTransform(value, (latest) => {
    return `${prefix}${Math.round(latest).toLocaleString("en-US")}${suffix}`;
  });

  useEffect(() => {
    if (!isInView) return;

    if (prefersReducedMotion) {
      value.set(target);
      return;
    }

    const controls = animate(value, target, {
      duration,
      ease: [0.23, 1, 0.32, 1]
    });

    return () => controls.stop();
  }, [duration, isInView, prefersReducedMotion, target, value]);

  return (
    <motion.span ref={ref} className={className} aria-label={`${prefix}${target.toLocaleString("en-US")}${suffix}`}>
      {displayValue}
    </motion.span>
  );
}
