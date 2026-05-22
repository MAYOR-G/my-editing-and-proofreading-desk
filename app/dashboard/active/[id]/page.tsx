import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { CompletePaymentPanel } from "@/components/CompletePaymentPanel";
import { StatusBadge } from "@/components/DashboardShell";
import { getDashboardProjectForUser } from "@/lib/dashboard-projects";
import { createClient } from "@/utils/supabase/server";

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

function displayProjectStatus(status?: string | null) {
  const value = String(status || "Pending").trim().toLowerCase();
  if (value === "in_progress" || value === "in progress") return "In Progress";
  if (value === "completed") return "Completed";
  return "Pending";
}

function money(value: unknown) {
  return `$${Number(value || 0).toFixed(2)}`;
}

export default async function ProjectDetailPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const project = await getDashboardProjectForUser(user, params.id);

  if (!project) notFound();

  const isPaid = project.payment_status === "paid";
  const payable = project.final_price || project.price;
  const sourceFilePath = project.uploaded_file_path || project.upload_file_path;
  const deliveryFilePath = project.delivery_file_path;

  return (
    <>
      <div className="grid gap-8 border-b border-ink/10 pb-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-gold-deep lg:hidden">Project</p>
          <h1 className="mt-4 font-display text-[clamp(2.6rem,5vw,5.4rem)] leading-[0.96] text-ink">
            {project.friendly_id}
          </h1>
        </div>
        <p className="max-w-xl text-base leading-7 text-charcoal/68 lg:justify-self-end">
          Review your submitted project, payment status, and editorial progress.
        </p>
      </div>

      <section className="mt-8 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="border border-ink/10 bg-ivory/90 p-6">
          <div className="flex flex-wrap gap-3">
            <StatusBadge>{displayPaymentStatus(project.payment_status)}</StatusBadge>
            <StatusBadge>{displayProjectStatus(project.status)}</StatusBadge>
          </div>
          <h2 className="mt-5 font-display text-4xl text-ink">{formatServices(project)}</h2>
          <div className="mt-6 grid gap-4 text-sm">
            {[
              ["Document", project.title],
              ["Document type", project.document_type || "Document"],
              ["Target journal", project.target_journal || "Not provided"],
              ["Word count", Number(project.word_count || 0).toLocaleString()],
              ["Turnaround", project.turnaround],
              ["Formatting", project.formatting_style || "Not required"],
              ["Translation", project.translation_preference || "Not required"],
              ["English style", project.english_type || "No preference"],
              ["Total payable", money(payable)],
              ["Submitted", new Date(project.created_at).toLocaleString()],
            ].map(([label, value]) => (
              <div key={label} className="flex flex-col gap-1 border-b border-hairline pb-3 sm:flex-row sm:justify-between">
                <span className="text-charcoal/60">{label}</span>
                <span className="font-medium text-ink sm:text-right">{value}</span>
              </div>
            ))}
          </div>
          {project.client_notes ? (
            <div className="mt-6 rounded-xl border border-hairline bg-surface-soft p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-charcoal/50">Instructions</p>
              <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-ink">{project.client_notes}</p>
            </div>
          ) : null}
          <div className="mt-6 rounded-xl border border-hairline bg-surface-soft p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-charcoal/50">Documents</p>
            {sourceFilePath ? (
              <div className="mt-3 flex flex-wrap gap-3">
                <Link href={`/api/projects/${project.id}/file?action=view`} className="inline-flex min-h-10 items-center border border-ink/10 px-4 text-sm transition hover:border-primary hover:text-primary">
                  View submitted document
                </Link>
                <Link href={`/api/projects/${project.id}/file?action=download`} className="inline-flex min-h-10 items-center border border-ink/10 px-4 text-sm transition hover:border-primary hover:text-primary">
                  Download submitted document
                </Link>
              </div>
            ) : (
              <p className="mt-2 text-sm text-charcoal/60">No submitted document is attached to this project.</p>
            )}
            {deliveryFilePath ? (
              <div className="mt-4 flex flex-wrap gap-3 border-t border-hairline pt-4">
                <Link href={`/api/projects/${project.id}/file?file=delivery&action=view`} className="inline-flex min-h-10 items-center border border-ink/10 px-4 text-sm transition hover:border-primary hover:text-primary">
                  View completed file
                </Link>
                <Link href={`/api/projects/${project.id}/file?file=delivery&action=download`} className="inline-flex min-h-10 items-center border border-ink/10 px-4 text-sm transition hover:border-primary hover:text-primary">
                  Download completed file
                </Link>
              </div>
            ) : null}
          </div>
        </div>

        <aside className="grid gap-6">
          <div className="border border-ink/10 bg-ivory/90 p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-primary">Payment</p>
            <h2 className="mt-3 font-display text-3xl text-ink">{isPaid ? "Payment confirmed" : "Complete payment"}</h2>
            <p className="mt-3 text-sm leading-6 text-charcoal/60">
              {isPaid
                ? "Your payment is confirmed. The project remains pending until the editor begins work."
                : "Complete payment when you are ready. Your project will remain saved in your dashboard."}
            </p>
            <div className="mt-5">
              {isPaid ? (
                <StatusBadge>Paid</StatusBadge>
              ) : (
                <CompletePaymentPanel projectId={project.id} />
              )}
            </div>
          </div>

          <Link href="/dashboard/support" className="inline-flex min-h-12 items-center justify-center rounded-full border border-hairline px-6 text-sm text-charcoal/70 transition hover:border-primary hover:text-primary">
            Contact support
          </Link>
          <Link href="/dashboard/active" className="inline-flex min-h-12 items-center justify-center rounded-full border border-hairline px-6 text-sm text-charcoal/70 transition hover:border-primary hover:text-primary">
            Back to projects
          </Link>
        </aside>
      </section>
    </>
  );
}
