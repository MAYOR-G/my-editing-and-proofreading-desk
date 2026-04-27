import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { StatusBadge } from "@/components/DashboardShell";
import Link from "next/link";

export default async function DashboardDownloadsPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .eq("user_id", user.id)
    .eq("status", "Completed")
    .order("created_at", { ascending: false });

  const completedProjects = projects || [];

  return (
    <>
      <div className="grid gap-8 border-b border-ink/10 pb-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-gold-deep lg:hidden">Completed</p>
          <h1 className="mt-4 font-display text-[clamp(2.6rem,5vw,5.4rem)] leading-[0.96] text-ink">
            Completed files
          </h1>
        </div>
        <p className="max-w-xl text-base leading-7 text-charcoal/68 lg:justify-self-end">
          Delivery stays organized after the work is finished. Download your edited documents and notes securely.
        </p>
      </div>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        {completedProjects.length > 0 ? completedProjects.map((project) => (
          <div key={project.id} className="border border-ink/10 bg-ivory/90 p-6">
            <StatusBadge>{project.status}</StatusBadge>
            <p className="mt-5 text-lg text-ink font-display">{project.service_type} Delivery</p>
            <p className="mt-3 text-sm font-light leading-6 text-charcoal/60">Secure file linked to {project.friendly_id}.</p>
            <div className="mt-6 flex gap-3">
              <button className="min-h-11 border border-ink/10 px-5 text-sm transition duration-200 ease-premium-out hover:border-gold hover:text-gold-deep active:scale-[0.98]">
                Download document
              </button>
              <button className="min-h-11 border border-ink/10 px-5 text-sm transition duration-200 ease-premium-out hover:border-gold hover:text-gold-deep active:scale-[0.98]">
                Editor notes
              </button>
            </div>
          </div>
        )) : (
          <div className="col-span-2 border border-ink/10 bg-ivory/50 p-6 text-center">
            <p className="text-sm font-light text-charcoal/50">No completed files available.</p>
          </div>
        )}
      </section>
    </>
  );
}
