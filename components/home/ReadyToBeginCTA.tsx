"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function ReadyToBeginCTA() {
  return (
    <section className="bg-paper py-32 px-5 sm:px-10 relative overflow-hidden">
      <div className="max-w-screen-xl mx-auto relative z-10">
        <div className="bg-white border border-ink/5 rounded-[2.5rem] overflow-hidden shadow-[0_30px_100px_rgba(15,59,127,0.06)] flex flex-col lg:flex-row relative">
          
          {/* Background elements */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-accent/5 to-primary/5 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="flex-1 p-10 sm:p-16 lg:p-24 flex flex-col justify-center relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-accent" aria-hidden="true" />
              </div>
              <p className="text-xs uppercase tracking-[0.2em] text-primary font-bold">Ready to begin?</p>
            </div>
            
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-ink mb-6 tracking-tight leading-tight">
              Transform your work <br className="hidden sm:block" />
              into a <span className="text-primary italic font-serif">masterpiece.</span>
            </h2>
            
            <p className="text-charcoal/70 text-lg sm:text-xl mb-12 max-w-xl leading-relaxed">
              Every great idea deserves flawless execution. Let our subject-matter experts refine your manuscript with precision, clarity, and total confidentiality.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/login" 
                className="inline-flex h-14 items-center justify-center gap-3 bg-primary hover:bg-accent px-10 text-white font-semibold text-sm uppercase tracking-widest rounded-full shadow-[0_10px_30px_rgba(15,59,127,0.2)] transition-all hover:scale-105 hover:shadow-[0_15px_40px_rgba(59,130,246,0.3)] group"
              >
                Submit Your Document
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
              <Link 
                href="/contact" 
                className="inline-flex h-14 items-center justify-center bg-white border border-ink/10 hover:border-ink/20 hover:bg-paper px-8 text-ink font-semibold text-sm uppercase tracking-widest rounded-full transition-all"
              >
                Ask a Question
              </Link>
            </div>
          </div>

          {/* Image side */}
          <div className="lg:w-[45%] relative min-h-[400px] lg:min-h-full overflow-hidden group">
            <div className="absolute inset-0 bg-primary/10 mix-blend-multiply z-10 pointer-events-none transition-opacity duration-700 group-hover:opacity-0" />
            <Image
              src="/assets/premium_desk.png" 
              alt="Editor refining a manuscript at a professional desk"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
          </div>
          
        </div>
      </div>
    </section>
  );
}
