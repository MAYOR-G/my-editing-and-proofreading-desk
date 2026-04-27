import { DashboardShell, MetricPanel, StatusBadge } from "@/components/DashboardShell";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin-auth";
const nav = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/requests", label: "Messages" }
];

function formatProvider(provider?: string | null) {
  if (!provider) return "N/A";
  return provider.charAt(0).toUpperCase() + provider.slice(1);
}

export default async function AdminDashboardPage() {
  await requireAdmin();

  // Using service_role key to bypass RLS for admin operations across all clients
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  const supabaseAdmin = createSupabaseClient(supabaseUrl, supabaseServiceKey); 

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

  if (projectsError) {
    console.error("Error fetching admin projects:", projectsError);
  }

  const activeProjects = rawProjects || [];
  const selected = activeProjects.length > 0 ? activeProjects[0] : null;

  const totalRevenue = activeProjects
    .filter(p => p.payment_status === "paid")
    .reduce((sum, p) => sum + p.price, 0);

  return (
    <DashboardShell
      eyebrow="Admin operations"
      title="Submission control room."
      description="A premium operations view for submissions, status changes, file delivery, payment records, client notes, and content settings."
      nav={nav}
      primaryActionLabel="Update order"
      secondaryActionLabel="Messages"
    >
      <section className="mt-10 grid gap-5 md:grid-cols-4">
        <MetricPanel label="Paid orders" value={activeProjects.filter(p => p.payment_status === "paid").length.toString()} detail="Captured and ready for editorial handling." />
        <MetricPanel label="In progress" value={activeProjects.filter(p => p.status === "In Progress").length.toString()} detail="Orders currently being polished or checked." />
        <MetricPanel label="Ready" value={activeProjects.filter(p => p.status === "Ready").length.toString()} detail="Completed files awaiting client download." />
        <MetricPanel label="Revenue" value={`$${totalRevenue.toLocaleString()}`} detail="Current verified payments." />
      </section>

      <section id="submissions" className="mt-8 grid gap-8 xl:grid-cols-[1.28fr_0.72fr]">
        <div className="border border-ink/10 bg-ivory/90">
          <div className="grid gap-4 border-b border-ink/10 p-6 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-gold-deep">Submissions</p>
              <h2 className="mt-2 font-display text-4xl text-ink">All orders</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {["Status", "Service", "Date"].map((filter) => (
                <button key={filter} className="min-h-10 border border-ink/10 px-4 text-sm transition duration-200 ease-premium-out hover:border-gold hover:text-gold-deep active:scale-[0.98]">
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[780px] border-collapse text-left">
              <thead>
                <tr className="border-b border-ink/10 text-xs uppercase tracking-[0.2em] text-charcoal/48">
                  <th className="p-5 font-medium">Order</th>
                  <th className="p-5 font-medium">Client</th>
                  <th className="p-5 font-medium">Service</th>
                  <th className="p-5 font-medium">Status</th>
                  <th className="p-5 font-medium">Payment</th>
                  <th className="p-5 font-medium">Provider</th>
                  <th className="p-5 font-medium">Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/10">
                {activeProjects.map((order) => (
                  <tr key={order.id} className="text-sm text-charcoal/70 transition duration-200 ease-premium-out hover:bg-paper/80">
                    <td className="p-5 text-ink">{order.friendly_id}</td>
                    <td className="p-5">{order.profiles?.email}</td>
                    <td className="p-5">{order.service_type}</td>
                    <td className="p-5"><StatusBadge>{order.status}</StatusBadge></td>
                    <td className="p-5">{order.payment_status}</td>
                    <td className="p-5">{formatProvider(order.payment_provider)}</td>
                    <td className="p-5 text-ink">${order.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <aside id="detail" className="grid gap-5">
          {selected ? (
            <>
              <div className="border border-ink/10 bg-ink p-7 text-ivory">
                <p className="text-xs uppercase tracking-[0.24em] text-gold">Selected order</p>
                <h2 className="mt-5 font-display text-5xl leading-none">{selected.friendly_id}</h2>
                <div className="mt-8 grid gap-4 text-sm text-ivory/70">
                  {[
                    ["Client", selected.profiles?.email],
                    ["Words", selected.word_count.toString()],
                    ["Payment", selected.payment_status],
                    ["Provider", formatProvider(selected.payment_provider)],
                    ["Reference", selected.transaction_reference || "N/A"],
                    ["Service", selected.service_type]
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between gap-6 border-t border-ivory/12 pt-4">
                      <span>{label}</span>
                      <span className="text-right text-ivory">{value}</span>
                    </div>
                  ))}
                </div>
                <form action={async (formData) => {
                  "use server";
                  await requireAdmin();
                  const status = formData.get("status") as string;
                  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
                  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
                  const supabaseAdmin = createSupabaseClient(supabaseUrl, supabaseServiceKey);
                  await supabaseAdmin.from("projects").update({ status }).eq("id", selected.id);
                  revalidatePath("/admin");
                }}>
                  <label className="mt-8 grid gap-2 text-sm text-ivory/70">
                    Status control
                    <select name="status" defaultValue={selected.status} className="min-h-11 border border-ivory/15 bg-ivory/5 px-3 text-ivory [&>option]:text-ink">
                      <option value="In Progress">In Progress</option>
                      <option value="Ready">Ready</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </label>
                  <button type="submit" className="mt-4 min-h-11 w-full bg-gold px-5 text-sm text-ink transition duration-200 ease-premium-out hover:bg-ivory active:scale-[0.98]">
                    Save status update
                  </button>
                </form>
              </div>

              <div className="border border-ink/10 bg-ivory/90 p-7">
                <p className="text-xs uppercase tracking-[0.24em] text-gold-deep">Final file upload</p>
                <h3 className="mt-4 font-display text-3xl leading-tight text-ink">Deliver completed work securely.</h3>
                <div className="mt-6 border border-dashed border-ink/20 bg-paper p-6 text-sm leading-7 text-charcoal/62">
                  Upload the completed document to private storage. 
                </div>
                <button className="mt-4 min-h-11 w-full border border-ink/10 px-5 text-sm transition duration-200 ease-premium-out hover:border-gold hover:text-gold-deep active:scale-[0.98]">
                  Upload final file
                </button>
              </div>
            </>
          ) : (
             <div className="border border-ink/10 bg-ink p-7 text-ivory text-center">
                No orders yet.
             </div>
          )}
        </aside>
      </section>

      {selected && (
        <section id="payments" className="mt-8 grid gap-5 lg:grid-cols-4">
          {[
            ["Provider", formatProvider(selected.payment_provider), "Payment gateway used"],
            ["Transaction Ref.", selected.transaction_reference || "N/A", "Unique transaction reference"],
            ["Transaction ID", selected.transaction_id || "N/A", "Provider transaction identifier"],
            ["Amount Paid", selected.payment_status === "paid" ? `$${selected.price.toFixed(2)}` : "$0.00", `Currency: ${selected.payment_currency || "USD"}`],
            ["Payment Status", selected.payment_status, selected.payment_verified_at ? `Verified ${new Date(selected.payment_verified_at).toLocaleDateString()}` : "Awaiting verification"]
          ].map(([label, value, detail]) => (
            <div key={label} className="border border-ink/10 bg-paper p-6">
              <p className="text-xs uppercase tracking-[0.24em] text-gold-deep">{label}</p>
              <p className="mt-5 text-xl text-ink">{value}</p>
              <p className="mt-4 text-sm leading-6 text-charcoal/62">{detail}</p>
            </div>
          ))}
        </section>
      )}
    </DashboardShell>
  );
}
