import type { Metadata } from "next";
import Link from "next/link";
import { PublicPageShell } from "@/components/PublicPageShell";
import { buildPageMetadata } from "@/lib/site";

const policySections = [
  {
    title: "Human editorial judgment",
    body: "Professional service work is reviewed by people, not treated as a fully automated rewrite. Tools may support workflow, but human judgment guides meaning, tone, structure, and context-sensitive decisions.",
  },
  {
    title: "Author ownership",
    body: "Editors improve the writing supplied by the client. They do not invent research findings, sources, work experience, admissions claims, business data, or assessed academic content.",
  },
  {
    title: "Confidential handling",
    body: "Uploaded documents are used to provide the requested service and should be accessed only by the people involved in administration, editing, support, payment, and delivery.",
  },
  {
    title: "Transparent scope",
    body: "Pricing and turnaround depend on service type, word count, document condition, and deadline. If a document needs work beyond the selected service, the client should be told before scope changes.",
  },
];

export const metadata: Metadata = buildPageMetadata({
  title: "Editorial Policy for Editing and Proofreading",
  description: "Read our editorial policy for human review, academic integrity, confidentiality, document handling, AI-assisted tools, scope, and client communication.",
  path: "/editorial-policy",
});

export default function EditorialPolicyPage() {
  return (
    <PublicPageShell
      eyebrow="Editorial standards"
      title="Our editorial policy."
      description="A clear statement of how documents are reviewed, what editors can and cannot do, and how client work is handled."
      seoPath="/editorial-policy"
      breadcrumbItems={[
        { name: "Home", path: "/" },
        { name: "Editorial Policy", path: "/editorial-policy" },
      ]}
    >
      <section className="bg-canvas px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-4 md:grid-cols-2">
            {policySections.map((section) => (
              <article key={section.title} className="rounded-2xl border border-hairline bg-surface-soft p-6 sm:p-7">
                <h2 className="font-display text-3xl leading-tight text-ink">{section.title}</h2>
                <p className="mt-4 text-sm leading-7 text-body">{section.body}</p>
              </article>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-primary/15 bg-primary/[0.045] p-7 sm:flex sm:items-center sm:justify-between sm:gap-8">
            <div>
              <h2 className="font-display text-3xl text-ink">Need service guidance?</h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-body">
                Compare services, ask a question, or submit your document when you are ready for a secure review.
              </p>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:mt-0 sm:flex-row">
              <Link href="/services" className="inline-flex min-h-12 items-center justify-center rounded-full border border-primary/25 bg-canvas px-6 text-sm font-semibold text-primary transition hover:border-primary">
                View Services
              </Link>
              <Link href="/submit" className="inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-white transition hover:bg-primary-active">
                Submit a Document
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PublicPageShell>
  );
}
