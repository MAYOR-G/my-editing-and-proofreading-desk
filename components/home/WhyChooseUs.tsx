"use client";

import Image from "next/image";
import Link from "next/link";
import { FileText, ShieldCheck, Sparkles, Star, UserCheck } from "lucide-react";

const valuePoints = [
  {
    title: "Human-led editing",
    body: "Every document is reviewed with careful human judgment, so your meaning, tone, and voice are preserved.",
    icon: UserCheck
  },
  {
    title: "Academic and professional precision",
    body: "We improve grammar, structure, clarity, flow, and tone for high-stakes academic, business, and professional writing.",
    icon: FileText
  },
  {
    title: "Secure and confidential",
    body: "Your documents are handled privately and responsibly, with care for sensitive academic, business, and personal content.",
    icon: ShieldCheck
  },
  {
    title: "Submission-ready quality",
    body: "We help refine your work so it is polished, clear, and ready for professors, journals, clients, employers, or reviewers.",
    icon: Sparkles
  }
];

export function WhyChooseUs() {
  return (
    <section className="bg-white py-32 px-5 sm:px-10 relative overflow-hidden">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left: Clean Single Image with Floating Stats */}
          <div className="relative mx-auto aspect-[4/5] w-full max-w-lg overflow-visible px-3 pb-6 sm:px-0 sm:pb-0 lg:mx-0">
            <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden border border-ink/5 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)]">
              <Image
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1200" 
                alt="Professional editor reviewing a business document"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="w-full h-full object-cover" 
              />
            </div>
            
            {/* Floating Badge 1 */}
            <div className="absolute bottom-10 left-6 z-20 flex w-[min(16.25rem,calc(100%-3rem))] items-center gap-4 rounded-2xl border border-ink/5 bg-white/95 p-4 shadow-[0_20px_44px_-14px_rgba(0,0,0,0.24)] backdrop-blur-md sm:left-8 sm:p-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#eef2ff] text-primary">
                <Star className="h-6 w-6 fill-primary" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <p className="font-bold text-ink text-lg leading-none mb-1">15+ Years</p>
                <p className="text-charcoal/70 text-xs uppercase tracking-wider font-semibold">Editorial Excellence</p>
              </div>
            </div>

            {/* Floating Badge 2 */}
            <div className="absolute top-20 -right-6 sm:-right-12 bg-white rounded-2xl p-5 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] border border-ink/5 flex items-center gap-4 w-[240px]">
              <div className="w-12 h-12 rounded-full bg-[#ecfdf5] flex items-center justify-center text-emerald-500 shrink-0">
                <ShieldCheck className="w-6 h-6" aria-hidden="true" />
              </div>
              <div>
                <p className="font-bold text-ink text-lg leading-none mb-1">Secure Uploads</p>
                <p className="text-charcoal/70 text-xs uppercase tracking-wider font-semibold">Private handling</p>
              </div>
            </div>
          </div>

          {/* Right: Content & Refined Grid */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-2 h-2 bg-primary rounded-full" />
              <p className="text-xs uppercase tracking-[0.2em] text-primary font-bold">Why Choose Us</p>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-ink leading-tight mb-6 font-bold tracking-tight">
              Careful editing for work that needs to be trusted.
            </h2>
            <p className="text-charcoal/70 text-base sm:text-lg leading-relaxed mb-12">
              We combine expert editorial judgment, private handling, and disciplined review so your document feels clear, credible, and ready.
            </p>

            {/* Refined Features List */}
            <div className="space-y-7 mb-12">
              {valuePoints.map((point) => (
                <div key={point.title} className="flex gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary shrink-0 border border-primary/10">
                    <point.icon className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg sm:text-xl text-ink font-bold mb-2">{point.title}</h3>
                    <p className="text-charcoal/70 leading-relaxed text-base">
                      {point.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <Link 
                href="/services" 
                className="inline-flex h-14 items-center justify-center bg-primary hover:bg-accent px-10 text-white font-semibold text-sm rounded-full shadow-[0_10px_20px_rgba(0,82,255,0.2)] transition-all hover:-translate-y-0.5"
              >
                View Our Services
              </Link>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
