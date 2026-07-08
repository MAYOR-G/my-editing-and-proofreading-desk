import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PublicPageShell } from "@/components/PublicPageShell";
import { blogPosts, type BlogRichText, getBlogPost } from "@/lib/blog";
import { blogPostingJsonLd, buildPageMetadata, faqPageJsonLd, jsonLdScript, webPageJsonLd } from "@/lib/site";

type BlogPostPageProps = {
  params: {
    slug: string;
  };
};

function RichText({ content }: { content: BlogRichText }) {
  return (
    <>
      {content.map((part, index) => (
        typeof part === "string" ? part : (
          <Link
            key={`${part.href}-${index}`}
            href={part.href}
            target={part.external ? "_blank" : undefined}
            rel={part.external ? "noreferrer" : undefined}
            className="font-medium text-primary underline decoration-primary/25 underline-offset-4 transition hover:decoration-primary"
          >
            {part.text}
          </Link>
        )
      ))}
    </>
  );
}

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript([
          blogPostingJsonLd(post),
          webPageJsonLd({
            path: `/blog/${post.slug}`,
            name: post.title,
            description: post.excerpt,
            dateModified: post.dateUpdated,
          }),
        ])}
      />
      {post.faq.length > 0 ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(faqPageJsonLd(post.faq))} />
      ) : null}
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
                  {section.paragraphs.map((paragraph, index) => <p key={`${section.id}-paragraph-${index}`}><RichText content={paragraph} /></p>)}
                </div>

                {section.callout ? (
                  <div className="mt-6 rounded-2xl border border-primary/18 bg-primary/[0.045] p-6">
                    <h3 className="font-display text-2xl text-ink">{section.callout.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-body"><RichText content={section.callout.text} /></p>
                  </div>
                ) : null}

                {section.table ? (
                  <div className="mt-7 overflow-x-auto rounded-2xl border border-hairline">
                    <table className="min-w-full border-collapse text-left text-sm">
                      <thead className="bg-primary text-white">
                        <tr>
                          {section.table.headers.map((header) => (
                            <th key={header} scope="col" className="px-4 py-3 font-semibold">{header}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-hairline bg-canvas">
                        {section.table.rows.map((row, rowIndex) => (
                          <tr key={`${section.id}-row-${rowIndex}`} className="align-top">
                            {row.map((cell, cellIndex) => (
                              <td key={`${cell}-${cellIndex}`} className="min-w-36 px-4 py-3 leading-6 text-body first:font-semibold first:text-ink">{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : null}

                {section.bullets ? (
                  <ul className="mt-6 grid gap-3 text-base leading-7 text-body">
                    {section.bullets.map((item, index) => (
                      <li key={`${section.id}-bullet-${index}`} className="flex gap-3">
                        <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                        <span><RichText content={item} /></span>
                      </li>
                    ))}
                  </ul>
                ) : null}

                {section.numberedSteps ? (
                  <ol className="mt-6 grid gap-3 text-base leading-7 text-body">
                    {section.numberedSteps.map((item, index) => (
                      <li key={`${section.id}-step-${index}`} className="grid grid-cols-[2rem_1fr] gap-3">
                        <span className="font-display text-xl text-primary">{String(index + 1).padStart(2, "0")}</span>
                        <span><RichText content={item} /></span>
                      </li>
                    ))}
                  </ol>
                ) : null}
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
