import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PublicPageShell } from "@/components/PublicPageShell";
import { blogPosts, getBlogPost } from "@/lib/blog";
import { blogPostingJsonLd, buildPageMetadata, jsonLdScript } from "@/lib/site";

type BlogPostPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: BlogPostPageProps): Metadata {
  const post = getBlogPost(params.slug);

  if (!post) {
    return buildPageMetadata({
      title: "Editorial Guide",
      description: "Editing, proofreading, and writing guidance from My Editing and Proofreading Desk.",
      path: "/blog",
      noIndex: true,
    });
  }

  return buildPageMetadata({
    title: post.metaTitle,
    description: post.metaDescription,
    path: `/blog/${post.slug}`,
    image: post.heroImage,
    imageAlt: post.heroImageAlt,
    type: "article",
  });
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <PublicPageShell
      eyebrow={post.category}
      title={post.title}
      description={post.excerpt}
      seoPath={`/blog/${post.slug}`}
      breadcrumbItems={[
        { name: "Home", path: "/" },
        { name: "Blog", path: "/blog" },
        { name: post.title, path: `/blog/${post.slug}` },
      ]}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(blogPostingJsonLd(post))} />
      <article className="px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-wrap gap-x-5 gap-y-2 border-b border-hairline pb-5 text-sm text-muted">
            <span>By {post.author}</span>
            <time dateTime={post.datePublished}>Published {post.datePublished}</time>
            <time dateTime={post.dateUpdated}>Updated {post.dateUpdated}</time>
            <span>{post.readingTime}</span>
          </div>
          <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl border border-hairline">
            <Image src={post.heroImage} alt={post.heroImageAlt} fill priority className="object-cover" sizes="(max-width: 1024px) 100vw, 896px" />
          </div>
          <div className="mt-10 grid gap-10">
            {post.content.map((section, index) => (
              <section key={`${section.heading ?? "section"}-${index}`}>
                {section.heading ? <h2 className="font-display text-4xl leading-tight text-ink">{section.heading}</h2> : null}
                <div className="mt-5 grid gap-5 text-base leading-8 text-body">
                  {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
              </section>
            ))}
          </div>
        </div>
      </article>
    </PublicPageShell>
  );
}
