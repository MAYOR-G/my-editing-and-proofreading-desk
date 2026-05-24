import { Brain, FileLock2, MessageSquareText, SearchCheck } from "lucide-react";
import { PublicPageShell } from "@/components/PublicPageShell";
import { EditorialPhotoVisual } from "@/components/EditorialVisuals";
import { editorStandards } from "@/lib/content";

const strengthIcons = [SearchCheck, MessageSquareText, FileLock2, Brain];

export default function EditorsPage() {
  return (
    <PublicPageShell
      eyebrow="Quality standards"
      title="Work reviewed by editors who understand your field."
      description="Our editors support academic, business, technical, and professional documents with careful attention to clarity, tone, structure, and meaning."
      visual={
        <EditorialPhotoVisual
          label="Review standards"
          imageUrl="https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=82"
          imagePosition="center"
          headline="Focused review from first read to final pass."
          details={["Clarity", "Tone", "Structure"]}
        />
      }
    >
      <section className="bg-canvas px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
            <div className="rounded-2xl border border-hairline bg-surface-soft p-7 shadow-[0_22px_70px_rgba(17,17,15,0.045)]">
              <p className="text-xs uppercase tracking-[0.28em] text-primary">Quality posture</p>
              <h2 className="mt-5 font-display text-[clamp(2.1rem,4vw,4rem)] leading-tight text-ink">Human judgment, field awareness, and careful delivery.</h2>
              <p className="mt-5 text-base leading-7 text-body">
                The editing process is designed for documents where accuracy, tone, and reader trust matter. Editors look beyond surface corrections to the purpose of the work and the expectations of its audience.
              </p>
              <div className="mt-7 rounded-xl border border-primary/20 bg-canvas p-4 text-sm leading-6 text-body">
                <span className="font-semibold text-ink">Trust line:</span> Your document stays private and is reviewed for the service you requested.
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {editorStandards.map((standard, index) => {
                const Icon = strengthIcons[index % strengthIcons.length];

                return (
                  <article key={standard.title} className="h-full rounded-2xl border border-hairline bg-canvas p-6 shadow-[0_18px_60px_rgba(17,17,15,0.035)] transition duration-200 ease-premium-out hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-[0_24px_75px_rgba(17,17,15,0.06)]">
                    <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                    <h3 className="mt-5 font-display text-3xl leading-tight text-ink">{standard.title}</h3>
                    <p className="mt-3 text-base leading-7 text-body">{standard.body}</p>
                  </article>
                );
              })}
            </div>
          </div>

          <div className="mt-12 grid gap-6 rounded-[1.35rem] border border-hairline bg-surface-soft p-7 shadow-[0_24px_80px_rgba(17,17,15,0.045)] sm:p-9 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-primary">How editors work</p>
              <h2 className="mt-4 font-display text-4xl leading-tight text-ink">A calm review process for high-stakes writing.</h2>
            </div>
            <p className="max-w-3xl text-base leading-8 text-body">
              Editors review the document in layers: purpose and audience first, then structure, clarity, sentence flow, grammar, formatting, and final consistency. That keeps the work thorough without turning the writer’s voice into someone else’s.
            </p>
          </div>
        </div>
      </section>
    </PublicPageShell>
  );
}
