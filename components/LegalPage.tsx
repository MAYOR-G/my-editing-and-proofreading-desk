import type { ReactNode } from "react";
import { PublicPageShell } from "@/components/PublicPageShell";

type LegalPageProps = {
  title: string;
  path: string;
  children: ReactNode;
};

export function LegalPage({ title, path, children }: LegalPageProps) {
  return (
    <PublicPageShell
      eyebrow="Legal"
      title={title}
      description="Please read this information carefully before using My Editing and Proofreading Desk."
      seoPath={path}
    >
      <section className="bg-canvas px-5 py-16 sm:px-8 lg:py-24">
        <article className="mx-auto max-w-4xl rounded-[1.35rem] border border-hairline bg-surface-soft p-6 text-body shadow-[0_24px_80px_rgba(17,17,15,0.045)] sm:p-9 lg:p-12">
          <div className="legal-content space-y-8 text-base leading-8">
            {children}
          </div>
        </article>
      </section>
    </PublicPageShell>
  );
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-3xl leading-tight text-ink">{title}</h2>
      <div className="mt-3 space-y-2">{children}</div>
    </section>
  );
}

export function LegalList({ children }: { children: ReactNode }) {
  return <ul className="ml-5 list-disc space-y-2">{children}</ul>;
}

export function LegalSubList({ children }: { children: ReactNode }) {
  return <ul className="ml-6 list-[circle] space-y-2">{children}</ul>;
}
