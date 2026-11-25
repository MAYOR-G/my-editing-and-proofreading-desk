import { createClient } from "@/utils/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";
import { NextResponse } from "next/server";

async function syncAuthenticatedProfile(user: {
  id: string;
  email?: string;
  app_metadata?: Record<string, unknown>;
  user_metadata?: Record<string, unknown>;
}) {
  if (!user?.id || !user.email) return;

  try {
    const supabaseAdmin = createSupabaseAdminClient();
    const rawProvider = String(user.app_metadata?.provider || "email").toLowerCase();
    const providers = Array.isArray(user.app_metadata?.providers)
      ? (user.app_metadata.providers as string[]).map((p) => String(p).toLowerCase())
      : [rawProvider];
    const authProvider: "google" | "credentials" =
      rawProvider === "google" || providers.includes("google") ? "google" : "credentials";

    const displayName =
      (typeof user.user_metadata?.full_name === "string" && user.user_metadata.full_name.trim()) ||
      (typeof user.user_metadata?.name === "string" && user.user_metadata.name.trim()) ||
      null;
    const avatarUrl =
      (typeof user.user_metadata?.avatar_url === "string" && user.user_metadata.avatar_url.trim()) ||
      (typeof user.user_metadata?.picture === "string" && user.user_metadata.picture.trim()) ||
      null;

    const { data: existingByEmail } = await supabaseAdmin
      .from("profiles")
      .select("id, email, full_name, role")
      .eq("email", user.email)
      .maybeSingle();

    const mergedName = existingByEmail?.full_name || displayName;

    const fullPayload: Record<string, unknown> = {
      id: existingByEmail?.id || user.id,
      email: user.email,
      full_name: mergedName,
      name: mergedName,
      avatar_url: avatarUrl,
      auth_provider: authProvider,
    };

    const { error: upsertError } = await supabaseAdmin
      .from("profiles")
      .upsert(fullPayload, { onConflict: "email" });

    if (upsertError) {
      // Fallback if the database has not yet added name/avatar_url/auth_provider columns
      await supabaseAdmin
        .from("profiles")
        .upsert(
          {
            id: existingByEmail?.id || user.id,
            email: user.email,
            full_name: mergedName,
          },
          { onConflict: "email" }
        );
    }
  } catch (err) {
    console.error("Failed to sync OAuth profile:", err);
  }
}

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const requestedNext = requestUrl.searchParams.get("next") || "/dashboard";
  const safeCandidate = requestedNext.startsWith("/")
    && !requestedNext.startsWith("//")
    && !requestedNext.includes("\\")
    ? requestedNext
    : "/dashboard";
  const nextUrl = new URL(safeCandidate, requestUrl.origin);
  const next = nextUrl.origin === requestUrl.origin
    ? `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`
    : "/dashboard";

  if (code) {
    const supabase = createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error) {
      if (data?.user) {
        await syncAuthenticatedProfile(data.user);
      }
      return NextResponse.redirect(new URL(next, requestUrl.origin));
    }
  }

  // Return the user to an error page with instructions
  return NextResponse.redirect(new URL("/login?error=auth_callback_failed", requestUrl.origin));
}
