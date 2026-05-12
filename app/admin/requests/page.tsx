import Link from "next/link";
import { revalidatePath } from "next/cache";
import { DashboardShell, StatusBadge } from "@/components/DashboardShell";
import { requireAdmin } from "@/lib/admin-auth";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";
import { sendMessageReplyEmail, SUPPORT_EMAIL } from "@/lib/email";

const nav = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/requests", label: "Messages" },
  { href: "/admin/projects", label: "Projects" }
];

function preview(message: string) {
  return message.length > 130 ? `${message.slice(0, 130)}...` : message;
}

async function replyToMessage(formData: FormData) {
  "use server";
  await requireAdmin();

  const id = String(formData.get("id") || "");
  const reply = String(formData.get("reply") || "").trim();

  if (!id || !reply) return;

  const supabaseAdmin = createSupabaseAdminClient();
  const { data: message, error } = await supabaseAdmin
    .from("contact_messages")
    .select("id, name, email, subject")
    .eq("id", id)
    .single();

  if (error || !message) {
    console.error("Admin reply lookup failed:", error);
    return;
  }

  const emailResult = await sendMessageReplyEmail(
    message.email,
    message.name,
    `Re: ${message.subject || "Your message to My Editing and Proofreading Desk"}`,
    reply
  );

  if (!emailResult.success) return;

  await supabaseAdmin.from("contact_message_replies").insert({
    message_id: id,
    reply,
    sent_to: message.email,
  });

  await supabaseAdmin
    .from("contact_messages")
    .update({
      status: "Replied",
      admin_reply: reply,
      replied_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  revalidatePath("/admin/requests");
}

async function updateMessageStatus(formData: FormData) {
  "use server";
  await requireAdmin();
  const id = String(formData.get("id") || "");
  const status = String(formData.get("status") || "Open");
  if (!id) return;

  const supabaseAdmin = createSupabaseAdminClient();
  await supabaseAdmin
    .from("contact_messages")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id);
  revalidatePath("/admin/requests");
}

export default async function AdminRequestsPage({
  searchParams,
}: {
  searchParams?: { message?: string };
}) {
  await requireAdmin();

  const supabaseAdmin = createSupabaseAdminClient();
  const { data, error } = await supabaseAdmin
    .from("contact_messages")
    .select(`
      id,
      name,
      email,
      subject,
      message,
      source,
      status,
      user_id,
      project_id,
      admin_reply,
      replied_at,
      created_at,
      updated_at
    `)
    .order("created_at", { ascending: false })
    .limit(75);

  if (error) console.error("Error fetching admin messages:", error);
  const messages = data || [];
  const selected = messages.find((message) => message.id === searchParams?.message) || messages[0] || null;

  return (
    <DashboardShell
      eyebrow="Admin operations"
      title="Messages & requests."
      description="Review contact form inquiries, dashboard support requests, and reply from the support identity."
      nav={nav}
      primaryActionLabel="Projects"
      secondaryActionLabel="Messages"
    >
      <section className="mt-8 grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="overflow-hidden border border-ink/10 bg-ivory/90">
          <div className="border-b border-ink/10 p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-gold-deep">Incoming messages</p>
            <h2 className="mt-2 font-display text-4xl text-ink">Support inbox</h2>
          </div>
          <div className="divide-y divide-ink/10">
            {messages.length > 0 ? messages.map((message) => {
              const isSelected = selected?.id === message.id;

              return (
              <Link
                key={message.id}
                href={`/admin/requests?message=${message.id}`}
                aria-current={isSelected ? "true" : undefined}
                className={`grid gap-3 p-5 transition hover:bg-paper/70 ${
                  isSelected ? "bg-paper shadow-[inset_4px_0_0_rgba(23,74,124,0.9)]" : ""
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-ink">{message.name}</p>
                    <p className="mt-1 break-all text-xs text-charcoal/52">{message.email}</p>
                  </div>
                  <StatusBadge>{message.status || "New"}</StatusBadge>
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink">{message.subject}</p>
                  <p className="mt-2 text-sm leading-6 text-charcoal/66">{preview(message.message || "")}</p>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs uppercase tracking-[0.16em] text-charcoal/42">
                  <span>{message.source || "Contact Form"}</span>
                  <span>{new Date(message.created_at).toLocaleString()}</span>
                </div>
              </Link>
            );
            }) : (
              <div className="p-10 text-center text-sm text-charcoal/50">No messages yet.</div>
            )}
          </div>
        </div>

        <aside className="grid gap-6">
          {selected ? (
            <div className="border border-ink/10 bg-ivory/90 p-7">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-gold-deep">Message details</p>
                  <h2 className="mt-3 font-display text-4xl leading-tight text-ink">{selected.subject}</h2>
                </div>
                <StatusBadge>{selected.status || "New"}</StatusBadge>
              </div>

              <dl className="mt-7 grid gap-3 text-sm">
                {[
                  ["Name", selected.name],
                  ["Email", selected.email],
                  ["Source", selected.source || "Contact Form"],
                  ["Submitted", new Date(selected.created_at).toLocaleString()],
                  ["User ID", selected.user_id || "N/A"],
                  ["Project", selected.project_id || "N/A"],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-5 border-t border-ink/10 pt-3">
                    <dt className="text-charcoal/52">{label}</dt>
                    <dd className="break-all text-right text-ink">{value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-7 rounded-xl border border-hairline bg-paper p-5">
                <p className="text-xs uppercase tracking-[0.22em] text-primary">Full message</p>
                <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-charcoal/72">{selected.message}</p>
              </div>

              {selected.admin_reply ? (
                <div className="mt-5 rounded-xl border border-cta/20 bg-cta-soft p-5">
                  <p className="text-xs uppercase tracking-[0.22em] text-cta">Latest reply</p>
                  <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-charcoal/72">{selected.admin_reply}</p>
                </div>
              ) : null}

              <form action={updateMessageStatus} className="mt-6 grid gap-3">
                <input type="hidden" name="id" value={selected.id} />
                <label className="grid gap-2 text-sm text-charcoal/70">
                  Status
                  <select name="status" defaultValue={selected.status || "New"} className="min-h-11 border border-hairline bg-paper px-3 text-ink">
                    <option value="New">New</option>
                    <option value="Open">Open</option>
                    <option value="Replied">Replied</option>
                    <option value="Closed">Closed</option>
                  </select>
                </label>
                <button className="min-h-11 rounded-full border border-primary/25 px-5 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white">
                  Update status
                </button>
              </form>

              <form action={replyToMessage} className="mt-7 grid gap-3 border-t border-ink/10 pt-6">
                <input type="hidden" name="id" value={selected.id} />
                <p className="text-xs uppercase tracking-[0.24em] text-gold-deep">Reply from {SUPPORT_EMAIL}</p>
                <textarea name="reply" required rows={6} className="min-h-32 border border-hairline bg-paper p-4 text-sm leading-7 text-ink" placeholder="Write a clear, professional reply..." />
                <button className="min-h-12 rounded-full bg-primary px-5 text-sm font-semibold text-white transition hover:bg-primary-active">
                  Send reply
                </button>
              </form>
            </div>
          ) : (
            <div className="border border-ink/10 bg-ivory/90 p-10 text-center text-sm text-charcoal/50">
              No message selected.
            </div>
          )}
        </aside>
      </section>
    </DashboardShell>
  );
}
