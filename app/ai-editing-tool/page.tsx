import Link from "next/link";
import { AiEditingTool } from "@/components/AiEditingTool";
import { AiRefinementVisual } from "@/components/EditorialVisuals";
import { Reveal } from "@/components/Reveal";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";


export default function AiEditingToolPage() {
  return (
    <main className="min-h-screen bg-canvas text-ink">
      <SiteHeader />

      <section className="relative overflow-hidden border-b border-hairline px-5 pb-20 pt-36 sm:px-8 lg:pb-28 lg:pt-44">
        <div className="absolute inset-0 bg-surface-soft/30" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
          <Reveal>
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-primary">AI Editing Tool</p>
              <h1 className="mt-6 max-w-5xl font-display text-[clamp(2.75rem,6.2vw,6.4rem)] leading-[0.98] text-ink">
                A free first pass before human editing.
              </h1>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="border-l border-hairline pl-7">
              <p className="max-w-2xl text-lg leading-8 text-body">
                Paste text or upload a short document for quick AI suggestions. The trial is capped at 1,000 words so the experience stays focused, useful, and responsible.
              </p>
              <p className="mt-6 max-w-2xl text-base leading-8 text-body">
                AI can help you spot basic issues quickly. Professional editors still provide the context, judgment, formatting awareness, and final polish needed for high-stakes documents.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="#try-tool" className="inline-flex min-h-12 items-center justify-center bg-primary rounded-full px-7 text-sm font-medium text-white transition duration-200 ease-premium-out hover:bg-primary-active active:scale-[0.98]">
                  Try up to 1,000 words
                </Link>
                <Link href="/login" className="inline-flex min-h-12 items-center justify-center border border-hairline rounded-full px-7 text-sm font-medium text-ink transition duration-200 ease-premium-out hover:border-primary hover:text-primary active:scale-[0.98]">
                  Submit full document
                </Link>
              </div>
              <div className="mt-10">
                <AiRefinementVisual compact />
              </div>
            </div>
          </Reveal>
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
