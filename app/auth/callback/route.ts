import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

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
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error) {
      return NextResponse.redirect(new URL(next, requestUrl.origin));
    }
  }

  // Return the user to an error page with instructions
  return NextResponse.redirect(new URL("/login?error=auth_callback_failed", requestUrl.origin));
}
