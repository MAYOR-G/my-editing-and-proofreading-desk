import dynamic from "next/dynamic";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { faqs } from "@/lib/content";
import { Reveal } from "@/components/Reveal";

import { HeroSplit } from "@/components/home/HeroSplit";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { ProcessFlow } from "@/components/home/ProcessFlow";
import { FieldsCovered } from "@/components/home/FieldsCovered";
import { FlippingReviews } from "@/components/home/FlippingReviews";
import { TrustedMarquee } from "@/components/home/TrustedMarquee";
import { ReadyToBeginCTA } from "@/components/home/ReadyToBeginCTA";
import { TrustedMapStats } from "@/components/home/TrustedMapStats";

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

      {/* B. Services Grid */}
      <ServicesGrid />

      {/* C. Why Choose Us (Horizontal Scroll) */}
      <WhyChooseUs />

      {/* D. The Process (Connected Glowing Timeline) */}
      <ProcessFlow />

      {/* D. Smart Technology (AI) */}
      <section className="bg-ivory text-ink py-32 px-5 sm:px-10 border-t border-ink/5 relative overflow-hidden">
        <div className="mx-auto max-w-screen-xl relative z-10">
          <div className="grid gap-16 lg:grid-cols-2 items-center bg-white border border-ink/5 rounded-[2rem] p-8 sm:p-16 shadow-[0_20px_60px_rgba(15,59,127,0.06)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-primary/5 to-transparent opacity-50 pointer-events-none" />
            <Reveal variant="softBlur">
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-4 h-1 bg-accent rounded-full" />
                <p className="text-xs uppercase tracking-[0.2em] text-primary font-bold">Free AI Editing Assistant</p>
                </div>
                <h2 className="font-display text-4xl sm:text-5xl text-ink leading-tight mb-6">
                  Try our free AI editing assistant.
                </h2>
                <p className="text-charcoal/80 leading-relaxed mb-10 max-w-lg text-lg">
                  Use our free AI tool to review your draft, spot basic issues, and get quick suggestions before working with a human editor. For high-stakes documents, our expert editors provide the final judgment, context, and polish that automated tools cannot replace.
                </p>
                <Link href="/ai-editing-tool" className="inline-flex h-14 items-center justify-center bg-primary px-10 text-sm font-semibold text-white transition-all hover:bg-accent hover:scale-[1.02] shadow-[0_10px_30px_rgba(15,59,127,0.2)] rounded-full">
                  Try the Free Tool
                </Link>
              </div>
            </Reveal>
            <Reveal variant="clipUp" delay={0.18} className="relative h-full min-h-[300px] lg:min-h-[400px]">
              <div className="absolute inset-0 rounded-[2rem] overflow-hidden border border-ink/5 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] bg-white p-2">
                <img 
                  src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200&auto=format&fit=crop" 
                  alt="Professional AI robot assistant in a clean technology workspace"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Map Stats Section */}
      <TrustedMapStats />


      {/* E. Fields Covered Grid */}
      <FieldsCovered />

      {/* F. Flipping Client Reviews */}
      <FlippingReviews />

      {/* G. Trusted By Infinite Marquee */}
      <TrustedMarquee />

      {/* H. FAQ Section */}
      <section className="bg-[#f8f9fa] py-24 sm:py-32 px-5 sm:px-10 border-t border-b border-ink/5">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Left Column: Title & Contact */}
            <div className="lg:col-span-5 flex flex-col justify-start lg:pt-4">
              <Reveal variant="fadeRight">
                <h2 className="font-display text-3xl sm:text-4xl text-ink font-bold mb-6">
                  Frequently asked questions
                </h2>
                <p className="text-charcoal/70 text-base leading-relaxed mb-1">
                  Can't find what you're looking for?
                </p>
                <p className="text-charcoal/70 text-base leading-relaxed">
                  Feel free to contact us <br className="hidden sm:block" />
                  at <a href="mailto:hello@business.editandproofread.com" className="text-primary hover:underline font-medium transition-all">hello@business.editandproofread.com</a>
                </p>
              </Reveal>
            </div>

            {/* Right Column: Accordion */}
            <div className="lg:col-span-7">
              <Reveal variant="clipUp" delay={0.1}>
                <AnimatedAccordion items={faqs.slice(0, 4)} tone="card" />
                <div className="mt-8 flex justify-center">
                  <Link href="/faq" className="text-ink font-bold hover:text-primary transition-colors flex items-center gap-2 group text-sm">
                    Read All FAQs 
                    <span className="group-hover:translate-x-1 transition-transform">&gt;</span>
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* I. Pre-Footer CTA Card */}
      <ReadyToBeginCTA />

      <SiteFooter />
    </main>
  );
}
