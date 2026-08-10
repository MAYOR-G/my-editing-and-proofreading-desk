import type { Metadata } from "next";
import Link from "next/link";
import { PricingCalculator } from "@/components/PricingCalculator";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { CUSTOM_REVIEW_WORD_COUNT, MINIMUM_ORDER, SERVICE_CHARGE_PERCENTAGE, SERVICE_OPTIONS, TURNAROUND_OPTIONS } from "@/lib/pricing";
import { breadcrumbJsonLd, buildPageMetadata, faqPageJsonLd, jsonLdScript, webPageJsonLd } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "Editing & Proofreading Rates | Transparent Pricing",
  description: "Use the editing and proofreading pricing calculator to estimate rates by service, word count, document type, and turnaround before secure upload.",
  path: "/pricing",
});

const pricingFaqs = [
  {
    question: "How are editing and proofreading prices calculated?",
    answer: "Eligible projects are estimated from the selected service, word count, and turnaround time. The calculator shows the estimate before secure upload and checkout.",
  },
  {
    question: "Can very long dissertations or complex manuscripts use the calculator?",
    answer: "Very long, technically complex, or unusual documents may need custom review so the scope, turnaround, formatting requirements, and final deliverables are realistic.",
  },
  {
    question: "Does the estimate replace document review?",
    answer: "No. The calculator helps you plan. The uploaded file, word count, selected service, deadline, and project notes still determine whether the project can be accepted on that schedule.",
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-canvas text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript([
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Pricing", path: "/pricing" },
          ]),
          webPageJsonLd({
            path: "/pricing",
            name: "Editing and Proofreading Pricing",
            description: "Pricing calculator for human editing, proofreading, formatting, translation review, and writing support projects.",
            dateModified: "2026-08-10",
          }),
          faqPageJsonLd(pricingFaqs),
        ])}
      />
      <SiteHeader />
      <section className="relative overflow-hidden border-b border-hairline bg-canvas px-5 pb-14 pt-28 sm:px-8 lg:pb-16 lg:pt-32">
        <div className="absolute inset-0 bg-surface-soft/35" aria-hidden="true" />
        <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(10,11,13,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(10,11,13,0.12)_1px,transparent_1px)] [background-size:56px_56px]" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl">
          <div className="mb-6 grid gap-5 lg:grid-cols-[0.72fr_0.28fr] lg:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-primary">Pricing</p>
              <h1 className="mt-4 max-w-4xl font-display text-[clamp(2.45rem,5vw,5rem)] leading-[0.96] text-ink">
                Editing and proofreading pricing calculator.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-body sm:text-lg">
                Choose a service, enter your word count, and select a timeline. You will upload the file next so we can verify the word count before checkout.
              </p>
            </div>
            <div className="hidden rounded-2xl border border-hairline bg-canvas/75 p-4 text-sm leading-6 text-body shadow-[0_18px_60px_rgba(17,17,15,0.04)] lg:block">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Payment rule</p>
              <p className="mt-2">The public estimate excludes processing fees. Final payment is confirmed only after secure server-side verification.</p>
            </div>
          </div>

          <PricingCalculator compact />

          <div className="mt-7 flex flex-col gap-3 text-sm text-body sm:flex-row sm:items-center sm:justify-between">
            <p>Need a quote for a complex or very large document?</p>
            <Link href="/contact" className="inline-flex min-h-11 w-fit items-center justify-center rounded-full border border-hairline bg-canvas px-5 font-medium text-ink transition duration-200 ease-premium-out hover:border-primary hover:text-primary active:scale-[0.98]">
              Contact Support
            </Link>
          </div>

          <section className="mt-10 grid gap-5 lg:grid-cols-[0.72fr_0.28fr]">
            <div className="rounded-2xl border border-hairline bg-canvas/80 p-6 sm:p-7">
              <h2 className="font-display text-3xl leading-tight text-ink">How editing and proofreading pricing works</h2>
              <p className="mt-4 text-sm leading-7 text-body">
                The calculator estimates eligible projects from the selected service, word count, and turnaround. Automatic estimates apply up to {CUSTOM_REVIEW_WORD_COUNT.toLocaleString()} words, with a ${MINIMUM_ORDER} minimum order and a {SERVICE_CHARGE_PERCENTAGE}% service charge shown before payment. The uploaded file is still reviewed so the word count, scope, deadline, and file requirements can be confirmed.
              </p>
              <div className="mt-6 grid gap-3 text-sm leading-6 text-body sm:grid-cols-2">
                <p className="border-l border-primary/30 pl-4">Word count drives the estimate because longer documents require more review time. The calculator uses the current word count you enter before upload verification.</p>
                <p className="border-l border-primary/30 pl-4">Turnaround options run from {TURNAROUND_OPTIONS[0].label} to {TURNAROUND_OPTIONS[TURNAROUND_OPTIONS.length - 1].label}; unavailable timelines are disabled for larger word counts.</p>
                <p className="border-l border-primary/30 pl-4">Proofreading is for final grammar, punctuation, spelling, and consistency checks. Editing is for clarity, flow, tone, sentence-level polish, and academic or business presentation.</p>
                <p className="border-l border-primary/30 pl-4">Large documents above {CUSTOM_REVIEW_WORD_COUNT.toLocaleString()} words, unusual files, or complex formatting needs require a custom quote before checkout.</p>
              </div>
              <div className="mt-6 overflow-hidden rounded-xl border border-hairline bg-surface-soft">
                <div className="grid gap-px bg-hairline text-sm sm:grid-cols-2 lg:grid-cols-4">
                  {SERVICE_OPTIONS.filter((service) => service.label === "Proofreading" || service.label === "Editing" || service.label === "Formatting" || service.label === "Writing Support").map((service) => (
                    <div key={service.label} className="bg-canvas p-4">
                      <h3 className="font-semibold text-ink">{service.label}</h3>
                      <p className="mt-2 leading-6 text-body">
                        {"fixedPrice" in service && service.fixedPrice ? `$${service.fixedPrice} fixed package` : `$${service.rate.toFixed(3)} per word before turnaround calculation`}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <aside className="rounded-2xl border border-hairline bg-surface-soft p-6">
              <h2 className="font-display text-2xl leading-tight text-ink">Helpful pricing guides</h2>
              <div className="mt-5 grid gap-3 text-sm font-semibold">
                <Link href="/blog/how-much-does-proofreading-cost" className="text-primary underline decoration-primary/25 underline-offset-4 transition hover:decoration-primary">
                  How much proofreading costs
                </Link>
                <Link href="/blog/how-long-does-dissertation-proofreading-take" className="text-primary underline decoration-primary/25 underline-offset-4 transition hover:decoration-primary">
                  Dissertation proofreading time
                </Link>
                <Link href="/blog/editing-vs-proofreading" className="text-primary underline decoration-primary/25 underline-offset-4 transition hover:decoration-primary">
                  Editing vs proofreading
                </Link>
              </div>
            </aside>
          </section>

          <section className="mt-10 border-t border-hairline pt-8">
            <h2 className="font-display text-3xl leading-tight text-ink">Pricing questions</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {pricingFaqs.map((item) => (
                <article key={item.question} className="rounded-2xl border border-hairline bg-canvas/80 p-5">
                  <h3 className="text-base font-semibold leading-7 text-ink">{item.question}</h3>
                  <p className="mt-3 text-sm leading-7 text-body">{item.answer}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
