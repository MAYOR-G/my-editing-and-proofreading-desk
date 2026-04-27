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
      <section className="px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-5xl divide-y divide-ink/10 border-y border-ink/10">
          {faqs.map((faq) => (
            <details key={faq.question} className="group py-8">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-2xl text-ink">
                {faq.question}
                <span className="grid h-10 w-10 shrink-0 place-items-center border border-ink/12 text-gold-deep transition duration-200 ease-premium-out group-open:rotate-45">+</span>
              </summary>
              <p className="mt-5 max-w-3xl text-base leading-7 text-charcoal/65">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </PublicPageShell>
  );
}
