import { FileCheck2, LockKeyhole, MessageSquareText, PenLine } from "lucide-react";
import { PublicPageShell } from "@/components/PublicPageShell";
import { Reveal } from "@/components/Reveal";

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

export default function AboutPage() {
  return (
    <PublicPageShell
      eyebrow="About"
      title="Editing built around clarity, care, and precision."
      description="We help students, researchers, professionals, and businesses turn important documents into polished, confident writing without losing the writer's voice."
    >
      <section className="relative overflow-hidden bg-canvas px-5 py-16 sm:px-8 lg:py-24">
        <div className="absolute inset-0 opacity-[0.045] [background-image:linear-gradient(rgba(23,74,124,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(23,74,124,0.12)_1px,transparent_1px)] [background-size:38px_38px]" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.92fr_0.78fr] lg:items-center">
            <Reveal variant="softBlur">
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
                    Every edit focuses on clarity, structure, tone, grammar, and meaning. The goal is a cleaner document that still sounds like the person or organization behind it.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal variant="clipUp" delay={0.08}>
              <div className="relative overflow-hidden rounded-2xl border border-hairline bg-surface-soft p-5 shadow-[0_28px_90px_rgba(17,17,15,0.06)] sm:p-7">
                <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(10,11,13,0.18)_1px,transparent_1px)] [background-size:100%_2.1rem]" aria-hidden="true" />
                <div className="relative rounded-xl border border-hairline bg-canvas p-5 shadow-[0_18px_60px_rgba(17,17,15,0.05)] sm:p-6">
                  <div className="flex items-start justify-between gap-5 border-b border-hairline pb-5">
                    <div>
                      <p className="text-xs uppercase tracking-[0.22em] text-primary">Editorial review</p>
                      <h3 className="mt-2 font-display text-3xl leading-tight text-ink">Draft to final</h3>
                    </div>
                    <span className="rounded-full border border-primary/25 bg-primary/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                      Private
                    </span>
                  </div>
                  <div className="mt-6 grid gap-3">
                    {[
                      ["Structure", "Argument and flow"],
                      ["Language", "Grammar, tone, and clarity"],
                      ["Finish", "Consistency and presentation"]
                    ].map(([label, body], index) => (
                      <div key={label} className="grid grid-cols-[2.2rem_1fr] gap-4 rounded-xl border border-hairline bg-surface-soft/70 p-4">
                        <span className="grid h-9 w-9 place-items-center rounded-full bg-canvas font-display text-lg text-primary">{index + 1}</span>
                        <div>
                          <p className="font-medium text-ink">{label}</p>
                          <p className="mt-1 text-sm leading-6 text-body">{body}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value, index) => (
                <Reveal key={value.title} delay={index * 0.06} variant={index % 2 === 0 ? "clipUp" : "softBlur"}>
                  <article className="h-full rounded-2xl border border-hairline bg-canvas p-5 shadow-[0_18px_55px_rgba(17,17,15,0.04)] transition duration-300 ease-premium-out hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_24px_70px_rgba(17,17,15,0.065)]">
                    <value.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                    <h3 className="mt-5 font-display text-2xl leading-tight text-ink">{value.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-body">{value.body}</p>
                  </article>
                </Reveal>
              ))}
          </div>

          <Reveal variant="clipUp" delay={0.1}>
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
          </Reveal>
        </div>
      </section>
    </PublicPageShell>
  );
}
