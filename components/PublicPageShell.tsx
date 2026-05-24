import type { ReactNode } from "react";
import { HeroEditorialVisual } from "@/components/EditorialVisuals";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

type PublicPageShellProps = {
  eyebrow: string;
  title: string;
  description?: string;
  visual?: ReactNode; // Optional custom visual component
  isTransparent?: boolean; // If true, removes solid backgrounds
  children: ReactNode;
};

export function PublicPageShell({ eyebrow, title, description, visual, isTransparent = false, children }: PublicPageShellProps) {
  return (
    <main className={`min-h-screen text-ink ${isTransparent ? 'bg-transparent' : 'bg-canvas'}`}>
      <SiteHeader />
      <section className="relative overflow-hidden border-b border-hairline px-5 pb-14 pt-28 sm:px-8 lg:pb-20 lg:pt-36">
        {!isTransparent && (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(23,74,124,0.075),transparent_28%),linear-gradient(180deg,rgba(247,247,247,0.72),rgba(255,255,255,0.96))]" aria-hidden="true" />
        )}
        <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(10,11,13,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(10,11,13,0.12)_1px,transparent_1px)] [background-size:56px_56px]" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 h-px w-1/2 bg-gradient-to-r from-primary/20 to-transparent" aria-hidden="true" />
        <div className="absolute left-[7vw] top-32 hidden h-24 w-px bg-gradient-to-b from-primary/30 to-transparent lg:block" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.88fr_0.74fr] lg:items-center">
          <div>
            <p className="inline-flex items-center gap-3 border-y border-primary/18 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-primary">
              <span className="h-px w-8 bg-primary/45" aria-hidden="true" />
              {eyebrow}
            </p>
            <h1 className="mt-5 max-w-5xl font-display text-[clamp(2.8rem,6.5vw,6.9rem)] leading-[0.94] text-ink">{title}</h1>
          </div>
          <div className="grid gap-7">
            {description ? <p className="max-w-2xl border-l border-primary/20 pl-6 text-base leading-8 text-body sm:text-lg lg:justify-self-end">{description}</p> : null}
            {visual ? visual : null}
          </div>
        </div>
      </section>
      {children}
      <SiteFooter />
    </main>
  );
}
