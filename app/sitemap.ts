import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog";
import { seoServicePages } from "@/lib/seo-service-pages";
import { absoluteUrl, SITE_LAST_MODIFIED } from "@/lib/site";

const BLOG_POSTS_PER_PAGE = 12;

const staticRoutes = [
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
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const seoServiceRoutes = seoServicePages.map((service) => ({
    path: `/${service.slug}`,
    lastModified: SITE_LAST_MODIFIED,
  }));

  const blogRoutes = blogPosts.map((post) => ({
    path: `/blog/${post.slug}`,
    lastModified: post.dateUpdated,
  }));

  const paginatedBlogRoutes = Array.from(
    { length: Math.max(Math.ceil(blogPosts.length / BLOG_POSTS_PER_PAGE) - 1, 0) },
    (_, index) => ({
      path: `/blog/page/${index + 2}`,
      lastModified: SITE_LAST_MODIFIED,
    })
  );

  return [...staticRoutes, ...paginatedBlogRoutes, ...seoServiceRoutes, ...blogRoutes].map((route) => ({
    url: route.path === "/" ? absoluteUrl(route.path).replace(/\/$/, "") : absoluteUrl(route.path),
    lastModified: new Date(`${route.lastModified}T00:00:00.000Z`),
  }));
}
