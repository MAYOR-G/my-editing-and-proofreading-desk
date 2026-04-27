import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { MetricPanel, EmptyState } from "@/components/DashboardShell";
import Link from "next/link";

export default async function DashboardOverviewPage() {
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

  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .eq("client_id", user.id)
    .order("created_at", { ascending: false });

  const activeProjects = projects?.filter(p => p.status !== "Completed") || [];
  const completedProjects = projects?.filter(p => p.status === "Completed") || [];
  const totalPaid = projects?.filter(p => p.payment_status === "paid").reduce((acc, curr) => acc + (curr.price || 0), 0) || 0;
  const recentProjects = projects?.slice(0, 3) || [];

  return (
    <>
      <div className="grid gap-8 border-b border-ink/10 pb-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-gold-deep lg:hidden">Overview</p>
          <h1 className="mt-4 font-display text-[clamp(2.6rem,5vw,5.4rem)] leading-[0.96] text-ink">
            Welcome back, {profile?.full_name?.split(" ")[0] || "Client"}
          </h1>
        </div>
        <p className="max-w-xl text-base leading-7 text-charcoal/68 lg:justify-self-end">
          This is your private editorial workspace. Start a new submission or track existing documents.
        </p>
      </div>

      <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricPanel label="Active Orders" value={activeProjects.length.toString()} detail="Currently in editorial review." />
        <MetricPanel label="Completed" value={completedProjects.length.toString()} detail="Files ready for download." />
        <MetricPanel label="Total Spend" value={`$${totalPaid.toFixed(2)}`} detail="Lifetime editorial value." />
        <MetricPanel label="Response SLA" value="24h" detail="Standard editor response time." />
      </section>

      {/* Quick actions */}
      <section className="mt-8 grid gap-4 sm:grid-cols-3">
        <Link href="/dashboard/uploads" className="group flex items-center gap-4 border border-ink/10 bg-ivory/88 p-5 transition duration-300 ease-premium-out hover:-translate-y-0.5 hover:border-gold/35 hover:shadow-card-hover">
          <span className="grid h-10 w-10 shrink-0 place-items-center border border-gold/30 bg-gold/10 text-gold-deep transition duration-200 group-hover:bg-gold/20">
            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M10 4v12M4 10h12" strokeLinecap="round" /></svg>
          </span>
          <div>
            <p className="text-sm font-medium text-ink">Submit document</p>
            <p className="mt-0.5 text-xs text-charcoal/50">Upload a new project</p>
          </div>
        </Link>
        <Link href="/dashboard/downloads" className="group flex items-center gap-4 border border-ink/10 bg-ivory/88 p-5 transition duration-300 ease-premium-out hover:-translate-y-0.5 hover:border-gold/35 hover:shadow-card-hover">
          <span className="grid h-10 w-10 shrink-0 place-items-center border border-gold/30 bg-gold/10 text-gold-deep transition duration-200 group-hover:bg-gold/20">
            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M10 3v10M6 9l4 4 4-4M4 15h12" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </span>
          <div>
            <p className="text-sm font-medium text-ink">Download files</p>
            <p className="mt-0.5 text-xs text-charcoal/50">View completed work</p>
          </div>
        </Link>
        <Link href="/dashboard/profile" className="group flex items-center gap-4 border border-ink/10 bg-ivory/88 p-5 transition duration-300 ease-premium-out hover:-translate-y-0.5 hover:border-gold/35 hover:shadow-card-hover">
          <span className="grid h-10 w-10 shrink-0 place-items-center border border-gold/30 bg-gold/10 text-gold-deep transition duration-200 group-hover:bg-gold/20">
            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="10" cy="7" r="3" /><path d="M4 17c0-3.3 2.7-6 6-6s6 2.7 6 6" strokeLinecap="round" /></svg>
          </span>
          <div>
            <p className="text-sm font-medium text-ink">Account details</p>
            <p className="mt-0.5 text-xs text-charcoal/50">Update your profile</p>
          </div>
        </Link>
      </section>

      {/* Recent activity or empty state */}
      <section className="mt-10">
        <h2 className="mb-5 text-xs uppercase tracking-[0.28em] text-gold-deep">Recent activity</h2>
        {recentProjects.length > 0 ? (
          <div className="divide-y divide-ink/10 border-y border-ink/10">
            {recentProjects.map((project) => (
              <div key={project.id} className="flex items-center justify-between gap-4 py-5 transition duration-200 hover:bg-paper/60 px-2">
                <div className="flex items-center gap-4">
                  <span className="grid h-9 w-9 shrink-0 place-items-center border border-ink/10 bg-paper text-xs font-display text-gold-deep">
                    {project.service_type?.charAt(0) || "E"}
                  </span>
                  <div>
                    <p className="text-sm text-ink">{project.title || project.friendly_id}</p>
                    <p className="mt-0.5 text-xs text-charcoal/50">{project.service_type} · {project.word_count?.toLocaleString() || 0} words</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-ink">${project.price?.toFixed(2) || "0.00"}</p>
                  <p className="mt-0.5 text-xs text-charcoal/50">{project.status}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No projects yet"
            description="Once you submit your first document, it will appear here with real-time status tracking."
            actionLabel="Submit your first document"
            actionHref="/dashboard/uploads"
          />
        )}
      </section>
    </>
  );
}
