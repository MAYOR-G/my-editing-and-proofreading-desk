"use client";

import { Reveal } from "@/components/Reveal";
import { servicePages } from "@/lib/content";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function ServicesGrid() {
  return (
    <section className="bg-[#f7f9fc] py-24 sm:py-32 px-5 sm:px-10 border-t border-b border-ink/5">
      <div className="max-w-screen-xl mx-auto">
        {/* Top Header Split */}
        <div className="mb-16 grid items-center gap-12 lg:mb-20 lg:grid-cols-2 lg:gap-20">
          {/* Left Text */}
          <div>
            <Reveal variant="fadeUp">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-2 h-2 bg-primary rounded-full" />
                <p className="text-xs uppercase tracking-[0.2em] text-primary font-bold">Our Services</p>
              </div>
              <h2 className="max-w-[13ch] font-display text-3xl sm:max-w-none sm:text-4xl lg:text-5xl text-ink leading-tight mb-6 font-bold tracking-tight">
                Editing support for every serious draft.
              </h2>
              <p className="mb-8 max-w-lg text-base leading-relaxed text-charcoal/80 sm:text-lg">
                Choose the service that fits your document and move straight into a focused editorial workflow.
              </p>
              <Link 
                href="/services" 
                className="group inline-flex h-14 items-center justify-center bg-white border border-ink/10 px-8 text-sm font-semibold text-ink transition-all hover:border-primary hover:text-primary rounded-full shadow-sm"
              >
                View Our Services
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Reveal>
          </div>

          {/* Right Image */}
          <div className="relative">
            <Reveal variant="fadeLeft">
              <div className="rounded-3xl overflow-hidden aspect-[4/3] relative border border-ink/5 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)]">
                <img 
                  src="/images/hero/editor_author_1777475345367.png" 
                  alt="Human editor reviewing a document on screen"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative Accent */}
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/10 rounded-full blur-3xl -z-10" />
            </Reveal>
          </div>
        </div>

        {/* 6-Card Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {servicePages.map((service, index) => (
            <Reveal key={service.slug} variant={index % 3 === 0 ? "clipUp" : index % 3 === 1 ? "fadeLeft" : "scale"} delay={index * 0.06}>
              <Link 
                href={`/services/${service.slug}`}
                className="block bg-white rounded-3xl p-8 sm:p-10 border border-ink/5 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:border-primary/20 hover:-translate-y-1 transition-all duration-300 h-full group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/[0.02] rounded-bl-[100px] -z-0 group-hover:bg-primary/[0.04] transition-colors" />
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-[#f7f9fc] border border-ink/5 flex items-center justify-center text-primary font-bold text-lg group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      0{index + 1}
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white border border-ink/10 flex items-center justify-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shadow-sm">
                      <ArrowRight className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-ink mb-4 group-hover:text-primary transition-colors duration-300">
                    {service.name}
                  </h3>
                  <p className="text-charcoal/70 leading-relaxed text-sm sm:text-base">
                    {service.description}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
