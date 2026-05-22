import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";
import { servicePages } from "@/lib/content";
import { COMPANY_PHONE, SUPPORT_EMAIL } from "@/lib/contact-info";

const platformLinks = [
  { href: "/about", label: "About us" },
  { href: "/editors", label: "Editor standards" },
  { href: "/pricing", label: "Pricing calculator" },
  { href: "/ai-editing-tool", label: "AI Editing Tool" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" }
];

const trustBadges = ["Private uploads", "Secure payments", "Human review", "Dashboard delivery", "AI-assisted entry"];

export function SiteFooter() {
  return (
    <footer className="relative mt-10 overflow-hidden bg-dark-surface text-surface-soft">
      <div className="pointer-events-none absolute inset-x-0 -top-1 h-16 text-dark-surface" aria-hidden="true">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="h-full w-full fill-current">
          <path d="M0 50C112 12 226 8 340 38C475 74 574 94 712 61C838 31 930 2 1058 23C1202 47 1286 95 1440 61V120H0V50Z" />
        </svg>
      </div>
      <div className="absolute inset-x-0 top-14 h-px bg-gradient-to-r from-transparent via-primary/45 to-transparent" aria-hidden="true" />

      <div className="mx-auto grid max-w-7xl gap-10 px-6 pb-14 pt-24 sm:px-8 lg:grid-cols-[0.82fr_1.18fr] lg:pb-20 lg:pt-28 relative">
        <aside className="grid content-start gap-8 relative z-10">
          <div>
            <BrandMark tone="light" variant="footer" />
            <p className="mt-6 max-w-sm text-sm leading-7 text-surface-soft/68">
              Premium editorial support for academic, business, author, and personal documents that need calm precision.
            </p>
          </div>

          <div className="border-y border-hairline/10 py-6">
            <p className="text-xs uppercase tracking-[0.28em] text-primary font-semibold">Editorial inquiries</p>
            <a href={`mailto:${SUPPORT_EMAIL}`} className="mt-3 block break-words font-display text-2xl font-bold leading-tight text-surface-soft transition hover:text-primary">
              {SUPPORT_EMAIL}
            </a>
            <a href="tel:+14088728603" className="mt-3 block text-sm font-semibold text-surface-soft/75 transition hover:text-primary">
              {COMPANY_PHONE}
            </a>
            <p className="mt-4 text-sm leading-6 text-surface-soft/50">Include document type, expected word count, and deadline.</p>
          </div>

          <div className="text-sm leading-7 text-surface-soft/55">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Mailing address</p>
            <address className="mt-3 not-italic">
              1007 N Orange St. 4th Floor<br />
              Suite #5723<br />
              Wilmington, Delaware 19801<br />
              United States
            </address>
          </div>

          <Link href="/login" className="inline-flex min-h-12 w-fit items-center justify-center rounded-full bg-primary px-7 text-sm font-bold text-white shadow-[0_14px_34px_rgba(23,74,124,0.28)] transition duration-200 ease-premium-out hover:bg-primary-active active:scale-[0.98]">
            Start a project
          </Link>
        </aside>

        <div className="relative z-10 overflow-hidden rounded-[1.75rem] border border-hairline/10 bg-[linear-gradient(135deg,rgba(22,24,28,0.96),rgba(10,11,13,0.9))] p-5 shadow-[0_30px_110px_rgba(0,0,0,0.32)] sm:p-10">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#174a7c,#ffffff66,#1f8f5a)]" aria-hidden="true" />
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <h2 className="mb-2 text-sm font-bold text-surface-soft">Services</h2>
              <div className="mt-4 grid gap-3 text-sm text-surface-soft/60">
                {servicePages.slice(0, 6).map((service) => (
                  <Link key={service.slug} href={`/services/${service.slug}`} className="transition hover:text-primary">
                    {service.name}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h2 className="mb-2 text-sm font-bold text-surface-soft">Platform</h2>
              <div className="mt-4 grid gap-3 text-sm text-surface-soft/60">
                {platformLinks.map((item) => (
                  <Link key={item.href} href={item.href} className="transition hover:text-primary">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h2 className="mb-2 text-sm font-bold text-surface-soft">Trust signals</h2>
              <div className="mt-4 grid gap-2">
                {trustBadges.map((badge) => (
                  <span key={badge} className="rounded-lg border border-hairline/10 bg-white/[0.03] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-surface-soft/62">
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-4 border-t border-hairline/10 pt-7 text-xs text-surface-soft/50 sm:grid-cols-[1fr_auto] sm:items-center">
            <p className="font-medium">Secure, enterprise-grade editorial infrastructure for mission-critical business documents.</p>
            <div className="flex flex-wrap gap-2 sm:justify-end">
              {["Privacy first", "Confidential", "SSL ready"].map((item) => (
                <span key={item} className="rounded border border-hairline/10 bg-dark-surface/70 px-3 py-2 font-bold">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-hairline/5 px-5 py-7 text-center">
        <p className="font-display text-lg font-bold tracking-normal text-surface-soft sm:text-xl">
          My Editing and Proofreading Desk
        </p>
        <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-surface-soft/35">
          The standard for business communications.
        </p>
      </div>
    </footer>
  );
}
