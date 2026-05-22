import { createSupabaseAdminClient } from "@/lib/supabase-admin";

type DashboardUser = {
  id: string;
  email?: string | null;
};

export async function getDashboardProjectOwnerIds(user: DashboardUser) {
  const supabaseAdmin = createSupabaseAdminClient();
  const ownerIds = new Set<string>([user.id]);

  if (user.email) {
    const { data, error } = await supabaseAdmin
      .from("profiles")
      .select("id")
      .eq("email", user.email);

    if (error) {
      console.error("Dashboard profile lookup failed:", error);
    }

    for (const profile of data || []) {
      if (profile.id) ownerIds.add(profile.id);
    }
  }

  return Array.from(ownerIds);
}

export async function getDashboardProjectsForUser(user: DashboardUser) {
  const supabaseAdmin = createSupabaseAdminClient();
  const ownerIds = await getDashboardProjectOwnerIds(user);

  const { data, error } = await supabaseAdmin
    .from("projects")
    .select("*")
    .in("client_id", ownerIds)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Dashboard projects lookup failed:", error);
    return [];
  }

  return data || [];
}

export async function getDashboardProjectForUser(user: DashboardUser, projectId: string) {
  const supabaseAdmin = createSupabaseAdminClient();
  const ownerIds = await getDashboardProjectOwnerIds(user);

  const { data, error } = await supabaseAdmin
    .from("projects")
    .select("*")
    .eq("id", projectId)
    .in("client_id", ownerIds)
    .single();

  if (error) {
    console.error("Dashboard project lookup failed:", error);
    return null;
  }

  return data;
}
