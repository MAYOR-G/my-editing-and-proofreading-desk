"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { sendInternalProjectMessageEmail, sendProjectMessageEmail } from "@/lib/email";

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
        await sendProjectMessageEmail(clientProfile.email, {
          recipientName: clientProfile.full_name,
          friendlyId: project?.friendly_id,
          content,
        });
      }
    } else {
      // Notify the admin that a client replied
      await sendInternalProjectMessageEmail({
        clientName: profile?.full_name,
        clientEmail: profile?.email,
        content,
      });
    }
  } catch (err) {
    console.warn("Could not send email notification:", err);
  }

  revalidatePath(`/dashboard/active/${projectId}`);
  revalidatePath(`/admin`);

  return { success: true };
}
