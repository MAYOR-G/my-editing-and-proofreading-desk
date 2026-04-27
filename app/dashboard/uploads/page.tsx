import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { DashboardUploadWizard } from "@/components/DashboardUploadWizard";

export default async function DashboardUploadsPage() {
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
          <p className="text-xs uppercase tracking-[0.3em] text-gold-deep lg:hidden">New Project</p>
          <h1 className="mt-4 font-display text-[clamp(2.6rem,5vw,5.4rem)] leading-[0.96] text-ink">
            Submit document
          </h1>
        </div>
        <p className="max-w-xl text-base leading-7 text-charcoal/68 lg:justify-self-end">
          Upload your file, define your requirements, and secure your place in the editorial queue.
        </p>
      </div>

      <section className="mt-8">
        <DashboardUploadWizard 
          userId={user.id} 
          userEmail={profile?.email || ""} 
          userName={profile?.full_name || ""} 
        />
      </section>
    </>
  );
}
