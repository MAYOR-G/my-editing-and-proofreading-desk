import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { signout } from "@/app/actions/auth";

export default async function DashboardProfilePage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return (
    <>
      <div className="grid gap-8 border-b border-ink/10 pb-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-gold-deep lg:hidden">Profile</p>
          <h1 className="mt-4 font-display text-[clamp(2.6rem,5vw,5.4rem)] leading-[0.96] text-ink">
            Account details
          </h1>
        </div>
        <p className="max-w-xl text-base leading-7 text-charcoal/68 lg:justify-self-end">
          Manage your personal information and view your account settings.
        </p>
      </div>

      <section className="mt-8 border border-ink/10 bg-ivory/90 p-7 max-w-2xl">
        <h2 className="font-display text-3xl leading-tight text-ink capitalize">{profile?.full_name || "Client"}</h2>
        <div className="mt-6 grid gap-3 text-sm text-charcoal/64">
          <div className="flex justify-between border-t border-ink/10 pt-3"><span>Email</span><span className="text-ink">{profile?.email}</span></div>
          <div className="flex justify-between border-t border-ink/10 pt-3"><span>Currency</span><span className="text-ink">USD</span></div>
          <div className="flex justify-between border-t border-ink/10 pt-3"><span>Files retained</span><span className="text-ink">30 days</span></div>
        </div>

        <form action={signout} className="mt-10 pt-6 border-t border-ink/10">
          <button type="submit" className="min-h-11 w-fit border border-ink/10 px-5 text-sm transition duration-200 ease-premium-out hover:border-red-900 hover:text-red-900 active:scale-[0.98]">
            Sign out of desk
          </button>
        </form>
      </section>
    </>
  );
}
