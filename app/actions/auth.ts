"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { checkRateLimit } from "@/lib/rate-limit";

export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required." };
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

  if (!email || !password || !fullName) {
    return { error: "All fields are required." };
  }

  const rateLimitResult = await checkRateLimit(`signup-${email}`, 3, 3600); // 3 signups per hour per email
  if (!rateLimitResult.success) {
    return { error: "Too many signup attempts. Please try again later." };
  }

  const supabase = createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });

  if (error) {
    return { error: error.message };
  }

  // Instead of redirecting immediately, we return success so the UI can show the email verification popup
  return { success: true, message: "Account created! Please check your email for the verification link." };
}

export async function signout() {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

export async function resetPasswordForEmail(formData: FormData) {
  const email = formData.get("email") as string;
  const supabase = createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/auth/callback?next=/reset-password`,
  });

  if (error) {
    return { error: error.message };
  }

  return { success: true, message: "A password reset link has been sent to your email." };
}

export async function updatePassword(formData: FormData) {
  const password = formData.get("password") as string;
  const supabase = createClient();

  const { error } = await supabase.auth.updateUser({
    password,
  });

  if (error) {
    return { error: error.message };
  }

  redirect("/dashboard");
}
