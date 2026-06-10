import type { Metadata } from "next";
import Link from "next/link";
import { PricingCalculator } from "@/components/PricingCalculator";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { buildPageMetadata } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "Editing and Proofreading Pricing Calculator",
  description: "Estimate editing, proofreading, formatting, translation, and writing support pricing by service, word count, and turnaround.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-canvas text-ink">
      <SiteHeader />
      <section className="relative overflow-hidden border-b border-hairline bg-canvas px-5 pb-14 pt-28 sm:px-8 lg:pb-16 lg:pt-32">
        <div className="absolute inset-0 bg-surface-soft/35" aria-hidden="true" />
        <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(10,11,13,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(10,11,13,0.12)_1px,transparent_1px)] [background-size:56px_56px]" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl">
          <div className="mb-6 grid gap-5 lg:grid-cols-[0.72fr_0.28fr] lg:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-primary">Pricing</p>
              <h1 className="mt-4 max-w-4xl font-display text-[clamp(2.45rem,5vw,5rem)] leading-[0.96] text-ink">
                Estimate your project clearly.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-body sm:text-lg">
                Choose a service, enter your word count, and select a timeline. You will upload the file next so we can verify the word count before checkout.
              </p>
            </div>
            <div className="hidden rounded-2xl border border-hairline bg-canvas/75 p-4 text-sm leading-6 text-body shadow-[0_18px_60px_rgba(17,17,15,0.04)] lg:block">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Payment rule</p>
              <p className="mt-2">The public estimate excludes processing fees. Final payment is confirmed only after secure server-side verification.</p>
            </div>
          </div>

          <PricingCalculator compact />

          <div className="mt-7 flex flex-col gap-3 text-sm text-body sm:flex-row sm:items-center sm:justify-between">
            <p>Need a quote for a complex or very large document?</p>
            <Link href="/contact" className="inline-flex min-h-11 w-fit items-center justify-center rounded-full border border-hairline bg-canvas px-5 font-medium text-ink transition duration-200 ease-premium-out hover:border-primary hover:text-primary active:scale-[0.98]">
              Contact Support
            </Link>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
