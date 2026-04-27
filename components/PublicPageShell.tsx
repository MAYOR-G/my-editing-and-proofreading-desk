import type { ReactNode } from "react";
import { HeroEditorialVisual } from "@/components/EditorialVisuals";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

type PublicPageShellProps = {
  eyebrow: string;
  title: string;
  description?: string;
  visual?: ReactNode; // Optional custom visual component
  children: ReactNode;
};

export function PublicPageShell({ eyebrow, title, description, visual, children }: PublicPageShellProps) {
  return (
    <main className="min-h-screen bg-ivory text-ink">
      <SiteHeader />
      <section className="relative overflow-hidden border-b border-ink/10 px-5 pb-20 pt-36 sm:px-8 lg:pb-28 lg:pt-44">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,253,247,0.98)_0%,rgba(255,253,247,0.9)_48%,rgba(248,244,236,0.96)_100%)]" aria-hidden="true" />
        <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(17,17,15,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(17,17,15,0.12)_1px,transparent_1px)] [background-size:64px_64px]" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 h-px w-1/2 bg-gradient-to-r from-gold/35 to-transparent" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.92fr_0.72fr] lg:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-gold-deep">{eyebrow}</p>
            <h1 className="mt-6 max-w-5xl font-display text-[clamp(3rem,7vw,7.5rem)] leading-[0.92] text-ink">{title}</h1>
          </div>
          <div className="grid gap-8">
            {description ? <p className="max-w-2xl text-lg leading-8 text-charcoal/68 lg:justify-self-end">{description}</p> : null}
            {visual ? visual : null}
          </div>
        </div>
      </section>
      {children}
      <SiteFooter />
    </main>
  );
}
