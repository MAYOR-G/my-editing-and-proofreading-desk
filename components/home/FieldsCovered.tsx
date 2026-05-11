"use client";

import {
  BadgePlus,
  BookMarked,
  Briefcase,
  Calculator,
  Dna,
  ExternalLink,
  FlaskConical,
  Gavel,
  Laptop,
  Megaphone,
  Microscope,
  Pill,
  Search,
  Sigma,
  Stethoscope,
  Telescope,
  Zap
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { useState } from "react";
import { WorkPreviewModal } from "@/components/home/WorkPreviewModal";
import { type WorkExample, type WorkExampleKey, workExamples } from "@/lib/work-example-data";

const fieldIcons: Record<WorkExampleKey, typeof Search> = {
  apa: Search,
  astrophysics: Telescope,
  biology: Dna,
  chemistry: FlaskConical,
  chicago: Search,
  computing: Laptop,
  cv: Briefcase,
  economics: Calculator,
  electrical: Zap,
  law: Gavel,
  "life-sciences": Microscope,
  marketing: Megaphone,
  mla: Search,
  nursing: Stethoscope,
  oscola: Search,
  pharmaceuticals: Pill,
  philosophy: Sigma,
  "political-science": BookMarked,
  psychology: BadgePlus,
  theology: BookMarked
};

export function FieldsCovered() {
  const [selectedExample, setSelectedExample] = useState<WorkExample | null>(null);

  return (
    <section className="bg-white pb-28 pt-8 px-5 sm:px-10 border-b border-ink/5 relative overflow-hidden">
      <div className="max-w-screen-xl mx-auto relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {workExamples.map((field, idx) => {
            const Icon = fieldIcons[field.key];

            return (
              <Reveal key={field.key} delay={idx * 0.025} variant={idx % 4 === 0 ? "fadeRight" : idx % 4 === 1 ? "clipUp" : idx % 4 === 2 ? "fadeLeft" : "scale"}>
                <button
                  type="button"
                  onClick={() => setSelectedExample(field)}
                  className="group flex min-h-[4.625rem] w-full items-center justify-between gap-4 rounded-lg bg-[#202b35] px-5 py-4 text-left text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#17212b] hover:shadow-md"
                  aria-label={`Open ${field.title} sample edited document preview`}
                >
                  <div className="flex min-w-0 items-center gap-4">
                    <Icon className="h-8 w-8 shrink-0 text-[#2393ff]" strokeWidth={2.25} />
                    <span className="text-sm font-semibold leading-5 tracking-tight">{field.title}</span>
                  </div>
                  <ExternalLink className="h-5 w-5 shrink-0 text-white/60 transition-colors group-hover:text-white" aria-hidden="true" />
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
      <WorkPreviewModal example={selectedExample} onClose={() => setSelectedExample(null)} />
    </section>
  );
}
