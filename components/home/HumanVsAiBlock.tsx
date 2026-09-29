"use client";

import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import {
  Brain,
  CheckCircle2,
  CircleSlash,
  Eye,
  HeartHandshake,
  MessageSquareText,
  Sparkles,
  UserCheck,
  XCircle,
} from "lucide-react";

const comparisonRows = [
  {
    feature: "Understands your intent and argument",
    human: true,
    ai: false,
  },
  {
    feature: "Preserves your voice and academic tone",
    human: true,
    ai: false,
  },
  {
    feature: "Catches logical inconsistencies",
    human: true,
    ai: false,
  },
  {
    feature: "Improves sentence flow and readability",
    human: true,
    ai: "partial",
  },
  {
    feature: "Fixes grammar, spelling, and punctuation",
    human: true,
    ai: true,
  },
  {
    feature: "Provides contextual editorial comments",
    human: true,
    ai: false,
  },
  {
    feature: "Handles discipline-specific terminology",
    human: true,
    ai: false,
  },
  {
    feature: "Works instantly on short drafts",
    human: false,
    ai: true,
  },
];

export function HumanVsAiBlock() {
  return (
    <section className="bg-[#f7f9fc] py-24 sm:py-32 px-5 sm:px-10 border-t border-b border-ink/5 relative overflow-hidden">
      {/* Subtle background accents */}
      <div className="pointer-events-none absolute top-20 left-1/4 w-[400px] h-[400px] rounded-full bg-primary/[0.03] blur-[100px]" />
      <div className="pointer-events-none absolute bottom-20 right-1/4 w-[350px] h-[350px] rounded-full bg-accent/[0.04] blur-[80px]" />

      <div className="max-w-screen-xl mx-auto relative z-10">
        {/* Header */}
        <Reveal variant="fadeUp">
          <div className="text-center mb-16">
            <div className="mb-4 inline-flex rounded-full border border-primary/10 bg-primary/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.24em] text-primary shadow-sm">
              Human vs AI Editing
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-ink leading-tight font-bold tracking-tight mb-5">
              Why human editors still matter
            </h2>
            <p className="text-charcoal/70 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              AI tools help with surface-level corrections. But for academic clarity, argument structure,
              tone, and discipline-specific precision, human editorial judgment is irreplaceable.
            </p>
          </div>
        </Reveal>

        {/* Comparison Cards */}
        <Reveal variant="fadeUp" delay={0.1}>
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto mb-16">
            {/* Human Editor Card */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-primary/15 shadow-[0_20px_60px_-15px_rgba(15,59,127,0.08)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/[0.04] rounded-bl-[100px]" />
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/15">
                    <UserCheck className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-ink">Human Editor</h3>
                    <p className="text-xs text-primary font-semibold uppercase tracking-wider">Recommended for final drafts</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {comparisonRows.map((row) => (
                    <div key={`human-${row.feature}`} className="flex items-start gap-3">
                      {row.human === true ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                      ) : (
                        <XCircle className="w-5 h-5 text-charcoal/30 mt-0.5 shrink-0" />
                      )}
                      <span className={`text-sm leading-relaxed ${row.human ? "text-ink font-medium" : "text-charcoal/50"}`}>
                        {row.feature}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-ink/5">
                  <Link
                    href="/submit"
                    className="group inline-flex h-12 w-full items-center justify-center bg-primary px-8 text-sm font-semibold text-white transition-all hover:bg-primary-active hover:scale-[1.01] shadow-[0_8px_20px_rgba(15,59,127,0.15)] rounded-full"
                  >
                    Work With a Human Editor
                  </Link>
                </div>
              </div>
            </div>

            {/* AI Tool Card */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-ink/8 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-charcoal/[0.02] rounded-bl-[100px]" />
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-charcoal/5 flex items-center justify-center text-charcoal/60 border border-ink/10">
                    <Brain className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-ink">AI Tool</h3>
                    <p className="text-xs text-charcoal/50 font-semibold uppercase tracking-wider">Best for early drafts</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {comparisonRows.map((row) => (
                    <div key={`ai-${row.feature}`} className="flex items-start gap-3">
                      {row.ai === true ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                      ) : row.ai === "partial" ? (
                        <CircleSlash className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
                      ) : (
                        <XCircle className="w-5 h-5 text-charcoal/30 mt-0.5 shrink-0" />
                      )}
                      <span className={`text-sm leading-relaxed ${row.ai === true ? "text-ink font-medium" : row.ai === "partial" ? "text-charcoal/70" : "text-charcoal/50"}`}>
                        {row.feature}
                        {row.ai === "partial" && <span className="ml-1 text-amber-600 text-xs">(limited)</span>}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-ink/5">
                  <Link
                    href="/ai-editing-tool"
                    className="inline-flex h-12 w-full items-center justify-center border-2 border-charcoal/15 bg-transparent px-8 text-sm font-semibold text-charcoal/80 transition-all hover:border-primary hover:text-primary rounded-full"
                  >
                    Try Our Free AI Tool
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Bottom Trust Row */}
        <Reveal variant="fadeUp" delay={0.2}>
          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: Eye,
                title: "Line-by-line review",
                desc: "Every sentence gets careful, expert attention.",
              },
              {
                icon: HeartHandshake,
                title: "Your voice preserved",
                desc: "We improve without rewriting your ideas.",
              },
              {
                icon: MessageSquareText,
                title: "Editorial comments",
                desc: "Clear notes explaining changes and suggestions.",
              },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4 bg-white rounded-2xl p-6 border border-ink/5 shadow-sm">
                <div className="w-11 h-11 rounded-xl bg-primary/5 flex items-center justify-center text-primary shrink-0 border border-primary/10">
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display text-sm font-bold text-ink mb-1">{item.title}</h4>
                  <p className="text-charcoal/60 text-xs leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
