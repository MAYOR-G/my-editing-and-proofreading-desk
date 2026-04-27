import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Resend Inbound Webhook payload structure verification
    if (!body || !body.from || !body.text) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const fromEmail = body.from;
    const textContent = body.text;
    const subject = body.subject || "";

    // 1. You would parse the subject or an email header to extract the Project ID or User ID.
    // E.g., "Re: New message regarding project MEP-1024"
    const match = subject.match(/MEP-(\d+)/);
    
    if (!match) {
      // If no project ID found, we can't reliably attach it to a project.
      console.warn("Inbound email received without project ID in subject:", subject);
      return NextResponse.json({ received: true });
    }

    const friendlyId = match[0]; // e.g. MEP-1024

    // 2. Initialize a Supabase Admin Client (since this route has no user session)
    const supabase = createSupabaseAdminClient();

    // 3. Find the project and verify the sender matches the client (or admin)
    const { data: project } = await supabase
      .from("projects")
      .select("id, client_id")
      .eq("friendly_id", friendlyId)
      .single();

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("id, role")
      .eq("email", fromEmail)
      .single();

    if (!profile) {
      return NextResponse.json({ error: "Sender not registered" }, { status: 403 });
    }

    // 4. Insert the message into the database
    const { error } = await supabase.from("messages").insert({
      project_id: project.id,
      sender_id: profile.id,
      content: textContent,
      is_from_admin: profile.role === "admin",
    });

    if (error) {
      console.error("Failed to save inbound message:", error);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Inbound Webhook Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
