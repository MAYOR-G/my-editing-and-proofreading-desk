import { DashboardShell } from "@/components/DashboardShell";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { requireAdmin } from "@/lib/admin-auth";

const nav = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/requests", label: "Messages" }
];

export default async function AdminRequestsPage() {
  await requireAdmin();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  const supabaseAdminClient = createSupabaseClient(supabaseUrl, supabaseServiceKey);

  // Fetch real messages, joining with sender's profile
  const { data: realMessages, error } = await supabaseAdminClient
    .from("messages")
    .select(`
      id,
      content,
      created_at,
      is_from_admin,
      profiles:sender_id (full_name, email)
    `)
    .order("created_at", { ascending: false })
    .limit(50);
    
  if (error) console.error("Error fetching messages:", error);
  const fetchedMessages = realMessages || [];

  async function broadcastEmail(formData: FormData) {
    "use server";
    await requireAdmin();
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;
    
    if (!subject || !message) return;
    
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
    const supabaseAdminClient = createSupabaseClient(supabaseUrl, supabaseServiceKey);
    
    const { data: clients } = await supabaseAdminClient.from("profiles").select("email");
    if (!clients || clients.length === 0) return;
    
    const emails = clients.map(c => c.email).filter(Boolean);
    const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy");
    
    try {
      await resend.emails.send({
        from: "My Editing Desk <business@editandproofread.com>",
        to: emails,
        subject: subject,
        html: `<div style="font-family: sans-serif; color: #111;">${message.replace(/\n/g, "<br/>")}</div>`,
      });
      console.log(`BROADCAST sent to ${emails.length} clients: ${subject}`);
    } catch (err) {
      console.error("Broadcast failed:", err);
    }
  }

  return (
    <DashboardShell
      eyebrow="Admin operations"
      title="Messages & Requests."
      description="Client messages, operational requests, and platform-wide broadcast controls."
      nav={nav}
      primaryActionLabel="Update order"
      secondaryActionLabel="Messages"
    >
      <section id="messages" className="mt-8 grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
        <div className="border border-ink/10 bg-ivory/90 p-7">
          <p className="text-xs uppercase tracking-[0.24em] text-gold-deep">Client messages</p>
          <h2 className="mt-4 font-display text-4xl leading-tight text-ink">Notes stay attached to the operational record.</h2>
          <p className="mt-5 text-base leading-7 text-charcoal/65">
            Client instructions, support notes, and order questions appear alongside the relevant project instead of disappearing into email.
          </p>
        </div>
        <div className="divide-y divide-ink/10 border-y border-ink/10 bg-ivory/70">
          {fetchedMessages.length > 0 ? fetchedMessages.map((msg: any) => (
            <article key={msg.id} className="grid gap-4 p-6 md:grid-cols-[0.28fr_0.72fr]">
              <p className="text-xs uppercase tracking-[0.22em] text-gold-deep">
                {msg.is_from_admin ? "ADMIN RESPONSE" : (msg.profiles?.full_name || msg.profiles?.email || "Unknown Client")}
              </p>
              <div>
                <p className="text-base leading-7 text-charcoal/70">{msg.content}</p>
                <p className="text-xs text-charcoal/40 mt-2">{new Date(msg.created_at).toLocaleString()}</p>
              </div>
            </article>
          )) : (
            <div className="p-6 text-sm text-charcoal/50 text-center">No messages yet.</div>
          )}
        </div>
      </section>

      <section id="settings" className="mt-8 border border-ink/10 bg-ivory/90 p-7">
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-gold-deep">Client Broadcasts</p>
            <h2 className="mt-3 font-display text-4xl text-ink">Send updates to all clients.</h2>
            <p className="mt-4 text-sm leading-6 text-charcoal/62">
              Compose a message to email all registered clients immediately. Useful for holiday schedules or service updates.
            </p>
          </div>
          <form action={broadcastEmail} className="grid gap-4">
            <label className="grid gap-2 text-sm text-charcoal/70">
              Subject
              <input name="subject" required className="min-h-12 border border-ink/10 bg-paper px-4 text-ink" placeholder="Important update from the editorial desk" />
            </label>
            <label className="grid gap-2 text-sm text-charcoal/70">
              Message
              <textarea name="message" required className="min-h-32 border border-ink/10 bg-paper p-4 text-ink" placeholder="Enter HTML or plain text message..." />
            </label>
            <button type="submit" className="min-h-12 border border-ink/10 bg-ink text-ivory hover:bg-gold hover:text-ink transition">
              Send Broadcast
            </button>
          </form>
        </div>
      </section>
    </DashboardShell>
  );
}
