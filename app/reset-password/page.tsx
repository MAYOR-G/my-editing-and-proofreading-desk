import type { Metadata } from "next";
import { PublicPageShell } from "@/components/PublicPageShell";
import { ResetPasswordPanel } from "@/components/ResetPasswordPanel";
import { buildPageMetadata } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "Set New Password | My Editing and Proofreading Desk",
  description: "Choose a new secure password for your My Editing and Proofreading Desk client account to access your dashboard, uploads, and completed deliveries.",
  path: "/reset-password",
  noIndex: true,
});

export default function ResetPasswordPage() {
  return (
    <PublicPageShell
      eyebrow="Security"
      title="Set a new password."
      description="Please enter your new password below. Ensure it is strong and secure."
    >
      <section className="px-5 py-20 sm:px-8 lg:py-28">
        <ResetPasswordPanel />
      </section>
    </PublicPageShell>
  );
}
