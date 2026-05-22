import { DashboardShell } from "@/components/DashboardShell";
import { WorkExamplesManager } from "@/components/admin/WorkExamplesManager";
import { adminNav } from "@/lib/admin-nav";
import { requireAdmin } from "@/lib/admin-auth";

export default async function AdminExamplesPage() {
  await requireAdmin();

  return (
    <DashboardShell
      eyebrow="Admin operations"
      title="Work Examples."
      description="Upload, replace, preview, and remove the document samples that power the homepage examples."
      nav={adminNav("/admin/examples")}
      primaryActionLabel="Work Examples"
      primaryActionHref="/admin/examples"
      secondaryActionLabel="Projects"
      secondaryActionHref="/admin/projects"
    >
      <WorkExamplesManager />
    </DashboardShell>
  );
}
