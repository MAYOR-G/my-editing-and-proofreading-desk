import Link from "next/link";
import { AiEditingTool } from "@/components/AiEditingTool";
import { AiRefinementVisual } from "@/components/EditorialVisuals";
import { Reveal } from "@/components/Reveal";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";


export default function AiEditingToolPage() {
  return (
    <main className="min-h-screen bg-ivory text-ink">
      <SiteHeader />

      <section className="relative overflow-hidden border-b border-ink/10 px-5 pb-20 pt-36 sm:px-8 lg:pb-28 lg:pt-44">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,rgba(176,138,60,0.11),transparent_32%),linear-gradient(180deg,#fffdf7_0%,#f8f4ec_100%)]" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
          <Reveal>
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-gold-deep">AI Editing Tool</p>
              <h1 className="mt-6 max-w-5xl font-display text-[clamp(2.75rem,6.2vw,6.4rem)] leading-[0.98] text-ink">
                AI-assisted editing, held to editorial standards.
              </h1>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="border-l border-gold/45 pl-7">
              <p className="max-w-2xl text-lg leading-8 text-charcoal/72">
                Paste text or upload a short document for a fast first-pass edit. The trial is capped at 1,000 words to keep quality clear, cost predictable, and the experience responsible.
              </p>
              <p className="mt-6 max-w-2xl text-base leading-8 text-charcoal/62">
                AI can help you see cleaner language quickly. Professional editors still provide deeper judgment, publication-level care, formatting awareness, and full-document confidence.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="#try-tool" className="inline-flex min-h-12 items-center justify-center bg-ink px-7 text-sm text-ivory transition duration-200 ease-premium-out hover:bg-gold-deep active:scale-[0.98]">
                  Try up to 1,000 words
                </Link>
                <Link href="/login" className="inline-flex min-h-12 items-center justify-center border border-ink/15 px-7 text-sm text-ink transition duration-200 ease-premium-out hover:border-gold hover:text-gold-deep active:scale-[0.98]">
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
