import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";
import { NewsletterSubscribeForm } from "@/components/NewsletterSubscribeForm";
import { FacebookIcon, InstagramIcon } from "@/components/SocialIcons";
import { seoServicePages } from "@/lib/seo-service-pages";
import {
  COMPANY_OFFICES,
  COMPANY_PHONE,
  COMPANY_PHONE_TEL,
  FACEBOOK_URL,
  INSTAGRAM_URL,
  SUPPORT_EMAIL,
} from "@/lib/contact-info";

const platformLinks = [
  { href: "/about", label: "About us" },
  { href: "/editors", label: "Editor standards" },
  { href: "/editorial-policy", label: "Editorial policy" },
  { href: "/submit", label: "Submit document" },
  { href: "/pricing", label: "Pricing calculator" },
  { href: "/blog", label: "Blog" },
  { href: "/ai-editing-tool", label: "AI Editing Tool" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" }
];

const trustBadges = ["Private uploads", "Secure payments", "Human review", "Dashboard delivery", "AI-assisted entry"];

const legalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/refund-policy", label: "Refund Policy" },
  { href: "/terms", label: "Terms and Conditions" },
];
export function SiteFooter() {
  return (
    <footer className="relative mt-12 overflow-hidden bg-dark-surface text-surface-soft border-t border-hairline/10">
      {/* Top accent glow line */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/50 to-transparent"
        aria-hidden="true"
      />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-12">
        {/* ─── Top Tier: Brand, Inquiries & Quick Action Bar ─── */}
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center pb-12 border-b border-hairline/10">
          <div>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <BrandMark tone="light" variant="footer" />
              <span className="hidden sm:inline-block h-6 w-px bg-white/10" aria-hidden="true" />
              <span className="text-xs uppercase tracking-[0.2em] text-surface-soft/60">
                Professional Editorial Desk
              </span>
            </div>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-surface-soft/75">
              Human editing and proofreading for academic papers, theses, dissertations, journal manuscripts, business proposals, and author publications worldwide.
            </p>

            {/* Editorial Inquiries Pill */}
            <div className="mt-6 grid gap-4 rounded-2xl border border-hairline/10 bg-white/[0.03] p-4 sm:grid-cols-2 sm:p-5">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-400">
                  Editorial Inquiries
                </p>
                <a
                  href={`mailto:${SUPPORT_EMAIL}`}
                  className="mt-1 block font-display text-base font-bold text-white transition hover:text-sky-300 break-words sm:text-lg"
                >
                  {SUPPORT_EMAIL}
                </a>
                <p className="mt-1 text-xs text-surface-soft/50">
                  Include document type, word count, and deadline.
                </p>
              </div>
              <div className="sm:border-l sm:border-hairline/10 sm:pl-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-400">
                  Phone & Availability
                </p>
                <a
                  href={`tel:${COMPANY_PHONE_TEL}`}
                  className="mt-1 block text-sm font-semibold text-white/90 transition hover:text-sky-300"
                >
                  {COMPANY_PHONE}
                </a>
                <p className="mt-1 text-xs text-surface-soft/50">
                  24/7 Client Portal Intake & Secure Uploads
                </p>
              </div>
            </div>
          </div>

          {/* Right side: Newsletter & Actions */}
          <div className="rounded-2xl border border-hairline/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-5 sm:p-6 lg:ml-auto lg:w-full lg:max-w-md">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-400">
              Subscribe to Editorial Notes
            </p>
            <p className="mt-1 text-xs leading-relaxed text-surface-soft/65">
              Receive occasional editorial updates, style guides, and service notes.
            </p>
            <NewsletterSubscribeForm />

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-hairline/10 pt-4">
              <Link
                href="/submit"
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-cta px-6 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition duration-200 hover:bg-cta-active active:scale-[0.98]"
              >
                Start Secure Upload
              </Link>
              <div className="flex items-center gap-2">
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on Facebook"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-hairline/15 bg-white/[0.04] text-surface-soft/80 transition hover:border-sky-400 hover:bg-sky-500/20 hover:text-white"
                >
                  <FacebookIcon className="h-4 w-4" />
                </a>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on Instagram"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-hairline/15 bg-white/[0.04] text-surface-soft/80 transition hover:border-sky-400 hover:bg-sky-500/20 hover:text-white"
                >
                  <InstagramIcon className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Middle Tier Desktop: 4-Column Balanced Grid (hidden on mobile) ─── */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 py-10">
          {/* Column 1: Editorial Services */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-400">
              Editorial Services
            </p>
            <ul className="mt-4 space-y-2.5 text-sm text-surface-soft/75">
              {seoServicePages.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/${service.slug}`}
                    className="inline-block transition hover:text-white hover:translate-x-0.5"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Platform & Desk */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-400">
              Platform & Desk
            </p>
            <ul className="mt-4 space-y-2.5 text-sm text-surface-soft/75">
              {platformLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-block transition hover:text-white hover:translate-x-0.5"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Global Desks & Presence */}
          <div>
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-400">
                Global Desks
              </p>
              <Link
                href="/contact"
                className="text-xs text-surface-soft/50 transition hover:text-sky-300"
              >
                All offices →
              </Link>
            </div>
            <div className="mt-4 grid gap-2.5">
              {COMPANY_OFFICES.map((office) => (
                <div
                  key={office.id}
                  className="rounded-lg border border-hairline/10 bg-white/[0.02] p-2.5 text-xs text-surface-soft/75 transition duration-150 hover:border-sky-500/30 hover:bg-white/[0.04]"
                >
                  <div className="flex items-center justify-between gap-1.5">
                    <span className="flex items-center gap-1.5 font-semibold text-white">
                      <span>{office.flag}</span>
                      <span>{office.name}</span>
                    </span>
                    {office.isHeadquarters ? (
                      <span className="rounded border border-sky-500/30 bg-sky-500/20 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-sky-300">
                        HQ
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-1 line-clamp-1 text-[11px] text-surface-soft/55">
                    {office.city}, {office.country}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Column 4: Trust Signals & Legal */}
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-400">
                Trust Signals
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {trustBadges.map((badge) => (
                  <span
                    key={badge}
                    className="rounded border border-hairline/10 bg-white/[0.03] px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-surface-soft/80"
                  >
                    {badge}
                  </span>
                ))}
              </div>

              <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-400">
                Legal
              </p>
              <ul className="mt-3 space-y-2 text-sm text-surface-soft/75">
                {legalLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="transition hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 rounded-xl border border-hairline/10 bg-white/[0.02] p-3.5 text-xs text-surface-soft/60">
              <p className="font-semibold text-white/90">Secure Handling Guarantee</p>
              <p className="mt-1 text-[11px] leading-relaxed text-surface-soft/50">
                Privacy-first editorial workflow, confidentiality protection, and encrypted document delivery.
              </p>
            </div>
          </div>
        </div>

        {/* ─── Middle Tier Mobile Accordions (md:hidden) ─── */}
        <div className="grid gap-2 py-6 md:hidden">
          <details className="border-b border-hairline/10 py-3 group">
            <summary className="flex cursor-pointer list-none items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-sky-400">
              <span>Editorial Services</span>
              <span className="text-surface-soft/40 transition group-open:rotate-180">▾</span>
            </summary>
            <ul className="mt-3 grid gap-2.5 pb-2 text-sm text-surface-soft/75">
              {seoServicePages.map((service) => (
                <li key={`mob-${service.slug}`}>
                  <Link href={`/${service.slug}`} className="transition hover:text-white">
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </details>

          <details className="border-b border-hairline/10 py-3 group">
            <summary className="flex cursor-pointer list-none items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-sky-400">
              <span>Platform & Desk</span>
              <span className="text-surface-soft/40 transition group-open:rotate-180">▾</span>
            </summary>
            <ul className="mt-3 grid gap-2.5 pb-2 text-sm text-surface-soft/75">
              {platformLinks.map((item) => (
                <li key={`mob-${item.href}`}>
                  <Link href={item.href} className="transition hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </details>

          <details className="border-b border-hairline/10 py-3 group">
            <summary className="flex cursor-pointer list-none items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-sky-400">
              <span>Global Desks ({COMPANY_OFFICES.length})</span>
              <span className="text-surface-soft/40 transition group-open:rotate-180">▾</span>
            </summary>
            <div className="mt-3 grid gap-2 pb-2">
              {COMPANY_OFFICES.map((office) => (
                <div key={`mob-off-${office.id}`} className="rounded border border-hairline/10 bg-white/[0.02] p-2.5 text-xs">
                  <p className="font-semibold text-white">{office.flag} {office.name}{office.isHeadquarters ? " · HQ" : ""}</p>
                  <p className="text-surface-soft/55 text-[11px] mt-0.5">{office.city}, {office.country}</p>
                </div>
              ))}
              <Link href="/contact" className="mt-1 text-xs text-sky-400 font-medium">
                View full office addresses & phone numbers →
              </Link>
            </div>
          </details>

          <details className="border-b border-hairline/10 py-3 group">
            <summary className="flex cursor-pointer list-none items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-sky-400">
              <span>Trust & Legal</span>
              <span className="text-surface-soft/40 transition group-open:rotate-180">▾</span>
            </summary>
            <div className="mt-3 pb-2 text-xs">
              <div className="flex flex-wrap gap-1.5 mb-3">
                {trustBadges.map((badge) => (
                  <span key={`mob-t-${badge}`} className="rounded border border-hairline/10 bg-white/[0.03] px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-surface-soft/80">
                    {badge}
                  </span>
                ))}
              </div>
              <ul className="space-y-2 text-sm text-surface-soft/75">
                {legalLinks.map((item) => (
                  <li key={`mob-l-${item.href}`}>
                    <Link href={item.href} className="transition hover:text-white">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </details>
        </div>

        {/* ─── Bottom Tier: Copyright & Brand Statement ─── */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-hairline/10 pt-8 text-xs text-surface-soft/50 sm:flex-row">
          <p>
            © {new Date().getFullYear()} My Editing and Proofreading Desk. All rights reserved.
          </p>
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-surface-soft/40">
            Clearer writing for important work.
          </p>
        </div>
      </div>
    </footer>
  );
}

