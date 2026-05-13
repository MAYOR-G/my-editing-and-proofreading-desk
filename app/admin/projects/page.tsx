import Link from "next/link";
import { revalidatePath } from "next/cache";
import { DashboardShell, StatusBadge } from "@/components/DashboardShell";
import { requireAdmin } from "@/lib/admin-auth";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";

const nav = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/requests", label: "Messages" },
  { href: "/admin/projects", label: "Projects" }
];

function formatProvider(provider?: string | null) {
  if (!provider) return "N/A";
  return provider.charAt(0).toUpperCase() + provider.slice(1);
}

function displayStatus(status?: string | null) {
  if (status === "Pending") return "Pending";
  return status === "In Progress" ? "Ongoing" : status || "Ongoing";
}

const statusOptions = [
  { value: "Pending", label: "Pending" },
  { value: "In Progress", label: "Ongoing" },
  { value: "Completed", label: "Completed" },
];

function services(project: { selected_services?: unknown; service_type?: string | null }) {
  return Array.isArray(project.selected_services) && project.selected_services.length > 0
    ? project.selected_services.join(", ")
    : project.service_type || "Editorial Service";
}

function dueDate(createdAt: string, days?: number | null) {
  if (!days) return "N/A";
  const date = new Date(createdAt);
  date.setDate(date.getDate() + days);
  return date.toLocaleDateString();
}

async function updateProjectStatus(formData: FormData) {
  "use server";
  await requireAdmin();
  const id = String(formData.get("id") || "");
  const status = String(formData.get("status") || "In Progress");
  if (!id || !statusOptions.some((option) => option.value === status)) return;

  const supabaseAdmin = createSupabaseAdminClient();
  await supabaseAdmin
    .from("projects")
    .update({
      status,
      completed_at: status === "Completed" ? new Date().toISOString() : null,
    })
    .eq("id", id);

  revalidatePath("/admin/projects");
  revalidatePath("/admin");
}

