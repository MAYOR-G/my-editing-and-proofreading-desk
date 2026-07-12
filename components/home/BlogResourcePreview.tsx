import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { blogPosts } from "@/lib/blog";

export function BlogResourcePreview() {
  const visiblePosts = blogPosts.slice(0, 3);

  return (
    <section className="border-y border-ink/5 bg-[#f7f9fc] px-5 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-screen-xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">Editorial resources</p>
            <h2 className="mt-4 font-display text-4xl font-bold leading-tight text-ink sm:text-5xl">
              Editing and Proofreading Guides
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-8 text-charcoal/72 sm:text-lg">
              Read practical guides that help you choose the right editing service, prepare your document, and avoid common submission mistakes.
            </p>
          </div>
          <Link href="/blog" className="inline-flex min-h-12 shrink-0 items-center gap-2 rounded-full border border-primary/20 bg-white px-6 text-sm font-semibold text-primary transition hover:border-primary/45 hover:bg-primary/5">
            View All Guides <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        {visiblePosts.length > 0 ? (
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {visiblePosts.map((post) => (
              <article key={post.slug} className="flex h-full flex-col overflow-hidden rounded-2xl border border-ink/5 bg-white shadow-[0_16px_50px_rgba(15,59,127,0.035)]">
                <div className="relative aspect-[16/9]">
                  <Image src={post.heroImage} alt={post.heroImageAlt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">{post.category}</p>
                  <h3 className="mt-4 font-display text-2xl font-bold leading-tight text-ink">
                    <Link href={`/blog/${post.slug}`} className="transition hover:text-primary">{post.title}</Link>
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-charcoal/68">{post.excerpt}</p>
                  <Link href={`/blog/${post.slug}`} className="mt-auto inline-flex min-h-10 w-fit items-center rounded-full border border-primary/20 px-4 text-sm font-semibold text-primary transition hover:border-primary/45 hover:bg-primary/5">
                    Read article
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-2xl border border-ink/5 bg-white p-7 shadow-[0_16px_50px_rgba(15,59,127,0.035)] sm:p-9">
            <p className="font-display text-2xl leading-tight text-ink">
              New guides are coming soon. Visit the blog for upcoming editing and proofreading resources.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
