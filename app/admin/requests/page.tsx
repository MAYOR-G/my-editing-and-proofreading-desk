import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/DashboardShell";
import { requireAdmin } from "@/lib/admin-auth";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";
import { sendMessageReplyEmail, SUPPORT_EMAIL } from "@/lib/email";
import { adminNav } from "@/lib/admin-nav";
import { makeThreadKey, sanitizePlainText } from "@/lib/message-threading";
import { fileToStoredAttachment, validateAdminAttachment } from "@/lib/attachment-utils";
import { AdminMessagesManager, type MessageItem, type ConversationEvent } from "@/components/admin/AdminMessagesManager";

type MessageRow = Record<string, any>;

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

async function deleteMessage(formData: FormData) {
  "use server";
  await requireAdmin();
  const id = String(formData.get("id") || "");
  if (!id) return;

  const supabaseAdmin = createSupabaseAdminClient();
  try {
    await supabaseAdmin.from("contact_message_replies").delete().eq("message_id", id);
    await supabaseAdmin.from("contact_messages").delete().eq("id", id);
  } catch (err) {
    console.error("Failed to delete message:", err);
  }

  revalidatePath("/admin/requests");
  redirect("/admin/requests");
}

async function toggleMessageRead(formData: FormData) {
  "use server";
  await requireAdmin();
  const id = String(formData.get("id") || "");
  const unread = formData.get("unread") === "true";
  if (!id) return;

  const supabaseAdmin = createSupabaseAdminClient();
  await supabaseAdmin
    .from("contact_messages")
    .update({
      unread_count: unread ? 1 : 0,
      status: unread ? "New" : "Open",
      updated_at: new Date().toISOString(),
    })
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
    phone,
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

  let data: Array<Record<string, any>> | null = null;
  let error: any = null;

  try {
    const enrichedMessages = await supabaseAdmin
      .from("contact_messages")
      .select(messageColumnsWithAttachments)
      .order("latest_message_at", { ascending: false, nullsFirst: false })
      .order("created_at", { ascending: false })
      .limit(100);
    data = enrichedMessages.data;
    error = enrichedMessages.error;
  } catch (e) {
    error = e;
  }

  if (error) {
    try {
      const fallback = await supabaseAdmin
        .from("contact_messages")
        .select(baseMessageColumns)
        .order("latest_message_at", { ascending: false, nullsFirst: false })
        .order("created_at", { ascending: false })
        .limit(100);
      data = fallback.data;
      error = fallback.error;
    } catch (e) {
      error = e;
    }
  }

  if (error) {
    try {
      const legacyFallback = await supabaseAdmin
        .from("contact_messages")
        .select(`id, name, email, subject, message, source, status, user_id, project_id, admin_reply, replied_at, created_at, updated_at`)
        .order("created_at", { ascending: false })
        .limit(100);
      data = legacyFallback.data;
      error = legacyFallback.error;
    } catch (e) {
      error = e;
    }
  }

  const allMessages: MessageRow[] = data || [];
  const messages: MessageRow[] = allMessages.slice().sort((a, b) => {
    const aTime = new Date(a.latest_message_at || a.updated_at || a.created_at || 0).getTime();
    const bTime = new Date(b.latest_message_at || b.updated_at || b.created_at || 0).getTime();
    return bTime - aTime;
  });

  const selected: MessageRow | null = messages.find((message) => message.id === searchParams?.message) || messages[0] || null;

  const messageIds = messages.map((m) => m.id);
  let allReplies: Array<Record<string, any>> = [];

  if (messageIds.length > 0) {
    try {
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
      const enrichedReplies = await supabaseAdmin
        .from("contact_message_replies")
        .select(replyColumns)
        .in("message_id", messageIds)
        .order("created_at", { ascending: true });

      if (enrichedReplies.error) {
        const fallbackReplies = await supabaseAdmin
          .from("contact_message_replies")
          .select("id, message_id, reply, sent_to, created_at")
          .in("message_id", messageIds)
          .order("created_at", { ascending: true });
        allReplies = fallbackReplies.data || [];
      } else {
        allReplies = enrichedReplies.data || [];
      }
    } catch (e) {
      console.warn("Replies fetch caught error:", e);
    }
  }

  if (selected?.id && selected.last_sender === "user" && Number(selected.unread_count || 0) > 0) {
    await supabaseAdmin
      .from("contact_messages")
      .update({ unread_count: 0, status: selected.status === "New" ? "Open" : selected.status, updated_at: new Date().toISOString() })
      .eq("id", selected.id);
    selected.unread_count = 0;
    if (selected.status === "New") selected.status = "Open";
  }

  const conversationEventsByMessageId: Record<string, ConversationEvent[]> = {};
  for (const m of messages) {
    const rootEvent: ConversationEvent = {
      id: `root-${m.id}`,
      messageId: m.id,
      senderType: "user",
      senderName: m.name,
      senderEmail: m.email,
      content: m.message,
      createdAt: m.created_at,
      attachmentFilePath: m.attachment_file_path,
      attachmentFileName: m.attachment_file_name,
      attachmentContentType: m.attachment_content_type,
      attachmentFileSize: m.attachment_file_size,
    };

    const repliesForM = allReplies
      .filter((r) => r.message_id === m.id)
      .map((reply) => ({
        id: reply.id,
        messageId: m.id,
        senderType: (reply.sender_type || "admin") as "user" | "admin",
        senderName: reply.sender_name || (reply.sender_type === "user" ? m.name : "Support"),
        senderEmail: reply.sender_email || (reply.sender_type === "user" ? m.email : SUPPORT_EMAIL),
        content: reply.reply,
        createdAt: reply.created_at,
        attachmentFilePath: reply.attachment_file_path,
        attachmentFileName: reply.attachment_file_name,
        attachmentContentType: reply.attachment_content_type,
        attachmentFileSize: reply.attachment_file_size,
      }));

    conversationEventsByMessageId[m.id] = [rootEvent, ...repliesForM].sort(
      (a, b) => new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime()
    );
  }

  const selectedConversationEvents: ConversationEvent[] = selected
    ? conversationEventsByMessageId[selected.id] || []
    : [];

  const formattedMessages: MessageItem[] = messages.map((m) => {
    const threadRepliesCount = allReplies.filter((r) => r.message_id === m.id).length;
    return {
      id: m.id,
      name: m.name,
      email: m.email,
      phone: m.phone,
      subject: m.subject || "(No subject)",
      message: m.message,
      source: m.source,
      status: m.status || "Open",
      user_id: m.user_id,
      project_id: m.project_id,
      admin_reply: m.admin_reply,
      replied_at: m.replied_at,
      created_at: m.created_at,
      updated_at: m.updated_at,
      latest_message: m.latest_message,
      latest_message_at: m.latest_message_at,
      last_sender: m.last_sender,
      unread_count: m.unread_count,
      thread_count: threadRepliesCount + 1,
      attachment_file_path: m.attachment_file_path,
      attachment_file_name: m.attachment_file_name,
      attachment_content_type: m.attachment_content_type,
      attachment_file_size: m.attachment_file_size,
    };
  });

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
      <AdminMessagesManager
        messages={formattedMessages}
        selectedId={selected?.id}
        conversationEvents={selectedConversationEvents}
        conversationEventsByMessageId={conversationEventsByMessageId}
        replyStatus={searchParams?.reply}
        supportEmail={SUPPORT_EMAIL}
        updateStatusAction={updateMessageStatus}
        replyAction={replyToMessage}
        deleteAction={deleteMessage}
        toggleReadAction={toggleMessageRead}
      />
    </DashboardShell>
  );
}
