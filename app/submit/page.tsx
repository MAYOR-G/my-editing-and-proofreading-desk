import type { Metadata } from "next";
import Link from "next/link";
import { FileText, LockKeyhole, MessageSquareText, ShieldCheck } from "lucide-react";
import { PublicPageShell } from "@/components/PublicPageShell";
import { buildPageMetadata } from "@/lib/site";

const steps = [
  {
    title: "Choose the service",
    body: "Select editing, proofreading, formatting, translation review, or the closest service for your document.",
    icon: FileText,
  },
  {
    title: "Upload securely",
    body: "Add the file, document type, audience notes, deadline, and any formatting or style requirements.",
    icon: LockKeyhole,
  },
  {
    title: "Review pricing",
    body: "Confirm the detected word count, turnaround, selected service, and price before payment.",
    icon: ShieldCheck,
  },
  {
    title: "Track delivery",
    body: "Use the client dashboard for project updates, support messages, and completed file delivery.",
    icon: MessageSquareText,
  },
];

export const metadata: Metadata = buildPageMetadata({
  title: "Submit a Document for Editing or Proofreading",
  description: "Upload your document securely for human editing, proofreading, formatting, or translation review. Check pricing, turnaround, and project details before payment.",
  path: "/submit",
});

export default function SubmitPage() {
  return (
    <PublicPageShell
      eyebrow="Secure upload"
      title="Submit a document for human editing or proofreading."
      description="Start with a public overview, then continue into the secure client upload flow when you are ready to confirm the file, service, word count, turnaround, and payment."
      seoPath="/submit"
      breadcrumbItems={[
        { name: "Home", path: "/" },
        { name: "Submit", path: "/submit" },
      ]}
    >
      <section className="bg-canvas px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <aside className="rounded-2xl border border-hairline bg-surface-soft p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">Before you upload</p>
            <h2 className="mt-4 font-display text-3xl leading-tight text-ink">Have the file, word count, deadline, and instructions ready.</h2>
            <p className="mt-4 text-sm leading-7 text-body">
              The secure upload flow accepts common editable document files and confirms project details before checkout. If your document is unusually large, highly formatted, or has strict institutional requirements, contact us first.
            </p>
            <div className="mt-7 grid gap-3">
              <Link href="/dashboard/uploads" className="inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-white transition hover:bg-primary-active">
                Continue to Secure Upload
              </Link>
              <Link href="/pricing" className="inline-flex min-h-12 items-center justify-center rounded-full border border-primary/25 bg-canvas px-6 text-sm font-semibold text-primary transition hover:border-primary">
                Check Pricing First
              </Link>
              <Link href="/contact" className="inline-flex min-h-12 items-center justify-center rounded-full border border-hairline px-6 text-sm font-semibold text-ink transition hover:border-primary hover:text-primary">
                Ask a Question
              </Link>
            </div>
          </aside>

          <div>
            <h2 className="font-display text-4xl leading-tight text-ink">How document submission works</h2>
            <div className="mt-7 grid gap-4 md:grid-cols-2">
              {steps.map((step) => (
                <article key={step.title} className="rounded-2xl border border-hairline bg-surface-soft p-6">
                  <step.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  <h3 className="mt-5 font-display text-2xl leading-tight text-ink">{step.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-body">{step.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PublicPageShell>
  );
}
