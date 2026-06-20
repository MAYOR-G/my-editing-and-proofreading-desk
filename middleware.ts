import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const PREFERRED_ORIGIN = "https://editandproofread.com";
const WWW_HOSTNAME = "www.editandproofread.com";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const forwardedHost = request.headers.get("x-forwarded-host")?.split(",")[0]?.trim();
  const requestHost = forwardedHost || request.headers.get("host") || request.nextUrl.hostname;
  const hostname = requestHost.split(":")[0].toLowerCase();

  if (
    process.env.NODE_ENV === "production" &&
    hostname === WWW_HOSTNAME
  ) {
    return NextResponse.redirect(
      new URL(`${pathname}${request.nextUrl.search}`, PREFERRED_ORIGIN),
      301
    );
  }

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const isDashboardRoute = pathname.startsWith('/dashboard');
  const isAdminRoute = pathname.startsWith('/admin');
  const isAdminLogin = pathname.startsWith('/admin/login');
  const isAdminAccessDenied = pathname.startsWith('/admin/access-denied');

  // Public pages do not need a Supabase network round-trip. Keeping them out
  // of auth middleware prevents local dev reloads when Supabase is unreachable.
  if (!isDashboardRoute && !isAdminRoute) {
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    return response;
  }

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

  let user = null;

  try {
    const { data } = await supabase.auth.getUser();
    user = data.user;
  } catch (error) {
    console.error("Auth middleware failed to fetch user:", error);
  }

  const getAdminRole = async (userId: string) => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (supabaseUrl && serviceRoleKey) {
      try {
        const profileResponse = await fetch(
          `${supabaseUrl}/rest/v1/profiles?id=eq.${encodeURIComponent(userId)}&select=role`,
          {
            headers: {
              apikey: serviceRoleKey,
              Authorization: `Bearer ${serviceRoleKey}`,
            },
          }
        );

        if (profileResponse.ok) {
          const profiles = await profileResponse.json() as Array<{ role?: string }>;
          return profiles[0]?.role;
        }
      } catch (error) {
        console.error("Admin role lookup failed:", error);
      }
    }

    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single();

      return profile?.role;
    } catch (error) {
      console.error("Admin role fallback lookup failed:", error);
      return undefined;
    }
  };

  // Protect dashboard routes
  if (isDashboardRoute && !user) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Protect admin routes while allowing the dedicated login and denied pages.
  if (isAdminRoute && !isAdminLogin && !isAdminAccessDenied) {
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
    "/((?!_next/static|_next/image).*)",
  ],
};
