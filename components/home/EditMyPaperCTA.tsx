"use client";

import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { ArrowRight, CheckCircle2, Clock, FileText, PenLine } from "lucide-react";

const quickBenefits = [
  { text: "Grammar, spelling, and punctuation fixes", icon: CheckCircle2 },
  { text: "Structure, clarity, and flow improvements", icon: PenLine },
  { text: "Formatting and reference consistency", icon: FileText },
  { text: "Average turnaround: 48–72 hours", icon: Clock },
];

export function EditMyPaperCTA() {
  return (
    <section className="bg-white py-24 sm:py-32 px-5 sm:px-10 border-t border-ink/5 relative overflow-hidden">
      {/* Decorative background */}
      <div className="pointer-events-none absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/[0.03] blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-accent/[0.04] blur-[80px]" />

      <div className="max-w-screen-xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left: Content */}
          <Reveal variant="fadeUp">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-2 h-2 bg-accent rounded-full" />
                <p className="text-xs uppercase tracking-[0.2em] text-primary font-bold">Submit Your Paper</p>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-ink leading-tight mb-6 font-bold tracking-tight">
                Need someone to edit your paper?
              </h2>
              <p className="text-charcoal/80 text-base sm:text-lg leading-relaxed mb-10 max-w-lg">
                Whether it&apos;s a research paper, thesis chapter, dissertation section, or any academic
                or professional document — upload it and a human editor will review every line for
                clarity, grammar, structure, and tone.
              </p>

              <div className="space-y-4 mb-10">
                {quickBenefits.map((benefit) => (
                  <div key={benefit.text} className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded-xl bg-primary/5 flex items-center justify-center text-primary shrink-0 border border-primary/10">
                      <benefit.icon className="w-4.5 h-4.5" strokeWidth={2} />
                    </div>
                    <span className="text-charcoal/80 text-sm sm:text-base font-medium">{benefit.text}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/submit"
                  className="group inline-flex h-14 items-center justify-center bg-primary px-10 text-sm font-semibold text-white transition-all hover:bg-primary-active hover:scale-[1.02] shadow-[0_10px_30px_rgba(15,59,127,0.2)] rounded-full"
                >
                  Submit Your Paper Now
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </Link>
                <Link
                  href="/editing-services"
                  className="inline-flex h-14 items-center justify-center border-2 border-primary/20 bg-transparent px-8 text-sm font-semibold text-primary transition-all hover:border-primary hover:bg-primary/5 rounded-full"
                >
                  See Our Editing Services
                </Link>
              </div>
            </div>
          </Reveal>

          {/* Right: Visual Card Stack */}
          <Reveal variant="fadeUp" delay={0.15}>
            <div className="relative">
              {/* Main card */}
              <div className="bg-[#f7f9fc] border border-ink/5 rounded-3xl p-8 sm:p-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-primary/[0.03] rounded-bl-[100px]" />

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <PenLine className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-primary font-bold">Paper Editing</p>
                      <p className="text-[11px] text-charcoal/50 font-medium">Human review included</p>
                    </div>
                  </div>

                  {/* Document types */}
                  <div className="space-y-3 mb-8">
                    {[
                      "Research Paper",
                      "Thesis / Dissertation",
                      "Journal Article",
                      "Academic Essay",
                      "Business Report",
                      "Personal Statement",
                    ].map((type) => (
                      <div key={type} className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-ink/5 shadow-sm">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span className="text-sm font-medium text-ink">{type}</span>
                      </div>
                    ))}
                  </div>

                  <p className="text-charcoal/60 text-xs text-center">
                    All document types supported • From $0.03/word
                  </p>
                </div>
              </div>

              {/* Floating micro-badge */}
              <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 bg-white rounded-2xl p-4 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.12)] border border-ink/5 flex items-center gap-3 z-20">
                <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-ink text-sm leading-none mb-0.5">30,000+</p>
                  <p className="text-charcoal/60 text-[10px] uppercase tracking-wider font-semibold">Papers Edited</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
