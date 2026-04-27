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
  { href: "/dashboard/profile", label: "Profile details" }
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fffdf7_0%,#f7f1e7_100%)] text-ink">
      <aside className="fixed left-0 top-0 z-30 hidden h-screen w-72 border-r border-ink/10 bg-ivory px-6 py-7 shadow-[20px_0_80px_rgba(17,17,15,0.04)] lg:block">
        <BrandMark />
        <nav className="mt-12 grid gap-2" aria-label="Dashboard navigation">
          {nav.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex min-h-12 items-center justify-between border px-4 text-sm transition duration-200 ease-premium-out hover:border-gold hover:bg-paper hover:text-ink active:scale-[0.99] ${
                  isActive 
                    ? "border-gold bg-gold/10 text-ink" 
                    : "border-transparent text-charcoal/64"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
                <span className={`text-gold-deep transition ${isActive ? "opacity-70" : "opacity-0 group-hover:opacity-100"}`} aria-hidden="true">
                  {isActive ? "●" : "+"}
                </span>
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-7 left-6 right-6 grid gap-3 border-t border-ink/10 pt-6">
          <p className="text-xs uppercase tracking-[0.24em] text-gold-deep">MEP portal</p>
          <Link href="/" className="text-sm text-charcoal/64 transition hover:text-ink">
            Return to website
          </Link>
          <form action="/auth/signout" method="POST">
            <button type="submit" className="text-sm text-charcoal/45 transition hover:text-status-danger">
              Sign out
            </button>
          </form>
        </div>
      </aside>

      <section className="lg:pl-72">
        <header className="sticky top-0 z-20 border-b border-ink/10 bg-ivory/86 px-5 py-5 backdrop-blur-xl sm:px-8">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
            <div className="lg:hidden">
              <BrandMark compact />
            </div>
            <div className="flex items-center gap-3">
              <details className="group relative lg:hidden">
                <summary className="inline-flex min-h-11 cursor-pointer list-none items-center border border-ink/10 bg-ivory/70 px-4 text-sm text-charcoal/70 transition duration-200 ease-premium-out hover:border-gold hover:text-ink active:scale-[0.98]">
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
                          isActive ? "bg-gold/10 text-ink" : "text-ink"
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
              <Link href="/dashboard/uploads" className="min-h-11 inline-flex items-center bg-ink px-4 text-sm text-ivory transition duration-200 ease-premium-out hover:bg-gold-deep active:scale-[0.98]">
                New project
              </Link>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:py-14">
          {children}
        </div>
      </section>
    </div>
  );
}
