import type { Metadata } from "next";
import { AnimatedAccordion } from "@/components/AnimatedAccordion";
import { PublicPageShell } from "@/components/PublicPageShell";
import { FaqVisual } from "@/components/EditorialVisuals";
import { faqs } from "@/lib/content";
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
      description="A concise guide to files, pricing, privacy, project tracking, and delivery."
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
          <AnimatedAccordion items={faqs} tone="card" />
        </div>
      </section>
    </PublicPageShell>
  );
}
