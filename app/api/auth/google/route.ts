import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";

type GoogleTokenInfo = {
  iss?: string;
  aud?: string;
  sub?: string;
  email?: string;
  email_verified?: string | boolean;
  name?: string;
  picture?: string;
  exp?: string;
};

function sanitizeNextPath(requestedNext?: string | null) {
  if (
    requestedNext &&
    requestedNext.startsWith("/") &&
    !requestedNext.startsWith("//") &&
    !requestedNext.includes("\\")
  ) {
    return requestedNext;
  }
  return "/dashboard";
}

async function verifyGoogleIdTokenOnBackend(idToken: string): Promise<GoogleTokenInfo | null> {
  const expectedClientId =
    process.env.GOOGLE_CLIENT_ID || process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  try {
    const verifyRes = await fetch(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(idToken)}`,
      { cache: "no-store" }
    );
    if (!verifyRes.ok) return null;

    const payload = (await verifyRes.json()) as GoogleTokenInfo;
    const validIssuer =
      payload.iss === "https://accounts.google.com" || payload.iss === "accounts.google.com";
    const validEmail =
      Boolean(payload.email) &&
      (payload.email_verified === true || payload.email_verified === "true");
    const validAudience = !expectedClientId || payload.aud === expectedClientId;

    if (!validIssuer || !validEmail || !validAudience) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const credential = typeof body.credential === "string" ? body.credential.trim() : "";
    const nonce = typeof body.nonce === "string" ? body.nonce.trim() : undefined;
    const nextPath = sanitizeNextPath(typeof body.next === "string" ? body.next : "/dashboard");

    if (!credential) {
      return NextResponse.json(
        { error: "Missing Google ID token credential." },
        { status: 400 }
      );
    }

    // Verify JWT ID token server-side against Google's token verification endpoint
    const verifiedClaims = await verifyGoogleIdTokenOnBackend(credential);
    if (!verifiedClaims || !verifiedClaims.email) {
      return NextResponse.json(
        { error: "Google ID token verification failed." },
        { status: 401 }
      );
    }

    // Exchange verified Google ID token with Supabase Auth to issue HTTP-only session cookies
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithIdToken({
      provider: "google",
      token: credential,
      nonce,
    });

    if (error || !data?.user) {
      return NextResponse.json(
        { error: error?.message || "Could not establish Google session." },
        { status: 401 }
      );
    }

    // Account linking & profile metadata sync (auth_provider, email, name, avatar_url)
    try {
      const supabaseAdmin = createSupabaseAdminClient();
      const email = verifiedClaims.email.toLowerCase();
      const displayName =
        verifiedClaims.name ||
        (typeof data.user.user_metadata?.full_name === "string"
          ? data.user.user_metadata.full_name
          : null);
      const avatarUrl =
        verifiedClaims.picture ||
        (typeof data.user.user_metadata?.avatar_url === "string"
          ? data.user.user_metadata.avatar_url
          : null);

      const { data: existingProfile } = await supabaseAdmin
        .from("profiles")
        .select("id, full_name")
        .eq("email", email)
        .maybeSingle();

      const mergedName = existingProfile?.full_name || displayName;

      const { error: upsertError } = await supabaseAdmin
        .from("profiles")
        .upsert(
          {
            id: existingProfile?.id || data.user.id,
            email,
            full_name: mergedName,
            name: mergedName,
            avatar_url: avatarUrl,
            auth_provider: "google",
          },
          { onConflict: "email" }
        );

      if (upsertError) {
        await supabaseAdmin
          .from("profiles")
          .upsert(
            {
              id: existingProfile?.id || data.user.id,
              email,
              full_name: mergedName,
            },
            { onConflict: "email" }
          );
      }
    } catch (syncError) {
      console.error("Failed to sync profile after Google ID token sign-in:", syncError);
    }

    return NextResponse.json({
      success: true,
      redirectTo: nextPath,
      user: {
        id: data.user.id,
        email: verifiedClaims.email,
        name: verifiedClaims.name || null,
        avatar_url: verifiedClaims.picture || null,
        auth_provider: "google",
      },
    });
  } catch (error) {
    console.error("Google token auth error:", error);
    return NextResponse.json(
      { error: "Unable to complete Google Sign-In. Please try again." },
      { status: 500 }
    );
  }
}
