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
  Mountain,
  Search,
  Sigma,
  Stethoscope,
  Telescope
} from "lucide-react";
import { useState, useEffect } from "react";
import { WorkPreviewModal } from "@/components/home/WorkPreviewModal";
import { type WorkExample, workExamples as staticWorkExamples } from "@/lib/work-example-data";

const fieldIcons: Record<string, typeof Search> = {
  education: BookMarked,
  astrophysics: Telescope,
  biology: Dna,
  chemistry: FlaskConical,
  formatting: BookMarked,
  computing: Laptop,
  cv: Briefcase,
  economics: Calculator,
  "geological-engineering": Mountain,
  law: Gavel,
  "life-sciences": Microscope,
  marketing: Megaphone,
  mla: Search,
  nursing: Stethoscope,
  oscola: Search,
  geochemistry: FlaskConical,
  philosophy: Sigma,
  "political-science": BookMarked,
  psychology: BadgePlus,
  theology: BookMarked
};

export function FieldsCovered() {
  const [selectedExample, setSelectedExample] = useState<WorkExample | null>(null);
  const [examples, setExamples] = useState<WorkExample[]>(() => staticWorkExamples);

  useEffect(() => {
    const fetchDynamicExamples = async () => {
      try {
        const res = await fetch(`/api/examples?t=${Date.now()}`, {
          cache: "no-store",
          headers: { "Cache-Control": "no-cache" },
        });
        const data = await res.json();
        const uploadedByKey = new Map<string, any>((data.examples || []).map((example: any) => [example.category_key, example]));

        setExamples(staticWorkExamples.map((staticExample) => {
          const uploaded = uploadedByKey.get(staticExample.key);
          if (!uploaded?.parsed_content_json?.length) return staticExample;

          return {
            ...staticExample,
            documentTitle: uploaded.source_file_name || staticExample.documentTitle,
            authorLine: `${staticExample.title} uploaded sample`,
            pages: uploaded.parsed_content_json,
          };
        }));
      } catch (error) {
        console.error("Homepage work examples fetch failed:", error);
        setExamples(staticWorkExamples);
      }
    };
    
    fetchDynamicExamples();
  }, []);

  return (
    <section className="bg-white pb-28 pt-8 px-5 sm:px-10 border-b border-ink/5 relative overflow-hidden">
      <div className="max-w-screen-xl mx-auto relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {examples.map((field) => {
            const Icon = fieldIcons[field.key] || BookMarked;

            return (
              <button
                key={field.key}
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
            );
          })}
        </div>
      </div>
      <WorkPreviewModal example={selectedExample} onClose={() => setSelectedExample(null)} />
    </section>
  );
}
