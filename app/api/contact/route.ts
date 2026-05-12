import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";
import { SUPPORT_EMAIL, sendContactNotificationEmail } from "@/lib/email";
import { checkRateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

function cleanText(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function makeSubject(subject: string, service?: string) {
  if (subject) return subject;
  if (service) return `${service} inquiry`;
  return "Website inquiry";
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

    const payload = await request.json();
    const name = cleanText(payload.name, 160);
    const email = cleanText(payload.email, 220);
    const service = cleanText(payload.service, 120);
    const organization = cleanText(payload.organization, 160);
    const wordCount = cleanText(payload.wordCount, 40);
    const turnaround = cleanText(payload.turnaround, 80);
    const subject = makeSubject(cleanText(payload.subject, 180), service);
    const message = cleanText(payload.message, 5000);
    const source = cleanText(payload.source, 120) || "Contact Form";
    const projectId = cleanText(payload.projectId, 80) || null;

    if (!name || !email || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please enter your name, a valid email address, and a message." },
        { status: 400 }
      );
    }

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    const supabaseAdmin = createSupabaseAdminClient();

    const content = [
      organization ? `Organization: ${organization}` : "",
      service ? `Service interest: ${service}` : "",
      wordCount ? `Estimated word count: ${wordCount}` : "",
      turnaround ? `Preferred turnaround: ${turnaround}` : "",
      message,
    ].filter(Boolean).join("\n\n");

    const { error } = await supabaseAdmin.from("contact_messages").insert({
      name,
      email,
      subject,
      message: content,
      source,
      status: "New",
      user_id: user?.id || null,
      project_id: projectId,
    });

    if (error) {
      console.error("Contact message save failed:", error);
      return NextResponse.json(
        { error: `We couldn't send your message right now. Please try again or email ${SUPPORT_EMAIL}.` },
        { status: 500 }
      );
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
