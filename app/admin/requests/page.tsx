import Link from "next/link";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { DashboardShell, StatusBadge } from "@/components/DashboardShell";
import { requireAdmin } from "@/lib/admin-auth";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";
import { sendMessageReplyEmail, SUPPORT_EMAIL } from "@/lib/email";
import { adminNav } from "@/lib/admin-nav";
import { makeThreadKey, previewText, sanitizePlainText } from "@/lib/message-threading";
import { fileToStoredAttachment, validateAdminAttachment } from "@/lib/attachment-utils";
import { PendingSubmitButton } from "@/components/PendingSubmitButton";

type MessageRow = Record<string, any>;

function preview(message: string) {
  return previewText(message);
}

function formatFileSize(bytes?: number | null) {
  if (!bytes || bytes <= 0) return "Not recorded";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function canPreviewAttachment(contentType?: string | null, fileName?: string | null) {
  const lowerName = fileName?.toLowerCase() || "";
  const lowerType = contentType?.toLowerCase() || "";
  return lowerType.startsWith("image/")
    || lowerType === "application/pdf"
    || lowerType.startsWith("text/")
    || [".txt", ".pdf", ".png", ".jpg", ".jpeg", ".webp"].some((extension) => lowerName.endsWith(extension));
}

async function replyToMessage(formData: FormData) {
  "use server";
  await requireAdmin();

  const id = String(formData.get("id") || "");
  const reply = sanitizePlainText(formData.get("reply"), 5000);
  const attachment = formData.get("attachment");

  if (!id || !reply) {
    redirect(`/admin/requests${id ? `?message=${id}&reply=missing` : "?reply=missing"}`);
  }

  const attachmentFile = attachment instanceof File && attachment.size > 0 ? attachment : null;
  const attachmentError = validateAdminAttachment(attachmentFile);
  if (attachmentError) {
    redirect(`/admin/requests?message=${id}&reply=attachment`);
  }

  const supabaseAdmin = createSupabaseAdminClient();
  const { data: message, error } = await supabaseAdmin
    .from("contact_messages")
    .select("id, name, email, subject, inbound_message_id, email_references")
    .eq("id", id)
    .single();

  if (error || !message) {
    console.error("Admin reply lookup failed:", error);
    redirect("/admin/requests?reply=failed");
  }

  const recentDuplicate = await supabaseAdmin
    .from("contact_message_replies")
    .select("id")
    .eq("message_id", id)
    .eq("sender_type", "admin")
    .eq("reply", reply)
    .gte("created_at", new Date(Date.now() - 15_000).toISOString())
    .limit(1)
    .maybeSingle();

  if (recentDuplicate.data?.id) {
    redirect(`/admin/requests?message=${id}&reply=sent`);
  }

  const storedAttachment = attachmentFile
    ? await fileToStoredAttachment(attachmentFile, `admin/message-replies/${id}`)
    : null;

  if (storedAttachment) {
    const { error: uploadError } = await supabaseAdmin.storage
      .from("uploads")
      .upload(storedAttachment.path, storedAttachment.content, {
        contentType: storedAttachment.contentType,
        upsert: false,
      });

    if (uploadError) {
      console.error("Admin reply attachment upload failed:", uploadError);
      redirect(`/admin/requests?message=${id}&reply=attachment`);
    }
  }

  const emailResult = await sendMessageReplyEmail(
    message.email,
    message.name,
    `Re: ${message.subject || "Your message to My Editing and Proofreading Desk"}`,
    reply,
    {
      threadId: message.id,
      inReplyTo: message.inbound_message_id,
      references: [message.email_references, message.inbound_message_id].filter(Boolean).join(" ") || null,
      attachment: storedAttachment ? {
        filename: storedAttachment.name,
        content: storedAttachment.content,
        contentType: storedAttachment.contentType,
      } : null,
    }
  );

  if (!emailResult.success) {
    if (storedAttachment) {
      await supabaseAdmin.storage.from("uploads").remove([storedAttachment.path]);
    }
    redirect(`/admin/requests?message=${id}&reply=failed`);
  }

  await supabaseAdmin.from("contact_message_replies").insert({
    message_id: id,
    reply,
    sent_to: message.email,
    sender_type: "admin",
    sender_name: "Support",
    sender_email: SUPPORT_EMAIL,
    attachment_file_path: storedAttachment?.path || null,
    attachment_file_name: storedAttachment?.name || null,
    attachment_content_type: storedAttachment?.contentType || null,
    attachment_file_size: storedAttachment?.size || null,
  });

  const now = new Date().toISOString();
  await supabaseAdmin
    .from("contact_messages")
    .update({
      status: "Replied",
      admin_reply: reply,
      replied_at: now,
      latest_message: reply,
      latest_message_at: now,
      last_sender: "admin",
      unread_count: 0,
      updated_at: now,
    })
    .eq("id", id);

  revalidatePath("/admin/requests");
  redirect(`/admin/requests?message=${id}&reply=sent`);
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
  searchParams?: { message?: string; reply?: string };
}) {
  await requireAdmin();

  const supabaseAdmin = createSupabaseAdminClient();
  const coreMessageColumns = `
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
  `;
  const baseMessageColumns = `
    ${coreMessageColumns},
    thread_key,
    inbound_message_id,
    email_references,
    latest_message,
    latest_message_at,
    last_sender,
    unread_count
  `;
  const messageColumnsWithAttachments = `
    ${baseMessageColumns},
    attachment_file_path,
    attachment_file_name,
    attachment_content_type,
    attachment_file_size
  `;

  const enrichedMessages = await supabaseAdmin
    .from("contact_messages")
    .select(messageColumnsWithAttachments)
    .order("created_at", { ascending: false })
    .limit(75);
  let data: Array<Record<string, any>> | null = enrichedMessages.data;
  let error = enrichedMessages.error;

  if (error) {
    console.warn("Admin messages attachment/thread columns unavailable; retrying base message query.", error.message);
    const fallback = await supabaseAdmin
      .from("contact_messages")
      .select(baseMessageColumns)
      .order("created_at", { ascending: false })
      .limit(75);
    data = fallback.data;
    error = fallback.error;
  }

  if (error) {
    console.warn("Admin messages thread columns unavailable; retrying legacy message query.", error.message);
    const legacyFallback = await supabaseAdmin
      .from("contact_messages")
      .select(coreMessageColumns)
      .order("created_at", { ascending: false })
      .limit(75);
    data = legacyFallback.data;
    error = legacyFallback.error;
  }

  if (error) console.error("Error fetching admin messages:", error);
  const allMessages: MessageRow[] = data || [];
  const groupedByThread = allMessages.reduce<Map<string, MessageRow>>((threads, message) => {
      const key = message.thread_key || makeThreadKey(message.email || "");
      const current = threads.get(key);
      const messageTime = new Date(message.latest_message_at || message.updated_at || message.created_at || 0).getTime();
      const currentTime = current ? new Date(current.latest_message_at || current.updated_at || current.created_at || 0).getTime() : 0;
      if (!current || messageTime > currentTime) {
        threads.set(key, {
          ...message,
          thread_key: key,
          thread_count: (current?.thread_count || 0) + 1,
        });
      } else if (current) {
        current.thread_count = (current.thread_count || 1) + 1;
      }
      return threads;
    }, new Map<string, MessageRow>());
  const groupedMessages: MessageRow[] = Array.from(groupedByThread.values()).sort((a, b) => {
    const aTime = new Date(a.latest_message_at || a.updated_at || a.created_at || 0).getTime();
    const bTime = new Date(b.latest_message_at || b.updated_at || b.created_at || 0).getTime();
    return bTime - aTime;
  });
  const messages: MessageRow[] = groupedMessages;
  const selected: MessageRow | null = messages.find((message) => message.id === searchParams?.message) || messages[0] || null;
  const selectedThreadKey = selected ? selected.thread_key || makeThreadKey(selected.email || "") : "";
  const selectedThreadRoots = selected
    ? allMessages
        .filter((message) => (message.thread_key || makeThreadKey(message.email || "")) === selectedThreadKey)
        .sort((a, b) => new Date(a.created_at || 0).getTime() - new Date(b.created_at || 0).getTime())
    : [];
  let threadReplies: Array<Record<string, any>> = [];

  if (selected?.id) {
    const replyColumns = `
      id,
      message_id,
      reply,
      sent_to,
      sender_type,
      sender_name,
      sender_email,
      attachment_file_path,
      attachment_file_name,
      attachment_content_type,
      attachment_file_size,
      created_at
    `;
    const baseReplyColumns = `
      id,
      message_id,
      reply,
      sent_to,
      created_at
    `;
    const enrichedReplies = await supabaseAdmin
      .from("contact_message_replies")
      .select(replyColumns)
      .in("message_id", selectedThreadRoots.map((message) => message.id))
      .order("created_at", { ascending: true });

    if (enrichedReplies.error) {
      console.warn("Thread reply metadata columns unavailable; retrying base reply query.", enrichedReplies.error.message);
      const fallbackReplies = await supabaseAdmin
        .from("contact_message_replies")
        .select(baseReplyColumns)
        .in("message_id", selectedThreadRoots.map((message) => message.id))
        .order("created_at", { ascending: true });
      threadReplies = fallbackReplies.data || [];
    } else {
      threadReplies = enrichedReplies.data || [];
    }

    if (selected.last_sender === "user" && Number(selected.unread_count || 0) > 0) {
      await supabaseAdmin
        .from("contact_messages")
        .update({ unread_count: 0, status: selected.status === "New" ? "Open" : selected.status, updated_at: new Date().toISOString() })
        .eq("id", selected.id);
      selected.unread_count = 0;
      if (selected.status === "New") selected.status = "Open";
    }
  }

  const conversationEvents = selected
    ? [
        ...selectedThreadRoots.map((root) => ({
          id: root.id,
          messageId: root.id,
          senderType: "user",
          senderName: root.name,
          senderEmail: root.email,
          content: root.message,
          createdAt: root.created_at,
          attachmentFilePath: root.attachment_file_path,
          attachmentFileName: root.attachment_file_name,
          attachmentContentType: root.attachment_content_type,
          attachmentFileSize: root.attachment_file_size,
        })),
        ...threadReplies.map((reply) => ({
          id: reply.id,
          messageId: reply.message_id || selected.id,
          senderType: reply.sender_type || "admin",
          senderName: reply.sender_name || (reply.sender_type === "user" ? selected.name : "Support"),
          senderEmail: reply.sender_email || (reply.sender_type === "user" ? selected.email : SUPPORT_EMAIL),
          content: reply.reply,
          createdAt: reply.created_at,
          attachmentFilePath: reply.attachment_file_path,
          attachmentFileName: reply.attachment_file_name,
          attachmentContentType: reply.attachment_content_type,
          attachmentFileSize: reply.attachment_file_size,
        })),
      ].sort((a, b) => new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime())
    : [];

  return (
    <DashboardShell
      eyebrow="Admin operations"
      title="Messages & requests."
      description="Review contact form inquiries, dashboard support requests, and reply from the support identity."
      nav={adminNav("/admin/requests")}
      primaryActionLabel="Projects"
      primaryActionHref="/admin/projects"
      secondaryActionLabel="Messages"
      secondaryActionHref="/admin/requests"
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
                  {Number(message.unread_count || 0) > 0 ? (
                    <StatusBadge>{`${message.unread_count} New`}</StatusBadge>
                  ) : (
                    <StatusBadge>{message.status || "Open"}</StatusBadge>
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink">{message.subject}</p>
                  <p className="mt-2 text-sm leading-6 text-charcoal/66">{preview(message.latest_message || message.message || "")}</p>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs uppercase tracking-[0.16em] text-charcoal/42">
                  <span>{message.source || "Contact Form"}</span>
                  {Number(message.thread_count || 0) > 1 ? <span>{message.thread_count} messages</span> : null}
                  {message.attachment_file_path ? <span>Attachment</span> : null}
                  <span>{message.last_sender === "admin" ? "Last: admin" : "Last: user"}</span>
                  <span>{new Date(message.latest_message_at || message.updated_at || message.created_at).toLocaleString()}</span>
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
                <StatusBadge>{selected.status || "Open"}</StatusBadge>
              </div>

              {searchParams?.reply === "sent" ? (
                <div className="mt-5 rounded-xl border border-cta/20 bg-cta-soft p-4 text-sm leading-6 text-ink">
                  Reply sent and saved to this conversation.
                </div>
              ) : null}

              {searchParams?.reply === "failed" || searchParams?.reply === "missing" || searchParams?.reply === "attachment" ? (
                <div className="mt-5 rounded-xl border border-status-danger/25 bg-status-danger-light p-4 text-sm leading-6 text-status-danger">
                  {searchParams.reply === "missing"
                    ? "Write a reply before sending."
                    : searchParams.reply === "attachment"
                      ? "The attachment could not be used. Choose a DOC, DOCX, PDF, TXT, RTF, or ZIP file under 25MB."
                      : "We could not send that reply. Nothing was marked as sent."}
                </div>
              ) : null}

              <dl className="mt-7 grid gap-3 text-sm">
                {[
                  ["Name", selected.name],
                  ["Email", selected.email],
                  ["Source", selected.source || "Contact Form"],
                  ["Latest activity", new Date(selected.latest_message_at || selected.updated_at || selected.created_at).toLocaleString()],
                  ["User ID", selected.user_id || "N/A"],
                  ["Project", selected.project_id || "N/A"],
                  ["Thread", selected.thread_key || selected.email],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-5 border-t border-ink/10 pt-3">
                    <dt className="text-charcoal/52">{label}</dt>
                    <dd className="break-all text-right text-ink">{value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-7 grid gap-4">
                <p className="text-xs uppercase tracking-[0.24em] text-gold-deep">Conversation thread</p>
                {conversationEvents.map((event) => {
                  const isAdmin = event.senderType === "admin";
                  const attachmentHref = event.id === event.messageId
                    ? `/api/admin/messages/${event.messageId}/attachment`
                    : `/api/admin/messages/${event.messageId}/attachment?reply=${event.id}`;
                  const attachmentJoin = attachmentHref.includes("?") ? "&" : "?";

                  return (
                    <div key={event.id} className={`rounded-xl border p-5 ${isAdmin ? "border-cta/20 bg-cta-soft" : "border-hairline bg-paper"}`}>
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <p className={`text-xs uppercase tracking-[0.22em] ${isAdmin ? "text-cta" : "text-primary"}`}>
                            {isAdmin ? "Admin reply" : "User message"}
                          </p>
                          <p className="mt-2 text-sm font-semibold text-ink">{event.senderName || (isAdmin ? "Support" : selected.name)}</p>
                          <p className="mt-1 break-all text-xs text-charcoal/52">{event.senderEmail}</p>
                        </div>
                        <span className="text-xs uppercase tracking-[0.16em] text-charcoal/42">{new Date(event.createdAt).toLocaleString()}</span>
                      </div>
                      <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-charcoal/72">{event.content}</p>
                      {event.attachmentFilePath ? (
                        <div className="mt-5 border-t border-ink/10 pt-4">
                          <p className="text-xs uppercase tracking-[0.18em] text-charcoal/48">Attachment</p>
                          <p className="mt-2 break-all text-sm text-ink">{event.attachmentFileName || event.attachmentFilePath.split("/").pop() || "Attachment"}</p>
                          <p className="mt-1 text-xs text-charcoal/50">{event.attachmentContentType || "Unknown type"} · {formatFileSize(event.attachmentFileSize)}</p>
                          <div className="mt-3 flex flex-wrap gap-3">
                            {canPreviewAttachment(event.attachmentContentType, event.attachmentFileName) ? (
                              <Link href={`${attachmentHref}${attachmentJoin}action=view`} className="inline-flex min-h-10 items-center rounded-full border border-primary/25 px-4 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white">
                                View
                              </Link>
                            ) : null}
                            <Link href={`${attachmentHref}${attachmentJoin}action=download`} className="inline-flex min-h-10 items-center rounded-full bg-primary px-4 text-sm font-semibold text-white transition hover:bg-primary-active">
                              Download
                            </Link>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>

              {selected.admin_reply && conversationEvents.length <= 1 ? (
                <div className="mt-5 rounded-xl border border-cta/20 bg-cta-soft p-5">
                  <p className="text-xs uppercase tracking-[0.22em] text-cta">Latest legacy reply</p>
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
                <PendingSubmitButton
                  idleLabel="Update status"
                  pendingLabel="Updating..."
                  className="min-h-11 rounded-full border border-primary/25 px-5 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white"
                />
              </form>

              <form action={replyToMessage} className="mt-7 grid gap-3 border-t border-ink/10 pt-6">
                <input type="hidden" name="id" value={selected.id} />
                <p className="text-xs uppercase tracking-[0.24em] text-gold-deep">Reply from {SUPPORT_EMAIL}</p>
                <textarea name="reply" required rows={6} className="min-h-32 border border-hairline bg-paper p-4 text-sm leading-7 text-ink" placeholder="Write a clear, professional reply..." />
                <label className="grid gap-2 text-sm text-charcoal/70">
                  Attach file
                  <input
                    name="attachment"
                    type="file"
                    accept=".doc,.docx,.pdf,.txt,.rtf,.zip"
                    className="min-h-11 border border-hairline bg-paper px-3 py-2 text-sm text-ink file:mr-4 file:rounded-full file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
                  />
                </label>
                <PendingSubmitButton
                  idleLabel="Send reply"
                  pendingLabel="Sending..."
                  className="min-h-12 rounded-full bg-primary px-5 text-sm font-semibold text-white transition hover:bg-primary-active"
                />
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
