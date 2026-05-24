"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Award, Calculator, FileCheck2, FilePenLine, ShieldCheck, UploadCloud, Zap } from "lucide-react";

const processSteps = [
  {
    title: "Submit your document",
    desc: "Log in and upload your file through your personal dashboard.",
    icon: UploadCloud
  },
  {
    title: "Get your word count and price",
    desc: "The platform reviews your document details and gives you a clear estimate.",
    icon: Calculator
  },
  {
    title: "Your editor gets to work",
    desc: "A human editor improves clarity, grammar, structure, tone, and flow.",
    icon: FilePenLine
  },
  {
    title: "Receive your polished file",
    desc: "Get your edited document back with careful improvements and helpful comments where needed.",
    icon: FileCheck2
  }
];

const trustItems = [
  {
    title: "Secure & Confidential",
    desc: "Your data is safe with us.",
    icon: ShieldCheck
  },
  {
    title: "Fast Turnaround",
    desc: "Quick delivery, every time.",
    icon: Zap
  },
  {
    title: "Expert Editors",
    desc: "Professional editors, real results.",
    icon: Award
  }
];

export function ProcessFlow() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-y border-ink/5 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_46%,#f5f9fd_100%)] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[radial-gradient(circle_at_50%_0%,rgba(37,106,168,0.095),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-[radial-gradient(circle_at_50%_100%,rgba(23,74,124,0.055),transparent_62%)]" />

      <div className="relative z-10 mx-auto max-w-screen-2xl">
        <motion.div
          className="mx-auto mb-12 max-w-3xl text-center sm:mb-14 lg:mb-16"
        >
          <div className="mb-4 inline-flex rounded-full border border-primary/10 bg-primary/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.24em] text-primary shadow-sm">
            Simple Process
          </div>
          <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-[#102246] sm:text-4xl lg:text-5xl">
            How It Works
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-charcoal/75 sm:text-base">
            Getting your document polished is simple. Follow these four easy steps and receive high-quality results.
          </p>
        </motion.div>

        <div className="mx-auto max-w-[1280px]">
          <div className="grid grid-cols-1 justify-items-center gap-11 md:grid-cols-2 md:gap-x-6 md:gap-y-12 lg:grid-cols-4 lg:gap-7">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.title}
                className="group relative flex min-h-[282px] w-full max-w-[330px] flex-col items-center rounded-[1.05rem] border border-[#d9e5f1] bg-white px-6 pb-7 pt-10 text-center shadow-[0_18px_38px_rgba(14,42,72,0.055),inset_0_1px_0_rgba(255,255,255,0.9)] transition-all duration-500 ease-premium-out hover:-translate-y-1 hover:border-primary/25 hover:shadow-[0_22px_48px_rgba(14,42,72,0.09),inset_0_1px_0_rgba(255,255,255,0.95)] sm:px-7 lg:max-w-none"
              >
                {index !== processSteps.length - 1 && (
                  <>
                    <motion.div
                      className="absolute left-[calc(100%+0.125rem)] top-[103px] z-20 hidden h-px w-[1.5rem] origin-left bg-primary/45 lg:block"
                    >
                      <span className="absolute -left-1 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_0_4px_rgba(37,106,168,0.08)]" />
                      <span className="absolute -right-px top-1/2 h-2.5 w-2.5 -translate-y-1/2 rotate-45 border-r-[1.5px] border-t-[1.5px] border-primary/70" />
                    </motion.div>

                    <motion.div
                      className="absolute -bottom-9 left-1/2 z-0 h-8 w-px -translate-x-1/2 bg-primary/35 lg:hidden"
                    >
                      <span className="absolute -bottom-1 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rotate-[135deg] border-r-[1.5px] border-t-[1.5px] border-primary/70" />
                    </motion.div>
                  </>
                )}

                <div className="absolute -top-5 left-1/2 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full bg-[linear-gradient(135deg,#2b82ea,#174a7c)] text-base font-bold text-white shadow-[0_10px_20px_rgba(31,105,180,0.22)] ring-[6px] ring-white">
                  {index + 1}
                </div>

                <motion.div
                  animate={shouldReduceMotion ? undefined : { y: [0, -4, 0] }}
                  transition={shouldReduceMotion ? undefined : { duration: 5.5, repeat: Infinity, delay: index * 0.28, ease: "easeInOut" }}
                  className="mb-6 flex h-28 w-28 items-center justify-center rounded-full border border-primary/10 bg-[radial-gradient(circle_at_38%_28%,#ffffff_0%,#eef7ff_55%,#e4f0fb_100%)] shadow-[inset_0_0_0_10px_rgba(255,255,255,0.58),0_12px_26px_rgba(37,106,168,0.075)] transition-all duration-500 group-hover:shadow-[inset_0_0_0_10px_rgba(255,255,255,0.68),0_16px_34px_rgba(31,105,180,0.12)]"
                >
                  <div className="relative flex h-[70px] w-[70px] items-center justify-center rounded-[1.05rem] border border-primary/5 bg-white/82 text-primary shadow-[0_10px_20px_rgba(37,106,168,0.095)] transition-transform duration-500 ease-premium-out group-hover:-translate-y-0.5">
                    <span className="absolute inset-[-15px] rounded-full border border-primary/10 opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
                    <motion.span
                      aria-hidden="true"
                      animate={shouldReduceMotion ? undefined : { rotate: 360 }}
                      transition={shouldReduceMotion ? undefined : { duration: 12, repeat: Infinity, ease: "linear", delay: index * 0.2 }}
                      className="absolute inset-[-17px] rounded-full before:absolute before:left-1/2 before:top-[-3px] before:h-1.5 before:w-1.5 before:-translate-x-1/2 before:rounded-full before:bg-primary/65 before:shadow-[0_0_0_4px_rgba(37,106,168,0.08)]"
                    />
                    <span className="absolute -left-3 top-4 h-1.5 w-1.5 rotate-45 rounded-[2px] border border-primary/60 transition-transform duration-500 group-hover:-translate-x-0.5" />
                    <span className="absolute -right-2 top-6 h-1.5 w-1.5 rotate-45 rounded-[2px] bg-primary/55 transition-transform duration-500 group-hover:translate-x-0.5" />
                    <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-[1.05rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      <span className="absolute inset-y-0 -left-8 w-8 rotate-12 bg-white/55 blur-[1px] transition-transform duration-700 group-hover:translate-x-28" />
                    </span>
                    <step.icon className="relative h-8 w-8 drop-shadow-[0_5px_8px_rgba(31,105,180,0.16)] transition-transform duration-500 ease-premium-out group-hover:-translate-y-0.5" strokeWidth={1.8} />
                  </div>
                </motion.div>

                <h3 className="mb-3 max-w-[13rem] text-lg font-extrabold leading-tight tracking-tight text-[#0e2145]">
                  {step.title}
                </h3>
                <p className="max-w-[15.5rem] text-[0.86rem] leading-6 text-charcoal/[0.72]">{step.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mx-auto mt-10 grid max-w-4xl gap-0 overflow-hidden rounded-[1.05rem] border border-[#dce6f0] bg-white/95 p-3 shadow-[0_18px_42px_rgba(14,42,72,0.07)] backdrop-blur sm:p-4 md:grid-cols-3"
          >
            {trustItems.map((item) => (
              <div
                key={item.title}
                className="flex items-center gap-3 px-3 py-3 md:px-6 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-primary/10 md:[&:not(:last-child)]:border-b-0 md:[&:not(:last-child)]:border-r"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-primary/10 bg-[#f1f5f9] text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]">
                  <item.icon className="h-5 w-5" strokeWidth={1.9} />
                </div>
                <div>
                  <h4 className="text-[0.82rem] font-extrabold text-[#0e2145]">{item.title}</h4>
                  <p className="mt-0.5 text-xs leading-5 text-charcoal/70">{item.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
