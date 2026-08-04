import type { Metadata } from "next";
import { BlogArchiveGrid, getBlogArchivePagePosts, BLOG_POSTS_PER_PAGE } from "@/components/blog/BlogArchiveGrid";
import { PublicPageShell } from "@/components/PublicPageShell";
import { blogPosts } from "@/lib/blog";
import { blogCollectionJsonLd, buildPageMetadata, jsonLdScript, webPageJsonLd } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "Editing and Proofreading Blog | Writing Guides",
  description: "Practical editing, proofreading, academic writing, manuscript, and business writing guides from My Editing and Proofreading Desk.",
  path: "/blog",
});

export default function BlogPage() {
  const pagePosts = getBlogArchivePagePosts(blogPosts, 1);
  const totalPages = Math.ceil(blogPosts.length / BLOG_POSTS_PER_PAGE);

  return (
    <PublicPageShell
      eyebrow="Editorial resources"
      title="Editing and Proofreading Guides"
      description="Explore practical guides on academic editing, proofreading, manuscript preparation, business writing, grammar, and document submission."
      seoPath="/blog"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript([
          blogCollectionJsonLd(pagePosts),
          webPageJsonLd({ path: "/blog", name: "Editing and Proofreading Guides", description: "Practical guides for editing, proofreading, academic writing, manuscript preparation, and document submission." }),
        ])}
      />
      <BlogArchiveGrid posts={pagePosts} currentPage={1} totalPages={totalPages} />
    </PublicPageShell>
  );
}
