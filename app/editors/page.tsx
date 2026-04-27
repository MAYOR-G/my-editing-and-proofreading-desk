import { PublicPageShell } from "@/components/PublicPageShell";
import { HeroEditorialVisual } from "@/components/EditorialVisuals";
import { editorStandards } from "@/lib/content";

export default function EditorsPage() {
  return (
    <PublicPageShell
      eyebrow="Editor standards"
      title="Meet the standard behind the editing."
      description="The editor area defines the quality principles behind the work: discipline-aware review, voice preservation, structured checks, and careful delivery."
      visual={<HeroEditorialVisual label="Editor standards" />}
    >
      <section className="px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <div className="border-l border-gold/45 pl-7">
            <p className="text-xs uppercase tracking-[0.28em] text-gold-deep">Quality posture</p>
            <h2 className="mt-6 font-display text-5xl leading-tight text-ink">Careful writing deserves careful review.</h2>
          </div>
          <div className="grid gap-5">
            {editorStandards.map((standard) => (
              <article key={standard.title} className="grid gap-5 border border-ink/10 bg-paper p-7 md:grid-cols-[0.35fr_0.65fr]">
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
