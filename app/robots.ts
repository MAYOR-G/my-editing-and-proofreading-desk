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
        allow: ["/", "/pricing", "/ai-editing-tool", "/blog/", "/llms.txt"],
        disallow: ["/admin/", "/api/", "/auth/", "/dashboard/"],
      },
      {
        userAgent: "*",
        allow: ["/", "/pricing", "/ai-editing-tool", "/blog/", "/llms.txt"],
        disallow: ["/admin/", "/api/", "/auth/", "/dashboard/"],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
