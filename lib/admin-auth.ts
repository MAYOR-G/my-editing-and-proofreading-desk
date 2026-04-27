import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";

export async function requireAdmin() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  let adminClient;
  try {
    adminClient = createSupabaseAdminClient();
  } catch {
    adminClient = supabase;
  }

  const { data: profile } = await adminClient
    .from("profiles")
    .select("role, email, full_name")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    redirect("/admin/access-denied");
  }

  return { user, profile };
}
