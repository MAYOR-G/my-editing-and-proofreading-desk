import dynamic from "next/dynamic";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { faqs, servicePages } from "@/lib/content";
import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/SectionLabel";
import { AiRefinementVisual } from "@/components/EditorialVisuals";

import { HeroSplit } from "@/components/home/HeroSplit";
import { ProcessFlow } from "@/components/home/ProcessFlow";
import { FieldsCovered } from "@/components/home/FieldsCovered";
import { FlippingReviews } from "@/components/home/FlippingReviews";
import { TrustedMarquee } from "@/components/home/TrustedMarquee";

const AnimatedAccordion = dynamic(() => import("@/components/AnimatedAccordion").then(m => ({ default: m.AnimatedAccordion })));

export default function Home() {
  return (
    <main className="min-h-screen bg-ivory text-ink">
      {/* 
        Note: SiteHeader/SiteFooter are handled in their own components.
      */}
      <SiteHeader />

      {/* A. Premium Split Hero */}
      <HeroSplit />

      {/* B. Asymmetrical Services "Bento Box" Grid */}
      <section className="bg-paper pt-40 pb-32 px-5 sm:px-10 relative overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-screen-xl mx-auto relative z-10">
          <Reveal>
            <div className="mb-20 text-center">
              <p className="text-xs uppercase tracking-[0.3em] text-gold-deep mb-4 font-semibold">Our Expertise</p>
              <h2 className="font-display text-4xl sm:text-5xl text-ink leading-tight">Precision Editing Services</h2>
            </div>
          </Reveal>

          {/* Dynamic 5-Item Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 auto-rows-[280px] gap-6">
            {/* 1. Academic Editing (Huge, 7 cols x 2 rows) */}
            <Reveal delay={0.1} className="md:col-span-7 md:row-span-2 h-full">
              <Link href={`/services/${servicePages[0].slug}`} className="group flex flex-col justify-end h-full bg-ink border border-ink/10 rounded-3xl p-10 sm:p-14 relative overflow-hidden transition-all duration-500 hover:border-gold/40 hover:shadow-[0_0_40px_rgba(176,138,60,0.15)]">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800')] bg-cover bg-center opacity-30 group-hover:opacity-40 transition-opacity duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-transparent z-0" />
                <div className="absolute inset-0 bg-gradient-to-tr from-gold/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0" />
                <div className="relative z-10">
                  <span className="text-xs font-bold text-gold uppercase tracking-widest mb-4 block">Featured Expertise</span>
                  <h3 className="text-3xl sm:text-5xl font-display text-ivory mb-6 leading-tight">{servicePages[0].name}</h3>
                  <p className="text-ivory/80 text-lg leading-relaxed max-w-lg mb-8">
                    {servicePages[0].description} We focus deeply on narrative flow and academic rigor, ensuring your voice remains intact.
                  </p>
                  <div className="flex items-center gap-3 text-gold font-bold text-sm uppercase tracking-widest group-hover:gap-5 transition-all">
                    Explore Details <span className="text-xl">→</span>
                  </div>
                </div>
              </Link>
            </Reveal>

            {/* 2. Non-Academic Editing (Tall, 5 cols x 2 rows) */}
            <Reveal delay={0.2} className="md:col-span-5 md:row-span-2 h-full">
              <Link href={`/services/${servicePages[1].slug}`} className="group flex flex-col justify-end h-full bg-charcoal backdrop-blur-md border border-ink/5 rounded-3xl p-8 sm:p-12 relative overflow-hidden transition-all duration-500 hover:border-gold/30 hover:bg-ink">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=800')] bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/90 to-transparent z-0" />
                <div className="absolute top-0 right-0 w-48 h-48 bg-gold/5 blur-[50px] rounded-full group-hover:bg-gold/10 transition-colors duration-500 z-0" />
                <div className="relative z-10">
                  <span className="text-xs font-bold text-gold/70 uppercase tracking-widest mb-4 block">Corporate & Business</span>
                  <h3 className="text-3xl sm:text-4xl font-display text-ivory mb-4">{servicePages[1].name}</h3>
                  <p className="text-ivory/70 text-base leading-relaxed mb-8">{servicePages[1].description}</p>
                  <div className="flex items-center gap-2 text-gold font-bold text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
                    Explore <span className="text-lg">→</span>
                  </div>
                </div>
              </Link>
            </Reveal>

            {/* 3. Formatting (Wide, 5 cols x 1 row) */}
            <Reveal delay={0.3} className="md:col-span-5 md:row-span-1 h-full">
              <Link href={`/services/${servicePages[3].slug}`} className="group flex flex-col justify-end h-full bg-charcoal backdrop-blur-md border border-ink/5 rounded-3xl p-8 relative overflow-hidden transition-all duration-500 hover:border-gold/30 hover:bg-ink">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1455390582262-044cdead27d8?q=80&w=800')] bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/90 to-transparent z-0" />
                <div className="relative z-10">
                  <h3 className="text-2xl font-display text-ivory mb-2">{servicePages[3].name}</h3>
                  <p className="text-ivory/60 text-sm leading-relaxed mb-4 line-clamp-2">{servicePages[3].description}</p>
                  <div className="flex items-center gap-2 text-gold font-bold text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
                    Explore <span className="text-lg">→</span>
                  </div>
                </div>
              </Link>
            </Reveal>

            {/* 4. Express (Wide, 4 cols x 1 row) */}
            <Reveal delay={0.4} className="md:col-span-4 md:row-span-1 h-full">
              <Link href={`/services/${servicePages[2].slug}`} className="group flex flex-col justify-end h-full bg-charcoal backdrop-blur-md border border-ink/5 rounded-3xl p-8 relative overflow-hidden transition-all duration-500 hover:border-gold/30 hover:bg-ink">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=800')] bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/90 to-transparent z-0" />
                <div className="relative z-10">
                  <h3 className="text-2xl font-display text-ivory mb-2">{servicePages[2].name}</h3>
                  <p className="text-ivory/60 text-sm leading-relaxed mb-4 line-clamp-2">{servicePages[2].description}</p>
                  <div className="flex items-center gap-2 text-gold font-bold text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
                    Explore <span className="text-lg">→</span>
                  </div>
                </div>
              </Link>
            </Reveal>

            {/* 5. Translation (Small, 3 cols x 1 row) */}
            <Reveal delay={0.5} className="md:col-span-3 md:row-span-1 h-full">
              <Link href={`/services/${servicePages[4].slug}`} className="group flex flex-col justify-end h-full bg-charcoal backdrop-blur-md border border-ink/5 rounded-3xl p-8 relative overflow-hidden transition-all duration-500 hover:border-gold/30 hover:bg-ink">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451226428352-cf66bf8a0317?q=80&w=800')] bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/90 to-transparent z-0" />
                <div className="relative z-10">
                  <h3 className="text-xl font-display text-ivory mb-2">{servicePages[4].name}</h3>
                  <p className="text-ivory/60 text-xs leading-relaxed mb-4 line-clamp-2">{servicePages[4].description}</p>
                  <div className="flex items-center gap-2 text-gold font-bold text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
                    Explore <span className="text-lg">→</span>
                  </div>
                </div>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* C. The Process (Connected Glowing Timeline) */}
      <ProcessFlow />

      {/* D. Smart Technology (AI) */}
      <section className="bg-ivory text-ink py-32 px-5 sm:px-10 border-t border-ink/5 relative overflow-hidden">
        <div className="mx-auto max-w-screen-xl relative z-10">
          <div className="grid gap-16 lg:grid-cols-2 items-center bg-charcoal border border-ink/10 rounded-[2rem] p-8 sm:p-16 shadow-2xl">
            <Reveal>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-gold mb-4 font-semibold">AI Editing Assistant</p>
                <h2 className="font-display text-4xl sm:text-5xl text-ivory leading-tight mb-6">
                  Instant clarity. <br />Zero wait time.
                </h2>
                <p className="text-ivory/70 leading-relaxed mb-10 max-w-lg text-lg">
                  Try our standalone AI editing tool for a fast first-pass on your documents. While it cannot replace the nuanced judgment and publication-level care of our professional human editors, it is a great way to catch basic typos and formatting errors in seconds.
                </p>
                <Link href="/ai-editing-tool" className="inline-flex h-14 items-center justify-center bg-gold px-10 text-sm font-semibold text-ink transition-all hover:bg-ivory hover:scale-[1.02] shadow-[0_0_20px_rgba(176,138,60,0.2)]">
                  Try the AI Tool
                </Link>
              </div>
            </Reveal>
            <Reveal delay={0.2} className="relative h-full min-h-[300px]">
              {/* Replacing the illustrative component with a sleek, abstract tech glass panel */}
              <div className="absolute inset-0 border border-ivory/10 rounded-2xl bg-gradient-to-br from-ink to-charcoal flex items-center justify-center overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/10 via-transparent to-transparent" />
                <AiRefinementVisual compact />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* E. Fields Covered Grid */}
      <FieldsCovered />

      {/* F. Flipping Client Reviews */}
      <FlippingReviews />

      {/* G. Trusted By Infinite Marquee */}
      <TrustedMarquee />

      {/* H. FAQ Section */}
      <section className="relative py-32 px-5 sm:px-10 border-b border-ink/5 overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-70"
        >
          <source src="https://pub-9f4f9c9b1b3e477aba4991ccfd92f1ae.r2.dev/intro.mp4" type="video/mp4" />
        </video>
        {/* Semi-transparent overlay to ensure text readability */}
        <div className="absolute inset-0 bg-paper/80 z-0 backdrop-blur-sm" />

        <div className="mx-auto max-w-3xl relative z-10">
          <Reveal>
            <div className="text-center mb-16">
              <p className="text-xs uppercase tracking-[0.3em] text-gold-deep mb-4 font-semibold">FAQ</p>
              <h2 className="font-display text-4xl text-ink">Frequently Asked Questions</h2>
            </div>
            <AnimatedAccordion items={faqs} tone="light" />
          </Reveal>
        </div>
      </section>

      {/* I. Pre-Footer CTA Card */}
      <section className="bg-ivory py-32 px-5 sm:px-10 relative overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="bg-ink border border-ink/20 rounded-[3rem] p-12 sm:p-24 text-center relative overflow-hidden shadow-2xl group">
              {/* Radial Core & Glow Effects */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/10 blur-[120px] rounded-full pointer-events-none transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200')] bg-cover bg-center opacity-5 mix-blend-screen pointer-events-none" />

              <div className="relative z-10">
                <p className="text-xs uppercase tracking-[0.3em] text-gold mb-6 font-semibold">Ready to begin?</p>
                <h2 className="font-display text-5xl sm:text-6xl text-ivory mb-6 tracking-tight leading-tight">
                  Transform Your Work <br className="hidden sm:block" /> Into a Masterpiece.
                </h2>
                <p className="text-ivory/70 text-lg sm:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
                  Every great idea deserves flawless execution. Let our subject-matter experts refine your manuscript with precision, clarity, and total confidentiality.
                </p>
                <Link href="/login" className="inline-flex h-16 items-center justify-center bg-gold px-12 text-sm font-bold text-ink transition-all hover:bg-ivory hover:text-ink hover:scale-[1.02] shadow-[0_0_30px_rgba(176,138,60,0.3)] hover:shadow-[0_0_50px_rgba(176,138,60,0.5)] rounded-full tracking-widest uppercase">
                  Start Your Project
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
