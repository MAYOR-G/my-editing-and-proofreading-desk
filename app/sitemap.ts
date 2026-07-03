import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog";
import { seoServicePages } from "@/lib/seo-service-pages";
import { absoluteUrl } from "@/lib/site";

const staticRoutes = [
  { path: "/", priority: 1, changeFrequency: "weekly", lastModified: "2026-07-03" },
  { path: "/about", priority: 0.8, changeFrequency: "monthly", lastModified: "2026-07-03" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly", lastModified: "2026-07-03" },
  { path: "/submit", priority: 0.92, changeFrequency: "monthly", lastModified: "2026-07-03" },
  { path: "/pricing", priority: 0.9, changeFrequency: "monthly", lastModified: "2026-07-03" },
  { path: "/editorial-policy", priority: 0.65, changeFrequency: "yearly", lastModified: "2026-07-03" },
  { path: "/ai-editing-tool", priority: 0.7, changeFrequency: "monthly", lastModified: "2026-07-03" },
  { path: "/editors", priority: 0.75, changeFrequency: "monthly", lastModified: "2026-07-03" },
  { path: "/blog", priority: 0.7, changeFrequency: "weekly", lastModified: "2026-07-03" },
  { path: "/faq", priority: 0.7, changeFrequency: "monthly", lastModified: "2026-07-03" },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly", lastModified: "2026-07-03" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly", lastModified: "2026-07-03" },
  { path: "/refund-policy", priority: 0.3, changeFrequency: "yearly", lastModified: "2026-07-03" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly", lastModified: "2026-07-03" },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const seoServiceRoutes = seoServicePages.map((service) => ({
    path: `/${service.slug}`,
    priority: 0.88,
    changeFrequency: "monthly" as const,
    lastModified: "2026-07-03",
  }));

  const blogRoutes = blogPosts.map((post) => ({
    path: `/blog/${post.slug}`,
    priority: 0.65,
    changeFrequency: "monthly" as const,
    lastModified: post.dateUpdated,
  }));

  return [...staticRoutes, ...seoServiceRoutes, ...blogRoutes].map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: new Date(`${route.lastModified}T00:00:00.000Z`),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
