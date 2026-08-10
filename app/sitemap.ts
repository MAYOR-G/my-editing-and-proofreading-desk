import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog";
import { seoServicePages } from "@/lib/seo-service-pages";
import { absoluteUrl } from "@/lib/site";

const BLOG_POSTS_PER_PAGE = 12;

const staticRoutes: Array<{ path: string; lastModified?: string }> = [
  { path: "/", lastModified: "2026-08-04" },
  { path: "/about", lastModified: "2026-08-04" },
  { path: "/services", lastModified: "2026-08-04" },
  { path: "/submit", lastModified: "2026-08-04" },
  { path: "/pricing", lastModified: "2026-08-10" },
  { path: "/editorial-policy", lastModified: "2026-08-04" },
  { path: "/ai-editing-tool", lastModified: "2026-08-04" },
  { path: "/editors", lastModified: "2026-08-04" },
  { path: "/blog", lastModified: "2026-08-04" },
  { path: "/faq", lastModified: "2026-08-04" },
  { path: "/contact", lastModified: "2026-08-04" },
  { path: "/privacy", lastModified: "2026-08-04" },
  { path: "/refund-policy", lastModified: "2026-08-04" },
  { path: "/terms", lastModified: "2026-08-04" },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const seoServiceRoutes = seoServicePages.map((service) => ({
    path: `/${service.slug}`,
    lastModified: service.dateUpdated,
  }));

  const blogRoutes = blogPosts.map((post) => ({
    path: `/blog/${post.slug}`,
    lastModified: post.dateUpdated,
  }));

  const paginatedBlogRoutes = Array.from(
    { length: Math.max(Math.ceil(blogPosts.length / BLOG_POSTS_PER_PAGE) - 1, 0) },
    (_, index) => ({
      path: `/blog/page/${index + 2}`,
      lastModified: "2026-08-04",
    })
  );

  return [...staticRoutes, ...paginatedBlogRoutes, ...seoServiceRoutes, ...blogRoutes].map((route) => ({
    url: route.path === "/" ? absoluteUrl(route.path).replace(/\/$/, "") : absoluteUrl(route.path),
    lastModified: route.lastModified ? new Date(`${route.lastModified}T00:00:00.000Z`) : undefined,
  }));
}
