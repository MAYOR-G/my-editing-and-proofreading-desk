import { ContactVisual } from "@/components/EditorialVisuals";
import { PublicPageShell } from "@/components/PublicPageShell";

export default function ContactPage() {
  return (
    <PublicPageShell
      eyebrow="Contact"
      title="Send a clear note before the work begins."
      description="Use the contact page for project questions, service fit, turnaround expectations, and business support."
      visual={<ContactVisual />}
    >
      <section className="px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          {/* ─── Contact Info Card ─── */}
          <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:items-start">
            <aside className="border border-ink/10 bg-paper/60 p-6 shadow-[0_18px_60px_rgba(17,17,15,0.04)] sm:p-8">
              <p className="text-xs uppercase tracking-[0.28em] text-gold-deep">Business email</p>
              <a
                href="mailto:support@editandproofread.com"
                className="mt-5 block break-all font-display text-[clamp(1.6rem,3.5vw,2.8rem)] leading-tight text-ink transition duration-200 hover:text-gold-deep"
              >
                support@editandproofread.com
              </a>
              <p className="mt-6 max-w-md text-base leading-7 text-charcoal/66">
                Include your document type, word count if known, service interest, and preferred turnaround.
              </p>

              {/* Response expectations */}
              <div className="mt-8 grid gap-4 border-t border-ink/10 pt-6">
                <div className="flex items-center gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center border border-gold/30 bg-gold/10">
                    <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 text-gold-deep" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="10" cy="10" r="7" />
                      <path d="M10 6v4l2.5 1.5" strokeLinecap="round" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-sm text-ink">Response within 24 hours</p>
                    <p className="text-xs text-charcoal/50">Business days, West Africa Time</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center border border-gold/30 bg-gold/10">
                    <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 text-gold-deep" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="3" y="7" width="14" height="10" rx="1.5" />
                      <path d="M3 9l7 4.5L17 9" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-sm text-ink">Detailed project scoping</p>
                    <p className="text-xs text-charcoal/50">We'll outline next steps and pricing</p>
                  </div>
                </div>
              </div>
            </aside>

            {/* ─── Contact Form ─── */}
            <form className="min-w-0 border border-ink/10 bg-paper p-6 shadow-[0_24px_90px_rgba(17,17,15,0.055)] sm:p-8 lg:p-10">
              <p className="text-xs uppercase tracking-[0.24em] text-gold-deep">Inquiry form</p>
              <h2 className="mt-3 font-display text-3xl leading-tight text-ink">Tell us about your project.</h2>

              <div className="mt-8 grid gap-6">
                {/* Row 1: Name + Email */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <label className="grid min-w-0 gap-2 text-sm font-medium text-charcoal/80">
                    Full name *
                    <input
                      required
                      type="text"
                      autoComplete="name"
                      placeholder="Your full name"
                      className="min-h-12 w-full border border-ink/10 bg-ivory px-4 text-base text-ink placeholder:text-charcoal/35 transition duration-200 ease-premium-out focus:border-gold focus:shadow-[0_0_0_3px_rgba(176,138,60,0.08)]"
                    />
                  </label>
                  <label className="grid min-w-0 gap-2 text-sm font-medium text-charcoal/80">
                    Email address *
                    <input
                      required
                      type="email"
                      autoComplete="email"
                      placeholder="you@email.com"
                      className="min-h-12 w-full border border-ink/10 bg-ivory px-4 text-base text-ink placeholder:text-charcoal/35 transition duration-200 ease-premium-out focus:border-gold focus:shadow-[0_0_0_3px_rgba(176,138,60,0.08)]"
                    />
                  </label>
                </div>

                {/* Row 2: Company + Service */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <label className="grid min-w-0 gap-2 text-sm font-medium text-charcoal/80">
                    Organization / Company
                    <input
                      type="text"
                      placeholder="Optional"
                      className="min-h-12 w-full border border-ink/10 bg-ivory px-4 text-base text-ink placeholder:text-charcoal/35 transition duration-200 ease-premium-out focus:border-gold focus:shadow-[0_0_0_3px_rgba(176,138,60,0.08)]"
                    />
                  </label>
                  <label className="grid min-w-0 gap-2 text-sm font-medium text-charcoal/80">
                    Service interest
                    <select className="min-h-12 w-full appearance-none border border-ink/10 bg-ivory px-4 text-base text-ink transition duration-200 ease-premium-out focus:border-gold focus:shadow-[0_0_0_3px_rgba(176,138,60,0.08)]">
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
                  <label className="grid min-w-0 gap-2 text-sm font-medium text-charcoal/80">
                    Estimated word count
                    <input
                      type="number"
                      placeholder="e.g. 5000"
                      className="min-h-12 w-full border border-ink/10 bg-ivory px-4 text-base text-ink placeholder:text-charcoal/35 transition duration-200 ease-premium-out focus:border-gold focus:shadow-[0_0_0_3px_rgba(176,138,60,0.08)]"
                    />
                  </label>
                  <label className="grid min-w-0 gap-2 text-sm font-medium text-charcoal/80">
                    Preferred turnaround
                    <select className="min-h-12 w-full appearance-none border border-ink/10 bg-ivory px-4 text-base text-ink transition duration-200 ease-premium-out focus:border-gold focus:shadow-[0_0_0_3px_rgba(176,138,60,0.08)]">
                      <option value="Standard (7-10 Days)">Standard (7-10 Days)</option>
                      <option value="Express (3-5 Days)">Express (3-5 Days)</option>
                      <option value="Rush (24-48 Hours)">Rush (24-48 Hours)</option>
                      <option value="Flexible">Flexible / Unsure</option>
                    </select>
                  </label>
                </div>

                {/* Message */}
                <label className="grid min-w-0 gap-2 text-sm font-medium text-charcoal/80">
                  Project overview &amp; message *
                  <textarea
                    required
                    rows={5}
                    placeholder="Please describe your document, target audience, and any specific editorial focus areas..."
                    className="min-h-36 w-full resize-y border border-ink/10 bg-ivory p-4 text-base text-ink placeholder:text-charcoal/35 transition duration-200 ease-premium-out focus:border-gold focus:shadow-[0_0_0_3px_rgba(176,138,60,0.08)]"
                  />
                </label>

                {/* Submit */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <button className="min-h-14 w-full bg-ink px-8 text-sm font-medium tracking-wide text-ivory transition duration-200 ease-premium-out hover:bg-gold-deep active:scale-[0.98] sm:w-auto">
                    Submit inquiry
                  </button>
                  <p className="text-xs text-charcoal/45">
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
