import { PublicPageShell } from "@/components/PublicPageShell";
import { Reveal } from "@/components/Reveal";

const values = [
  {
    title: "Human-led editing",
    body: "Every serious document benefits from an editor who can read for meaning, context, audience, and voice."
  },
  {
    title: "Clarity and precision",
    body: "We improve grammar, structure, tone, terminology, and sentence flow so the writing becomes easier to trust."
  },
  {
    title: "Confidential handling",
    body: "Academic drafts, business files, applications, and personal documents are treated with care and discretion."
  },
  {
    title: "Academic and professional quality",
    body: "Our work supports students, researchers, authors, professionals, and businesses preparing important material."
  }
];

export default function AboutPage() {
  return (
    <PublicPageShell
      eyebrow="About"
      title="Expert editing for documents that matter."
      description="My Editing and Proofreading Desk helps students, researchers, professionals, authors, and businesses make important writing clearer, sharper, and ready for its audience."
    >
      <section className="relative overflow-hidden bg-canvas px-5 py-20 sm:px-8 lg:py-28">
        <div className="absolute inset-0 opacity-[0.055] [background-image:linear-gradient(rgba(23,74,124,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(23,74,124,0.12)_1px,transparent_1px)] [background-size:38px_38px]" aria-hidden="true" />
        <div className="absolute -right-24 top-20 h-80 w-80 rounded-full bg-primary/10 blur-3xl" aria-hidden="true" />
        <div className="absolute -bottom-24 left-10 h-72 w-72 rounded-full bg-gold/10 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
            <Reveal variant="softBlur">
              <div className="max-w-4xl">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">Who we are</p>
                <h2 className="mt-5 font-display text-[clamp(2.35rem,4.8vw,4.8rem)] leading-[0.98] text-ink">
                  A professional editorial desk for academic, business, and personal writing.
                </h2>
                <div className="mt-8 grid max-w-[72ch] gap-6 text-lg leading-8 text-body">
                  <p>
                    We help clients turn rough, complex, or high-pressure drafts into polished documents that read with confidence. The service is built for people who need more than a quick spell-check: students preparing dissertations, researchers refining manuscripts, professionals applying for roles, and businesses sending client-facing work.
                  </p>
                  <p>
                    Our role is to improve the document while protecting the writer's voice. We focus on meaning, structure, grammar, tone, readability, references, and presentation so the final file feels coherent and credible.
                  </p>
                </div>
              </div>
            </Reveal>

            <div className="grid gap-4 sm:grid-cols-2">
              {values.map((value, index) => (
                <Reveal key={value.title} delay={index * 0.06} variant={index % 2 === 0 ? "clipUp" : "softBlur"}>
                  <article className="h-full rounded-2xl border border-hairline bg-[#fffdf7]/92 p-6 shadow-[0_18px_55px_rgba(17,17,15,0.045)] backdrop-blur-sm transition duration-300 ease-premium-out hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_24px_70px_rgba(17,17,15,0.07)]">
                    <h3 className="font-display text-2xl leading-tight text-ink">{value.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-body">{value.body}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal variant="clipUp" delay={0.1}>
            <div className="mt-16 grid gap-10 rounded-[1.35rem] border border-hairline bg-surface-soft/90 p-7 shadow-[0_28px_90px_rgba(17,17,15,0.06)] backdrop-blur-sm sm:p-10 lg:grid-cols-[0.85fr_1.15fr] lg:p-12">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">Our approach</p>
                <h2 className="mt-4 font-display text-[clamp(2.2rem,4vw,4rem)] leading-none text-ink">
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
