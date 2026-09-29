"use client";

import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { ArrowRight, CheckCircle2, Info } from "lucide-react";
import { SERVICE_CHARGE_PERCENTAGE, MINIMUM_ORDER } from "@/lib/pricing";

export function PricingSnapshot() {
  return (
    <section className="bg-white py-24 sm:py-32 px-5 sm:px-10 border-t border-ink/5 relative overflow-hidden">
      <div className="max-w-screen-xl mx-auto relative z-10">
        {/* Header */}
        <Reveal variant="fadeUp">
          <div className="text-center mb-16">
            <div className="mb-4 inline-flex rounded-full border border-primary/10 bg-primary/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.24em] text-primary shadow-sm">
              Clear Pricing
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-ink leading-tight font-bold tracking-tight mb-5">
              Transparent pricing, no hidden fees
            </h2>
            <p className="text-charcoal/70 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              We calculate pricing simply by word count and turnaround time. No surprises.
            </p>
          </div>
        </Reveal>

        {/* Pricing Cards */}
        <Reveal variant="fadeUp" delay={0.1}>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
            {/* Proofreading Card */}
            <div className="bg-[#f7f9fc] rounded-3xl p-8 border border-ink/5 shadow-sm relative hover:border-primary/20 hover:shadow-md transition-all">
              <h3 className="font-display text-xl font-bold text-ink mb-2">Proofreading</h3>
              <p className="text-charcoal/60 text-sm mb-6 h-10">Final review for grammar, spelling, and consistency.</p>
              <div className="mb-6 pb-6 border-b border-ink/5">
                <span className="text-3xl font-display font-bold text-ink">$0.03</span>
                <span className="text-charcoal/60 text-sm"> / word</span>
              </div>
              <ul className="space-y-3 mb-8">
                {["Grammar & spelling", "Punctuation fixes", "Basic consistency", "Final polish"].map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-charcoal/80">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Editing Card (Highlighted) */}
            <div className="bg-white rounded-3xl p-8 border-2 border-primary shadow-[0_20px_40px_-15px_rgba(15,59,127,0.12)] relative transform md:-translate-y-4">
              <div className="absolute top-0 inset-x-0 h-1.5 bg-primary rounded-t-3xl" />
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
                Most Popular
              </div>
              <h3 className="font-display text-xl font-bold text-ink mb-2 mt-2">Professional Editing</h3>
              <p className="text-charcoal/60 text-sm mb-6 h-10">Comprehensive structural and sentence-level polish.</p>
              <div className="mb-6 pb-6 border-b border-ink/5">
                <span className="text-3xl font-display font-bold text-ink">$0.03</span>
                <span className="text-charcoal/60 text-sm"> / word</span>
                <p className="text-[10px] text-primary mt-1 font-medium bg-primary/5 inline-block px-2 py-0.5 rounded">Same base rate as proofreading</p>
              </div>
              <ul className="space-y-3 mb-8">
                {["Sentence flow & clarity", "Structural improvements", "Tone adjustments", "Editorial feedback"].map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-charcoal/80 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="/pricing"
                className="group flex h-12 w-full items-center justify-center bg-primary px-6 text-sm font-semibold text-white transition-all hover:bg-primary-active rounded-full shadow-[0_8px_20px_rgba(15,59,127,0.15)]"
              >
                Calculate Your Price
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Formatting Card */}
            <div className="bg-[#f7f9fc] rounded-3xl p-8 border border-ink/5 shadow-sm relative hover:border-primary/20 hover:shadow-md transition-all">
              <h3 className="font-display text-xl font-bold text-ink mb-2">Formatting</h3>
              <p className="text-charcoal/60 text-sm mb-6 h-10">Layout, citations, and specific style guide compliance.</p>
              <div className="mb-6 pb-6 border-b border-ink/5">
                <span className="text-3xl font-display font-bold text-ink">$0.04</span>
                <span className="text-charcoal/60 text-sm"> / word</span>
              </div>
              <ul className="space-y-3 mb-8">
                {["APA, MLA, Chicago, etc.", "Reference consistency", "Margins & layouts", "Heading structures"].map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-charcoal/80">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        {/* Small Print / Trust */}
        <Reveal variant="fadeUp" delay={0.2}>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 max-w-3xl mx-auto">
            <div className="flex items-center gap-2 text-charcoal/60 text-xs font-medium bg-[#f7f9fc] px-4 py-2 rounded-full border border-ink/5">
              <Info className="w-3.5 h-3.5 text-primary" />
              ${MINIMUM_ORDER} minimum order
            </div>
            <div className="flex items-center gap-2 text-charcoal/60 text-xs font-medium bg-[#f7f9fc] px-4 py-2 rounded-full border border-ink/5">
              <Info className="w-3.5 h-3.5 text-primary" />
              {SERVICE_CHARGE_PERCENTAGE}% service charge
            </div>
            <div className="flex items-center gap-2 text-charcoal/60 text-xs font-medium bg-[#f7f9fc] px-4 py-2 rounded-full border border-ink/5">
              <Info className="w-3.5 h-3.5 text-primary" />
              Custom quotes over 50,000 words
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
