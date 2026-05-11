import { PublicPageShell } from "@/components/PublicPageShell";
import { HeroEditorialVisual } from "@/components/EditorialVisuals";
import { editorStandards } from "@/lib/content";

export default function EditorsPage() {
  return (
    <PublicPageShell
      eyebrow="Editor standards"
      title="The standard behind every edit."
      description="Our editing process is built around context, voice preservation, careful language review, and delivery discipline."
      visual={<HeroEditorialVisual label="Editor standards" />}
    >
      <section className="bg-canvas px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <div className="border-l border-primary/45 pl-7">
            <p className="text-xs uppercase tracking-[0.28em] text-primary">Quality posture</p>
            <h2 className="mt-6 font-display text-5xl leading-tight text-ink">Careful writing deserves careful review.</h2>
            <p className="mt-5 text-base leading-7 text-body">
              Editors are expected to improve clarity without flattening the author’s intent, especially for academic, business, and professional documents.
            </p>
          </div>
          <div className="grid gap-5">
            {editorStandards.map((standard) => (
              <article key={standard.title} className="grid gap-5 rounded-2xl border border-hairline bg-surface-soft p-7 shadow-[0_18px_60px_rgba(17,17,15,0.035)] transition duration-200 ease-premium-out hover:-translate-y-0.5 hover:border-primary/35 hover:bg-canvas md:grid-cols-[0.35fr_0.65fr]">
                <h3 className="font-display text-3xl leading-tight text-ink">{standard.title}</h3>
                <p className="text-base leading-7 text-charcoal/68">{standard.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PublicPageShell>
  );
}
