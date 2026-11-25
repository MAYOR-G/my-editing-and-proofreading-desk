"use client";

import { useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

export function OAuthRedirectWatcher() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const hash = window.location.hash;
    const search = window.location.search;

    if (search.includes("code=")) {
      window.location.replace(`/auth/callback${search}`);
      return;
    }

    if (hash && (hash.includes("access_token=") || hash.includes("refresh_token="))) {
      const supabase = createClient();
      supabase.auth.getSession().then(({ data }) => {
        if (data?.session) {
          window.location.replace("/dashboard/uploads");
        }
      });
    }
  }, []);

  return null;
}
