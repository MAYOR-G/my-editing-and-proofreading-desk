import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { DashboardShell, EmptyState, MetricPanel, StatusBadge } from "@/components/DashboardShell";
import { requireAdmin } from "@/lib/admin-auth";
import { adminNav } from "@/lib/admin-nav";
import { sendAudienceMessageEmail } from "@/lib/email";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";

type Audience = "subscribers" | "users" | "all";

function cleanText(value: FormDataEntryValue | null, maxLength: number) {
  return String(value || "").trim().slice(0, maxLength);
}

function isValidEmail(email: string | null | undefined) {
  return Boolean(email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
}

async function sendAudienceMessage(formData: FormData) {
  "use server";

  await requireAdmin();

  const audience = cleanText(formData.get("audience"), 40) as Audience;
  const subject = cleanText(formData.get("subject"), 160);
  const message = cleanText(formData.get("message"), 5000);

  if (!subject || !message || !["subscribers", "users", "all"].includes(audience)) {
    return;
  }

  const supabaseAdmin = createSupabaseAdminClient();
  const [{ data: subscriberData }, { data: userData }] = await Promise.all([
    audience === "users"
      ? Promise.resolve({ data: [] })
      : supabaseAdmin
          .from("newsletter_subscribers")
          .select("id, email")
          .eq("status", "subscribed"),
    audience === "subscribers"
      ? Promise.resolve({ data: [] })
      : supabaseAdmin
          .from("profiles")
          .select("email")
          .not("email", "is", null),
  ]);

  const subscriberRows = subscriberData || [];
  const userRows = userData || [];
  const recipients = Array.from(
    new Set([
      ...subscriberRows.map((subscriber) => subscriber.email),
      ...userRows.map((user) => user.email),
    ].filter(isValidEmail))
  );

  for (const recipient of recipients) {
    await sendAudienceMessageEmail(recipient, subject, message);
  }

  if (subscriberRows.length > 0) {
    await supabaseAdmin
      .from("newsletter_subscribers")
      .update({ last_admin_email_at: new Date().toISOString(), updated_at: new Date().toISOString() })
      .in("id", subscriberRows.map((subscriber) => subscriber.id));
  }

  revalidatePath("/admin/subscribers");
  redirect(`/admin/subscribers?sent=${recipients.length}`);
}

export default async function AdminSubscribersPage({
  searchParams,
}: {
  searchParams?: {
    sent?: string;
  };
}) {
  await requireAdmin();

  const supabaseAdmin = createSupabaseAdminClient();
  const [{ data: subscribersData, error: subscribersError }, { data: usersData, error: usersError }] = await Promise.all([
    supabaseAdmin
      .from("newsletter_subscribers")
      .select("id, email, status, source, subscribed_at, last_admin_email_at, created_at")
      .order("created_at", { ascending: false }),
    supabaseAdmin
      .from("profiles")
      .select("id, full_name, email, created_at")
      .order("created_at", { ascending: false }),
  ]);

  if (subscribersError) {
    console.error("Error fetching newsletter subscribers:", subscribersError);
  }

  if (usersError) {
    console.error("Error fetching profile emails:", usersError);
  }

  const subscribers = subscribersData || [];
  const users = usersData || [];
  const activeSubscribers = subscribers.filter((subscriber) => subscriber.status === "subscribed");
  const uniqueAudienceCount = new Set([
    ...activeSubscribers.map((subscriber) => subscriber.email),
    ...users.map((user) => user.email).filter(Boolean),
  ]).size;

  return (
    <DashboardShell
      eyebrow="Admin operations"
      title="Subscriber desk."
      description="View subscribed emails separately from registered users, then send a clean branded message to subscribers, users, or both."
      nav={adminNav("/admin/subscribers")}
      primaryActionLabel="Messages"
      primaryActionHref="/admin/requests"
      secondaryActionLabel="Users"
      secondaryActionHref="/admin/users"
    >
      <section className="mt-10 grid gap-5 md:grid-cols-3">
        <MetricPanel label="Subscribers" value={activeSubscribers.length.toString()} detail="Emails captured from the footer subscribe form." />
        <MetricPanel label="Registered users" value={users.length.toString()} detail="People with client accounts in the platform." />
        <MetricPanel label="Total audience" value={uniqueAudienceCount.toString()} detail="Unique reachable emails across both lists." />
      </section>

      {searchParams?.sent ? (
        <div className="mt-8 rounded-2xl border border-cta/25 bg-cta-soft p-5 text-sm leading-6 text-ink">
          Branded message sent to {Number(searchParams.sent || 0).toLocaleString()} recipient{searchParams.sent === "1" ? "" : "s"}.
        </div>
      ) : null}

      <section className="mt-8 grid gap-8 xl:grid-cols-[0.78fr_1.22fr]">
        <form action={sendAudienceMessage} className="border border-ink/10 bg-ivory/90 p-6 shadow-[0_18px_70px_rgba(17,17,15,0.045)] sm:p-7">
          <p className="text-xs uppercase tracking-[0.24em] text-gold-deep">Send message</p>
          <h2 className="mt-3 font-display text-4xl leading-tight text-ink">Email an audience.</h2>
          <p className="mt-3 text-sm leading-6 text-charcoal/58">
            Messages are sent from the support email using the same branded email format as client notifications.
          </p>

          <div className="mt-7 grid gap-5">
            <label className="grid gap-2 text-sm font-medium text-ink">
              Audience
              <select name="audience" className="min-h-12 rounded-xl border border-hairline bg-surface-soft px-4 text-base text-ink">
                <option value="subscribers">Subscribers only</option>
                <option value="users">Registered users only</option>
                <option value="all">Subscribers and users</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm font-medium text-ink">
              Subject
              <input name="subject" required maxLength={160} className="min-h-12 rounded-xl border border-hairline bg-surface-soft px-4 text-base text-ink" placeholder="Message subject" />
            </label>
            <label className="grid gap-2 text-sm font-medium text-ink">
              Message
              <textarea name="message" required maxLength={5000} rows={8} className="min-h-44 resize-y rounded-xl border border-hairline bg-surface-soft p-4 text-base leading-7 text-ink" placeholder="Write the message to send..." />
            </label>
            <button type="submit" className="inline-flex min-h-12 w-fit items-center justify-center rounded-full bg-primary px-7 text-sm font-semibold text-white transition hover:bg-primary-active">
              Send branded email
            </button>
          </div>
        </form>

        <div className="grid gap-8">
          <section className="overflow-hidden border border-ink/10 bg-ivory/90">
            <div className="border-b border-ink/10 p-6">
              <p className="text-xs uppercase tracking-[0.24em] text-gold-deep">Subscribers</p>
              <h2 className="mt-2 font-display text-4xl text-ink">Footer signups</h2>
            </div>
            {subscribers.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px] text-left">
                  <thead className="bg-paper/50 text-xs uppercase tracking-[0.15em] text-charcoal/50">
                    <tr>
                      <th className="p-5 font-medium">Email</th>
                      <th className="p-5 font-medium">Status</th>
                      <th className="p-5 font-medium">Source</th>
                      <th className="p-5 font-medium">Subscribed</th>
                      <th className="p-5 font-medium">Last email</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink/10 bg-ivory">
                    {subscribers.map((subscriber) => (
                      <tr key={subscriber.id} className="text-sm text-charcoal/70">
                        <td className="p-5 font-medium text-ink">{subscriber.email}</td>
                        <td className="p-5"><StatusBadge>{subscriber.status}</StatusBadge></td>
                        <td className="p-5">{subscriber.source}</td>
                        <td className="p-5">{new Date(subscriber.subscribed_at).toLocaleDateString()}</td>
                        <td className="p-5">{subscriber.last_admin_email_at ? new Date(subscriber.last_admin_email_at).toLocaleDateString() : "Not yet"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-6">
                <EmptyState title="No subscribers yet" description="Footer signups will appear here after visitors subscribe." />
              </div>
            )}
          </section>

          <section className="overflow-hidden border border-ink/10 bg-ivory/90">
            <div className="border-b border-ink/10 p-6">
              <p className="text-xs uppercase tracking-[0.24em] text-gold-deep">Registered users</p>
              <h2 className="mt-2 font-display text-4xl text-ink">Account emails</h2>
            </div>
            {users.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[620px] text-left">
                  <thead className="bg-paper/50 text-xs uppercase tracking-[0.15em] text-charcoal/50">
                    <tr>
                      <th className="p-5 font-medium">Name</th>
                      <th className="p-5 font-medium">Email</th>
                      <th className="p-5 font-medium">Registered</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink/10 bg-ivory">
                    {users.map((user) => (
                      <tr key={user.id} className="text-sm text-charcoal/70">
                        <td className="p-5 text-ink">{user.full_name || "N/A"}</td>
                        <td className="p-5">{user.email || "No email"}</td>
                        <td className="p-5">{new Date(user.created_at).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-6">
                <EmptyState title="No registered users yet" description="Client account emails will appear here after users sign up." />
              </div>
            )}
          </section>
        </div>
      </section>
    </DashboardShell>
  );
}
