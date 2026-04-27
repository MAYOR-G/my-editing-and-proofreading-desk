import { SignupPanel } from "@/components/SignupPanel";
import { AuthWorkspaceVisual } from "@/components/AuthWorkspaceVisual";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

const trustBadges = [
  { icon: "shield", label: "Secure signup" },
  { icon: "lock", label: "No spam ever" },
  { icon: "check", label: "Cancel anytime" }
];

export default function SignUpPage() {
  return (
    <main className="min-h-screen bg-ivory text-ink">
      <SiteHeader />
      <section className="grid min-h-screen px-5 pb-16 pt-28 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-12 lg:pt-20">
        {/* Left: Visual + Copy */}
        <div className="mx-auto w-full max-w-xl lg:justify-self-end">
          <p className="text-xs uppercase tracking-[0.32em] text-gold-deep">Sign up</p>
          <h1 className="mt-6 font-display text-[clamp(3rem,7vw,6.5rem)] leading-[0.92] text-ink">
            Create your editorial desk.
          </h1>
          <p className="mt-8 max-w-lg text-lg leading-8 text-charcoal/68">
            Join our secure client portal to manage your editing projects, track progress, and communicate directly with your editor.
          </p>

          {/* Trust badges */}
          <div className="mt-8 flex flex-wrap gap-3">
            {trustBadges.map((badge) => (
              <span key={badge.label} className="flex items-center gap-2 border border-ink/10 bg-paper/60 px-3 py-2 text-xs uppercase tracking-[0.18em] text-charcoal/55">
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-status-success" fill="none" stroke="currentColor" strokeWidth="1.6">
                  {badge.icon === "shield" && <path d="M8 1.5 L14 4.5 V8 C14 11.5 8 14.5 8 14.5 C8 14.5 2 11.5 2 8 V4.5 Z" strokeLinejoin="round" />}
                  {badge.icon === "lock" && <><rect x="3.5" y="7" width="9" height="7" rx="1" /><path d="M5.5 7 V5 A2.5 2.5 0 0 1 10.5 5 V7" strokeLinecap="round" /></>}
                  {badge.icon === "check" && <path d="M3 8.5 L6.5 12 L13 4" strokeLinecap="round" strokeLinejoin="round" />}
                </svg>
                {badge.label}
              </span>
            ))}
          </div>

          {/* Visual - desktop only */}
          <div className="mt-10 hidden lg:block">
            <AuthWorkspaceVisual />
          </div>
        </div>

        {/* Right: Form */}
        <div className="mx-auto mt-12 w-full max-w-lg lg:mt-0 lg:justify-self-start">
          <SignupPanel />
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
