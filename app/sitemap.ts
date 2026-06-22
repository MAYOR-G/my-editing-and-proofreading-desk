import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog";
import { servicePages } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

const staticRoutes = [
  { path: "/", priority: 1, changeFrequency: "weekly", lastModified: "2026-06-22" },
  { path: "/about", priority: 0.8, changeFrequency: "monthly", lastModified: "2026-06-22" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly", lastModified: "2026-06-22" },
  { path: "/pricing", priority: 0.9, changeFrequency: "monthly", lastModified: "2026-06-22" },
  { path: "/ai-editing-tool", priority: 0.7, changeFrequency: "monthly", lastModified: "2026-06-22" },
  { path: "/editors", priority: 0.75, changeFrequency: "monthly", lastModified: "2026-06-22" },
  { path: "/blog", priority: 0.7, changeFrequency: "weekly", lastModified: "2026-06-22" },
  { path: "/faq", priority: 0.7, changeFrequency: "monthly", lastModified: "2026-06-22" },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly", lastModified: "2026-06-22" },
  { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly", lastModified: "2026-06-22" },
  { path: "/refund-policy", priority: 0.3, changeFrequency: "yearly", lastModified: "2026-06-22" },
  { path: "/terms-and-conditions", priority: 0.3, changeFrequency: "yearly", lastModified: "2026-06-22" },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const serviceRoutes = servicePages.map((service) => ({
    path: `/services/${service.slug}`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
    lastModified: "2026-06-22",
  }));

  const blogRoutes = blogPosts.map((post) => ({
    path: `/blog/${post.slug}`,
    priority: 0.65,
    changeFrequency: "monthly" as const,
    lastModified: post.dateUpdated,
  }));

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes].map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: new Date(`${route.lastModified}T00:00:00.000Z`),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
