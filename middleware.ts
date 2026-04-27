import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: "",
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: "",
            ...options,
          });
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  const adminClient = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
    ? createSupabaseClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY,
        {
          auth: {
            autoRefreshToken: false,
            persistSession: false,
          },
        }
      )
    : null;

  const getAdminRole = async (userId: string) => {
    const client = adminClient ?? supabase;
    const { data: profile } = await client
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .single();

    return profile?.role;
  };

  const pathname = request.nextUrl.pathname;

  // Protect dashboard routes
  if (pathname.startsWith('/dashboard') && !user) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const isAdminLogin = pathname.startsWith('/admin/login');
  const isAdminAccessDenied = pathname.startsWith('/admin/access-denied');

  // Protect admin routes while allowing the dedicated login and denied pages.
  if (pathname.startsWith('/admin') && !isAdminLogin && !isAdminAccessDenied) {
    if (!user) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    if (await getAdminRole(user.id) !== 'admin') {
      return NextResponse.redirect(new URL('/admin/access-denied', request.url));
    }
  }

  if (isAdminAccessDenied) {
    if (!user) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    if (await getAdminRole(user.id) === 'admin') {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  // If user is already logged in as admin and visits /admin/login, redirect to /admin
  if (isAdminLogin && user) {
     if (await getAdminRole(user.id) === 'admin') {
       return NextResponse.redirect(new URL('/admin', request.url));
     }
  }

  // Set Security Headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
