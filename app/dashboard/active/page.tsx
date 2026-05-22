import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { StatusBadge } from "@/components/DashboardShell";
import Link from "next/link";
import { getDashboardProjectsForUser } from "@/lib/dashboard-projects";

function formatProvider(provider?: string | null) {
  if (!provider) return "Not selected";
  return provider.charAt(0).toUpperCase() + provider.slice(1);
}

function formatServices(project: { selected_services?: unknown; service_type?: string | null }) {
  return Array.isArray(project.selected_services) && project.selected_services.length > 0
    ? project.selected_services.join(", ")
    : project.service_type || "Editorial Service";
}

function displayPaymentStatus(status?: string | null) {
  if (status === "paid") return "Paid";
  if (status === "failed") return "Failed payment";
  if (status === "processing") return "Pending payment";
  if (status === "pending") return "Pending payment";
  return "Unpaid";
}

function normalizeProjectStatus(status?: string | null) {
  return String(status || "Pending").trim().toLowerCase();
}

function isCompletedProject(status?: string | null) {
  return normalizeProjectStatus(status) === "completed";
}

function displayProjectStatus(status?: string | null) {
  const value = normalizeProjectStatus(status);
  if (value === "in_progress" || value === "in progress") return "In Progress";
  if (value === "completed") return "Completed";
  return "Pending";
}

function PaymentBadge({ status }: { status?: string | null }) {
  const label = displayPaymentStatus(status);
  const isPaid = status === "paid";
  const isPending = status === "processing" || status === "pending";
  const classes = isPaid
    ? "border-status-success/35 bg-status-success-light text-status-success"
    : isPending
      ? "border-status-warning/35 bg-status-warning-light text-status-warning"
      : "border-status-danger/35 bg-status-danger-light text-status-danger";

  return (
    <span className={`inline-flex min-h-8 items-center gap-2 border px-3 text-xs font-bold uppercase tracking-[0.18em] ${classes}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${isPaid ? "bg-status-success" : isPending ? "bg-status-warning" : "bg-status-danger"}`} />
      Payment: {label}
    </span>
  );
}

export default async function DashboardActivePage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const projects = await getDashboardProjectsForUser(user);

  const activeProjects = projects.filter((project) => !isCompletedProject(project.status));

  return (
    <>
      <div className="grid gap-8 border-b border-ink/10 pb-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-gold-deep lg:hidden">Active Projects</p>
          <h1 className="mt-4 font-display text-[clamp(2.6rem,5vw,5.4rem)] leading-[0.96] text-ink">
            Submitted work
          </h1>
        </div>
        <p className="max-w-xl text-base leading-7 text-charcoal/68 lg:justify-self-end">
          View submitted documents, payment status, and editorial progress.
        </p>
      </div>

      <section className="mt-8 border border-ink/10 bg-ivory/90">
        <div className="divide-y divide-ink/10">
          {activeProjects.length > 0 ? activeProjects.map((project) => (
            <article key={project.id} className="grid gap-6 p-6 transition duration-200 ease-premium-out hover:bg-paper/70 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <StatusBadge>{displayProjectStatus(project.status)}</StatusBadge>
                  <PaymentBadge status={project.payment_status} />
                  <span className="text-xs uppercase tracking-[0.2em] text-charcoal/48">{project.friendly_id}</span>
                </div>
                <h3 className="mt-4 font-display text-3xl leading-tight text-ink">{formatServices(project)}</h3>
                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm font-light text-charcoal/62">
                  <span>{project.document_type || "Document"}</span>
                  {project.target_journal ? <span>Journal: {project.target_journal}</span> : null}
                  {project.formatting_style ? <span>{project.formatting_style}</span> : null}
                  {project.translation_preference ? <span>{project.translation_preference}</span> : null}
                  <span>{project.english_type || "No preference"}</span>
                  <span>{project.word_count} words</span>
                  <span>{project.turnaround}</span>
                  <span>Payment: {displayPaymentStatus(project.payment_status)}</span>
                  <span>Provider: {formatProvider(project.payment_provider)}</span>
                  {project.transaction_reference && <span>Ref: {project.transaction_reference}</span>}
                </div>
              </div>
              <div className="grid gap-3 border-l-0 border-ink/10 lg:border-l lg:pl-6">
                {project.payment_status !== "paid" ? (
                  <Link href={`/dashboard/active/${project.id}`} className="min-h-11 w-fit bg-cta px-5 inline-flex items-center text-sm font-semibold text-white transition duration-200 ease-premium-out hover:bg-cta-active active:scale-[0.98]">
                    Complete Payment
                  </Link>
                ) : null}
                <Link href={`/dashboard/active/${project.id}`} className="min-h-11 w-fit border border-ink/10 px-5 inline-flex items-center text-sm transition duration-200 ease-premium-out hover:border-gold hover:text-gold-deep active:scale-[0.98]">
                  Open order
                </Link>
              </div>
            </article>
          )) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="relative mb-6 grid h-16 w-16 place-items-center border border-gold/30 bg-ivory">
                <span className="h-px w-6 bg-gold/50" />
              </div>
              <h3 className="font-display text-2xl text-ink">No active projects</h3>
              <p className="mt-2 max-w-sm text-sm font-light leading-6 text-charcoal/60">
                You have no submitted projects yet.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
