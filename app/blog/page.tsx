import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PublicPageShell } from "@/components/PublicPageShell";
import { blogPosts } from "@/lib/blog";
import { blogCollectionJsonLd, buildPageMetadata, jsonLdScript, webPageJsonLd } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "Editing and Proofreading Blog | Writing Guides",
  description: "Practical editing, proofreading, academic writing, manuscript, and business writing guides from My Editing and Proofreading Desk.",
  path: "/blog",
});

export default function BlogPage() {
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
          blogCollectionJsonLd(blogPosts),
          webPageJsonLd({ path: "/blog", name: "Editing and Proofreading Guides", description: "Practical guides for editing, proofreading, academic writing, manuscript preparation, and document submission." }),
        ])}
      />
      <section className="bg-canvas px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          {blogPosts.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {blogPosts.map((post) => (
                <article key={post.slug} className="flex h-full flex-col overflow-hidden rounded-2xl border border-hairline bg-surface-soft shadow-[0_18px_55px_rgba(17,17,15,0.04)]">
                  <div className="relative aspect-[16/9]">
                    <Image src={post.heroImage} alt={post.heroImageAlt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">{post.category}</p>
                    <h2 className="mt-3 font-display text-3xl leading-tight text-ink">
                      <Link href={`/blog/${post.slug}`} className="transition hover:text-primary">{post.title}</Link>
                    </h2>
                    <p className="mt-4 text-sm leading-7 text-body">{post.excerpt}</p>
                    <div className="mt-auto pt-5">
                      <p className="text-xs text-muted">{post.datePublished} · {post.readingTime}</p>
                      <Link href={`/blog/${post.slug}`} className="mt-4 inline-flex min-h-10 items-center rounded-full border border-primary/20 px-4 text-sm font-semibold text-primary transition hover:border-primary/45 hover:bg-primary/5">
                        Read article
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-[1.35rem] border border-hairline bg-surface-soft px-6 py-16 text-center shadow-[0_24px_80px_rgba(17,17,15,0.045)] sm:px-10">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Publishing soon</p>
              <h2 className="mx-auto mt-4 max-w-3xl font-display text-[clamp(2.2rem,4vw,4rem)] leading-tight text-ink">
                Editorial guides and writing resources will be published here soon.
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-body">
                Future articles will be reviewed before publication and added here with clear authorship, dates, and topic-specific metadata.
              </p>
            </div>
          )}
        </div>
      </section>
    </PublicPageShell>
  );
}
