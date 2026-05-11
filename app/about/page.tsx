import { PublicPageShell } from "@/components/PublicPageShell";

const values = [
  {
    title: "Human editorial care",
    body: "We review writing with judgment, context, and respect for the author’s voice."
  },
  {
    title: "Private document handling",
    body: "Sensitive academic, business, and personal materials are treated with discretion."
  },
  {
    title: "Clear project flow",
    body: "Clients can move from service fit to pricing, upload, review, and delivery without noise."
  },
  {
    title: "Submission-ready polish",
    body: "The goal is cleaner structure, stronger sentences, and a final document that feels prepared."
  }
];

export default function AboutPage() {
  return (
    <PublicPageShell
      eyebrow="About"
      title="A calm desk for important documents."
      description="My Editing and Proofreading Desk exists for clients who need their writing handled with care, discretion, and exacting editorial standards."
    >
      <section className="bg-canvas px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">Our philosophy</p>
            <p className="font-display text-[clamp(2.4rem,5vw,4.8rem)] leading-[0.98] text-ink">
              The work is simple to describe: improve the document, protect the voice, and make the final file feel ready for its audience.
            </p>
            <div className="mt-10 grid gap-8 text-lg leading-8 text-body">
              <p>
                The platform is designed around a premium editorial workflow: clients can submit documents, understand pricing, track progress, and receive completed files from one organized workspace.
              </p>
              <p>
                The brand serves students, academic researchers, authors, business professionals, and general clients who want serious writing to be cleaner, sharper, and easier to trust.
              </p>
            </div>
          </div>
          <div className="grid gap-4">
            {values.map((value) => (
              <article key={value.title} className="rounded-2xl border border-hairline bg-surface-soft p-6 shadow-sm transition duration-200 ease-premium-out hover:-translate-y-0.5 hover:border-primary/35 hover:bg-canvas">
                <h2 className="font-display text-2xl leading-tight text-ink">{value.title}</h2>
                <p className="mt-3 text-sm leading-6 text-body">{value.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PublicPageShell>
  );
}
