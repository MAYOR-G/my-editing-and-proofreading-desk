import type { Metadata } from "next";
import Link from "next/link";
import { AiEditingTool } from "@/components/AiEditingTool";
import { AiRefinementVisual } from "@/components/EditorialVisuals";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { breadcrumbJsonLd, buildPageMetadata, jsonLdScript } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "Free AI Grammar Checker & Editing Tool",
  description: "Use our free AI editing tool for quick grammar checks and basic proofreading before submitting your documents for professional human review.",
  path: "/ai-editing-tool",
});

export default function AiEditingToolPage() {
  return (
    <main className="min-h-screen bg-canvas text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Free AI Editing Tool", path: "/ai-editing-tool" },
        ]))}
      />
      <SiteHeader />

      <section className="relative overflow-hidden border-b border-hairline px-5 pb-14 pt-28 sm:px-8 lg:pb-20 lg:pt-36">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_22%,rgba(23,74,124,0.08),transparent_28%),linear-gradient(180deg,rgba(247,247,247,0.76),rgba(255,255,255,0.98))]" aria-hidden="true" />
        <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(10,11,13,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(10,11,13,0.12)_1px,transparent_1px)] [background-size:56px_56px]" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.82fr_1fr] lg:items-center">
          <div>
            <p className="inline-flex items-center gap-3 border-y border-primary/15 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-primary">
              <span className="h-px w-8 bg-primary/45" aria-hidden="true" />
              AI-assisted first pass
            </p>
            <h1 className="mt-5 max-w-5xl font-display text-[clamp(2.75rem,6.2vw,6.4rem)] leading-[0.96] text-ink">
              A free first pass before human editing.
            </h1>
          </div>
          <div className="grid gap-7 border-l border-primary/20 pl-7">
            <p className="max-w-2xl text-lg leading-8 text-body">
              Paste text or upload a short document for quick AI suggestions. The trial is capped at 1,000 words so the experience stays focused, useful, and responsible.
            </p>
            <p className="max-w-2xl text-base leading-8 text-body">
              AI can help you spot basic issues quickly. Professional editors still provide the context, judgment, formatting awareness, and final polish needed for high-stakes documents.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="#try-tool" className="inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-7 text-sm font-medium text-white transition duration-200 ease-premium-out hover:bg-primary-active active:scale-[0.98]">
                Try up to 1,000 words
              </Link>
              <Link href="/login" className="inline-flex min-h-12 items-center justify-center rounded-full border border-hairline bg-white px-7 text-sm font-medium text-ink transition duration-200 ease-premium-out hover:border-primary hover:text-primary active:scale-[0.98]">
                Submit full document
              </Link>
            </div>
            <AiRefinementVisual compact />
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <AiEditingTool />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
