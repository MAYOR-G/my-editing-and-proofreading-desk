import { DashboardShell } from "@/components/DashboardShell";
import { requireAdmin } from "@/lib/admin-auth";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";

const nav = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/requests", label: "Messages" }
];

export default async function AdminUsersPage() {
  await requireAdmin();

  const supabaseAdmin = createSupabaseAdminClient();

  const { data: usersData, error: usersError } = await supabaseAdmin
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });

  if (usersError) {
    console.error("Error fetching admin users:", usersError);
  }

  const users = usersData || [];

  return (
    <DashboardShell
      eyebrow="Admin operations"
      title="Client Registry."
      description="View and manage all registered users on the platform."
      nav={nav}
      primaryActionLabel="Update order"
      secondaryActionLabel="Messages"
    >
      <section className="mt-8 border border-ink/10 bg-ivory/90 p-7">
        <div className="flex flex-wrap items-center justify-between mb-6">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-gold-deep">Client Registry</p>
            <h2 className="mt-4 font-display text-4xl text-ink">All registered users</h2>
          </div>
          <div className="mt-4 sm:mt-0 border border-ink/10 bg-paper p-4 text-center min-w-[120px]">
            <p className="text-3xl font-display text-ink">{users.length}</p>
            <p className="text-xs uppercase tracking-[0.1em] text-charcoal/60 mt-1">Total Users</p>
          </div>
        </div>
        
        <div className="overflow-x-auto border border-ink/10">
          <table className="w-full text-left">
            <thead className="bg-paper/50 text-xs uppercase tracking-[0.15em] text-charcoal/50">
              <tr>
                <th className="p-5 font-medium">Name</th>
                <th className="p-5 font-medium">Email</th>
                <th className="p-5 font-medium">Registered</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/10 bg-ivory">
              {users.map((clientUser) => (
                <tr key={clientUser.id} className="text-sm text-charcoal/70 hover:bg-paper/80 transition-colors">
                  <td className="p-5 text-ink">{clientUser.full_name || "N/A"}</td>
                  <td className="p-5">{clientUser.email}</td>
                  <td className="p-5">{new Date(clientUser.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </DashboardShell>
  );
}
