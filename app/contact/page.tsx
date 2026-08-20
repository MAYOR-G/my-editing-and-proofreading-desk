import type { Metadata } from "next";
import { ContactVisual } from "@/components/EditorialVisuals";
import { PublicPageShell } from "@/components/PublicPageShell";
import { ContactForm } from "@/components/ContactForm";
import { FacebookIcon, InstagramIcon } from "@/components/SocialIcons";
import { COMPANY_ADDRESS, COMPANY_PHONE, COMPANY_PHONE_TEL, FACEBOOK_URL, INSTAGRAM_URL, SUPPORT_EMAIL } from "@/lib/contact-info";
import { buildPageMetadata } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact Our Editing Desk | Professional Proofreading Support",
  description: "Reach out for business inquiries, custom project quotes, and dedicated support for your academic, manuscript, or corporate editing needs.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <PublicPageShell
      eyebrow="Secure contact"
      title="Tell us what your document needs."
      description="Use the contact page for service fit, project questions, document expectations, and business support."
      visual={<ContactVisual />}
      seoPath="/contact"
    >
      <section className="bg-canvas px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          {/* ─── Contact Info Card ─── */}
          <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:items-start">
            <aside className="relative overflow-hidden rounded-2xl border border-hairline bg-surface-soft p-6 shadow-[0_18px_60px_rgba(17,17,15,0.04)] sm:p-8">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_88%_0%,rgba(23,74,124,0.08),transparent_34%)]" aria-hidden="true" />
              <div className="relative">
              <p className="text-xs uppercase tracking-[0.28em] text-primary">Business email</p>
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="mt-5 block break-all font-display text-[clamp(1.6rem,3.5vw,2.8rem)] leading-tight text-ink transition duration-200 hover:text-primary"
              >
                {SUPPORT_EMAIL}
              </a>
              <p className="mt-6 max-w-md text-base leading-7 text-body">
                Include your document type, word count if known, service interest, and preferred turnaround.
              </p>

              <div className="mt-8 border-t border-hairline pt-6">
                <p className="text-xs uppercase tracking-[0.24em] text-primary">Phone</p>
                <a
                  href={`tel:${COMPANY_PHONE_TEL}`}
                  className="mt-3 inline-flex min-h-12 items-center rounded-full border border-primary/20 bg-canvas px-5 text-sm font-semibold text-ink shadow-sm transition duration-200 ease-premium-out hover:border-primary/40 hover:text-primary"
                >
                  {COMPANY_PHONE}
                </a>
              </div>

              <div className="mt-8 border-t border-hairline pt-6">
                <p className="text-xs uppercase tracking-[0.24em] text-primary">Mailing address</p>
                <address className="mt-3 max-w-sm text-pretty text-sm not-italic leading-7 text-body">
                  {COMPANY_ADDRESS}
                </address>
              </div>

              <div className="mt-8 border-t border-hairline pt-6">
                <p className="text-xs uppercase tracking-[0.24em] text-primary">Connect with us</p>
                <p className="mt-2 text-xs text-body">Follow our desk and official updates on social media.</p>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <a
                    href={FACEBOOK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2.5 rounded-full border border-primary/20 bg-canvas px-5 text-sm font-semibold text-ink shadow-sm transition duration-200 ease-premium-out hover:border-primary/40 hover:text-primary active:scale-[0.98]"
                  >
                    <FacebookIcon className="h-4 w-4 text-primary" />
                    <span>Facebook</span>
                  </a>
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2.5 rounded-full border border-primary/20 bg-canvas px-5 text-sm font-semibold text-ink shadow-sm transition duration-200 ease-premium-out hover:border-primary/40 hover:text-primary active:scale-[0.98]"
                  >
                    <InstagramIcon className="h-4 w-4 text-primary" />
                    <span>Instagram</span>
                  </a>
                </div>
              </div>

              {/* Response expectations */}
              <div className="mt-8 grid gap-4 border-t border-hairline pt-6">
                <div className="flex items-center gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="10" cy="10" r="7" />
                      <path d="M10 6v4l2.5 1.5" strokeLinecap="round" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-sm font-medium text-ink">Response within 24 hours</p>
                    <p className="text-xs text-body">Business days, West Africa Time</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="3" y="7" width="14" height="10" rx="1.5" />
                      <path d="M3 9l7 4.5L17 9" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-sm font-medium text-ink">Detailed project scoping</p>
                    <p className="text-xs text-body">We'll outline next steps and pricing</p>
                  </div>
                </div>
              </div>
              </div>
            </aside>

            {/* ─── Contact Form ─── */}
            <ContactForm source="Contact Form" />
          </div>
        </div>
      </section>
    </PublicPageShell>
  );
}

