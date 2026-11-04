import Link from "next/link";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";
export const revalidate = 0;
import { DashboardShell, StatusBadge } from "@/components/DashboardShell";
import { requireAdmin } from "@/lib/admin-auth";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";
import { adminNav } from "@/lib/admin-nav";
import { sendProjectDeliveryEmail } from "@/lib/email";
import {
  ADMIN_ATTACHMENT_MAX_BYTES,
  ALLOWED_ADMIN_ATTACHMENT_EXTENSIONS,
  EMAIL_DIRECT_ATTACHMENT_MAX_BYTES,
  fileToStoredAttachment,
  getExtension,
  sanitizeFilename,
  validateAdminAttachment,
} from "@/lib/attachment-utils";
import { PendingSubmitButton } from "@/components/PendingSubmitButton";
import { AdminProjectDeliveryForm } from "@/components/admin/AdminProjectDeliveryForm";
import {
  displayPaymentStatus,
  displayProjectStatus,
  isActiveProject,
  isCompletedProject,
  isOlderActiveProject,
  isPaidProject,
  isPaymentIssue,
  projectAmount,
  projectServices,
} from "@/lib/admin-data";

function formatProvider(provider?: string | null) {
  if (!provider) return "N/A";
  return provider.charAt(0).toUpperCase() + provider.slice(1);
}

const statusOptions = [
  { value: "Pending", label: "Pending" },
  { value: "In Progress", label: "In Progress" },
  { value: "Completed", label: "Completed" },
];

function dueDate(createdAt: string, days?: number | null) {
  if (!days) return "N/A";
  const date = new Date(createdAt);
  date.setDate(date.getDate() + days);
  return date.toLocaleDateString();
}

function sourceFilePath(project: { uploaded_file_path?: string | null; upload_file_path?: string | null }) {
  return project.uploaded_file_path || project.upload_file_path || "";
}

function fileName(path?: string | null) {
  return path?.split("/").pop() || "Uploaded document";
}

