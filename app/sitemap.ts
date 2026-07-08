import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog";
import { seoServicePages } from "@/lib/seo-service-pages";
import { absoluteUrl, SITE_LAST_MODIFIED } from "@/lib/site";

const staticRoutes = [
  { path: "/", priority: 1, changeFrequency: "weekly", lastModified: SITE_LAST_MODIFIED },
  { path: "/about", priority: 0.8, changeFrequency: "monthly", lastModified: SITE_LAST_MODIFIED },
  { path: "/services", priority: 0.9, changeFrequency: "monthly", lastModified: SITE_LAST_MODIFIED },
  { path: "/submit", priority: 0.92, changeFrequency: "monthly", lastModified: SITE_LAST_MODIFIED },
  { path: "/pricing", priority: 0.9, changeFrequency: "monthly", lastModified: SITE_LAST_MODIFIED },
  { path: "/editorial-policy", priority: 0.65, changeFrequency: "yearly", lastModified: SITE_LAST_MODIFIED },
  { path: "/ai-editing-tool", priority: 0.7, changeFrequency: "monthly", lastModified: SITE_LAST_MODIFIED },
  { path: "/editors", priority: 0.75, changeFrequency: "monthly", lastModified: SITE_LAST_MODIFIED },
  { path: "/blog", priority: 0.7, changeFrequency: "weekly", lastModified: SITE_LAST_MODIFIED },
  { path: "/faq", priority: 0.7, changeFrequency: "monthly", lastModified: SITE_LAST_MODIFIED },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly", lastModified: SITE_LAST_MODIFIED },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly", lastModified: SITE_LAST_MODIFIED },
  { path: "/refund-policy", priority: 0.3, changeFrequency: "yearly", lastModified: SITE_LAST_MODIFIED },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly", lastModified: SITE_LAST_MODIFIED },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const seoServiceRoutes = seoServicePages.map((service) => ({
    path: `/${service.slug}`,
    priority: 0.88,
    changeFrequency: "monthly" as const,
    lastModified: SITE_LAST_MODIFIED,
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
