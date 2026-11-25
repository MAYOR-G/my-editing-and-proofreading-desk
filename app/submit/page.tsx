import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, FileText, LockKeyhole, ShieldCheck, Sparkles } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { SignupPanel } from "@/components/SignupPanel";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { breadcrumbJsonLd, buildPageMetadata } from "@/lib/site";
import { BASE_RATE_DISPLAY } from "@/lib/pricing";

const quickPromises = [
  {
    title: "Instant word-count & quote",
    detail: `Upload .docx or .txt files and see your exact rate (from ${BASE_RATE_DISPLAY}/word) before paying.`,
    icon: FileText,
  },
  {
    title: "100% human Track Changes",
    detail: "Every edit is performed by a subject-matched human editor with timestamped MS Word Track Changes.",
    icon: ShieldCheck,
  },
  {
    title: "Strict confidentiality",
    detail: "Private encrypted portal storage. Your manuscript is never shared or used to train AI models.",
    icon: LockKeyhole,
  },
];

export const metadata: Metadata = buildPageMetadata({
  title: "Submit a Document for Editing or Proofreading",
  description: "Upload your document securely for human editing, proofreading, formatting, or translation review. Check pricing and turnaround before payment.",
  path: "/submit",
});

export default function SubmitPage() {
  return (
    <main className="min-h-screen bg-ivory text-ink">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Submit", path: "/submit" },
        ])}
      />
      <SiteHeader />

      <section className="relative overflow-hidden px-5 pb-20 pt-28 sm:px-8 lg:pb-28 lg:pt-36">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(23,74,124,0.075),transparent_32%),linear-gradient(180deg,rgba(247,247,247,0.65),rgba(255,253,247,0.98))]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03] [background-image:linear-gradient(rgba(10,11,13,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(10,11,13,0.12)_1px,transparent_1px)] [background-size:56px_56px]"
          aria-hidden="true"
        />

        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-16">
          {/* Left Column: Direct Sign-Up & Upload Panel (Immediate Action) */}
          <div className="order-1 mx-auto w-full max-w-lg lg:order-2 lg:mx-0 lg:justify-self-start">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              Step 1 of 2 · Open Your Upload Desk
            </div>
            <SignupPanel />
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-hairline bg-surface-soft px-4 py-3 text-xs text-charcoal/70">
              <span>Already have an editorial account?</span>
              <Link
                href="/login"
                className="font-semibold text-primary underline decoration-primary/30 underline-offset-4 transition hover:text-primary-active"
              >
                Log in to upload directly →
              </Link>
            </div>
          </div>

          {/* Right/Left Column: Concise Editorial Value & Trust */}
          <div className="order-2 mx-auto w-full max-w-xl lg:order-1 lg:mx-0 lg:justify-self-end">
            <p className="inline-flex items-center gap-3 border-y border-primary/18 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-primary">
              <span className="h-px w-8 bg-primary/45" aria-hidden="true" />
              Secure Document Submission
            </p>
            <h1 className="mt-5 font-display text-[clamp(2.5rem,5.4vw,5.1rem)] leading-[0.96] text-ink">
              Create your desk to submit your document.
            </h1>
            <p className="mt-6 text-base leading-8 text-charcoal/75 sm:text-lg">
              Continue with Google in one click—or create an account with your email—to enter your private upload workspace, confirm your detected word count and turnaround, and track your human editor&apos;s progress.
            </p>

            <div className="mt-8 grid gap-4">
              {quickPromises.map((item) => (
                <div
                  key={item.title}
                  className="flex items-start gap-4 rounded-2xl border border-hairline bg-canvas/90 p-4 shadow-[0_12px_36px_rgba(17,17,15,0.035)]"
                >
                  <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                    <item.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h2 className="font-display text-xl leading-snug text-ink">{item.title}</h2>
                    <p className="mt-1 text-sm leading-6 text-body">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-hairline pt-6 text-xs text-charcoal/65">
              <span className="inline-flex items-center gap-1.5 font-medium text-ink">
                <CheckCircle2 className="h-4 w-4 text-status-success" aria-hidden="true" />
                No payment required until you review your quote
              </span>
              <span className="text-charcoal/30">•</span>
              <Link href="/pricing" className="font-semibold text-primary hover:underline">
                Preview Pricing Calculator
              </Link>
              <span className="text-charcoal/30">•</span>
              <Link href="/contact?type=sample-edit" className="font-semibold text-primary hover:underline">
                Request Free 300-Word Sample
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
