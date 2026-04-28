import Link from "next/link";
import { PricingCalculator } from "@/components/PricingCalculator";
import { PublicPageShell } from "@/components/PublicPageShell";
import { PricingVisual } from "@/components/EditorialVisuals";

const pricingFactors = [
  {
    title: "Word count",
    body: "The document word count is extracted from supported files and saved with the order."
  },
  {
    title: "Service type",
    body: "Academic editing, professional editing, formatting, translation, and writing support can carry different base rates."
  },
  {
    title: "Turnaround",
    body: "Choose from 24 hours through 4 weeks. Short timelines may carry a visible premium and large documents may require a custom quote."
  }
];

export default function PricingPage() {
  return (
    <PublicPageShell
      eyebrow="Pricing"
      title="Clear pricing before payment."
      description="The final price is calculated during submission based on document word count, selected service, and turnaround speed."
      visual={<PricingVisual />}
    >
      <section className="px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <PricingCalculator compact />
        </div>

        <div className="mx-auto mt-16 grid max-w-7xl gap-5 lg:grid-cols-3">
          {pricingFactors.map((factor, index) => (
            <article key={factor.title} className="border-t border-ink/10 bg-paper/70 p-7 shadow-[0_18px_70px_rgba(17,17,15,0.035)]">
              <span className="font-display text-5xl text-gold-deep">{String(index + 1).padStart(2, "0")}</span>
              <h2 className="mt-8 font-display text-3xl text-ink">{factor.title}</h2>
              <p className="mt-5 text-base leading-7 text-charcoal/65">{factor.body}</p>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-14 grid max-w-7xl gap-8 border border-ink/10 bg-ink p-8 text-ivory shadow-[0_28px_100px_rgba(17,17,15,0.12)] sm:p-12 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-gold">Important payment rule</p>
            <h2 className="mt-5 max-w-4xl font-display text-4xl leading-tight">Orders are marked paid only after server-side payment verification.</h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-ivory/66">
              This protects the client and the business. A browser callback alone should never complete an order.
            </p>
          </div>
          <Link href="/login" className="inline-flex min-h-12 items-center justify-center bg-gold px-7 text-sm text-ink transition duration-200 ease-premium-out hover:bg-ivory active:scale-[0.98]">
            Start a priced submission
          </Link>
        </div>
      </section>
    </PublicPageShell>
  );
}
