import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";
import { SUPPORT_EMAIL, sendContactNotificationEmail } from "@/lib/email";
import { checkRateLimit } from "@/lib/rate-limit";
import { makeThreadKey, sanitizePlainText } from "@/lib/message-threading";

export const dynamic = "force-dynamic";

function cleanText(value: unknown, maxLength: number) {
  return sanitizePlainText(value, maxLength);
}

function makeSubject(subject: string, service?: string) {
  if (subject) return subject;
  if (service) return `${service} inquiry`;
  return "Website inquiry";
}

const MAX_ATTACHMENT_BYTES = 25 * 1024 * 1024;
const ALLOWED_ATTACHMENT_EXTENSIONS = new Set([
  ".doc",
  ".docx",
  ".pdf",
  ".txt",
  ".rtf",
  ".odt",
  ".csv",
  ".xls",
  ".xlsx",
  ".ppt",
  ".pptx",
  ".zip",
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
]);

function getExtension(filename: string) {
  const dotIndex = filename.lastIndexOf(".");
  return dotIndex >= 0 ? filename.slice(dotIndex).toLowerCase() : "";
}

function sanitizeFilename(filename: string) {
  const cleaned = filename
    .replace(/[^\w.\- ]+/g, "")
    .replace(/\s+/g, "_")
    .slice(0, 120);

  return cleaned || "attachment";
}

function cleanFormValue(formData: FormData, key: string, maxLength: number) {
  return cleanText(formData.get(key), maxLength);
}

