import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { StatusBadge } from "@/components/DashboardShell";
import Link from "next/link";
import { getDashboardProjectsForUser } from "@/lib/dashboard-projects";

function displayPaymentStatus(status?: string | null) {
  if (status === "paid") return "Paid";
  if (status === "failed") return "Failed payment";
  if (status === "processing") return "Pending payment";
  if (status === "pending") return "Pending payment";
  return "Unpaid";
}

function isCompletedProject(status?: string | null) {
  return String(status || "").trim().toLowerCase() === "completed";
}

function displayProjectStatus(status?: string | null) {
  const value = String(status || "Completed").trim().toLowerCase();
  if (value === "completed") return "Completed";
  if (value === "in_progress" || value === "in progress") return "In Progress";
  return "Pending";
}

export default async function DashboardDownloadsPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const projects = await getDashboardProjectsForUser(user);

  const completedProjects = projects.filter((project) => isCompletedProject(project.status));

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
            <div className="flex flex-wrap gap-2">
              <StatusBadge>{displayProjectStatus(project.status)}</StatusBadge>
              <StatusBadge>{displayPaymentStatus(project.payment_status)}</StatusBadge>
            </div>
            <p className="mt-5 text-lg text-ink font-display">{project.service_type} Delivery</p>
            <p className="mt-3 text-sm font-light leading-6 text-charcoal/60">Secure file linked to {project.friendly_id}.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {project.delivery_file_path ? (
                <>
                  <Link href={`/api/projects/${project.id}/file?file=delivery&action=view`} className="inline-flex min-h-11 items-center border border-ink/10 px-5 text-sm transition duration-200 ease-premium-out hover:border-gold hover:text-gold-deep active:scale-[0.98]">
                    View completed file
                  </Link>
                  <Link href={`/api/projects/${project.id}/file?file=delivery&action=download`} className="inline-flex min-h-11 items-center border border-ink/10 px-5 text-sm transition duration-200 ease-premium-out hover:border-gold hover:text-gold-deep active:scale-[0.98]">
                    Download completed file
                  </Link>
                </>
              ) : (
                <p className="text-sm font-light leading-6 text-charcoal/60">
                  The completed file is not attached yet.
                </p>
              )}
              {project.uploaded_file_path || project.upload_file_path ? (
                <Link href={`/api/projects/${project.id}/file?action=download`} className="inline-flex min-h-11 items-center border border-ink/10 px-5 text-sm transition duration-200 ease-premium-out hover:border-gold hover:text-gold-deep active:scale-[0.98]">
                  Download submitted document
                </Link>
              ) : null}
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
