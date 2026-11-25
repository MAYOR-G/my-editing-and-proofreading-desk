import type { Metadata } from "next";
import { PublicPageShell } from "@/components/PublicPageShell";
import { ForgotPasswordPanel } from "@/components/ForgotPasswordPanel";
import { buildPageMetadata } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "Reset Password | My Editing and Proofreading Desk",
  description: "Request a secure password recovery link for your My Editing and Proofreading Desk client account to regain access to your projects and edited files.",
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
