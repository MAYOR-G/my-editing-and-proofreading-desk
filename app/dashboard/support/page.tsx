import { redirect } from "next/navigation";
import { ContactForm } from "@/components/ContactForm";
import { SUPPORT_EMAIL } from "@/lib/contact-info";
import { createClient } from "@/utils/supabase/server";

export default async function DashboardSupportPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, email")
    .eq("id", user.id)
    .single();

  return (
    <>
      <div className="grid gap-8 border-b border-ink/10 pb-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-primary lg:hidden">Support</p>
          <h1 className="mt-4 font-display text-[clamp(2.6rem,5vw,5.4rem)] leading-[0.96] text-ink">
            Contact support
          </h1>
        </div>
        <p className="max-w-xl text-base leading-7 text-charcoal/72 lg:justify-self-end">
          Send a private support message to the editorial desk. Replies come from {SUPPORT_EMAIL}.
        </p>
      </div>

      <section className="mt-8 grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
        <aside className="rounded-2xl border border-hairline bg-ivory/92 p-7 shadow-[0_18px_70px_rgba(17,17,15,0.045)]">
          <p className="text-xs uppercase tracking-[0.24em] text-primary">Support identity</p>
          <h2 className="mt-4 font-display text-3xl leading-tight text-ink">We keep project questions in one place.</h2>
          <p className="mt-5 text-sm leading-7 text-charcoal/66">
            Include the project ID, payment reference, or document title if your message relates to a specific order.
          </p>
          <a href={`mailto:${SUPPORT_EMAIL}`} className="mt-6 block break-all text-sm font-semibold text-primary">
            {SUPPORT_EMAIL}
          </a>
        </aside>

        <div className="rounded-2xl border border-hairline bg-canvas p-6 shadow-[0_24px_90px_rgba(17,17,15,0.055)] sm:p-8 lg:p-10">
          <p className="text-xs uppercase tracking-[0.24em] text-primary">Dashboard support</p>
          <h2 className="mt-3 font-display text-3xl leading-tight text-ink">Send a support message.</h2>
          <div className="mt-8">
            <ContactForm
              source="Dashboard Support"
              defaultName={profile?.full_name || ""}
              defaultEmail={profile?.email || user.email || ""}
              compact
            />
          </div>
        </div>
      </section>
    </>
  );
}
