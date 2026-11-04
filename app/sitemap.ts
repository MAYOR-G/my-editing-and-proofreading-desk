import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog";
import { seoServicePages } from "@/lib/seo-service-pages";
import { SITE_LAST_MODIFIED, absoluteUrl } from "@/lib/site";

const BLOG_POSTS_PER_PAGE = 12;

const staticRoutes: Array<{ path: string; lastModified?: string }> = [
  { path: "/", lastModified: SITE_LAST_MODIFIED },
  { path: "/about", lastModified: SITE_LAST_MODIFIED },
  { path: "/services", lastModified: SITE_LAST_MODIFIED },
  { path: "/submit", lastModified: SITE_LAST_MODIFIED },
  { path: "/pricing", lastModified: SITE_LAST_MODIFIED },
  { path: "/editorial-policy", lastModified: SITE_LAST_MODIFIED },
  { path: "/ai-editing-tool", lastModified: SITE_LAST_MODIFIED },
  { path: "/editors", lastModified: SITE_LAST_MODIFIED },
  { path: "/blog", lastModified: SITE_LAST_MODIFIED },
  { path: "/faq", lastModified: SITE_LAST_MODIFIED },
  { path: "/contact", lastModified: SITE_LAST_MODIFIED },
  { path: "/privacy", lastModified: SITE_LAST_MODIFIED },
  { path: "/refund-policy", lastModified: SITE_LAST_MODIFIED },
  { path: "/terms", lastModified: SITE_LAST_MODIFIED },
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

  const totalBlogPages = Math.ceil(blogPosts.length / BLOG_POSTS_PER_PAGE);
  const paginatedBlogRoutes = Array.from({ length: Math.max(totalBlogPages - 1, 0) }, (_, index) => ({
    path: `/blog/page/${index + 2}`,
    lastModified: blogPosts[0]?.dateUpdated,
  }));

  return [...staticRoutes, ...seoServiceRoutes, ...paginatedBlogRoutes, ...blogRoutes].map((route) => ({
    url: route.path === "/" ? absoluteUrl(route.path).replace(/\/$/, "") : absoluteUrl(route.path),
    lastModified: route.lastModified ? new Date(`${route.lastModified}T00:00:00.000Z`) : undefined,
  }));
}
