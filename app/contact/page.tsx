import { ContactVisual } from "@/components/EditorialVisuals";
import { PublicPageShell } from "@/components/PublicPageShell";

export default function ContactPage() {
  return (
    <PublicPageShell
      eyebrow="Contact"
      title="Tell us what your document needs."
      description="Use the contact page for service fit, project questions, document expectations, and business support."
      visual={<ContactVisual />}
    >
      <section className="bg-canvas px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          {/* ─── Contact Info Card ─── */}
          <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:items-start">
            <aside className="rounded-2xl border border-hairline bg-surface-soft p-6 shadow-[0_18px_60px_rgba(17,17,15,0.04)] sm:p-8">
              <p className="text-xs uppercase tracking-[0.28em] text-primary">Business email</p>
              <a
                href="mailto:hello@business.editandproofread.com"
                className="mt-5 block break-all font-display text-[clamp(1.6rem,3.5vw,2.8rem)] leading-tight text-ink transition duration-200 hover:text-primary"
              >
                hello@business.editandproofread.com
              </a>
              <p className="mt-6 max-w-md text-base leading-7 text-body">
                Include your document type, word count if known, service interest, and preferred turnaround.
              </p>

              <div className="mt-8 border-t border-hairline pt-6">
                <p className="text-xs uppercase tracking-[0.24em] text-primary">Mailing address</p>
                <address className="mt-3 text-sm not-italic leading-7 text-body">
                  1007 N Orange St. 4th Floor<br />
                  Suite #5723<br />
                  Wilmington, Delaware 19801<br />
                  United States
                </address>
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
            </aside>

            {/* ─── Contact Form ─── */}
            <form className="min-w-0 rounded-2xl border border-hairline bg-canvas p-6 shadow-[0_24px_90px_rgba(17,17,15,0.055)] sm:p-8 lg:p-10">
              <p className="text-xs uppercase tracking-[0.24em] text-primary">Inquiry form</p>
              <h2 className="mt-3 font-display text-3xl leading-tight text-ink">Tell us about your project.</h2>

              <div className="mt-8 grid gap-6">
                {/* Row 1: Name + Email */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <label className="grid min-w-0 gap-2 text-sm font-medium text-ink">
                    Full name *
                    <input
                      required
                      type="text"
                      autoComplete="name"
                      placeholder="Your full name"
                      className="min-h-12 w-full border border-hairline bg-surface-soft px-4 text-base text-ink placeholder:text-body transition duration-200 ease-premium-out focus:border-primary focus:shadow-[0_0_0_3px_rgba(0,82,255,0.08)] rounded-xl"
                    />
                  </label>
                  <label className="grid min-w-0 gap-2 text-sm font-medium text-ink">
                    Email address *
                    <input
                      required
                      type="email"
                      autoComplete="email"
                      placeholder="you@email.com"
                      className="min-h-12 w-full border border-hairline bg-surface-soft px-4 text-base text-ink placeholder:text-body transition duration-200 ease-premium-out focus:border-primary focus:shadow-[0_0_0_3px_rgba(0,82,255,0.08)] rounded-xl"
                    />
                  </label>
                </div>

                {/* Row 2: Company + Service */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <label className="grid min-w-0 gap-2 text-sm font-medium text-ink">
                    Organization / Company
                    <input
                      type="text"
                      placeholder="Optional"
                      className="min-h-12 w-full border border-hairline bg-surface-soft px-4 text-base text-ink placeholder:text-body transition duration-200 ease-premium-out focus:border-primary focus:shadow-[0_0_0_3px_rgba(0,82,255,0.08)] rounded-xl"
                    />
                  </label>
                  <label className="grid min-w-0 gap-2 text-sm font-medium text-ink">
                    Service interest
                    <select className="min-h-12 w-full appearance-none border border-hairline bg-surface-soft px-4 text-base text-ink transition duration-200 ease-premium-out focus:border-primary focus:shadow-[0_0_0_3px_rgba(0,82,255,0.08)] rounded-xl">
                      <option value="">Select a service...</option>
                      <option value="Academic Editing">Academic Editing</option>
                      <option value="Business Editing">Business &amp; Corporate Editing</option>
                      <option value="Proofreading">Proofreading</option>
                      <option value="Formatting">Formatting</option>
                      <option value="Translation">Translation</option>
                      <option value="Other">Other Inquiry</option>
                    </select>
                  </label>
                </div>

                {/* Row 3: Word count + Turnaround */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <label className="grid min-w-0 gap-2 text-sm font-medium text-ink">
                    Estimated word count
                    <input
                      type="number"
                      placeholder="e.g. 5000"
                      className="min-h-12 w-full border border-hairline bg-surface-soft px-4 text-base text-ink placeholder:text-body transition duration-200 ease-premium-out focus:border-primary focus:shadow-[0_0_0_3px_rgba(0,82,255,0.08)] rounded-xl"
                    />
                  </label>
                  <label className="grid min-w-0 gap-2 text-sm font-medium text-ink">
                    Preferred turnaround
                    <select className="min-h-12 w-full appearance-none border border-hairline bg-surface-soft px-4 text-base text-ink transition duration-200 ease-premium-out focus:border-primary focus:shadow-[0_0_0_3px_rgba(0,82,255,0.08)] rounded-xl">
                      <option value="24 to 48 hours">24 to 48 hours</option>
                      <option value="3 to 5 days">3 to 5 days</option>
                      <option value="7 to 10 days">7 to 10 days</option>
                      <option value="10 to 28 days">10 to 28 days</option>
                      <option value="Flexible or Not sure">Flexible or Not sure</option>
                    </select>
                  </label>
                </div>

                {/* Message */}
                <label className="grid min-w-0 gap-2 text-sm font-medium text-ink">
                  Project overview &amp; message *
                  <textarea
                    required
                    rows={5}
                    placeholder="Please describe your document, target audience, and any specific editorial focus areas..."
                    className="min-h-36 w-full resize-y border border-hairline bg-surface-soft p-4 text-base text-ink placeholder:text-body transition duration-200 ease-premium-out focus:border-primary focus:shadow-[0_0_0_3px_rgba(0,82,255,0.08)] rounded-xl"
                  />
                </label>

                {/* Submit */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <button className="inline-flex min-h-12 items-center justify-center bg-primary rounded-full px-7 text-sm font-medium text-white transition duration-200 ease-premium-out hover:bg-primary-active active:scale-[0.98] sm:w-auto">
                    Submit inquiry
                  </button>
                  <p className="text-xs text-body">
                    We'll respond within one business day.
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </PublicPageShell>
  );
}
