import type { Metadata } from "next";
import { FileCheck2, LockKeyhole, MessageSquareText, PenLine } from "lucide-react";
import { PublicPageShell } from "@/components/PublicPageShell";
import { buildPageMetadata } from "@/lib/site";

const values = [
  {
    title: "Human-led editing",
    body: "Your document is reviewed by people who can read for meaning, context, audience, and voice.",
    icon: PenLine
  },
  {
    title: "Confidential document handling",
    body: "Academic drafts, business files, applications, and personal documents are handled privately.",
    icon: LockKeyhole
  },
  {
    title: "Academic and professional quality",
    body: "We support documents where clarity, structure, tone, grammar, and presentation all matter.",
    icon: FileCheck2
  },
  {
    title: "Clear, respectful feedback",
    body: "When a change needs your decision, we explain it clearly instead of guessing for you.",
    icon: MessageSquareText
  }
];

export const metadata: Metadata = buildPageMetadata({
  title: "About My Editing and Proofreading Desk",
  description: "Learn how My Editing and Proofreading Desk provides human-led editing for academic, business, application, manuscript, and professional documents.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <PublicPageShell
      eyebrow="Editorial care"
      title="Editing built around clarity, care, and precision."
      description="We help students, researchers, professionals, and businesses turn important documents into clear, polished writing while preserving the writer's voice."
      seoPath="/about"
    >
      <section className="relative overflow-hidden bg-canvas px-5 py-16 sm:px-8 lg:py-24">
        <div className="absolute inset-0 opacity-[0.045] [background-image:linear-gradient(rgba(23,74,124,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(23,74,124,0.12)_1px,transparent_1px)] [background-size:38px_38px]" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.92fr_0.78fr] lg:items-center">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">Who we are</p>
              <h2 className="mt-5 font-display text-[clamp(2.25rem,4.4vw,4.4rem)] leading-[0.98] text-ink">
                Thoughtful editing for documents people need to trust.
              </h2>
              <div className="mt-7 grid max-w-[68ch] gap-5 text-base leading-8 text-body sm:text-lg">
                <p>
                  My Editing and Proofreading Desk supports writing that carries real weight: dissertations, research papers, reports, applications, proposals, manuscripts, and client-facing documents.
                </p>
                <p>
                  Every edit focuses on structure, tone, grammar, and meaning. The goal is a clearer document that still sounds like the person or organization behind it.
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-hairline bg-surface-soft p-5 shadow-[0_28px_90px_rgba(17,17,15,0.06)] sm:p-7">
              <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-primary/10 blur-3xl" aria-hidden="true" />
              <div className="absolute -bottom-24 left-8 h-56 w-56 rounded-full bg-gold/18 blur-3xl" aria-hidden="true" />
              <div className="absolute inset-0 opacity-[0.06] [background-image:radial-gradient(rgba(23,74,124,0.28)_1px,transparent_1px)] [background-size:18px_18px]" aria-hidden="true" />

              <div className="relative rotate-[-1.5deg] rounded-[1.1rem] border border-hairline bg-canvas p-5 shadow-[0_22px_70px_rgba(17,17,15,0.07)] sm:p-6">
                <div className="flex items-start justify-between gap-5 border-b border-hairline pb-5">
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-primary">Editorial review</p>
                    <h3 className="mt-2 font-display text-3xl leading-tight text-ink">Tracked clarity pass</h3>
                  </div>
                  <span className="rounded-full border border-primary/25 bg-primary/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary shadow-sm">
                    Human
                  </span>
                </div>

                <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_9.5rem]">
                  <div className="grid gap-4 rounded-xl border border-hairline bg-paper/70 p-5 text-sm leading-7 text-charcoal/76 shadow-inner">
                    <div>
                      <p className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-red-700">Before</p>
                      <p className="mt-1">The proposal needs clearer goals before it can be shared with the review committee.</p>
                    </div>
                    <div className="border-t border-hairline pt-4">
                      <p className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-primary">After</p>
                      <p className="mt-1 rounded-sm bg-primary/10 px-2 py-1 font-medium text-primary">
                        The proposal needs clearer objectives before it is shared with the review committee.
                      </p>
                    </div>
                  </div>

                  <div className="grid content-start gap-3">
                    <div className="rounded-xl border border-primary/15 bg-canvas p-3 shadow-sm">
                      <p className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-primary">Margin note</p>
                      <p className="mt-2 text-xs leading-5 text-body">Clarify the outcome before expanding the evidence section.</p>
                    </div>
                    <div className="rounded-xl border border-gold/30 bg-gold/10 p-3 shadow-sm">
                      <p className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-gold-deep">Editor check</p>
                      <p className="mt-2 text-xs leading-5 text-body">Preserve voice, tighten flow, verify consistency.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative mt-5 grid grid-cols-3 gap-3 text-xs text-charcoal/58">
                {["Grammar", "Structure", "Tone"].map((item) => (
                  <div key={item} className="rounded-xl border border-hairline bg-canvas/78 px-3 py-3 text-center font-semibold uppercase tracking-[0.14em] text-primary shadow-sm">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value, index) => (
                <article key={value.title} className="h-full rounded-2xl border border-hairline bg-canvas p-5 shadow-[0_18px_55px_rgba(17,17,15,0.04)] transition duration-300 ease-premium-out hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_24px_70px_rgba(17,17,15,0.065)]">
                  <value.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  <h3 className="mt-5 font-display text-2xl leading-tight text-ink">{value.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-body">{value.body}</p>
                </article>
              ))}
          </div>

          <div className="mt-14 grid gap-8 rounded-[1.35rem] border border-hairline bg-surface-soft p-7 shadow-[0_28px_90px_rgba(17,17,15,0.055)] sm:p-10 lg:grid-cols-[0.78fr_1.22fr] lg:p-12">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">Our approach</p>
              <h2 className="mt-4 max-w-md font-display text-[clamp(2.1rem,4vw,3.7rem)] leading-none text-ink">
                Careful edits, not a rewritten identity.
              </h2>
            </div>
            <div className="grid max-w-[74ch] gap-6 text-base leading-8 text-body">
              <p>
                We read first for what the document is trying to do, then edit in layers: structure and logic, paragraph flow, sentence clarity, grammar and punctuation, tone, formatting, and final proofread. That sequence keeps the work precise without flattening the author's style.
              </p>
              <p>
                When a change needs the writer's decision, we leave a clear comment rather than guessing. The result is a cleaner document and a transparent editorial trail.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PublicPageShell>
  );
}
