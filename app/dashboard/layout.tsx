"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { BrandMark } from "@/components/BrandMark";

const nav = [
  { href: "/dashboard/overview", label: "Overview" },
  { href: "/dashboard/active", label: "Active projects" },
  { href: "/dashboard/uploads", label: "Submit document" },
  { href: "/dashboard/downloads", label: "Completed files" },
  { href: "/dashboard/profile", label: "Profile details" },
  { href: "/dashboard/support", label: "Contact Support" }
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#ffffff_0%,#f4f7fb_100%)] text-ink">
      <aside className="fixed left-0 top-0 z-30 hidden h-screen w-80 border-r border-hairline bg-ivory px-7 py-7 shadow-[20px_0_80px_rgba(17,17,15,0.04)] lg:block">
        <div className="max-w-[15.5rem]">
          <BrandMark />
        </div>
        <nav className="mt-12 grid gap-2" aria-label="Dashboard navigation">
          {nav.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex min-h-12 items-center justify-between border px-4 text-sm transition duration-200 ease-premium-out hover:border-primary/35 hover:bg-surface-soft hover:text-ink active:scale-[0.99] ${
                  isActive 
                    ? "border-primary/45 bg-primary/10 text-ink" 
                    : "border-transparent text-charcoal/64"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
                <span className={`text-primary transition ${isActive ? "opacity-70" : "opacity-0 group-hover:opacity-100"}`} aria-hidden="true">
                  {isActive ? "●" : "+"}
                </span>
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-7 left-7 right-7 grid gap-3 border-t border-hairline pt-6">
          <form action="/auth/signout" method="POST">
            <button type="submit" className="text-sm text-charcoal/45 transition hover:text-status-danger">
              Sign out
            </button>
          </form>
        </div>
      </aside>

      <section className="lg:pl-80">
        <header className="sticky top-0 z-20 border-b border-hairline bg-ivory/90 px-4 py-4 backdrop-blur-xl sm:px-8">
          <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-3 sm:gap-4">
            <div className="flex min-w-0 items-center justify-start gap-2 sm:gap-3">
              <details className="group relative lg:hidden">
                <summary className="inline-flex min-h-11 cursor-pointer list-none items-center rounded-full border border-hairline bg-ivory/70 px-4 text-sm text-charcoal/70 transition duration-200 ease-premium-out hover:border-primary hover:text-ink active:scale-[0.98]">
                  Menu
                </summary>
                <div className="absolute right-0 top-full mt-3 w-[min(19rem,calc(100vw-2.5rem))] border border-ink/10 bg-ivory p-2 shadow-[0_24px_80px_rgba(17,17,15,0.12)]">
                  {nav.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link 
                        key={item.href} 
                        href={item.href} 
                        className={`block border-b border-ink/10 px-4 py-3 text-sm last:border-b-0 transition hover:bg-paper ${
                          isActive ? "bg-primary/10 text-ink" : "text-ink"
                        }`}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                  <div className="mt-2 border-t border-ink/10 pt-2">
                     <Link href="/" className="block px-4 py-3 text-sm text-charcoal/70 transition hover:bg-paper">Return to website</Link>
                  </div>
                </div>
              </details>
              <Link href="/dashboard/uploads" className="inline-flex min-h-11 items-center justify-center rounded-full bg-cta px-4 text-sm font-medium text-white shadow-[0_14px_32px_rgba(31,143,90,0.16)] transition duration-200 ease-premium-out hover:bg-cta-active active:scale-[0.98] sm:px-5">
                New project
              </Link>
            </div>
            <p className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-xs font-semibold uppercase tracking-[0.3em] text-primary sm:block">MEP portal</p>
            <Link href="/" className="inline-flex min-h-11 items-center justify-center rounded-full border border-hairline bg-ivory px-3 text-sm text-charcoal/70 transition duration-200 ease-premium-out hover:border-primary hover:text-primary active:scale-[0.98] sm:px-5">
              <span className="hidden sm:inline">Return to website</span>
              <span className="sm:hidden">Website</span>
            </Link>
          </div>
        </header>

        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:py-14">
          {children}
        </div>
      </section>
    </div>
  );
}
