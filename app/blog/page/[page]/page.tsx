import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogArchiveGrid, getBlogArchivePagePosts, BLOG_POSTS_PER_PAGE } from "@/components/blog/BlogArchiveGrid";
import { PublicPageShell } from "@/components/PublicPageShell";
import { blogPosts } from "@/lib/blog";
import { blogCollectionJsonLd, buildPageMetadata, jsonLdScript, webPageJsonLd } from "@/lib/site";

type BlogArchivePageProps = {
  params: {
    page: string;
  };
};

function getTotalPages() {
  return Math.ceil(blogPosts.length / BLOG_POSTS_PER_PAGE);
}

function parsePageParam(page: string) {
  if (!/^\d+$/.test(page)) return null;
  const parsed = Number(page);
  if (parsed < 2 || parsed > getTotalPages()) return null;
  return parsed;
}

export function generateStaticParams() {
  return Array.from({ length: Math.max(getTotalPages() - 1, 0) }, (_, index) => ({
    page: String(index + 2),
  }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: BlogArchivePageProps): Metadata {
  const currentPage = parsePageParam(params.page);

  if (!currentPage) {
    return buildPageMetadata({
      title: "Editing and Proofreading Blog",
      description: "Editing, proofreading, academic writing, manuscript, and business writing guides.",
      path: "/blog",
      noIndex: true,
    });
  }

  return buildPageMetadata({
    title: `Editing and Proofreading Blog | Page ${currentPage}`,
    description: `Browse page ${currentPage} of editing, proofreading, academic writing, manuscript, business writing, and document-preparation guides.`,
    path: `/blog/page/${currentPage}`,
  });
}

export default function PaginatedBlogPage({ params }: BlogArchivePageProps) {
  const currentPage = parsePageParam(params.page);

  if (!currentPage) {
    notFound();
  }

  const pagePosts = getBlogArchivePagePosts(blogPosts, currentPage);
  const totalPages = getTotalPages();

  return (
    <PublicPageShell
      eyebrow="Editorial resources"
      title={`Editing and Proofreading Guides, Page ${currentPage}`}
      description="Explore practical guides on academic editing, proofreading, manuscript preparation, business writing, grammar, and document submission."
      seoPath={`/blog/page/${currentPage}`}
      breadcrumbItems={[
        { name: "Home", path: "/" },
        { name: "Blog", path: "/blog" },
        { name: `Page ${currentPage}`, path: `/blog/page/${currentPage}` },
      ]}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript([
          blogCollectionJsonLd(pagePosts),
          webPageJsonLd({
            path: `/blog/page/${currentPage}`,
            name: `Editing and Proofreading Guides, Page ${currentPage}`,
            description: "Paginated editing and proofreading guide archive.",
          }),
        ])}
      />
      <BlogArchiveGrid posts={pagePosts} currentPage={currentPage} totalPages={totalPages} />
    </PublicPageShell>
  );
}
