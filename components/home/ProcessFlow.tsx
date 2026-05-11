"use client";

import { motion } from "framer-motion";
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
  return (
    <section className="relative overflow-hidden border-y border-ink/5 bg-[linear-gradient(180deg,#f7fbff_0%,#ffffff_48%,#f4f8fd_100%)] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[radial-gradient(circle_at_50%_0%,rgba(37,106,168,0.12),transparent_58%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-[radial-gradient(circle_at_50%_100%,rgba(23,74,124,0.08),transparent_60%)]" />

      <div className="relative z-10 mx-auto max-w-screen-2xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
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
                initial={{ opacity: 0, y: 34, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.58, delay: 0.12 + index * 0.12, ease: [0.23, 1, 0.32, 1] }}
                className="group relative flex min-h-[282px] w-full max-w-[330px] flex-col items-center rounded-[1.15rem] border border-primary/10 bg-white/90 px-6 pb-7 pt-10 text-center shadow-[0_14px_42px_rgba(13,42,73,0.065)] backdrop-blur transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/20 hover:shadow-[0_22px_62px_rgba(13,42,73,0.12)] sm:px-7 lg:max-w-none"
              >
                {index !== processSteps.length - 1 && (
                  <>
                    <motion.div
                      initial={{ opacity: 0, scaleX: 0 }}
                      whileInView={{ opacity: 1, scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.46, delay: 0.42 + index * 0.12, ease: [0.23, 1, 0.32, 1] }}
                      className="absolute left-full top-[95px] z-20 hidden h-[2px] w-7 origin-left bg-primary lg:block"
                    >
                      <span className="absolute -left-1 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-[#1f7df2] shadow-[0_0_0_5px_rgba(37,106,168,0.08)]" />
                      <span className="absolute -right-[1px] top-1/2 h-2.5 w-2.5 -translate-y-1/2 rotate-45 border-r-2 border-t-2 border-primary" />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.42, delay: 0.42 + index * 0.12, ease: [0.23, 1, 0.32, 1] }}
                      className="absolute -bottom-9 left-1/2 z-0 h-8 w-[2px] -translate-x-1/2 bg-primary/[0.55] lg:hidden"
                    >
                      <span className="absolute -bottom-1 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rotate-[135deg] border-r-2 border-t-2 border-primary" />
                    </motion.div>
                  </>
                )}

                <div className="absolute -top-5 left-1/2 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full bg-[linear-gradient(135deg,#2d8cff,#174a7c)] text-base font-bold text-white shadow-[0_10px_24px_rgba(31,125,242,0.30)] ring-[6px] ring-white">
                  {index + 1}
                </div>

                <div className="mb-6 flex h-28 w-28 items-center justify-center rounded-full border border-primary/5 bg-[radial-gradient(circle_at_35%_30%,#ffffff_0%,#eaf4ff_54%,#dcecff_100%)] shadow-[inset_0_0_0_9px_rgba(255,255,255,0.42),0_14px_32px_rgba(37,106,168,0.10)] transition-all duration-500 group-hover:scale-[1.04] group-hover:shadow-[inset_0_0_0_9px_rgba(255,255,255,0.56),0_18px_42px_rgba(31,125,242,0.16)]">
                  <div className="relative flex h-[68px] w-[68px] items-center justify-center rounded-2xl bg-white/70 text-primary shadow-[0_10px_22px_rgba(31,125,242,0.16)]">
                    <span className="absolute -left-3 top-4 h-1.5 w-1.5 rotate-45 rounded-[2px] border border-[#2d8cff]" />
                    <span className="absolute -right-2 top-6 h-1.5 w-1.5 rotate-45 rounded-[2px] bg-[#2d8cff]/70" />
                    <step.icon className="h-8 w-8 drop-shadow-[0_6px_10px_rgba(31,125,242,0.20)] transition-transform duration-500 group-hover:scale-110" strokeWidth={1.8} />
                  </div>
                </div>

                <h3 className="mb-3 max-w-[13rem] text-lg font-extrabold leading-tight tracking-tight text-[#0e2145]">
                  {step.title}
                </h3>
                <p className="max-w-[15.5rem] text-[0.86rem] leading-6 text-charcoal/[0.72]">{step.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="mx-auto mt-10 grid max-w-4xl gap-4 rounded-[1.15rem] border border-primary/10 bg-white/[0.92] p-4 shadow-[0_14px_44px_rgba(13,42,73,0.075)] backdrop-blur sm:p-5 md:grid-cols-3 md:gap-0"
          >
            {trustItems.map((item) => (
              <div
                key={item.title}
                className="flex items-center gap-3 rounded-2xl px-2 py-1.5 md:rounded-none md:px-5 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-primary/10 md:[&:not(:last-child)]:border-b-0 md:[&:not(:last-child)]:border-r"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/[0.07] text-primary">
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
