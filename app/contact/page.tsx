import type { Metadata } from "next";
import { ContactVisual } from "@/components/EditorialVisuals";
import { PublicPageShell } from "@/components/PublicPageShell";
import { ContactForm } from "@/components/ContactForm";
import { FacebookIcon, InstagramIcon } from "@/components/SocialIcons";
import {
  COMPANY_OFFICES,
  COMPANY_PHONE,
  COMPANY_PHONE_TEL,
  FACEBOOK_URL,
  INSTAGRAM_URL,
  SUPPORT_EMAIL,
} from "@/lib/contact-info";
import { buildPageMetadata } from "@/lib/site";
import { Building2, Globe2, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact Our Global Editing Desks | US, UK, Canada, UAE, & Africa",
  description: "Get in touch with our global editorial desks in the US, UK, Canada, UAE, and Nigeria. Reach out for custom quotes, thesis proofreading, and business editing support.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <PublicPageShell
      eyebrow="Global Editorial Desks"
      title="Tell us what your document needs."
      description="Connect with our global offices across North America, Europe, the Middle East, and Africa for academic, manuscript, and corporate document support."
      visual={<ContactVisual />}
      seoPath="/contact"
    >
      <section className="bg-canvas px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          {/* ─── Contact Info & Form Grid ─── */}
          <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:items-start">
            <aside className="relative overflow-hidden rounded-2xl border border-hairline bg-surface-soft p-6 shadow-[0_18px_60px_rgba(17,17,15,0.04)] sm:p-8">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_88%_0%,rgba(23,74,124,0.08),transparent_34%)]" aria-hidden="true" />
              <div className="relative">
                <p className="text-xs uppercase tracking-[0.28em] text-primary font-semibold">Editorial Inquiries</p>
                <a
                  href={`mailto:${SUPPORT_EMAIL}`}
                  className="mt-4 block break-all font-display text-[clamp(1.5rem,3.2vw,2.5rem)] leading-tight text-ink transition duration-200 hover:text-primary"
                >
                  {SUPPORT_EMAIL}
                </a>
                <p className="mt-4 text-sm leading-6 text-body">
                  Include document type, expected word count, intended English style (US, UK, Canadian, Australian, ESL), and deadline.
                </p>

                <div className="mt-6 border-t border-hairline pt-5">
                  <p className="text-xs uppercase tracking-[0.24em] text-primary font-semibold">Phone Support</p>
                  <a
                    href={`tel:${COMPANY_PHONE_TEL}`}
                    className="mt-2.5 inline-flex min-h-11 items-center gap-2 rounded-full border border-primary/20 bg-canvas px-4 text-sm font-semibold text-ink shadow-sm transition duration-200 ease-premium-out hover:border-primary/40 hover:text-primary"
                  >
                    <Phone className="h-3.5 w-3.5 text-primary" />
                    <span>{COMPANY_PHONE}</span>
                  </a>
                </div>

                <div className="mt-6 border-t border-hairline pt-5">
                  <p className="text-xs uppercase tracking-[0.24em] text-primary font-semibold">Headquarters</p>
                  <address className="mt-2 text-sm not-italic leading-relaxed text-body">
                    {COMPANY_OFFICES[0].fullAddress}
                  </address>
                </div>

                <div className="mt-6 border-t border-hairline pt-5">
                  <p className="text-xs uppercase tracking-[0.24em] text-primary font-semibold">Connect with us</p>
                  <p className="mt-1 text-xs text-body">Follow our desk and official updates on social media.</p>
                  <div className="mt-3 flex flex-wrap items-center gap-2.5">
                    <a
                      href={FACEBOOK_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-10 items-center gap-2 rounded-full border border-primary/20 bg-canvas px-4 text-xs font-semibold text-ink shadow-sm transition duration-200 ease-premium-out hover:border-primary/40 hover:text-primary active:scale-[0.98]"
                    >
                      <FacebookIcon className="h-3.5 w-3.5 text-primary" />
                      <span>Facebook</span>
                    </a>
                    <a
                      href={INSTAGRAM_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-10 items-center gap-2 rounded-full border border-primary/20 bg-canvas px-4 text-xs font-semibold text-ink shadow-sm transition duration-200 ease-premium-out hover:border-primary/40 hover:text-primary active:scale-[0.98]"
                    >
                      <InstagramIcon className="h-3.5 w-3.5 text-primary" />
                      <span>Instagram</span>
                    </a>
                  </div>
                </div>

                {/* Response expectations */}
                <div className="mt-6 grid gap-3 border-t border-hairline pt-5">
                  <div className="flex items-center gap-3">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                      <Globe2 className="h-3.5 w-3.5" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold text-ink">Global 24/7 Portal Uploads</p>
                      <p className="text-[11px] text-body">Documents assigned immediately across time zones</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                      <ShieldCheck className="h-3.5 w-3.5" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold text-ink">Strict Confidentiality</p>
                      <p className="text-[11px] text-body">Encrypted transfers & private human reviewer assignment</p>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* ─── Contact Form ─── */}
            <ContactForm source="Contact Form" />
          </div>

          {/* ─── Global Offices & Regional Desks ─── */}
          <div className="mt-20 border-t border-hairline pt-16 sm:mt-28 sm:pt-20">
            <div className="text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                <Globe2 className="h-3.5 w-3.5" />
                Worldwide Operations
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                Our Global Offices & Regional Desks
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-body sm:text-base">
                With operating offices and regional desks across North America, Europe, the Middle East, and Africa, we support researchers, academics, authors, and enterprises worldwide.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {COMPANY_OFFICES.map((office) => (
                <article
                  key={office.id}
                  className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border p-6 shadow-sm transition duration-300 ease-premium-out hover:-translate-y-1 hover:shadow-md ${
                    office.isHeadquarters
                      ? "border-primary/30 bg-surface-soft/80 ring-1 ring-primary/20"
                      : "border-hairline bg-canvas hover:border-primary/25"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <span className="text-2xl" role="img" aria-label={office.country}>
                          {office.flag}
                        </span>
                        <div>
                          <h3 className="font-display text-lg font-bold text-ink group-hover:text-primary transition">
                            {office.shortName}
                          </h3>
                          <p className="text-xs text-body">{office.region}</p>
                        </div>
                      </div>
                      {office.isHeadquarters ? (
                        <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary border border-primary/20">
                          Headquarters
                        </span>
                      ) : (
                        <span className="rounded-full bg-charcoal/5 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-charcoal/60">
                          Regional Office
                        </span>
                      )}
                    </div>

                    <div className="mt-5 space-y-3 text-xs leading-relaxed text-body border-t border-hairline/80 pt-4">
                      <div className="flex items-start gap-2.5">
                        <MapPin className="h-4 w-4 shrink-0 text-primary/70 mt-0.5" />
                        <address className="not-italic text-ink/85">
                          {office.fullAddress}
                        </address>
                      </div>

                      <div className="flex items-center gap-2.5 text-charcoal/70">
                        <Building2 className="h-4 w-4 shrink-0 text-primary/70" />
                        <span>Timezone: <strong className="text-ink font-medium">{office.timezone}</strong></span>
                      </div>

                      <div className="flex items-center gap-2.5 text-charcoal/70">
                        <Mail className="h-4 w-4 shrink-0 text-primary/70" />
                        <a href={`mailto:${office.email}`} className="text-primary hover:underline font-medium">
                          {office.email}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-hairline pt-3.5 text-[11px] text-body/80 flex items-center justify-between">
                    <span>{office.hours}</span>
                    <span className="font-mono text-primary font-semibold">{office.countryCode}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PublicPageShell>
  );
}


