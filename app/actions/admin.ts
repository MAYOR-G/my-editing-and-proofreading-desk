"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { checkRateLimit } from "@/lib/rate-limit";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";

export async function adminLogin(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  // Rate limit: 5 attempts per 5 minutes (300 seconds)
  const rateLimitResult = await checkRateLimit(`admin-login-${email}`, 5, 300);
  if (!rateLimitResult.success) {
    return { error: "Too many login attempts. Please try again later." };
  }

  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.user) {
    return { error: error?.message || "Authentication failed." };
  }

  let adminClient: ReturnType<typeof createSupabaseAdminClient>;
  try {
    adminClient = createSupabaseAdminClient();
  } catch {
    await supabase.auth.signOut();
    return { error: "Admin login is not configured. Missing Supabase service role key on the server." };
  }

  // Password auth has already succeeded; use the server-only service key for
  // the role lookup so RLS/session propagation cannot hide the profile row.
  const { data: profile, error: profileError } = await adminClient
    .from("profiles")
    .select("role, email")
    .eq("id", data.user.id)
    .single();

  if (profile?.role !== "admin") {
    await supabase.auth.signOut();
    if (profileError || !profile) {
      return { error: "Access denied. This login exists, but no profile role was found. Run the admin setup SQL for this email." };
    }
    return { error: "Access denied. Admin privileges required." };
  }

  redirect("/admin");
}

export async function adminLogout() {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
