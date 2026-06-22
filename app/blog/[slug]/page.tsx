import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PublicPageShell } from "@/components/PublicPageShell";
import { blogPosts, getBlogPost } from "@/lib/blog";
import { blogPostingJsonLd, buildPageMetadata, faqPageJsonLd, jsonLdScript } from "@/lib/site";

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

  const tableOfContents = post.tableOfContents ?? post.body.map((section) => ({
    id: section.id,
    label: section.heading,
  }));
  const schemas = [
    blogPostingJsonLd(post),
    ...(post.faq.length > 0 ? [faqPageJsonLd(post.faq)] : []),
  ];

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
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(schemas)} />
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

          {tableOfContents.length > 0 ? (
            <nav aria-label="Table of contents" className="mt-10 rounded-2xl border border-hairline bg-surface-soft p-6 sm:p-7">
              <h2 className="font-display text-2xl text-ink">In this guide</h2>
              <ol className="mt-4 grid gap-2 text-sm leading-6 text-body sm:grid-cols-2">
                {tableOfContents.map((item, index) => (
                  <li key={item.id}>
                    <a href={`#${item.id}`} className="transition hover:text-primary">
                      {String(index + 1).padStart(2, "0")} · {item.label}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          ) : null}

          <div className="mt-10 grid gap-10">
            {post.body.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-28">
                <h2 className="font-display text-4xl leading-tight text-ink">{section.heading}</h2>
                <div className="mt-5 grid gap-5 text-base leading-8 text-body">
                  {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
              </section>
            ))}
          </div>

          {post.faq.length > 0 ? (
            <section className="mt-14 border-t border-hairline pt-10">
              <h2 className="font-display text-4xl leading-tight text-ink">Questions about this topic</h2>
              <div className="mt-6 grid gap-4">
                {post.faq.map((item) => (
                  <article key={item.question} className="rounded-2xl border border-hairline bg-surface-soft p-6">
                    <h3 className="font-display text-2xl leading-tight text-ink">{item.question}</h3>
                    <p className="mt-3 text-sm leading-7 text-body">{item.answer}</p>
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          {post.internalLinks.length > 0 ? (
            <aside className="mt-14 rounded-[1.35rem] border border-hairline bg-primary p-7 text-white sm:p-9">
              <h2 className="font-display text-3xl">Useful next steps</h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {post.internalLinks.map((item) => (
                  <Link key={item.href} href={item.href} className="rounded-xl border border-white/20 bg-white/5 p-4 transition hover:bg-white/10">
                    <span className="block font-semibold">{item.label}</span>
                    <span className="mt-2 block text-xs leading-5 text-white/72">{item.description}</span>
                  </Link>
                ))}
              </div>
            </aside>
          ) : null}
        </div>
      </article>
    </PublicPageShell>
  );
}
