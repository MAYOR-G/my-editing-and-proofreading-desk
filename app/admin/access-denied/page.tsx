import Link from "next/link";
import { adminLogout } from "@/app/actions/admin";

export default function AdminAccessDeniedPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-ink p-5 text-ivory">
      <section className="w-full max-w-lg border border-ivory/10 bg-ivory/[0.055] p-8 text-center shadow-[0_30px_120px_rgba(0,0,0,0.18)]">
        <p className="text-xs uppercase tracking-[0.32em] text-gold">Admin access</p>
        <h1 className="mt-5 font-display text-4xl leading-tight">Access denied</h1>
        <p className="mt-5 text-sm leading-7 text-ivory/64">
          You are signed in, but this account is not marked as an admin in the
          `profiles.role` field. Ask an existing admin or run the documented
          Supabase admin setup step.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/dashboard"
            className="inline-flex min-h-12 items-center justify-center border border-ivory/15 px-6 text-sm text-ivory transition hover:border-gold hover:text-gold"
          >
            Go to user dashboard
          </Link>
          <form action={adminLogout}>
            <button
              type="submit"
              className="inline-flex min-h-12 w-full items-center justify-center bg-gold px-6 text-sm text-ink transition hover:bg-ivory sm:w-auto"
            >
              Sign out
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