export default async function AdminProjectsPage({
  searchParams,
}: {
  searchParams?: { project?: string };
}) {
  await requireAdmin();
  const supabaseAdmin = createSupabaseAdminClient();

  const { data, error } = await supabaseAdmin
    .from("projects")
    .select(`
      *,
      profiles (
        full_name,
        email
      )
    `)
    .eq("payment_status", "paid")
    .order("created_at", { ascending: false });

  if (error) console.error("Admin projects fetch failed:", error);
  const projects = data || [];
  const selected = projects.find((project) => project.id === searchParams?.project) || projects[0] || null;

  return (
    <DashboardShell
      eyebrow="Admin operations"
      title="Projects."
      description="Manage paid document projects, payment details, uploaded files, and delivery status."
      nav={nav}
      primaryActionLabel="Projects"
      secondaryActionLabel="Messages"
    >
      <section className="mt-8 overflow-hidden border border-ink/10 bg-ivory/90">
        <div className="grid gap-4 border-b border-ink/10 p-6 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-gold-deep">Paid projects</p>
            <h2 className="mt-2 font-display text-4xl text-ink">Document queue</h2>
          </div>
          <p className="text-sm text-charcoal/56">{projects.length} paid project{projects.length === 1 ? "" : "s"}</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1180px] border-collapse text-left">
            <thead>
              <tr className="border-b border-ink/10 text-xs uppercase tracking-[0.18em] text-charcoal/48">
                <th className="p-5 font-medium">Project</th>
                <th className="p-5 font-medium">Client</th>
                <th className="p-5 font-medium">Service</th>
                <th className="p-5 font-medium">Words</th>
                <th className="p-5 font-medium">Turnaround</th>
                <th className="p-5 font-medium">Payment</th>
                <th className="p-5 font-medium">Status</th>
                <th className="p-5 font-medium">Submitted</th>
                <th className="p-5 font-medium">Due</th>
                <th className="p-5 font-medium">File</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/10">
              {projects.map((project) => {
                const isSelected = selected?.id === project.id;
                const projectHref = `/admin/projects?project=${project.id}`;

                return (
                <tr key={project.id} className={`text-sm text-charcoal/70 transition hover:bg-paper/80 ${isSelected ? "bg-paper shadow-[inset_4px_0_0_rgba(23,74,124,0.9)]" : ""}`}>
                  <td className="p-5 text-ink">
                    <Link href={projectHref} className="font-semibold text-primary hover:underline">
                      {project.friendly_id}
                    </Link>
                  </td>
                  <td className="p-5">
                    <Link href={projectHref} className="block text-ink hover:text-primary">{project.profiles?.full_name || "Client"}</Link>
                    <Link href={projectHref} className="block text-xs text-charcoal/50 hover:text-primary">{project.profiles?.email || "No email"}</Link>
                  </td>
                  <td className="p-5"><Link href={projectHref} className="hover:text-primary">{services(project)}</Link></td>
                  <td className="p-5"><Link href={projectHref} className="hover:text-primary">{Number(project.word_count || 0).toLocaleString()}</Link></td>
                  <td className="p-5"><Link href={projectHref} className="hover:text-primary">{project.turnaround}</Link></td>
                  <td className="p-5"><Link href={projectHref} className="hover:text-primary">{project.payment_status} · ${Number(project.price || 0).toFixed(2)}</Link></td>
                  <td className="p-5"><Link href={projectHref}><StatusBadge>{displayStatus(project.status)}</StatusBadge></Link></td>
                  <td className="p-5"><Link href={projectHref} className="hover:text-primary">{new Date(project.created_at).toLocaleDateString()}</Link></td>
                  <td className="p-5"><Link href={projectHref} className="hover:text-primary">{dueDate(project.created_at, project.turnaround_days)}</Link></td>
                  <td className="p-5">
                    {project.uploaded_file_path ? (
                      <div className="grid gap-1">
                        <Link href={projectHref} className="max-w-44 truncate text-charcoal/70 hover:text-primary">
                          {project.title || project.uploaded_file_path.split("/").pop() || "Uploaded document"}
                        </Link>
                        {project.target_journal ? (
                          <Link href={projectHref} className="max-w-44 truncate text-xs text-charcoal/45 hover:text-primary">
                            Journal: {project.target_journal}
                          </Link>
                        ) : null}
                        <Link href={`/api/admin/projects/${project.id}/download`} className="text-primary hover:underline">
                          Download
                        </Link>
                      </div>
                    ) : (
                      <Link href={projectHref} className="hover:text-primary">N/A</Link>
                    )}
                  </td>
                </tr>
              );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {selected ? (
        <section className="mt-8 grid gap-8 lg:grid-cols-[1.12fr_0.88fr]">
          <div className="border border-ink/10 bg-ink p-7 text-ivory">
            <p className="text-xs uppercase tracking-[0.24em] text-gold">Selected project</p>
            <h2 className="mt-4 font-display text-5xl leading-none">{selected.friendly_id}</h2>
            <div className="mt-8 grid gap-4 text-sm text-ivory/70">
              {[
                ["Client", `${selected.profiles?.full_name || "Client"} · ${selected.profiles?.email || "No email"}`],
                ["Client ID", selected.client_id || "N/A"],
                ["Service", services(selected)],
                ["Document", selected.title || selected.document_type || "Document"],
                ["Document type", selected.document_type || "N/A"],
                ["Target journal", selected.target_journal || "Not provided"],
                ["Words", Number(selected.word_count || 0).toLocaleString()],
                ["Turnaround", selected.turnaround],
                ["Submitted", new Date(selected.created_at).toLocaleString()],
                ["Due date", dueDate(selected.created_at, selected.turnaround_days)],
                ["Amount paid", `$${Number(selected.price || 0).toFixed(2)}`],
                ["Payment", `${selected.payment_status} via ${formatProvider(selected.payment_provider)}`],
                ["Reference", selected.transaction_reference || selected.payment_reference || "N/A"],
                ["Notes", selected.client_notes || "None"],
                ["Upload path", selected.uploaded_file_path || selected.upload_file_path || "N/A"],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between gap-6 border-t border-ivory/12 pt-4">
                  <span>{label}</span>
                  <span className="break-all text-right text-ivory">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <aside className="grid gap-6">
            <div className="border border-ink/10 bg-ivory/90 p-7">
              <p className="text-xs uppercase tracking-[0.24em] text-gold-deep">Document access</p>
              <h3 className="mt-4 font-display text-3xl leading-tight text-ink">Uploaded file</h3>
              <p className="mt-4 break-all text-sm leading-6 text-charcoal/62">
                {selected.uploaded_file_path || selected.upload_file_path || "No file path recorded."}
              </p>
              {selected.uploaded_file_path || selected.upload_file_path ? (
                <Link href={`/api/admin/projects/${selected.id}/download`} className="mt-6 inline-flex min-h-11 items-center rounded-full bg-primary px-6 text-sm font-semibold text-white transition hover:bg-primary-active">
                  Download uploaded document
                </Link>
              ) : null}
            </div>

            <form action={updateProjectStatus} className="border border-ink/10 bg-ivory/90 p-7">
              <input type="hidden" name="id" value={selected.id} />
              <p className="text-xs uppercase tracking-[0.24em] text-gold-deep">Project status</p>
              <label className="mt-5 grid gap-2 text-sm text-charcoal/70">
                Status
                <select name="status" defaultValue={selected.status || "In Progress"} className="min-h-11 border border-hairline bg-paper px-3 text-ink">
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </label>
              <button className="mt-4 min-h-11 w-full rounded-full bg-gold px-5 text-sm font-semibold text-ink transition hover:bg-primary hover:text-white">
                Save status
              </button>
            </form>
          </aside>
        </section>
      ) : (
        <div className="mt-8 border border-ink/10 bg-ivory/90 p-10 text-center text-sm text-charcoal/50">
          No paid projects yet.
        </div>
      )}
    </DashboardShell>
  );
}
