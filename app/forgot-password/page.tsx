import type { Metadata } from "next";
import { PublicPageShell } from "@/components/PublicPageShell";
import { ForgotPasswordPanel } from "@/components/ForgotPasswordPanel";
import { buildPageMetadata } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "Reset Your Password",
  description: "Request a secure password reset link for your My Editing and Proofreading Desk account.",
  path: "/forgot-password",
  noIndex: true,
});

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
