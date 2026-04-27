import { PublicPageShell } from "@/components/PublicPageShell";
import { ForgotPasswordPanel } from "@/components/ForgotPasswordPanel";

export default function ForgotPasswordPage() {
  return (
    <PublicPageShell
      eyebrow="Recovery"
      title="Reset your password."
      description="Enter your email to receive a secure link to reset your account password."
    >
      <section className="px-5 py-20 sm:px-8 lg:py-28">
        <ForgotPasswordPanel />
      </section>
    </PublicPageShell>
  );
}
