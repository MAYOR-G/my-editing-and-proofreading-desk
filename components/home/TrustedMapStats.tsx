"use client";

import { CountUpNumber } from "@/components/CountUpNumber";
import { Reveal } from "@/components/Reveal";

export function TrustedMapStats() {
  return (
    <section className="bg-white py-24 sm:py-32 px-5 sm:px-10 relative overflow-hidden">
      {/* Map Background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.1] pointer-events-none z-0">
         <img 
            src="https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg" 
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="w-full max-w-6xl object-contain opacity-50"
            style={{ filter: 'invert(50%) sepia(80%) saturate(300%) hue-rotate(90deg)' }}
         />
      </div>

      <div className="max-w-screen-xl mx-auto relative z-10 text-center">
        <Reveal variant="softBlur">
          <h2 className="font-display text-3xl sm:text-4xl text-ink font-bold mb-4">
            Trusted by 30,000+ students, academics, businesses <br className="hidden sm:block" />
            and individuals worldwide
          </h2>
          <p className="text-charcoal/60 text-sm sm:text-base max-w-2xl mx-auto mb-16">
            For 15+ years, we've provided professional editing services to a global client base in 110+ countries.
          </p>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 mb-32">
          <Reveal variant="fadeRight" delay={0.08}>
            <div className="flex flex-col items-center">
              <CountUpNumber target={30000} suffix="+" className="mb-2 font-display text-3xl font-bold text-ink sm:text-4xl" />
              <span className="text-sm text-charcoal/60 font-medium">Clients</span>
            </div>
          </Reveal>
          <Reveal variant="clipUp" delay={0.16}>
            <div className="flex flex-col items-center">
              <CountUpNumber target={150000} className="mb-2 font-display text-3xl font-bold text-ink sm:text-4xl" />
              <span className="text-sm text-charcoal/60 font-medium">Documents</span>
            </div>
          </Reveal>
          <Reveal variant="scale" delay={0.24}>
            <div className="flex flex-col items-center">
              <CountUpNumber target={310} className="mb-2 font-display text-3xl font-bold text-ink sm:text-4xl" />
              <span className="text-sm text-charcoal/60 font-medium">Editors</span>
            </div>
          </Reveal>
          <Reveal variant="fadeLeft" delay={0.32}>
            <div className="flex flex-col items-center">
              <CountUpNumber target={15} className="mb-2 font-display text-3xl font-bold text-ink sm:text-4xl" />
              <span className="text-sm text-charcoal/60 font-medium">Years' Experience</span>
            </div>
          </Reveal>
        </div>

        <Reveal variant="fadeDown" delay={0.2}>
          <h3 className="font-display text-2xl sm:text-3xl text-ink font-bold mb-2">
            Examples of our work
          </h3>
          <p className="text-charcoal/60 text-sm">
            Used by permission of the authors.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
