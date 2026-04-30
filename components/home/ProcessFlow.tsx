"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/SectionLabel";
import { UploadCloud, Users, Sparkles, Download } from "lucide-react";

const processSteps = [
  { step: "01", title: "Secure Upload", desc: "Submit your document via our encrypted portal. Instant quoting and turnaround calculation.", icon: UploadCloud },
  { step: "02", title: "Proofreading & Editing", desc: "Smart AI profiling catches basic formatting errors, followed by human expert refinement.", icon: Sparkles },
  { step: "03", title: "Quality Check", desc: "A rigorous secondary review by a senior editor to ensure absolute precision and flawless narrative flow.", icon: Users },
  { step: "04", title: "Final Delivery", desc: "Download your polished, publication-ready document securely from your dashboard.", icon: Download }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.3 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

export function ProcessFlow() {
  return (
    <section className="bg-ivory py-32 px-5 sm:px-10 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-gold/5 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="mx-auto max-w-screen-xl relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-24">
          <p className="text-xs uppercase tracking-[0.3em] text-gold-deep mb-4 font-semibold">The Process</p>
          <h2 className="font-display text-4xl sm:text-5xl text-ink leading-tight">
            A frictionless path to publication-ready text.
          </h2>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="relative max-w-5xl mx-auto"
        >
          {/* Horizontal Connecting Line (Desktop) */}
          <div className="absolute top-12 left-[12%] right-[12%] h-[2px] bg-ink/10 hidden lg:block" />
          
          <div className="grid lg:grid-cols-4 gap-12 lg:gap-8">
            {processSteps.map((step, index) => (
              <motion.div key={step.step} variants={itemVariants} className="relative group">
                
                {/* Connecting Line (Mobile) */}
                {index !== processSteps.length - 1 && (
                  <div className="absolute top-24 bottom-[-3rem] left-12 w-[2px] bg-ink/10 lg:hidden" />
                )}

                <div className="flex flex-row lg:flex-col items-start lg:items-center gap-6 lg:gap-0">
                  <div className="relative w-24 h-24 shrink-0 lg:mb-10 flex items-center justify-center">
                    <div className="relative w-16 h-16 rounded-full bg-white border-2 border-ink/10 flex items-center justify-center group-hover:border-gold transition-all duration-500 z-10">
                      <step.icon className="w-6 h-6 text-ink/70 group-hover:text-gold transition-colors" strokeWidth={1.5} />
                    </div>
                  </div>
                  
                  {/* Content Box (Glassmorphic) */}
                  <div className="bg-charcoal border border-ink/10 shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-6 rounded-2xl flex-1 group-hover:border-gold/30 group-hover:bg-ink transition-all duration-500 text-left lg:text-center">
                    <span className="text-xs font-bold text-gold uppercase tracking-widest block mb-2">{step.step}</span>
                    <h4 className="text-xl font-display text-ivory mb-3">{step.title}</h4>
                    <p className="text-sm text-ivory/80 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
