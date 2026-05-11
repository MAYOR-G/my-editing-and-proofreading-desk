"use client";

import Link from "next/link";
import { useState } from "react";
import { BrandMark } from "@/components/BrandMark";
import { servicePages } from "@/lib/content";

const navItems = [
  { href: "/about", label: "About" },
  { href: "/pricing", label: "Pricing" },
  { href: "/ai-editing-tool", label: "AI tool" },
  { href: "/editors", label: "Editors" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" }
];

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-hairline bg-canvas/90 shadow-sm backdrop-blur-2xl supports-[backdrop-filter]:bg-canvas/70">
      <div className="mx-auto flex h-[5rem] w-full max-w-7xl items-center justify-between gap-2 px-3 min-[420px]:gap-4 min-[420px]:px-4 sm:px-8 lg:h-[5.25rem]">
        <div className="min-w-0 flex-1 overflow-hidden xl:flex-[0_0_auto]">
          <BrandMark tone="dark" />
        </div>
        <nav className="hidden items-center gap-1.5 border border-hairline bg-surface-soft/80 px-2.5 py-1.5 text-sm text-body shadow-sm xl:flex rounded-full backdrop-blur-md" aria-label="Primary navigation">
          <div className="group relative">
            <Link
              href="/services"
              className="inline-flex min-h-10 items-center px-4 transition duration-200 ease-premium-out hover:text-primary active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary rounded-full text-ink font-medium"
            >
              Services
            </Link>
            <div className="invisible absolute left-1/2 top-full w-[27rem] -translate-x-1/2 pt-3 opacity-0 transition duration-200 ease-premium-out group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="border border-hairline bg-canvas rounded-2xl p-3 shadow-xl">
                {servicePages.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="grid gap-1 border-b border-hairline px-4 py-3 last:border-b-0 transition duration-200 ease-premium-out hover:bg-surface-soft hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary rounded-xl"
                  >
                    <span className="text-sm font-medium text-ink">{service.name}</span>
                    <span className="text-xs leading-5 text-muted">{service.eyebrow}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex min-h-10 items-center px-4 transition duration-200 ease-premium-out hover:text-primary active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary rounded-full text-ink font-medium"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="relative z-10 flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="inline-flex h-11 min-w-11 shrink-0 items-center justify-center gap-2 rounded-full border border-primary/35 bg-canvas px-3 text-sm font-semibold text-primary shadow-sm transition duration-200 ease-premium-out hover:border-primary hover:text-primary active:scale-[0.98] min-[420px]:gap-3 sm:px-4 xl:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-sidebar"
            aria-label="Open menu"
          >
            <span className="grid gap-1" aria-hidden="true">
              <span className="block h-px w-4 bg-current" />
              <span className="block h-px w-4 bg-current" />
              <span className="block h-px w-4 bg-current" />
            </span>
            <span className="hidden min-[390px]:inline">Menu</span>
          </button>
          <Link
            href="/login"
            className="hidden min-h-11 items-center bg-primary rounded-full px-8 text-sm font-medium text-white transition duration-200 ease-premium-out hover:bg-primary-active active:scale-[0.98] xl:inline-flex"
          >
            Dashboard / Login
          </Link>
        </div>
      </div>

      <div className={`fixed inset-0 z-50 xl:hidden ${mobileOpen ? "" : "pointer-events-none"}`} aria-hidden={!mobileOpen}>
        <button
            type="button"
            className={`absolute inset-0 bg-charcoal/40 backdrop-blur-sm transition-opacity duration-200 ease-premium-out ${mobileOpen ? "opacity-100" : "opacity-0"}`}
            onClick={closeMobile}
            aria-label="Close menu overlay"
            tabIndex={mobileOpen ? 0 : -1}
          />
        <aside
          id="mobile-sidebar"
          className={`absolute right-0 top-0 flex h-dvh w-[min(24rem,92vw)] flex-col border-l border-hairline bg-canvas shadow-2xl transition-transform duration-300 ease-premium-out ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex items-center justify-between gap-4 border-b border-hairline p-5">
            <BrandMark compact tone="dark" />
            <button
              type="button"
              onClick={closeMobile}
              className="grid h-11 w-11 place-items-center border border-hairline rounded-full text-ink transition duration-200 ease-premium-out hover:border-primary hover:text-primary active:scale-[0.98]"
              aria-label="Close menu"
            >
              <span className="relative h-4 w-4" aria-hidden="true">
                <span className="absolute left-0 top-1/2 h-px w-4 rotate-45 bg-current" />
                <span className="absolute left-0 top-1/2 h-px w-4 -rotate-45 bg-current" />
              </span>
            </button>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto p-5">
            <div className="border-b border-hairline pb-6">
              <p className="text-xs uppercase tracking-[0.28em] text-primary font-semibold">Primary</p>
              <div className="mt-4 grid gap-2">
                <Link href="/services" onClick={closeMobile} className="border border-hairline rounded-xl bg-surface-soft px-4 py-3 font-display text-2xl text-ink transition hover:border-primary/30 hover:bg-surface-strong">
                  Services
                </Link>
                {navItems.map((item) => (
                  <Link key={item.href} href={item.href} onClick={closeMobile} className="border border-hairline rounded-xl bg-surface-soft px-4 py-3 font-display text-2xl text-ink transition hover:border-primary/30 hover:bg-surface-strong">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="border-b border-hairline py-6">
              <p className="text-xs uppercase tracking-[0.28em] text-primary font-semibold">Services</p>
              <div className="mt-4 grid gap-3">
                {servicePages.map((service) => (
                  <Link key={service.slug} href={`/services/${service.slug}`} onClick={closeMobile} className="grid gap-1 text-sm text-body transition hover:text-primary">
                    <span className="font-medium text-ink">{service.name}</span>
                    <span className="text-xs leading-5 text-muted">{service.eyebrow}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="grid gap-3 pt-6">
              <Link href="/login" onClick={closeMobile} className="inline-flex rounded-full min-h-12 items-center justify-center bg-primary px-6 text-sm font-medium text-white transition hover:bg-primary-active">
                Dashboard / Login
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </header>
  );
}
