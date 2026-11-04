import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { PricingCalculator } from "@/components/PricingCalculator";
import { SampleEditCta } from "@/components/SampleEditCta";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { BASE_RATE_DISPLAY, CUSTOM_REVIEW_WORD_COUNT, MINIMUM_ORDER, SERVICE_CHARGE_PERCENTAGE, TURNAROUND_OPTIONS } from "@/lib/pricing";
import { breadcrumbJsonLd, buildPageMetadata, webPageJsonLd } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "Editing and Proofreading Rates and Price Calculator",
  description: "See per-word rates for editing, proofreading and formatting, then estimate your price by word count, document type and turnaround.",
  path: "/pricing",
});

const pricingTierCards = [
  {
    label: "Proofreading (Final Surface Pass)",
    badge: "STAGE 02 · SUBMISSION-READY DRAFTS",
    rateDisplay: "$0.022 – $0.038 / word",
    subRate: "($0.023/word at 14-day pace · $0.030 standard base rate)",
    scopeSummary: "Final quality-control pass for grammar, typos, punctuation, spelling variants (UK/US/CA/AU), and formatting consistency once structure is locked.",
  },
  {
    label: "Substantive & Academic Editing",
    badge: "STAGE 01 · DEEP REVISION & FLOW",
    rateDisplay: "$0.022 – $0.038 / word",
    subRate: "(Unified Academic Rate · $0.023/word at 14-day pace)",
    scopeSummary: "Deep sentence mechanics, structural paragraph flow, academic tone calibration, hedging precision, argument clarity, and margin queries.",
  },
  {
    label: "Document Formatting & Style Layout",
    badge: "PRESENTATION & COMPLIANCE",
    rateDisplay: "$0.029 – $0.051 / word",
    subRate: "($0.031/word at 14-day pace · $0.040 standard base rate)",
    scopeSummary: "APA 7th, CMOS 17th, MLA, OSCOLA, IEEE, or university template styles, automated TOC/lists, heading hierarchy, captions, and margins.",
  },
  {
    label: "Developmental Writing Support",
    badge: "FIXED-SCOPE PACKAGE",
    rateDisplay: "$450.00 fixed package",
    subRate: "(Flat package · independent of word-count slider)",
    scopeSummary: "High-level structural reframing, supervisor feedback action plans, chapter outline architecture, and intensive developmental guidance.",
  },
];

const scopeComparisonRows = [
  {
    dimension: "Primary Editorial Objective",
    proofreading: "Eliminate final surface errors, typographical slips, and style inconsistencies before deposit or publication.",
    editing: "Strengthen sentence mechanics, paragraph transitions, scholarly voice, hedging, and argument clarity.",
  },
  {
    dimension: "Recommended Draft Stage",
    proofreading: "Final settled draft (after supervisor/co-author revisions and structural changes are complete).",
    editing: "Working complete draft or chapter where phrasing feels dense, repetitive, translated (ESL), or structurally uneven.",
  },
  {
    dimension: "Grammar, Typos & Punctuation",
    proofreading: "Included — exhaustive line-by-line correction of spelling, syntax, hyphenation, and punctuation.",
    editing: "Included — full grammatical correction integrated with deeper sentence restructuring.",
  },
  {
    dimension: "Sentence Flow & Academic Tone",
    proofreading: "Light intervention only (fixes outright syntax errors without rewriting working sentences).",
    editing: "Deep intervention — reworks awkward syntax, eliminates wordiness, and elevates scholarly register.",
  },
  {
    dimension: "Hedging & Claim Calibration",
    proofreading: "Not included (preserves existing claim phrasing unless grammatically broken).",
    editing: "Included — replaces unsupported absolutes ('proves', 'undeniably') with rigorous empirical hedging.",
  },
  {
    dimension: "Cross-Chapter & Argument Logic",
    proofreading: "Checks heading numbering, table/figure callouts, and terminology uniformity.",
    editing: "Audits paragraph-to-paragraph transitions, thesis alignment, and flags logical gaps via Word comments.",
  },
  {
    dimension: "Per-Word Rate & Turnaround Scaling",
    proofreading: "$0.022–$0.038/word by timeline ($80.50 for 3,500 words at 14 days). Best suited for rapid 12h–72h turnarounds.",
    editing: "Unified $0.022–$0.038/word academic rate ($80.50 for 3,500 words at 14 days) so researchers never compromise on needed depth.",
  },
];

