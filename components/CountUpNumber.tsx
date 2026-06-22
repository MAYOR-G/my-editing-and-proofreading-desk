"use client";

import { motion } from "framer-motion";

type CountUpNumberProps = {
  target: number;
  suffix?: string;
  prefix?: string;
  className?: string;
};

export function CountUpNumber({
  target,
  suffix = "",
  prefix = "",
  className
}: CountUpNumberProps) {
  const finalValue = `${prefix}${target.toLocaleString("en-US")}${suffix}`;

  return (
    <motion.span
      className={className}
      aria-label={finalValue}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
    >
      {finalValue}
    </motion.span>
  );
}
