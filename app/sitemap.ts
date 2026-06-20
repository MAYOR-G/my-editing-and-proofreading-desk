import type { MetadataRoute } from "next";
import { servicePages } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

const staticRoutes = [
  { path: "/", priority: 1, changeFrequency: "weekly", lastModified: "2026-06-10" },
  { path: "/about", priority: 0.8, changeFrequency: "monthly", lastModified: "2026-06-10" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly", lastModified: "2026-06-10" },
  { path: "/pricing", priority: 0.9, changeFrequency: "monthly", lastModified: "2026-06-10" },
  { path: "/ai-editing-tool", priority: 0.7, changeFrequency: "monthly", lastModified: "2026-06-10" },
  { path: "/editors", priority: 0.75, changeFrequency: "monthly", lastModified: "2026-06-10" },
  { path: "/faq", priority: 0.7, changeFrequency: "monthly", lastModified: "2026-06-10" },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly", lastModified: "2026-06-10" },
  { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly", lastModified: "2026-06-10" },
  { path: "/refund-policy", priority: 0.3, changeFrequency: "yearly", lastModified: "2026-06-10" },
  { path: "/terms-and-conditions", priority: 0.3, changeFrequency: "yearly", lastModified: "2026-06-10" },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const serviceRoutes = servicePages.map((service) => ({
    path: `/services/${service.slug}`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
    lastModified: "2026-06-10",
  }));

  return [...staticRoutes, ...serviceRoutes].map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: new Date(`${route.lastModified}T00:00:00.000Z`),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
