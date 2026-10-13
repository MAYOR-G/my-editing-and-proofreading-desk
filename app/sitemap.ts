import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog";
import { seoServicePages } from "@/lib/seo-service-pages";
import { absoluteUrl } from "@/lib/site";

const BLOG_POSTS_PER_PAGE = 12;

const staticRoutes: Array<{ path: string; lastModified?: string }> = [
  { path: "/" },
  { path: "/about" },
  { path: "/services" },
  { path: "/submit" },
  { path: "/pricing" },
  { path: "/editorial-policy" },
  { path: "/ai-editing-tool" },
  { path: "/editors" },
  { path: "/blog" },
  { path: "/faq" },
  { path: "/contact" },
  { path: "/privacy" },
  { path: "/refund-policy" },
  { path: "/terms" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const seoServiceRoutes = seoServicePages.map((service) => ({
    path: `/${service.slug}`,
    lastModified: service.dateUpdated,
  }));

  const blogRoutes = blogPosts.map((post) => ({
    path: `/blog/${post.slug}`,
    lastModified: post.dateUpdated,
  }));

  return [...staticRoutes, ...seoServiceRoutes, ...blogRoutes].map((route) => ({
    url: route.path === "/" ? absoluteUrl(route.path).replace(/\/$/, "") : absoluteUrl(route.path),
    lastModified: route.lastModified ? new Date(`${route.lastModified}T00:00:00.000Z`) : undefined,
  }));
}
