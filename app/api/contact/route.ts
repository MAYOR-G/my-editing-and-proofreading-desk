import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";
import { SUPPORT_EMAIL, sendContactConfirmationEmail, sendContactNotificationEmail } from "@/lib/email";
import { checkRateLimit } from "@/lib/rate-limit";
import { makeThreadKey, sanitizePlainText } from "@/lib/message-threading";
import { verifyTurnstileToken } from "@/lib/turnstile";

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

function getClientIdentifier(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const cfIp = request.headers.get("cf-connecting-ip")?.trim();
  const realIp = request.headers.get("x-real-ip")?.trim();
  const userAgent = request.headers.get("user-agent")?.slice(0, 80) || "unknown-agent";

  return `${cfIp || forwarded || realIp || "anonymous"}:${userAgent}`;
}

function compactForDuplicateCheck(values: string[]) {
  return values
    .map((value) => value.trim().toLowerCase().replace(/\s+/g, " "))
    .filter(Boolean)
    .join("|")
    .slice(0, 700);
}

function countLinks(value: string) {
  return (value.match(/https?:\/\/|www\./gi) || []).length;
}

export async function POST(request: Request) {
  try {
    const clientIdentifier = getClientIdentifier(request);
    const cooldown = await checkRateLimit(`contact-cooldown:${clientIdentifier}`, 1, 30);
    if (!cooldown.success) {
      console.warn("Contact submission blocked by cooldown:", clientIdentifier);
      return NextResponse.json(
        { error: "Please wait about 30 seconds before sending another message." },
        { status: 429 }
      );
    }

    const rateLimit = await checkRateLimit(`contact:${clientIdentifier}`, 5, 60);
    if (!rateLimit.success) {
      console.warn("Contact submission blocked by rate limit:", clientIdentifier);
      return NextResponse.json(
        { error: "Too many messages were sent in a short time. Please wait a moment and try again." },
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
    const honeypot = formData ? cleanFormValue(formData, "website", 200) : cleanText(payload.website, 200);
    const turnstileToken = formData ? cleanFormValue(formData, "turnstileToken", 3000) : cleanText(payload.turnstileToken, 3000);

    if (honeypot) {
      console.warn("Contact submission blocked by honeypot:", clientIdentifier);
      return NextResponse.json(
        { error: "We could not verify this message. Please refresh the page and try again." },
        { status: 400 }
      );
    }

    const remoteIp = request.headers.get("cf-connecting-ip") || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
    const turnstile = await verifyTurnstileToken(turnstileToken, remoteIp);
    if (!turnstile.success) {
      return NextResponse.json(
        { error: turnstile.error || "Security verification failed. Please try again." },
        { status: 403 }
      );
    }

    if (!name || !email || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please enter your name, a valid email address, and a message." },
        { status: 400 }
      );
    }

    if (message.length < 12 || countLinks(message) > 3 || countLinks(subject) > 1) {
      console.warn("Contact submission blocked by suspicious content:", clientIdentifier);
      return NextResponse.json(
        { error: "Please send a clear project message without excessive links." },
        { status: 400 }
      );
    }

    const duplicateKey = compactForDuplicateCheck([email, subject, service, message]);
    if (duplicateKey) {
      const duplicateLimit = await checkRateLimit(`contact-duplicate:${clientIdentifier}:${duplicateKey}`, 1, 120);
      if (!duplicateLimit.success) {
        console.warn("Contact submission blocked as duplicate:", clientIdentifier);
        return NextResponse.json(
          { error: "This message was already sent. Please wait before submitting it again." },
          { status: 409 }
        );
      }
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

    sendContactConfirmationEmail({ name, email, subject, source }).catch((error) => {
      console.warn("Contact confirmation email failed:", error);
    });

    return NextResponse.json({ success: true, message: "Message sent successfully. Our team will get back to you soon." });
  } catch (error) {
    console.error("Contact route failed:", error);
    return NextResponse.json(
      { error: `We couldn't send your message right now. Please try again or email ${SUPPORT_EMAIL}.` },
      { status: 500 }
    );
  }
}
