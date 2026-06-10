import { NextResponse } from "next/server";
import { sendSubscriberWelcomeEmail } from "@/lib/email";
import { checkRateLimit } from "@/lib/rate-limit";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

function cleanEmail(value: unknown) {
  return String(value || "").trim().toLowerCase().slice(0, 220);
}

function getClientIdentifier(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const cfIp = request.headers.get("cf-connecting-ip")?.trim();
  const realIp = request.headers.get("x-real-ip")?.trim();
  const userAgent = request.headers.get("user-agent")?.slice(0, 80) || "unknown-agent";

  return `${cfIp || forwarded || realIp || "anonymous"}:${userAgent}`;
}

export async function POST(request: Request) {
  try {
    const clientIdentifier = getClientIdentifier(request);
    const cooldown = await checkRateLimit(`newsletter-cooldown:${clientIdentifier}`, 1, 20);
    if (!cooldown.success) {
      return NextResponse.json(
        { error: "Please wait a moment before subscribing again." },
        { status: 429 }
      );
    }

    const payload = await request.json();
    const email = cleanEmail(payload.email);
    const honeypot = String(payload.website || "").trim();

    if (honeypot) {
      return NextResponse.json(
        { error: "We could not verify this subscription. Please refresh and try again." },
        { status: 400 }
      );
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const supabaseAdmin = createSupabaseAdminClient();
    const now = new Date().toISOString();
    const { error } = await supabaseAdmin
      .from("newsletter_subscribers")
      .upsert(
        {
          email,
          status: "subscribed",
          source: "Footer subscribe form",
          subscribed_at: now,
          updated_at: now,
        },
        { onConflict: "email" }
      );

    if (error) {
      console.error("Newsletter subscription failed:", error);
      return NextResponse.json(
        { error: "We could not save this subscription right now." },
        { status: 500 }
      );
    }

    await sendSubscriberWelcomeEmail(email);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { error: "We could not subscribe this email right now." },
      { status: 500 }
    );
  }
}
