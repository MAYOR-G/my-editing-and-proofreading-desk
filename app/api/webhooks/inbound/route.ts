import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";
import { getEmailClient, sendContactNotificationEmail, SUPPORT_EMAIL } from "@/lib/email";
import { makeThreadKey, sanitizePlainText } from "@/lib/message-threading";

export const dynamic = "force-dynamic";

const INBOUND_HANDLER_VERSION = "inbound-threaded-2026-05-22";

type ContactThread = {
  id: string;
  name?: string | null;
  email?: string | null;
  unread_count?: number | null;
  source?: string | null;
  user_id?: string | null;
  project_id?: string | null;
  email_references?: string | null;
};

function getWebhookSecret() {
  const candidates = [
    process.env.RESEND_WEBHOOK_SECRET,
    process.env.RESEND_INBOUND_WEBHOOK_SECRET,
  ];

  return candidates.find((value) => value && !/^https?:\/\//i.test(value)) || "";
}

function extractEmail(value: unknown): string {
  if (!value) return "";

  if (Array.isArray(value)) {
    for (const item of value) {
      const email: string = extractEmail(item);
      if (email) return email;
    }
    return "";
  }

  if (typeof value === "object") {
    const record = value as Record<string, unknown>;
    for (const key of ["email", "address", "from", "sender", "reply_to", "value"]) {
      const email: string = extractEmail(record[key]);
      if (email) return email;
    }

    const serialized = JSON.stringify(value);
    const match = serialized.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
    return (match?.[0] || "").trim().toLowerCase();
  }

  const source = String(value);
  const match = source.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  return (match?.[0] || "").trim().toLowerCase();
}

function getHeader(headers: Record<string, string> | null | undefined, name: string) {
  if (!headers) return "";
  const lowerName = name.toLowerCase();
  const match = Object.entries(headers).find(([key]) => key.toLowerCase() === lowerName);
  return match?.[1] || "";
}

function threadIdFromAddress(value: unknown) {
  const source = Array.isArray(value) ? value.join(" ") : String(value || "");
  const match = source.match(/support\+thread-([a-f0-9-]{20,})@/i);
  return match?.[1] || "";
}

function threadIdFromHeaders(headers: Record<string, string> | null | undefined) {
  return sanitizePlainText(getHeader(headers, "X-MEP-Thread-ID"), 120);
}

function referencesWith(messageId?: string | null, existing?: string | null) {
  return [existing, messageId].filter(Boolean).join(" ");
}

function fallbackBodyFromEvent(event: any, received: any, fromEmail: string, subject: string) {
  const emailId = event?.data?.email_id || received?.id || "unknown";
  return [
    "Email reply received.",
    "",
    "The inbound webhook reached the site, but Resend did not provide the message body to the app.",
    `Sender: ${fromEmail || "Unknown"}`,
    `Subject: ${subject || "Email reply"}`,
    `Resend email ID: ${emailId}`,
    "",
    "Open this email in Resend > Emails > Inbound/Received to inspect the full original content.",
  ].join("\n");
}

function fallbackSender(event: any, received: any) {
  const rawId = sanitizePlainText(event?.data?.email_id || received?.id || received?.message_id || "unknown", 80);
  const safeId = rawId.replace(/[^a-zA-Z0-9-]/g, "-").slice(0, 48) || "unknown";
  return `unknown-${safeId}@editandproofread.com`;
}

function htmlToText(value: unknown) {
  if (typeof value !== "string") return "";
  return value
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, "\"")
    .replace(/&#039;/g, "'");
}

async function verifyResendEvent(request: Request, payload: string) {
  const resend = getEmailClient();
  const webhookSecret = getWebhookSecret();

  if (webhookSecret) {
    const id = request.headers.get("svix-id");
    const timestamp = request.headers.get("svix-timestamp");
    const signature = request.headers.get("svix-signature");

    if (id && timestamp && signature) {
      try {
        return resend.webhooks.verify({
          payload,
          headers: { id, timestamp, signature },
          webhookSecret,
        });
      } catch (error) {
        console.error("Inbound webhook signature verification failed:", error);
        throw new Error("Missing or invalid webhook signature");
      }
    }

    if (request.headers.get("x-webhook-secret") !== webhookSecret) {
      throw new Error("Missing or invalid webhook signature");
    }
  } else if (process.env.NODE_ENV === "production") {
    throw new Error("Inbound webhook secret is not configured");
  }

  return JSON.parse(payload);
}

async function getReceivedEmail(event: any) {
  const eventData = event?.data || {};
  if (eventData.email_id) {
    const resend = getEmailClient();
    const { data, error } = await resend.emails.receiving.get(eventData.email_id);
    if (!error && data) return data;
    console.error("Resend receiving lookup failed:", {
      emailId: eventData.email_id,
      error,
    });
  }

  return {
    to: eventData.to || [],
    from: eventData.from || "",
    subject: eventData.subject || "",
    text: eventData.text || "",
    html: eventData.html || null,
    headers: eventData.headers || null,
    message_id: eventData.message_id || "",
    created_at: eventData.created_at || new Date().toISOString(),
  };
}

export async function POST(request: Request) {
  try {
    const payload = await request.text();
    const event = await verifyResendEvent(request, payload);

    if (event?.type && event.type !== "email.received") {
      return NextResponse.json({ received: true, ignored: event.type, version: INBOUND_HANDLER_VERSION });
    }

    const received: any = await getReceivedEmail(event);
    const eventData = event?.data || {};
    const headers = received.headers || eventData.headers || {};
    const fromEmail = extractEmail(received.from)
      || extractEmail(eventData.from)
      || extractEmail(received.reply_to)
      || extractEmail(eventData.reply_to)
      || extractEmail(getHeader(headers, "From"))
      || fallbackSender(event, received);
    const subject = sanitizePlainText(received.subject || eventData.subject || "Email reply", 180) || "Email reply";
    const extractedContent = sanitizePlainText(received.text || htmlToText(received.html) || "", 5000);
    const textContent = extractedContent || fallbackBodyFromEvent(event, received, fromEmail, subject);
    const to = [
      ...(Array.isArray(received.to) ? received.to : [received.to].filter(Boolean)),
      ...(Array.isArray(eventData.to) ? eventData.to : [eventData.to].filter(Boolean)),
      ...(Array.isArray(received.reply_to) ? received.reply_to : []),
      ...(Array.isArray(eventData.reply_to) ? eventData.reply_to : []),
      getHeader(headers, "Delivered-To"),
      getHeader(headers, "Envelope-To"),
      getHeader(headers, "Original-To"),
      getHeader(headers, "To"),
    ].filter(Boolean);
    const inboundMessageId = sanitizePlainText(received.message_id || event?.data?.message_id || "", 240);
    const inboundReferences = sanitizePlainText(getHeader(headers, "References"), 1000);
    const inboundInReplyTo = sanitizePlainText(getHeader(headers, "In-Reply-To"), 240);

    console.info("Inbound email webhook received:", {
      eventType: event?.type || "unknown",
      emailId: event?.data?.email_id || received.id || null,
      from: fromEmail || "missing",
      eventFromPresent: Boolean(eventData.from),
      receivedFromPresent: Boolean(received.from),
      toCount: to.length,
      hasText: Boolean(textContent),
      usedFallbackBody: !extractedContent,
      hasMessageId: Boolean(inboundMessageId),
      hasInReplyTo: Boolean(inboundInReplyTo),
      hasReferences: Boolean(inboundReferences),
    });

    if (fromEmail === SUPPORT_EMAIL.toLowerCase()) {
      return NextResponse.json({ received: true, ignored: "support-sender", version: INBOUND_HANDLER_VERSION });
    }

    const supabase = createSupabaseAdminClient();
    const explicitThreadId = threadIdFromAddress(to) || threadIdFromHeaders(headers);
    const threadKey = makeThreadKey(fromEmail);

    let thread: ContactThread | null = null;
    let matchSource = "created";
    if (explicitThreadId) {
      const result = await supabase
        .from("contact_messages")
        .select("id, name, email, unread_count, source, user_id, project_id, email_references")
        .eq("id", explicitThreadId)
        .maybeSingle();
      thread = result.data;
      if (thread) matchSource = "thread-token";
    }

    if (!thread && inboundInReplyTo) {
      const result = await supabase
        .from("contact_messages")
        .select("id, name, email, unread_count, source, user_id, project_id, email_references")
        .eq("inbound_message_id", inboundInReplyTo)
        .order("latest_message_at", { ascending: false, nullsFirst: false })
        .limit(1)
        .maybeSingle();
      thread = result.data;
      if (thread) matchSource = "in-reply-to";
    }

    if (!thread && inboundReferences) {
      const token = inboundInReplyTo || inboundMessageId;
      if (token) {
        const result = await supabase
          .from("contact_messages")
          .select("id, name, email, unread_count, source, user_id, project_id, email_references")
          .ilike("email_references", `%${token.replace(/[%_]/g, "")}%`)
          .order("latest_message_at", { ascending: false, nullsFirst: false })
          .limit(1)
          .maybeSingle();
        thread = result.data;
        if (thread) matchSource = "references";
      }
    }

    if (!thread) {
      const result = await supabase
        .from("contact_messages")
        .select("id, name, email, unread_count, source, user_id, project_id, email_references")
        .eq("thread_key", threadKey)
        .order("latest_message_at", { ascending: false, nullsFirst: false })
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      thread = result.data;
      if (thread) matchSource = "thread-key";
    }

    if (!thread) {
      const result = await supabase
        .from("contact_messages")
        .select("id, name, email, unread_count, source, user_id, project_id, email_references")
        .eq("email", fromEmail)
        .order("latest_message_at", { ascending: false, nullsFirst: false })
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      thread = result.data;
      if (thread) matchSource = "sender-email";
    }

    const now = new Date().toISOString();
    let threadId = thread?.id;

    if (threadId && inboundMessageId) {
      const duplicate = await supabase
        .from("contact_message_replies")
        .select("id")
        .eq("message_id", threadId)
        .eq("inbound_message_id", inboundMessageId)
        .limit(1)
        .maybeSingle();

      if (duplicate.data?.id) {
        console.info("Inbound email webhook duplicate ignored:", { threadId, inboundMessageId });
        return NextResponse.json({ success: true, duplicate: true, thread_id: threadId, version: INBOUND_HANDLER_VERSION });
      }
    }

    if (!threadId) {
      const created = await supabase
        .from("contact_messages")
        .insert({
          thread_key: threadKey,
          name: fromEmail,
          email: fromEmail,
          subject,
          message: textContent,
          source: "Email Reply",
          status: "New",
          latest_message: textContent,
          latest_message_at: now,
          last_sender: "user",
          unread_count: 1,
          inbound_message_id: inboundMessageId || null,
          email_references: referencesWith(inboundMessageId, inboundReferences || inboundInReplyTo),
        })
        .select("id, name, email, unread_count, source, user_id, project_id, email_references")
        .single();

      if (created.error || !created.data) {
        console.error("Failed to create inbound contact thread:", created.error);
        return NextResponse.json({ error: "Database error" }, { status: 500 });
      }
      thread = created.data;
      threadId = created.data.id;
    } else {
      const currentThread = thread;
      const { error: replyError } = await supabase.from("contact_message_replies").insert({
        message_id: threadId,
        reply: textContent,
        sent_to: SUPPORT_EMAIL,
        sender_type: "user",
        sender_name: currentThread?.name || fromEmail,
        sender_email: fromEmail,
        inbound_message_id: inboundMessageId || null,
        email_references: referencesWith(inboundMessageId, inboundReferences || inboundInReplyTo),
      });

      if (replyError) {
        console.error("Failed to save inbound contact reply:", replyError);
        return NextResponse.json({ error: "Database error" }, { status: 500 });
      }
    }

    await supabase
      .from("contact_messages")
      .update({
        subject,
        status: "New",
        latest_message: textContent,
        latest_message_at: now,
        last_sender: "user",
        unread_count: Number(thread?.unread_count || 0) + 1,
        inbound_message_id: inboundMessageId || null,
        email_references: referencesWith(inboundMessageId, [thread?.email_references, inboundReferences, inboundInReplyTo].filter(Boolean).join(" ")),
        updated_at: now,
      })
      .eq("id", threadId);

    await sendContactNotificationEmail({
      name: thread?.name || fromEmail,
      email: fromEmail,
      subject,
      content: textContent,
      source: "Email Reply",
      userId: thread?.user_id,
      projectId: thread?.project_id,
      threadUrl: `${new URL(request.url).origin}/admin/requests?message=${threadId}`,
    });

    console.info("Inbound email webhook saved:", { threadId, from: fromEmail, matchedBy: matchSource });
    return NextResponse.json({ success: true, thread_id: threadId, version: INBOUND_HANDLER_VERSION });
  } catch (error) {
    console.error("Inbound webhook error:", error);
    return NextResponse.json({ error: "Inbound email could not be processed.", version: INBOUND_HANDLER_VERSION }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    route: "resend-inbound-email",
    version: INBOUND_HANDLER_VERSION,
  });
}
