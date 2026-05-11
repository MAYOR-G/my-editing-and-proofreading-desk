import { AnimatedAccordion } from "@/components/AnimatedAccordion";
import { PublicPageShell } from "@/components/PublicPageShell";
import { FaqVisual } from "@/components/EditorialVisuals";
import { faqs } from "@/lib/content";

export default function FaqPage() {
  return (
    <PublicPageShell
      eyebrow="FAQ"
      title="Answers before you upload."
      description="A concise guide to files, pricing, privacy, project tracking, and delivery."
      visual={<FaqVisual />}
    >
      <section className="bg-canvas px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-5xl">
          <AnimatedAccordion items={faqs} tone="card" />
        </div>
      </section>
    </PublicPageShell>
  );
}
