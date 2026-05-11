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
      <section className="relative overflow-hidden border-b border-hairline px-5 pb-20 pt-36 sm:px-8 lg:pb-28 lg:pt-44">
        {!isTransparent && (
          <div className="absolute inset-0 bg-surface-soft/30" aria-hidden="true" />
        )}
        <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(rgba(10,11,13,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(10,11,13,0.12)_1px,transparent_1px)] [background-size:64px_64px]" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 h-px w-1/2 bg-gradient-to-r from-primary/20 to-transparent" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.92fr_0.72fr] lg:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-primary">{eyebrow}</p>
            <h1 className="mt-6 max-w-5xl font-display text-[clamp(3rem,7vw,7.5rem)] leading-[0.92] text-ink">{title}</h1>
          </div>
          <div className="grid gap-8">
            {description ? <p className="max-w-2xl text-lg leading-8 text-body lg:justify-self-end">{description}</p> : null}
            {visual ? visual : null}
          </div>
        </div>
      </section>
      {children}
      <SiteFooter />
    </main>
  );
}
