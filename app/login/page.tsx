import { LoginEmailPanel } from "@/components/LoginEmailPanel";
import { SiteHeader } from "@/components/SiteHeader";
import Link from "next/link";

const portalNotes = [
  "Track active projects",
  "Download completed files",
  "Message support"
];

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-ivory text-ink">
      <SiteHeader />
      <section className="grid min-h-screen px-5 pb-16 pt-24 sm:px-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-start lg:gap-16 lg:pt-36">
        <div className="mx-auto w-full max-w-xl lg:justify-self-end">
          <p className="text-xs uppercase tracking-[0.32em] text-primary">Client portal</p>
          <h1 className="mt-6 font-display text-[clamp(3rem,7vw,6.4rem)] leading-[0.92] text-ink">Log in to your editorial desk.</h1>
          <p className="mt-8 max-w-lg text-lg leading-8 text-charcoal/68">
            Use your email to open a personalized dashboard view with project status, submitted work, delivery files, and support notes.
          </p>

          <div className="mt-8 grid max-w-lg gap-3 sm:grid-cols-3">
            {portalNotes.map((note) => (
              <span key={note} className="border border-hairline bg-surface-soft px-4 py-3 text-sm text-charcoal/70">
                {note}
              </span>
            ))}
          </div>

          <Link href="/signup" className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-cta px-7 text-sm font-medium text-white shadow-[0_14px_32px_rgba(31,143,90,0.18)] transition duration-200 ease-premium-out hover:bg-cta-active active:scale-[0.98]">
            Create an account
          </Link>
        </div>
        <div className="mx-auto mt-12 w-full max-w-md lg:mt-0 lg:justify-self-start">
          <LoginEmailPanel />
        </div>
      </section>
    </main>
  );
}