const pricingFaqs = [
  {
    question: "How are editing and proofreading prices calculated?",
    answer: "Eligible projects are estimated from the selected service, word count, and turnaround time. The calculator shows the estimate before secure upload and checkout.",
  },
  {
    question: "Why do Proofreading and Editing share the same per-word rate curve?",
    answer: "Under our Unified Academic Rate policy, we price Proofreading and Editing on the same transparent turnaround curve ($0.022 to $0.038 per word) so graduate students and researchers can select the exact level of intervention their manuscript requires—surface check vs. deep stylistic editing—without financial penalty.",
  },
  {
    question: "Can very long dissertations or complex manuscripts use the calculator?",
    answer: "Very long, technically complex, or unusual documents may need custom review so the scope, turnaround, formatting requirements, and final deliverables are realistic.",
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-canvas text-ink">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Pricing", path: "/pricing" },
          ]),
          webPageJsonLd({
            path: "/pricing",
            name: "Editing and Proofreading Pricing",
            description: "Pricing calculator for human editing, proofreading, formatting, translation review, and writing support projects.",
            dateModified: "2026-11-04",
          }),
        ]}
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
                <div className="grid gap-px bg-hairline text-sm sm:grid-cols-2">
                  {pricingTierCards.map((tier) => (
                    <div key={tier.label} className="flex flex-col justify-between bg-canvas p-5">
                      <div>
                        <span className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-primary">
                          {tier.badge}
                        </span>
                        <h3 className="mt-1.5 font-display text-2xl text-ink">{tier.label}</h3>
                        <p className="mt-2 font-mono text-base font-bold text-primary">{tier.rateDisplay}</p>
                        <p className="text-xs text-muted">{tier.subRate}</p>
                      </div>
                      <p className="mt-3 border-t border-hairline pt-3 text-xs leading-6 text-body">
                        {tier.scopeSummary}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-5">
                <h3 className="font-display text-xl text-ink">Sample estimate breakdown (3,500 words at 14 days)</h3>
                <p className="mt-2 text-sm leading-6 text-body">
                  Understanding why the default calculator sample displays <strong>$80.50</strong> instead of the standard base product (3,500 × $0.030 = $105.00):
                </p>
                <div className="mt-4 grid gap-3 text-sm leading-6 sm:grid-cols-2">
                  <div className="rounded-lg border border-hairline bg-canvas p-4">
                    <p className="font-semibold text-ink">Base rate &amp; turnaround adjustment</p>
                    <p className="mt-1 text-muted">The published editorial base rate is {BASE_RATE_DISPLAY} ($0.030) per word for standard delivery pace. For a flexible 14-day turnaround on a 3,500-word draft, our turnaround curve scales the effective rate to <strong>$0.023 per word</strong> (3,500 × $0.023 = $80.50).</p>
                  </div>
                  <div className="rounded-lg border border-hairline bg-canvas p-4">
                    <p className="font-semibold text-ink">Service charge &amp; checkout total</p>
                    <p className="mt-1 text-muted">The calculator displays the editorial subtotal ($80.50, satisfying our ${MINIMUM_ORDER} order minimum). At final checkout, our standard {SERVICE_CHARGE_PERCENTAGE}% processing fee ($4.03) is added, resulting in a final verified payment total of $84.53.</p>
                  </div>
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
                <Link href="/blog/ai-vs-human-editing-3500-word-experiment" className="text-primary underline decoration-primary/25 underline-offset-4 transition hover:decoration-primary">
                  AI vs. Human 3,500-word ($80.50) test
                </Link>
              </div>
            </aside>
          </section>

          {/* Side-by-Side Proofreading vs Editing Scope Comparison Table */}
          <section className="mt-12 rounded-2xl border border-hairline bg-canvas p-6 shadow-[0_18px_60px_rgba(17,17,15,0.04)] sm:p-8">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">Scope &amp; Tier Differentiation</p>
              <h2 className="mt-3 font-display text-3xl leading-tight text-ink sm:text-4xl">
                Proofreading vs. Editing: Exact Scope Comparison
              </h2>
              <p className="mt-3 text-sm leading-7 text-body sm:text-base">
                We price Proofreading and Substantive Editing on the same transparent per-word turnaround curve so researchers never downgrade to surface proofreading when their chapter genuinely needs deep structural and stylistic editing. Use the table below to select the right editorial tier for your draft stage.
              </p>
            </div>

            <div className="mt-7 overflow-x-auto rounded-xl border border-hairline">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead className="bg-primary text-white">
                  <tr>
                    <th scope="col" className="px-4 py-3.5 font-semibold sm:px-5">Scope Dimension</th>
                    <th scope="col" className="px-4 py-3.5 font-semibold sm:px-5">Proofreading (Final Surface Check)</th>
                    <th scope="col" className="px-4 py-3.5 font-semibold sm:px-5">Editing (Deep Structural &amp; Stylistic Polish)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-hairline bg-canvas">
                  {scopeComparisonRows.map((row) => (
                    <tr key={row.dimension} className="align-top transition-colors hover:bg-surface-soft/50">
                      <td className="min-w-44 px-4 py-4 font-semibold text-ink sm:px-5">{row.dimension}</td>
                      <td className="min-w-64 px-4 py-4 leading-6 text-body sm:px-5">{row.proofreading}</td>
                      <td className="min-w-64 px-4 py-4 leading-6 text-body sm:px-5">{row.editing}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Secondary Lead Magnet CTA: Free 300-Word Human Sample Edit */}
          <section className="mt-10">
            <SampleEditCta />
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