export async function POST(request: Request) {
  try {
    const rateLimit = await checkRateLimit(`contact:${request.headers.get("x-forwarded-for") || "anonymous"}`, 5, 60);
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: "Please wait a moment before sending another message." },
        { status: 429 }
      );
    }

    const contentType = request.headers.get("content-type") || "";
    const isMultipart = contentType.includes("multipart/form-data");
    const payload: Record<string, unknown> = isMultipart ? {} : await request.json();
    const formData = isMultipart ? await request.formData() : null;

    const name = formData ? cleanFormValue(formData, "name", 160) : cleanText(payload.name, 160);
    const email = formData ? cleanFormValue(formData, "email", 220) : cleanText(payload.email, 220);
    const service = formData ? cleanFormValue(formData, "service", 120) : cleanText(payload.service, 120);
    const organization = formData ? cleanFormValue(formData, "organization", 160) : cleanText(payload.organization, 160);
    const wordCount = formData ? cleanFormValue(formData, "wordCount", 40) : cleanText(payload.wordCount, 40);
    const turnaround = formData ? cleanFormValue(formData, "turnaround", 80) : cleanText(payload.turnaround, 80);
    const subject = makeSubject(formData ? cleanFormValue(formData, "subject", 180) : cleanText(payload.subject, 180), service);
    const message = formData ? cleanFormValue(formData, "message", 5000) : cleanText(payload.message, 5000);
    const source = (formData ? cleanFormValue(formData, "source", 120) : cleanText(payload.source, 120)) || "Contact Form";
    const projectId = (formData ? cleanFormValue(formData, "projectId", 80) : cleanText(payload.projectId, 80)) || null;

    if (!name || !email || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please enter your name, a valid email address, and a message." },
        { status: 400 }
      );
    }

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    const supabaseAdmin = createSupabaseAdminClient();
    const attachment = formData?.get("attachment");
    let attachmentMeta: {
      attachment_file_path: string;
      attachment_file_name: string;
      attachment_content_type: string;
      attachment_file_size: number;
    } | null = null;

    if (attachment instanceof File && attachment.size > 0) {
      if (attachment.size > MAX_ATTACHMENT_BYTES) {
        return NextResponse.json(
          { error: "Attached file is too large. Please keep support attachments under 25MB." },
          { status: 413 }
        );
      }

      const extension = getExtension(attachment.name);
      if (!ALLOWED_ATTACHMENT_EXTENSIONS.has(extension)) {
        return NextResponse.json(
          { error: "Unsupported attachment type. Use a document, PDF, text, spreadsheet, presentation, image, or ZIP file." },
          { status: 415 }
        );
      }

      const safeName = sanitizeFilename(attachment.name);
      const owner = user?.id || "public";
      const filePath = `${owner}/support/${Date.now()}_${safeName}`;
      const { error: uploadError } = await supabaseAdmin.storage
        .from("uploads")
        .upload(filePath, attachment, {
          contentType: attachment.type || "application/octet-stream",
          upsert: false,
        });

      if (uploadError) {
        console.error("Contact attachment upload failed:", uploadError);
        return NextResponse.json(
          { error: `We couldn't upload your attachment right now. Please try again or email ${SUPPORT_EMAIL}.` },
          { status: 500 }
        );
      }

      attachmentMeta = {
        attachment_file_path: filePath,
        attachment_file_name: safeName,
        attachment_content_type: attachment.type || "application/octet-stream",
        attachment_file_size: attachment.size,
      };
    }

    const content = [
      organization ? `Organization: ${organization}` : "",
      service ? `Service interest: ${service}` : "",
      wordCount ? `Estimated word count: ${wordCount}` : "",
      turnaround ? `Preferred turnaround: ${turnaround}` : "",
      attachmentMeta ? `Attachment: ${attachmentMeta.attachment_file_name} (${attachmentMeta.attachment_content_type || "unknown type"})` : "",
      message,
    ].filter(Boolean).join("\n\n");

    const threadKey = makeThreadKey(email);
    const now = new Date().toISOString();
    const { data: existingThread } = await supabaseAdmin
      .from("contact_messages")
      .select("id, unread_count")
      .eq("thread_key", threadKey)
      .order("latest_message_at", { ascending: false, nullsFirst: false })
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    const { error } = existingThread?.id
      ? await supabaseAdmin.from("contact_message_replies").insert({
          message_id: existingThread.id,
          reply: content,
          sent_to: SUPPORT_EMAIL,
          sender_type: "user",
          sender_name: name,
          sender_email: email,
          attachment_file_path: attachmentMeta?.attachment_file_path || null,
          attachment_file_name: attachmentMeta?.attachment_file_name || null,
          attachment_content_type: attachmentMeta?.attachment_content_type || null,
          attachment_file_size: attachmentMeta?.attachment_file_size || null,
        })
      : await supabaseAdmin.from("contact_messages").insert({
          thread_key: threadKey,
          name,
          email,
          subject,
          message: content,
          source,
          status: "New",
          user_id: user?.id || null,
          project_id: projectId,
          latest_message: content,
          latest_message_at: now,
          last_sender: "user",
          unread_count: 1,
          ...(attachmentMeta || {}),
        });

    if (error) {
      console.error("Contact message save failed:", error);
      return NextResponse.json(
        { error: `We couldn't send your message right now. Please try again or email ${SUPPORT_EMAIL}.` },
        { status: 500 }
      );
    }

    if (existingThread?.id) {
      const { error: updateError } = await supabaseAdmin
        .from("contact_messages")
        .update({
          name,
          email,
          subject,
          source,
          status: "New",
          user_id: user?.id || null,
          project_id: projectId,
          latest_message: content,
          latest_message_at: now,
          last_sender: "user",
          unread_count: Number(existingThread.unread_count || 0) + 1,
          updated_at: now,
        })
        .eq("id", existingThread.id);

      if (updateError) {
        console.error("Contact thread update failed:", updateError);
      }
    }

    const notification = await sendContactNotificationEmail({
      name,
      email,
      subject,
      content,
      source,
      userId: user?.id || null,
      projectId,
    });

    if (!notification.success) {
      return NextResponse.json(
        { error: `We couldn't send your message right now. Please try again or email ${SUPPORT_EMAIL}.` },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true, message: "Message sent successfully. Our team will get back to you soon." });
  } catch (error) {
    console.error("Contact route failed:", error);
    return NextResponse.json(
      { error: `We couldn't send your message right now. Please try again or email ${SUPPORT_EMAIL}.` },
      { status: 500 }
    );
  }
}
