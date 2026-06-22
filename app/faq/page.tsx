import type { Metadata } from "next";
import { AnimatedAccordion } from "@/components/AnimatedAccordion";
import { PublicPageShell } from "@/components/PublicPageShell";
import { FaqVisual } from "@/components/EditorialVisuals";
import { faqSections, faqs } from "@/lib/content";
import { buildPageMetadata, faqPageJsonLd, jsonLdScript } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "Editing and Proofreading FAQs",
  description: "Answers about document uploads, word counts, pricing, turnaround options, privacy, AI editing, accepted files, and support.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <PublicPageShell
      eyebrow="Project guidance"
      title="Answers before you upload."
      description="Detailed guidance on choosing a service, academic and business editing, pricing, turnaround, privacy, files, delivery, and follow-up."
      visual={<FaqVisual />}
      seoPath="/faq"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(faqPageJsonLd(faqs))}
      />
      <section className="bg-canvas px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.35fr_0.65fr] lg:items-start">
          <div className="rounded-2xl border border-hairline bg-surface-soft p-6 text-sm leading-7 text-body shadow-[0_18px_60px_rgba(17,17,15,0.035)]">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Need help?</p>
            <p className="mt-4">
              For custom timelines, large documents, or upload questions, contact support before checkout so we can guide the next step clearly.
            </p>
          </div>
          <div className="grid gap-10">
            {faqSections.map((section) => (
              <section key={section.title} aria-labelledby={`faq-${section.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>
                <h2
                  id={`faq-${section.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                  className="mb-5 font-display text-3xl leading-tight text-ink"
                >
                  {section.title}
                </h2>
                <AnimatedAccordion items={section.items} tone="card" />
              </section>
            ))}
          </div>
        </div>
      </section>
    </PublicPageShell>
  );
}
