import { CareVisual } from "@/components/EditorialVisuals";
import { PublicPageShell } from "@/components/PublicPageShell";

const values = [
  "Premium editorial judgment without noisy process",
  "Confidential handling for every uploaded document",
  "Clear communication from submission to delivery",
  "A polished client experience around serious work"
];

export default function AboutPage() {
  return (
    <div className="relative min-h-screen">
      <div 
        className="fixed inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-[0.06] blur-[2px]"
        aria-hidden="true"
      />
      
      <div className="relative z-10">
        <PublicPageShell
          eyebrow="About"
          title="A calm desk for important documents."
          description="My Editing and Proofreading Desk exists for clients who need their writing handled with care, discretion, and exacting editorial standards."
        >
          <section className="px-5 py-20 sm:px-8 lg:py-28 backdrop-blur-sm bg-ivory/80">
            <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1fr] lg:items-center">
              <div className="max-w-4xl">
                <p className="font-display text-[clamp(2.4rem,5vw,4.8rem)] leading-[0.98] text-ink">
                  The work is simple to describe: improve the document, protect the voice, and make the final file feel ready for its audience.
                </p>
                <div className="mt-10 grid gap-8 text-lg leading-8 text-charcoal/80">
                  <p>
                    The platform is designed around a premium editorial workflow: clients can submit documents, understand pricing, track progress, and receive completed files from one organized workspace.
                  </p>
                  <p>
                    The brand serves students, academic researchers, authors, business professionals, and general clients who want serious writing to be cleaner, sharper, and easier to trust.
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {values.map((value) => (
                      <div key={value} className="border-t border-ink/20 pt-4 text-base font-medium text-ink bg-ivory/50 p-4 shadow-sm">{value}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </PublicPageShell>
      </div>
    </div>
  );
}
