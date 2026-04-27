import Link from "next/link";
import type { ReactNode } from "react";
import { BrandMark } from "@/components/BrandMark";

type DashboardShellProps = {
  title: string;
  eyebrow: string;
  description: string;
  nav: Array<{ href: string; label: string }>;
  primaryActionLabel?: string;
  secondaryActionLabel?: string;
  children: ReactNode;
};

export function DashboardShell({
  title,
  eyebrow,
  description,
  nav,
  primaryActionLabel = "New project",
  secondaryActionLabel = "Support",
  children
}: DashboardShellProps) {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#fffdf7_0%,#f7f1e7_100%)] text-ink">
      <aside className="fixed left-0 top-0 z-30 hidden h-screen w-72 border-r border-ink/10 bg-ivory px-6 py-7 shadow-[20px_0_80px_rgba(17,17,15,0.04)] lg:block">
        <BrandMark />
        <nav className="mt-12 grid gap-2" aria-label="Dashboard navigation">
          {nav.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex min-h-12 items-center justify-between border px-4 text-sm transition duration-200 ease-premium-out hover:border-gold hover:bg-paper hover:text-ink active:scale-[0.99] ${
                index === 0 ? "border-gold bg-gold/10 text-ink" : "border-transparent text-charcoal/64"
              }`}
            >
              {item.label}
              <span className="text-gold-deep opacity-50 transition group-hover:opacity-100" aria-hidden="true">+</span>
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-7 left-6 right-6 border-t border-ink/10 pt-6">
          <p className="mb-4 text-xs uppercase tracking-[0.24em] text-gold-deep">MEP portal</p>
          <Link href="/" className="text-sm text-charcoal/64 transition hover:text-ink">
            Return to website
          </Link>
        </div>
      </aside>

      <section className="lg:pl-72">
        <header className="sticky top-0 z-20 border-b border-ink/10 bg-ivory/86 px-5 py-5 backdrop-blur-xl sm:px-8">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
            <div className="lg:hidden">
              <BrandMark compact />
            </div>
            <div className="hidden lg:block">
              <p className="text-xs uppercase tracking-[0.3em] text-gold-deep">{eyebrow}</p>
            </div>
            <div className="flex items-center gap-3">
              <details className="group relative lg:hidden">
                <summary className="inline-flex min-h-11 cursor-pointer list-none items-center border border-ink/10 bg-ivory/70 px-4 text-sm text-charcoal/70 transition duration-200 ease-premium-out hover:border-gold hover:text-ink active:scale-[0.98]">
                  Sections
                </summary>
                <div className="absolute right-0 top-full mt-3 w-[min(19rem,calc(100vw-2.5rem))] border border-ink/10 bg-ivory p-2 shadow-[0_24px_80px_rgba(17,17,15,0.12)]">
                  {nav.map((item) => (
                    <Link key={item.href} href={item.href} className="block border-b border-ink/10 px-4 py-3 text-sm text-ink last:border-b-0 transition hover:bg-paper">
                      {item.label}
                    </Link>
                  ))}
                </div>
              </details>
              <button type="button" className="hidden min-h-11 border border-ink/10 px-4 text-sm text-charcoal/70 transition duration-200 ease-premium-out hover:border-gold hover:text-ink active:scale-[0.98] sm:inline-flex sm:items-center">
                {secondaryActionLabel}
              </button>
              <button type="button" className="min-h-11 bg-ink px-4 text-sm text-ivory transition duration-200 ease-premium-out hover:bg-gold-deep active:scale-[0.98]">
                {primaryActionLabel}
              </button>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:py-14">
          <div className="grid gap-8 border-b border-ink/10 pb-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-gold-deep lg:hidden">{eyebrow}</p>
              <h1 className="mt-4 font-display text-[clamp(2.6rem,5vw,5.4rem)] leading-[0.96] text-ink">{title}</h1>
            </div>
            <p className="max-w-xl text-base leading-7 text-charcoal/68 lg:justify-self-end">{description}</p>
          </div>

          {children}
        </div>
      </section>
    </main>
  );
}

export function MetricPanel({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div className="group border border-ink/10 bg-ivory/88 p-6 shadow-[0_18px_70px_rgba(17,17,15,0.045)] backdrop-blur-sm transition duration-300 ease-premium-out hover:-translate-y-1 hover:border-gold/35 hover:shadow-card-hover">
      <p className="text-xs uppercase tracking-[0.24em] text-gold-deep">{label}</p>
      <p className="mt-5 font-display text-5xl leading-none text-ink">{value}</p>
      <p className="mt-4 text-sm leading-6 text-charcoal/62">{detail}</p>
    </div>
  );
}

type StatusVariant = "in-progress" | "ready" | "completed" | "paid" | "pending" | "default";

function getStatusConfig(status: string): { variant: StatusVariant; bgClass: string; textClass: string; dotClass: string } {
  const lower = status.toLowerCase();
  
  if (lower.includes("progress") || lower.includes("review") || lower.includes("assigned")) {
    return { variant: "in-progress", bgClass: "border-status-warning/30 bg-status-warning-light", textClass: "text-status-warning", dotClass: "bg-status-warning" };
  }
  if (lower === "ready") {
    return { variant: "ready", bgClass: "border-status-info/30 bg-status-info-light", textClass: "text-status-info", dotClass: "bg-status-info" };
  }
  if (lower === "completed" || lower === "delivered") {
    return { variant: "completed", bgClass: "border-status-success/30 bg-status-success-light", textClass: "text-status-success", dotClass: "bg-status-success" };
  }
  if (lower === "paid" || lower === "captured") {
    return { variant: "paid", bgClass: "border-status-success/30 bg-status-success-light", textClass: "text-status-success", dotClass: "bg-status-success" };
  }
  if (lower === "pending" || lower === "failed") {
    return { variant: "pending", bgClass: "border-status-danger/30 bg-status-danger-light", textClass: "text-status-danger", dotClass: "bg-status-danger" };
  }
  return { variant: "default", bgClass: "border-gold/35 bg-gold/10", textClass: "text-gold-deep", dotClass: "bg-gold" };
}

export function StatusBadge({ children }: { children: ReactNode }) {
  const status = typeof children === "string" ? children : "";
  const config = getStatusConfig(status);

  return (
    <span className={`inline-flex min-h-8 items-center gap-2 border px-3 text-xs uppercase tracking-[0.18em] ${config.bgClass} ${config.textClass}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${config.dotClass}`} />
      {children}
    </span>
  );
}

export function EmptyState({ title, description, actionLabel, actionHref }: { title: string; description: string; actionLabel?: string; actionHref?: string }) {
  return (
    <div className="border border-dashed border-ink/15 bg-paper/40 p-10 text-center">
      <div className="mx-auto mb-5 grid h-14 w-14 place-items-center border border-ink/10 bg-ivory">
        <svg viewBox="0 0 24 24" className="h-6 w-6 text-charcoal/35" fill="none" stroke="currentColor" strokeWidth="1.4">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M9 9h6M9 13h4" strokeLinecap="round" />
        </svg>
      </div>
      <h3 className="font-display text-2xl text-ink">{title}</h3>
      <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-charcoal/55">{description}</p>
      {actionLabel && actionHref && (
        <Link href={actionHref} className="mt-6 inline-flex min-h-11 items-center bg-ink px-6 text-sm text-ivory transition duration-200 ease-premium-out hover:bg-gold-deep active:scale-[0.98]">
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
