import { BrandMark } from "@/components/BrandMark";
import { LoginEmailPanel } from "@/components/LoginEmailPanel";
import { AuthWorkspaceVisual } from "@/components/AuthWorkspaceVisual";
import { SiteHeader } from "@/components/SiteHeader";
import Link from "next/link";

const trustIndicators = [
  { label: "Encrypted", detail: "256-bit SSL" },
  { label: "Private", detail: "No data sharing" },
  { label: "Verified", detail: "Server-side auth" }
];

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-ivory text-ink">
      <SiteHeader />
      <section className="grid min-h-screen px-5 pb-16 pt-28 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:pt-20">
        <div className="mx-auto w-full max-w-xl lg:justify-self-end">
          <BrandMark />
          <p className="mt-12 text-xs uppercase tracking-[0.32em] text-gold-deep">Secure client portal</p>
          <h1 className="mt-6 font-display text-[clamp(3rem,7vw,7rem)] leading-[0.92] text-ink">Log in to your editorial desk.</h1>
          <p className="mt-8 max-w-lg text-lg leading-8 text-charcoal/68">
            Use your email to open a personalized dashboard view with project status, submitted work, delivery files, and support notes.
          </p>

          {/* Trust indicators */}
          <div className="mt-8 flex flex-wrap gap-3">
            {trustIndicators.map((indicator) => (
              <span key={indicator.label} className="flex items-center gap-2 border border-ink/10 bg-paper/60 px-3 py-2 text-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-status-success" />
                <span className="uppercase tracking-[0.2em] text-charcoal/55">{indicator.label}</span>
                <span className="text-charcoal/38">{indicator.detail}</span>
              </span>
            ))}
          </div>

          <Link href="/signup" className="mt-8 inline-flex min-h-12 items-center border border-ink/15 px-7 text-sm text-ink transition duration-200 ease-premium-out hover:border-gold hover:text-gold-deep active:scale-[0.98]">
            Create an account
          </Link>

          {/* Editorial visual - desktop only */}
          <div className="mt-10 hidden lg:block">
            <AuthWorkspaceVisual />
          </div>
        </div>
        <div className="mx-auto mt-12 w-full max-w-md lg:mt-0 lg:justify-self-start">
          <LoginEmailPanel />
        </div>
      </section>
    </main>
  );
}
