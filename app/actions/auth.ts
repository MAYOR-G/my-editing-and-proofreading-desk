"use server";

import { createClient } from "@/utils/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { checkRateLimit } from "@/lib/rate-limit";
import { verifyTurnstileToken } from "@/lib/turnstile";

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

export async function signInWithGoogle(nextPath = "/dashboard") {
  const safeNext = sanitizeNextPath(nextPath);
  const headerStore = headers();
  const host = headerStore.get("x-forwarded-host") || headerStore.get("host");
  const proto = headerStore.get("x-forwarded-proto") || (host?.includes("localhost") || host?.includes("127.0.0.1") ? "http" : "https");
  const origin = host
    ? `${proto}://${host}`
    : process.env.NEXT_PUBLIC_SITE_URL || "https://www.editandproofread.com";

  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin}/auth/callback?next=${encodeURIComponent(safeNext)}`,
      queryParams: {
        access_type: "offline",
        prompt: "select_account",
      },
    },
  });

  if (error || !data?.url) {
    return {
      error: error?.message || "Unable to initialize Google Sign-In. Please try again or sign in with your email.",
    };
  }

  return { url: data.url };
}

export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const turnstileToken = formData.get("turnstileToken") as string;

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  const securityCheck = await verifyTurnstileToken(turnstileToken);
  if (!securityCheck.success) {
    return { error: securityCheck.error || "Security verification failed. Please try again." };
  }

  const rateLimitResult = await checkRateLimit(`login-${email}`, 5, 300);
  if (!rateLimitResult.success) {
    return { error: "Too many login attempts. Please try again later." };
  }

  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function signup(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const fullName = formData.get("full_name") as string;
  const turnstileToken = formData.get("turnstileToken") as string;

  if (!email || !password || !fullName) {
    return { error: "All fields are required." };
  }

  const securityCheck = await verifyTurnstileToken(turnstileToken);
  if (!securityCheck.success) {
    return { error: securityCheck.error || "Security verification failed. Please try again." };
  }

  const rateLimitResult = await checkRateLimit(`signup-${email}`, 3, 3600); // 3 signups per hour per email
  if (!rateLimitResult.success) {
    return { error: "Too many signup attempts. Please try again later." };
  }

  const supabase = createClient();

  const { data: signUpData, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        name: fullName,
        auth_provider: "credentials",
      },
    },
  });

  if (error) {
    return { error: error.message };
  }

  if (signUpData?.user) {
    try {
      const supabaseAdmin = createSupabaseAdminClient();
      await supabaseAdmin
        .from("profiles")
        .upsert(
          {
            id: signUpData.user.id,
            email,
            full_name: fullName,
            name: fullName,
            auth_provider: "credentials",
          },
          { onConflict: "id" }
        );
    } catch {
      // Fallback safely if optional profile columns have not yet been migrated
    }
  }

  // Instead of redirecting immediately, we return success so the UI can show the email verification popup
  return { success: true, message: "Account created! Please check your email for the verification link." };
}

export async function signout() {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect("/");
}

export async function resetPasswordForEmail(formData: FormData) {
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const genericResponse: { success: boolean; message: string; error?: string } = {
    success: true,
    message: "If an account exists for that email, a password reset link has been sent.",
  };

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return genericResponse;
  }

  const rateLimitResult = await checkRateLimit(`password-reset-${email}`, 3, 3600);
  if (!rateLimitResult.success) {
    return genericResponse;
  }

  const supabase = createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.editandproofread.com"}/auth/callback?next=/reset-password`,
  });

  if (error) {
    console.error("Password reset request failed", { code: error.code, status: error.status });
  }

  return genericResponse;
}

export async function updatePassword(formData: FormData) {
  const password = formData.get("password") as string;
  if (!password || password.length < 8) {
    return { error: "Use a password with at least 8 characters." };
  }
  const supabase = createClient();

  const { error } = await supabase.auth.updateUser({
    password,
  });

  if (error) {
    return { error: error.message };
  }

  redirect("/dashboard");
}
