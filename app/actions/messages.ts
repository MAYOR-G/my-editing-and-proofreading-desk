"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { BRAND_NAME, INTERNAL_NOTIFICATION_EMAIL, SUPPORT_EMAIL, sendEmail } from "@/lib/email";

export async function sendMessage(projectId: string, content: string) {
  if (!content.trim()) return { error: "Message content is required" };

  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  // Determine if the sender is an admin
  const { data: profile } = await supabase
    .from("profiles")
    .select("role, email, full_name")
    .eq("id", user.id)
    .single();

  const isFromAdmin = profile?.role === "admin";

  const { error } = await supabase.from("messages").insert({
    project_id: projectId,
    sender_id: user.id,
    content: content.trim(),
    is_from_admin: isFromAdmin,
  });

  if (error) {
    console.error("Error sending message:", error);
    return { error: "Failed to send message" };
  }

  // Optionally send an email notification using Resend
  try {
    if (isFromAdmin) {
      // Notify the client that the admin replied
      const { data: project } = await supabase
        .from("projects")
        .select("client_id, friendly_id, profiles(email, full_name)")
        .eq("id", projectId)
        .single();
        
      const clientProfile = Array.isArray(project?.profiles) ? project.profiles[0] : project?.profiles;
      if (clientProfile?.email) {
        await sendEmail({
          from: `${BRAND_NAME} <${SUPPORT_EMAIL}>`,
          replyTo: SUPPORT_EMAIL,
          to: clientProfile.email,
          subject: `New message regarding project ${project?.friendly_id}`,
          html: `<p>Hi ${clientProfile.full_name || 'there'},</p><p>You have a new message from the editorial team regarding your project.</p><p><strong>Message:</strong><br/>${content.replace(/\n/g, '<br/>')}</p><p>Log in to your dashboard to reply.</p>`,
        });
      }
    } else {
      // Notify the admin that a client replied
      const adminEmail = process.env.INTERNAL_NOTIFICATION_EMAIL || process.env.ADMIN_NOTIFICATION_EMAIL || process.env.NOTIFICATION_GMAIL || INTERNAL_NOTIFICATION_EMAIL;
      await sendEmail({
        from: `${BRAND_NAME} <${SUPPORT_EMAIL}>`,
        replyTo: profile?.email || SUPPORT_EMAIL,
        to: adminEmail,
        subject: `New client message from ${profile?.full_name || profile?.email}`,
        html: `<p>A client has sent a new message regarding a project.</p><p><strong>Client:</strong> ${profile?.full_name || profile?.email}</p><p><strong>Message:</strong><br/>${content.replace(/\n/g, '<br/>')}</p><p>Log in to the Admin Desk to reply.</p>`,
      });
    }
  } catch (err) {
    console.warn("Could not send email notification:", err);
  }

  revalidatePath(`/dashboard/active/${projectId}`);
  revalidatePath(`/admin`);

  return { success: true };
}
