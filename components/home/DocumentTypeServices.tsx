import Link from "next/link";
import { ArrowRight } from "lucide-react";

const documentServices = [
  {
    title: "Thesis & Dissertation Editing",
    description: "Thesis editing and dissertation proofreading for chapter flow, scholarly tone, grammar, references, and presentation.",
    href: "/services/academic-editing",
  },
  {
    title: "Research Paper Editing",
    description: "Research paper editing for clear methods, results, discussion, terminology, and journal-ready language.",
    href: "/services/academic-editing",
  },
  {
    title: "Essay Proofreading",
    description: "Academic proofreading and final checks for essays that are already structured and nearly ready to submit.",
    href: "/services/express-service",
  },
  {
    title: "Business Proposal Editing",
    description: "Business proposal and report editing for concise messaging, credible tone, and reader-focused structure.",
    href: "/services/non-academic-editing",
  },
  {
    title: "Book & Manuscript Editing",
    description: "Manuscript editing for long-form organization, consistency, readability, headings, and references.",
    href: "/services/manuscript-formatting",
  },
  {
    title: "Application & Statement Editing",
    description: "Application editing and writing support for personal statements, proposals, and professional submissions.",
    href: "/services/writing-support",
  },
];

export function DocumentTypeServices() {
  return (
    <section className="border-b border-ink/5 bg-ivory px-5 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-screen-xl">
        <div className="grid gap-8 lg:grid-cols-[0.68fr_1.32fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">Document types</p>
            <h2 className="mt-4 font-display text-4xl font-bold leading-tight text-ink sm:text-5xl">
              What Do You Need Edited?
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-8 text-charcoal/72 sm:text-lg">
            Choose the editing service that matches your document type, deadline, and level of review.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {documentServices.map((service, index) => (
            <Link
              key={service.title}
              href={service.href}
              className="group rounded-2xl border border-ink/5 bg-white p-6 shadow-[0_16px_50px_rgba(15,59,127,0.035)] transition duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-[0_22px_60px_rgba(15,59,127,0.07)]"
            >
              <div className="flex items-start justify-between gap-5">
                <span className="font-display text-3xl text-primary/28">{String(index + 1).padStart(2, "0")}</span>
                <ArrowRight className="h-4 w-4 text-primary transition group-hover:translate-x-1" aria-hidden="true" />
              </div>
              <h3 className="mt-6 font-display text-2xl font-bold leading-tight text-ink group-hover:text-primary">
                {service.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-charcoal/68">{service.description}</p>
            </Link>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
          <Link href="/services/express-service" className="font-semibold text-primary hover:underline">
            Professional proofreading services
          </Link>
          <Link href="/pricing" className="font-semibold text-primary hover:underline">
            Review pricing
          </Link>
          <Link href="/dashboard/uploads" className="font-semibold text-primary hover:underline">
            Submit your document
          </Link>
        </div>
      </div>
    </section>
  );
}
