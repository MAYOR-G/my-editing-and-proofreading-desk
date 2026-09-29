"use client";

import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { CountUpNumber } from "@/components/CountUpNumber";
import { Globe, FileCheck2, Clock, CalendarDays } from "lucide-react";

const stats = [
  {
    icon: FileCheck2,
    number: 30000,
    suffix: "+",
    label: "Documents Edited",
    desc: "From academic papers to corporate reports."
  },
  {
    icon: Globe,
    number: 110,
    suffix: "+",
    label: "Countries Served",
    desc: "Global expertise for international writers."
  },
  {
    icon: Clock,
    number: 48,
    prefix: "~",
    suffix: "hr",
    label: "Average Turnaround",
    desc: "Fast, reliable delivery for standard documents."
  },
  {
    icon: CalendarDays,
    number: 15,
    suffix: "+",
    label: "Years Experience",
    desc: "A trusted editorial desk since inception."
  }
];

export function AcademicResults() {
  return (
    <section className="bg-white py-24 sm:py-32 px-5 sm:px-10 border-t border-b border-ink/5 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f8fbff] to-white pointer-events-none" />

      <div className="max-w-screen-xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <div className="lg:col-span-5">
            <Reveal variant="fadeRight">
              <div className="mb-4 inline-flex rounded-full border border-primary/10 bg-primary/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.24em] text-primary shadow-sm">
                Trusted Expertise
              </div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-ink leading-tight font-bold tracking-tight mb-6">
                Trusted by academics and professionals worldwide
              </h2>
              <p className="text-charcoal/70 text-base sm:text-lg leading-relaxed mb-8">
                Our reputation is built on delivering careful, meticulous editing that elevates your work. We understand the high standards required by top-tier universities, academic journals, and leading businesses.
              </p>
              
              <div className="flex flex-wrap gap-2 mb-10">
                {["Academic Journals", "University Theses", "Business Proposals", "Scientific Manuscripts"].map((tag) => (
                  <span key={tag} className="inline-flex items-center rounded-full bg-white border border-ink/10 px-3 py-1 text-xs font-semibold text-charcoal shadow-sm">
                    {tag}
                  </span>
                ))}
              </div>

              <Link
                href="/about"
                className="inline-flex h-12 items-center justify-center border-2 border-primary/20 bg-transparent px-8 text-sm font-semibold text-primary transition-all hover:border-primary hover:bg-primary/5 rounded-full"
              >
                Learn More About Us
              </Link>
            </Reveal>
          </div>

          {/* Right: Stats Grid */}
          <div className="lg:col-span-7">
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              {stats.map((stat, index) => (
                <Reveal key={stat.label} variant="fadeUp" delay={index * 0.1}>
                  <div className="bg-white rounded-3xl p-6 sm:p-8 border border-ink/5 shadow-[0_15px_40px_-15px_rgba(15,59,127,0.08)] hover:shadow-[0_20px_50px_-15px_rgba(15,59,127,0.12)] transition-shadow">
                    <div className="w-12 h-12 rounded-xl bg-[#f7f9fc] flex items-center justify-center text-primary mb-6 border border-ink/5">
                      <stat.icon className="w-6 h-6" />
                    </div>
                    <div className="flex items-baseline gap-1 mb-2">
                      {stat.prefix && <span className="font-display text-2xl font-bold text-ink">{stat.prefix}</span>}
                      <CountUpNumber target={stat.number} className="font-display text-4xl font-bold text-ink tracking-tight" />
                      <span className="font-display text-2xl font-bold text-ink">{stat.suffix}</span>
                    </div>
                    <h3 className="text-sm font-bold text-ink mb-1">{stat.label}</h3>
                    <p className="text-xs text-charcoal/60 leading-relaxed">{stat.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