function canPreview(path?: string | null) {
  if (!path) return false;
  return [".txt", ".pdf", ".png", ".jpg", ".jpeg", ".webp"].some((extension) => path.toLowerCase().endsWith(extension));
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

async function sendCompletedFile(formData: FormData) {
  "use server";
  await requireAdmin();

  const id = String(formData.get("id") || "");
  const note = String(formData.get("note") || "").trim().slice(0, 2500);
  const file = formData.get("completedFile");
  const uploadedPath = String(formData.get("uploadedDeliveryPath") || "").trim();
  const uploadedName = sanitizeFilename(String(formData.get("uploadedDeliveryName") || "").trim());
  const uploadedType = String(formData.get("uploadedDeliveryType") || "application/octet-stream").trim();
  const uploadedSize = Number(formData.get("uploadedDeliverySize") || 0);

  const fileObj = file instanceof File && file.size > 0 ? file : null;

  if (!id || (!uploadedPath && !fileObj)) {
    redirect(`/admin/projects?project=${id}&delivery=missing`);
  }

  if (fileObj) {
    const attachmentError = validateAdminAttachment(fileObj);
    if (attachmentError) {
      redirect(`/admin/projects?project=${id}&delivery=attachment`);
    }
  }

  const supabaseAdmin = createSupabaseAdminClient();
  const { data: project, error } = await supabaseAdmin
    .from("projects")
    .select("id, friendly_id, client_id, delivery_file_path, profiles(full_name, email)")
    .eq("id", id)
    .single();

  const clientProfile = Array.isArray(project?.profiles) ? project?.profiles[0] : project?.profiles;
  if (error || !project || !clientProfile?.email) {
    console.error("Project delivery lookup failed:", error);
    redirect(`/admin/projects?project=${id}&delivery=failed`);
  }

  let finalMeta: {
    path: string;
    name: string;
    contentType: string;
    size: number;
  } | null = null;
  let emailAttachmentBuffer: Buffer | null = null;

  if (uploadedPath) {
    const ext = getExtension(uploadedName);
    if (
      !uploadedPath.includes(`/${project.id}/deliveries/`) ||
      !ALLOWED_ADMIN_ATTACHMENT_EXTENSIONS.has(ext) ||
      !Number.isFinite(uploadedSize) ||
      uploadedSize <= 0 ||
      uploadedSize > ADMIN_ATTACHMENT_MAX_BYTES
    ) {
      redirect(`/admin/projects?project=${id}&delivery=attachment`);
    }

    finalMeta = {
      path: uploadedPath,
      name: uploadedName,
      contentType: uploadedType || "application/octet-stream",
      size: uploadedSize,
    };

    if (uploadedSize <= EMAIL_DIRECT_ATTACHMENT_MAX_BYTES) {
      try {
        const { data: downloadedBlob, error: downloadErr } = await supabaseAdmin.storage
          .from("deliveries")
          .download(uploadedPath);
        if (!downloadErr && downloadedBlob) {
          emailAttachmentBuffer = Buffer.from(await downloadedBlob.arrayBuffer());
        }
      } catch (err) {
        console.warn("Could not read small delivery file for direct MIME inclusion, falling back to signed link:", err);
      }
    }
  } else if (fileObj) {
    const storedAttachment = await fileToStoredAttachment(fileObj, `${project.client_id}/${project.id}/deliveries`);
    const { error: uploadError } = await supabaseAdmin.storage
      .from("deliveries")
      .upload(storedAttachment.path, storedAttachment.content, {
        contentType: storedAttachment.contentType,
        upsert: false,
      });

    if (uploadError) {
      console.error("Project delivery upload failed:", uploadError);
      redirect(`/admin/projects?project=${id}&delivery=attachment`);
    }

    finalMeta = {
      path: storedAttachment.path,
      name: storedAttachment.name,
      contentType: storedAttachment.contentType,
      size: storedAttachment.size,
    };

    if (storedAttachment.size <= EMAIL_DIRECT_ATTACHMENT_MAX_BYTES) {
      emailAttachmentBuffer = storedAttachment.content;
    }
  }

  if (!finalMeta) {
    redirect(`/admin/projects?project=${id}&delivery=missing`);
  }

  const { data: signedData } = await supabaseAdmin.storage
    .from("deliveries")
    .createSignedUrl(finalMeta.path, 7 * 24 * 60 * 60, { download: true });
  const signedDownloadUrl = signedData?.signedUrl || null;

  const emailResult = await sendProjectDeliveryEmail(clientProfile.email, {
    clientName: clientProfile.full_name,
    friendlyId: project.friendly_id,
    note,
    attachment: emailAttachmentBuffer
      ? {
          filename: finalMeta.name,
          content: emailAttachmentBuffer,
          contentType: finalMeta.contentType,
        }
      : null,
    attachmentDownloadUrl: signedDownloadUrl,
    attachmentFilename: finalMeta.name,
  });

  if (!emailResult.success) {
    await supabaseAdmin.storage.from("deliveries").remove([finalMeta.path]);
    redirect(`/admin/projects?project=${id}&delivery=failed`);
  }

  await supabaseAdmin
    .from("projects")
    .update({
      delivery_file_path: finalMeta.path,
      delivery_file_name: finalMeta.name,
      delivery_content_type: finalMeta.contentType,
      delivery_file_size: finalMeta.size,
      delivery_sent_at: new Date().toISOString(),
    })
    .eq("id", id);

  revalidatePath("/admin/projects");
  revalidatePath("/admin");
  redirect(`/admin/projects?project=${id}&delivery=sent`);
}

export default async function AdminProjectsPage({
  searchParams,
}: {
  searchParams?: { project?: string; view?: string; delivery?: string };
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
    .order("created_at", { ascending: false });

  if (error) console.error("Admin projects fetch failed:", error);
  const projects = data || [];
  const activeProjects = projects.filter(isActiveProject);
  const archivedProjects = projects.filter(isOlderActiveProject);
  const completedProjects = projects.filter(isCompletedProject);
  const paidProjects = projects.filter(isPaidProject);
  const paymentIssues = projects.filter(isPaymentIssue);
  const currentView = searchParams?.view === "active"
    || searchParams?.view === "archived"
    || searchParams?.view === "completed"
    || searchParams?.view === "paid"
    || searchParams?.view === "payment-issues"
    || searchParams?.view === "all"
    ? searchParams.view
    : "all";
  const visibleProjects = currentView === "archived"
    ? archivedProjects
    : currentView === "completed"
      ? completedProjects
      : currentView === "paid"
        ? paidProjects
        : currentView === "payment-issues"
          ? paymentIssues
          : currentView === "active"
            ? activeProjects
            : projects;
  const selected = projects.find((project) => project.id === searchParams?.project) || visibleProjects[0] || projects[0] || null;

  return (
    <DashboardShell
      eyebrow="Admin operations"
      title="Projects."
      description="Manage paid document projects, payment details, uploaded files, and delivery status."
      nav={adminNav("/admin/projects")}
      primaryActionLabel="Projects"
      primaryActionHref="/admin/projects"
      secondaryActionLabel="Messages"
      secondaryActionHref="/admin/requests"
    >
      <section className="mt-8 overflow-hidden border border-ink/10 bg-ivory/90">
        <div className="grid gap-4 border-b border-ink/10 p-6 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-gold-deep">Project records</p>
            <h2 className="mt-2 font-display text-4xl text-ink">Document queue</h2>
            <p className="mt-2 text-sm leading-6 text-charcoal/58">All submitted documents, paid work, and payment follow-up records. Active work uses a 30-day window.</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {[
              ["all", `All (${projects.length})`],
              ["active", `Active (${activeProjects.length})`],
              ["paid", `Paid (${paidProjects.length})`],
              ["payment-issues", `Payment issues (${paymentIssues.length})`],
              ["completed", `Completed (${completedProjects.length})`],
              ["archived", `Archive (${archivedProjects.length})`],
            ].map(([view, label]) => (
              <Link
                key={view}
                href={`/admin/projects?view=${view}`}
                className={`inline-flex min-h-10 items-center rounded-full border px-4 text-sm transition ${
                  currentView === view ? "border-primary bg-primary text-white" : "border-ink/10 text-charcoal/68 hover:border-primary/35 hover:text-primary"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
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
              {visibleProjects.map((project) => {
                const isSelected = selected?.id === project.id;
                const projectHref = `/admin/projects?view=${currentView}&project=${project.id}`;
                const path = sourceFilePath(project);
                const isArchived = isOlderActiveProject(project);

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
                  <td className="p-5"><Link href={projectHref} className="hover:text-primary">{projectServices(project)}</Link></td>
                  <td className="p-5"><Link href={projectHref} className="hover:text-primary">{Number(project.word_count || 0).toLocaleString()}</Link></td>
                  <td className="p-5"><Link href={projectHref} className="hover:text-primary">{project.turnaround}</Link></td>
                  <td className="p-5"><Link href={projectHref} className="hover:text-primary">{displayPaymentStatus(project.payment_status)} · ${projectAmount(project).toFixed(2)}</Link></td>
                  <td className="p-5">
                    <Link href={projectHref} className="grid gap-2">
                      <StatusBadge>{isArchived ? "Older than 30 days" : displayProjectStatus(project.status)}</StatusBadge>
                    </Link>
                  </td>
                  <td className="p-5"><Link href={projectHref} className="hover:text-primary">{new Date(project.created_at).toLocaleDateString()}</Link></td>
                  <td className="p-5"><Link href={projectHref} className="hover:text-primary">{dueDate(project.created_at, project.turnaround_days)}</Link></td>
                  <td className="p-5">
                    {path ? (
                      <div className="grid gap-1">
                        <Link href={projectHref} className="max-w-44 truncate text-charcoal/70 hover:text-primary">
                          {project.title || fileName(path)}
                        </Link>
                        {project.target_journal ? (
                          <Link href={projectHref} className="max-w-44 truncate text-xs text-charcoal/45 hover:text-primary">
                            Journal: {project.target_journal}
                          </Link>
                        ) : null}
                        <Link href={`/api/admin/projects/${project.id}/download?action=download`} className="text-primary hover:underline">
                          Download
                        </Link>
                        {canPreview(path) ? (
                          <Link href={`/api/admin/projects/${project.id}/download?action=view`} className="text-primary hover:underline">
                            View
                          </Link>
                        ) : null}
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
          {visibleProjects.length === 0 ? (
            <div className="border-t border-ink/10 p-10 text-center text-sm text-charcoal/50">
              No projects in this view.
            </div>
          ) : null}
        </div>
      </section>

      {selected ? (
        <section className="mt-8 grid gap-8 lg:grid-cols-[1.12fr_0.88fr]">
          <div className="border border-ink/10 bg-ink p-7 text-ivory">
            <p className="text-xs uppercase tracking-[0.24em] text-gold">Selected project</p>
            <h2 className="mt-4 font-display text-5xl leading-none">{selected.friendly_id}</h2>
            {isOlderActiveProject(selected) ? (
              <p className="mt-4 inline-flex border border-gold/30 bg-gold/10 px-3 py-2 text-xs uppercase tracking-[0.18em] text-gold">
                Older than 30 days
              </p>
            ) : null}
            <div className="mt-8 grid gap-4 text-sm text-ivory/70">
              {[
                ["Client", `${selected.profiles?.full_name || "Client"} · ${selected.profiles?.email || "No email"}`],
                ["Client ID", selected.client_id || "N/A"],
                ["Service", projectServices(selected)],
                ["Document", selected.title || selected.document_type || "Document"],
                ["Document type", selected.document_type || "N/A"],
                ["Target journal", selected.target_journal || "Not provided"],
                ["Formatting", selected.formatting_style || "N/A"],
                ["Formatting instructions", selected.formatting_instructions || "N/A"],
                ["Translation", selected.translation_preference || "N/A"],
                ["Target language", selected.translation_target_language || "N/A"],
                ["English/style preference", selected.english_type || "N/A"],
                ["Final word count", Number(selected.final_word_count || selected.word_count || 0).toLocaleString()],
                ["Detected word count", Number(selected.detected_word_count || selected.word_count || 0).toLocaleString()],
                ...(selected.adjusted_word_count ? [["Adjusted word count", Number(selected.adjusted_word_count).toLocaleString()]] : []),
                ["Turnaround", selected.turnaround],
                ["Submitted", new Date(selected.created_at).toLocaleString()],
                ["Due date", dueDate(selected.created_at, selected.turnaround_days)],
                ["Amount", `$${projectAmount(selected).toFixed(2)}`],
                ["Payment provider", formatProvider(selected.payment_provider)],
                ["Payment", `${displayPaymentStatus(selected.payment_status)} via ${formatProvider(selected.payment_provider)}`],
                ["Payment reference", selected.transaction_reference || selected.payment_reference || "N/A"],
                ["Transaction ID", selected.transaction_id || "N/A"],
                ["Notes", selected.client_notes || "None"],
                ["Upload path", sourceFilePath(selected) || "N/A"],
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
              {sourceFilePath(selected) ? (
                <dl className="mt-5 grid gap-3 text-sm">
                  <div className="flex justify-between gap-5 border-t border-ink/10 pt-3">
                    <dt className="text-charcoal/52">File name</dt>
                    <dd className="break-all text-right text-ink">{fileName(sourceFilePath(selected))}</dd>
                  </div>
                  <div className="flex justify-between gap-5 border-t border-ink/10 pt-3">
                    <dt className="text-charcoal/52">Upload date</dt>
                    <dd className="text-right text-ink">{new Date(selected.created_at).toLocaleDateString()}</dd>
                  </div>
                  <div className="flex justify-between gap-5 border-t border-ink/10 pt-3">
                    <dt className="text-charcoal/52">File size</dt>
                    <dd className="text-right text-ink">Not recorded</dd>
                  </div>
                </dl>
              ) : null}
              <p className="mt-4 break-all text-sm leading-6 text-charcoal/62">
                {sourceFilePath(selected) || "No file path recorded."}
              </p>
              {sourceFilePath(selected) ? (
                <div className="mt-6 flex flex-wrap gap-3">
                  {canPreview(sourceFilePath(selected)) ? (
                    <Link href={`/api/admin/projects/${selected.id}/download?action=view`} className="inline-flex min-h-11 items-center rounded-full border border-primary/25 px-6 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white">
                      View file
                    </Link>
                  ) : null}
                  <Link href={`/api/admin/projects/${selected.id}/download?action=download`} className="inline-flex min-h-11 items-center rounded-full bg-primary px-6 text-sm font-semibold text-white transition hover:bg-primary-active">
                    Download file
                  </Link>
                </div>
              ) : null}
            </div>

            <form action={updateProjectStatus} className="border border-ink/10 bg-ivory/90 p-7">
              <input type="hidden" name="id" value={selected.id} />
              <p className="text-xs uppercase tracking-[0.24em] text-gold-deep">Project status</p>
              <div className="mt-5 grid gap-1.5">
                <label htmlFor="project-status" className="text-xs font-semibold uppercase tracking-wider text-charcoal/70">
                  Status
                </label>
                <select
                  id="project-status"
                  name="status"
                  defaultValue={displayProjectStatus(selected.status)}
                  className="h-11 rounded-lg border border-hairline bg-paper px-3 text-sm text-ink transition-colors duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
              <PendingSubmitButton
                idleLabel="Save status"
                pendingLabel="Saving..."
                className="mt-4 h-11 w-full rounded-lg bg-gold px-5 text-sm font-semibold text-ink transition hover:bg-primary hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
              />
            </form>

            <AdminProjectDeliveryForm
              projectId={selected.id}
              clientId={selected.client_id}
              deliveryStatus={searchParams?.delivery}
              deliveryFilePath={selected.delivery_file_path}
              deliveryFileName={selected.delivery_file_name || (selected.delivery_file_path ? fileName(selected.delivery_file_path) : null)}
              deliverySentAt={selected.delivery_sent_at}
              sendCompletedFileAction={sendCompletedFile}
            />
          </aside>
        </section>
      ) : (
        <div className="mt-8 border border-ink/10 bg-ivory/90 p-10 text-center text-sm text-charcoal/50">
          No projects yet.
        </div>
      )}
    </DashboardShell>
  );
}
