import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: [
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "ClaudeBot",
          "Claude-SearchBot",
          "Claude-User",
          "PerplexityBot",
          "Perplexity-User",
          "Applebot-Extended",
          "Google-Extended",
        ],
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
