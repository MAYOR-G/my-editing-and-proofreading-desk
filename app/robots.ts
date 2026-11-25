import type { MetadataRoute } from "next";
import { seoServicePages } from "@/lib/seo-service-pages";
import { absoluteUrl } from "@/lib/site";

const publicAllowedPaths = [
  "/",
  "/services",
  "/pricing",
  "/ai-editing-tool",
  "/blog",
  "/blog/",
  "/submit",
  "/editors",
  "/editorial-policy",
  "/about",
  "/faq",
  "/contact",
  "/llms.txt",
  ...seoServicePages.map((service) => `/${service.slug}`),
];

const privateDisallowedPaths = [
  "/admin/",
  "/api/",
  "/auth/",
  "/dashboard",
  "/dashboard/",
  "/dashboard/uploads",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: [
          "Googlebot",
          "Google-Extended",
          "OAI-SearchBot",
          "GPTBot",
          "ChatGPT-User",
          "PerplexityBot",
          "Perplexity-User",
          "ClaudeBot",
          "Claude-SearchBot",
          "Claude-User",
          "Applebot-Extended",
        ],
        allow: publicAllowedPaths,
        disallow: privateDisallowedPaths,
      },
      {
        userAgent: "*",
        allow: publicAllowedPaths,
        disallow: privateDisallowedPaths,
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
