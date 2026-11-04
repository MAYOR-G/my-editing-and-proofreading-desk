import Link from "next/link";
import { ArrowRight, FileCheck2, LockKeyhole, Sparkles } from "lucide-react";

type SampleEditCtaProps = {
  compact?: boolean;
  contextLabel?: string;
};

export function SampleEditCta({ compact = false, contextLabel = "Confidential Human Sample Review" }: SampleEditCtaProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/[0.06] via-canvas to-gold/[0.08] ${
        compact ? "p-5 sm:p-6" : "p-6 sm:p-8 lg:p-10"
      } shadow-[0_20px_60px_rgba(23,74,124,0.07)]`}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/45 to-transparent"
        aria-hidden="true"
      />
      <div className="grid gap-6 lg:grid-cols-[1.28fr_0.72fr] lg:items-center">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-primary">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            {contextLabel}
          </p>
          <h3 className={`mt-3 font-display text-ink ${compact ? "text-2xl sm:text-3xl" : "text-2xl sm:text-3xl lg:text-4xl"} leading-tight`}>
            Not ready for a full upload? Request a Free 300-Word Human Sample Edit
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-body sm:text-base">
            Evaluate our subject-matter editorial judgment before committing to a full chapter or manuscript. Send a 300-word excerpt from your unpublished thesis, dissertation, or research paper for a complimentary human edit with genuine Microsoft Word Track Changes and margin comments.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-semibold text-charcoal/75">
            <span className="inline-flex items-center gap-1.5">
              <LockKeyhole className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
              100% Private &amp; NDA-Safe (Zero AI Training)
            </span>
            <span className="inline-flex items-center gap-1.5">
              <FileCheck2 className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
              Returned with MS Word Track Changes &amp; Margin Notes
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-stretch">
          <Link
            href="/contact?type=sample-edit"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-white shadow-[0_14px_34px_rgba(23,74,124,0.2)] transition duration-200 ease-premium-out hover:-translate-y-0.5 hover:bg-primary-active"
          >
            Request Free 300-Word Sample <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href="/submit?sample=true"
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-primary/25 bg-canvas px-5 text-xs font-semibold uppercase tracking-[0.14em] text-primary transition duration-200 ease-premium-out hover:border-primary hover:bg-primary/5"
          >
            Or Start Sample Upload Flow
          </Link>
        </div>
      </div>
    </div>
  );
}

