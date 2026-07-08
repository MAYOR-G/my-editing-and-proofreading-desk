import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "PerplexityBot"],
        allow: "/",
        disallow: ["/admin/", "/api/", "/auth/", "/dashboard/"],
      },
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/auth/", "/dashboard/"],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
