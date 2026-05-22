import Link from "next/link";
import { DashboardShell, EmptyState, MetricPanel, StatusBadge } from "@/components/DashboardShell";
import { PaymentSettingsForm } from "@/components/admin/PaymentSettingsForm";
import { requireAdmin } from "@/lib/admin-auth";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";
import { getPaymentSettings } from "@/lib/payment-settings";
import { getPaymentProviderReadiness } from "@/lib/payment";
import { adminNav } from "@/lib/admin-nav";
import {
  displayPaymentStatus,
  displayProjectStatus,
  isActiveProject,
  isCompletedProject,
  isPaidProject,
  isPaymentIssue,
  projectAmount,
  projectServices,
  sortByNewest,
} from "@/lib/admin-data";

function formatProvider(provider?: string | null) {
  if (!provider) return "N/A";
  return provider.charAt(0).toUpperCase() + provider.slice(1);
}

export default async function AdminDashboardPage() {
  await requireAdmin();

  // Using service_role key to bypass RLS for admin operations across all clients
  const supabaseAdmin = createSupabaseAdminClient();
  const paymentSettings = await getPaymentSettings();
  const paymentReadiness = getPaymentProviderReadiness();

  // Use the admin client to bypass RLS and get ALL projects and ALL users
  const { data: rawProjects, error: projectsError } = await supabaseAdmin
    .from("projects")
    .select(`
      *,
      profiles (
        full_name,
        email
      )
    `)
    .order("created_at", { ascending: false });

  const { data: recentMessages, error: messagesError } = await supabaseAdmin
    .from("contact_messages")
    .select("id, name, email, subject, status, source, created_at")
    .order("created_at", { ascending: false })
    .limit(5);

  if (projectsError) {
    console.error("Error fetching admin projects:", projectsError);
  }

  if (messagesError) {
    console.error("Error fetching recent admin messages:", messagesError);
  }

  const projects = rawProjects || [];
  const paidProjects = projects.filter(isPaidProject);
  const activeProjects = projects.filter(isActiveProject);
  const completedProjects = projects.filter(isCompletedProject);
  const paymentIssues = sortByNewest(projects.filter(isPaymentIssue));
  const recentOrders = sortByNewest(projects).slice(0, 5);
  const messages = recentMessages || [];

  const totalRevenue = paidProjects
    .reduce((sum, p) => sum + projectAmount(p), 0);

  return (
    <DashboardShell
      eyebrow="Admin operations"
      title="Submission control room."
      description="A premium operations view for submissions, status changes, file delivery, payment records, client notes, and content settings."
      nav={adminNav("/admin")}
      primaryActionLabel="Update order"
      primaryActionHref="/admin/projects"
      secondaryActionLabel="Messages"
      secondaryActionHref="/admin/requests"
    >
      <section className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
        <MetricPanel label="Paid orders" value={paidProjects.length.toString()} detail="Captured and ready for editorial handling." />
        <MetricPanel label="In progress" value={activeProjects.length.toString()} detail="Active submissions inside the 30-day work window." />
        <MetricPanel label="Ready" value={completedProjects.length.toString()} detail="Completed files awaiting client download." />
        <MetricPanel label="Revenue" value={`$${totalRevenue.toLocaleString()}`} detail="Current verified payments." />
        <MetricPanel label="Payment issues" value={paymentIssues.length.toString()} detail="Pending, failed, or incomplete checkouts." />
      </section>

      <PaymentSettingsForm initialSettings={paymentSettings} readiness={paymentReadiness} />

      <section id="submissions" className="mt-8 grid gap-8 xl:grid-cols-[1.18fr_0.82fr]">
        <div className="overflow-hidden border border-ink/10 bg-ivory/90">
          <div className="grid gap-4 border-b border-ink/10 p-6 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-gold-deep">Submissions</p>
              <h2 className="mt-2 font-display text-4xl text-ink">Recent orders</h2>
              <p className="mt-2 text-sm leading-6 text-charcoal/58">Latest five records. Full order details live in Projects.</p>
            </div>
            <Link href="/admin/projects" className="inline-flex min-h-11 items-center justify-center rounded-full border border-primary/20 px-5 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white">
              View all projects
            </Link>
          </div>

          {recentOrders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[980px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-ink/10 text-xs uppercase tracking-[0.18em] text-charcoal/48">
                    <th className="p-5 font-medium">Order</th>
                    <th className="p-5 font-medium">Client</th>
                    <th className="p-5 font-medium">Service</th>
                    <th className="p-5 font-medium">Document</th>
                    <th className="p-5 font-medium">Status</th>
                    <th className="p-5 font-medium">Payment</th>
                    <th className="p-5 font-medium">Submitted</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink/10">
                  {recentOrders.map((order) => {
                    const href = `/admin/projects?project=${order.id}`;
                    return (
                      <tr key={order.id} className="text-sm text-charcoal/70 transition duration-200 ease-premium-out hover:bg-paper/80">
                        <td className="p-5 text-ink">
                          <Link href={href} className="font-semibold text-primary hover:underline">{order.friendly_id}</Link>
                        </td>
                        <td className="p-5">
                          <Link href={href} className="block text-ink hover:text-primary">{order.profiles?.full_name || "Client"}</Link>
                          <Link href={href} className="block text-xs text-charcoal/50 hover:text-primary">{order.profiles?.email || "No email"}</Link>
                        </td>
                        <td className="p-5"><Link href={href} className="hover:text-primary">{projectServices(order)}</Link></td>
                        <td className="p-5"><Link href={href} className="hover:text-primary">{order.document_type || "Document"}</Link></td>
                        <td className="p-5"><Link href={href}><StatusBadge>{displayProjectStatus(order.status)}</StatusBadge></Link></td>
                        <td className="p-5">
                          <Link href={href} className="hover:text-primary">
                            {displayPaymentStatus(order.payment_status)} · {formatProvider(order.payment_provider)}
                          </Link>
                        </td>
                        <td className="p-5"><Link href={href} className="hover:text-primary">{new Date(order.created_at).toLocaleDateString()}</Link></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-6">
              <EmptyState title="No orders yet" description="Paid and pending submissions will appear here as soon as clients complete checkout." actionLabel="Open projects" actionHref="/admin/projects" />
            </div>
          )}
        </div>

        <aside className="border border-ink/10 bg-ivory/90">
          <div className="border-b border-ink/10 p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-gold-deep">Support</p>
            <h2 className="mt-2 font-display text-4xl text-ink">Recent messages</h2>
            <p className="mt-2 text-sm leading-6 text-charcoal/58">Newest client notes and requests.</p>
          </div>
          <div className="divide-y divide-ink/10">
            {messages.length > 0 ? messages.map((message) => (
              <Link key={message.id} href={`/admin/requests?message=${message.id}`} className="block p-5 transition hover:bg-paper/70">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-ink">{message.subject}</p>
                    <p className="mt-1 truncate text-xs text-charcoal/52">{message.name} · {message.email}</p>
                  </div>
                  <StatusBadge>{message.status || "New"}</StatusBadge>
                </div>
                <p className="mt-3 text-xs uppercase tracking-[0.16em] text-charcoal/42">
                  {message.source || "Contact Form"} · {new Date(message.created_at).toLocaleDateString()}
                </p>
              </Link>
            )) : (
              <div className="p-6 text-sm text-charcoal/52">No recent messages.</div>
            )}
          </div>
          <div className="border-t border-ink/10 p-6">
            <Link href="/admin/requests" className="inline-flex min-h-11 items-center justify-center rounded-full border border-primary/20 px-5 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white">
              View all messages
            </Link>
          </div>
        </aside>
      </section>

      {paymentIssues.length > 0 ? (
        <section className="mt-8 overflow-hidden border border-ink/10 bg-ivory/90">
          <div className="grid gap-4 border-b border-ink/10 p-6 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-gold-deep">Follow up</p>
              <h2 className="mt-2 font-display text-4xl text-ink">Payment issues</h2>
              <p className="mt-2 text-sm leading-6 text-charcoal/58">Latest pending, failed, or incomplete checkout attempts.</p>
            </div>
            <Link href="/admin/projects?view=payment-issues" className="inline-flex min-h-11 items-center justify-center rounded-full border border-primary/20 px-5 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white">
              View all payment issues
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[920px] border-collapse text-left">
              <thead>
                <tr className="border-b border-ink/10 text-xs uppercase tracking-[0.18em] text-charcoal/48">
                  <th className="p-5 font-medium">Order</th>
                  <th className="p-5 font-medium">Client</th>
                  <th className="p-5 font-medium">Service</th>
                  <th className="p-5 font-medium">Amount</th>
                  <th className="p-5 font-medium">Provider</th>
                  <th className="p-5 font-medium">Status</th>
                  <th className="p-5 font-medium">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/10">
                {paymentIssues.slice(0, 5).map((project) => {
                  const href = `/admin/projects?view=payment-issues&project=${project.id}`;
                  return (
                    <tr key={project.id} className="text-sm text-charcoal/70 transition hover:bg-paper/80">
                      <td className="p-5"><Link href={href} className="font-semibold text-primary hover:underline">{project.friendly_id}</Link></td>
                      <td className="p-5">
                        <Link href={href} className="block text-ink hover:text-primary">{project.profiles?.full_name || "Client"}</Link>
                        <Link href={href} className="block text-xs text-charcoal/50 hover:text-primary">{project.profiles?.email || "No email"}</Link>
                      </td>
                      <td className="p-5"><Link href={href} className="hover:text-primary">{projectServices(project)}</Link></td>
                      <td className="p-5"><Link href={href} className="hover:text-primary">${projectAmount(project).toFixed(2)}</Link></td>
                      <td className="p-5"><Link href={href} className="hover:text-primary">{formatProvider(project.payment_provider)}</Link></td>
                      <td className="p-5"><Link href={href}><StatusBadge>{displayPaymentStatus(project.payment_status)}</StatusBadge></Link></td>
                      <td className="p-5"><Link href={href} className="hover:text-primary">{new Date(project.created_at).toLocaleString()}</Link></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}
    </DashboardShell>
  );
}
