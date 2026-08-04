import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/blog";

type BlogArchiveGridProps = {
  posts: BlogPost[];
  currentPage: number;
  totalPages: number;
};

export const BLOG_POSTS_PER_PAGE = 12;

export function getBlogArchivePagePosts(posts: BlogPost[], page: number) {
  const start = (page - 1) * BLOG_POSTS_PER_PAGE;
  return posts.slice(start, start + BLOG_POSTS_PER_PAGE);
}

export function BlogArchiveGrid({ posts, currentPage, totalPages }: BlogArchiveGridProps) {
  return (
    <section className="bg-canvas px-5 py-16 sm:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        {posts.length > 0 ? (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
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

            {totalPages > 1 ? (
              <nav aria-label="Blog pagination" className="mt-12 flex flex-wrap items-center justify-center gap-3">
                {currentPage > 1 ? (
                  <Link href={currentPage === 2 ? "/blog" : `/blog/page/${currentPage - 1}`} className="inline-flex min-h-10 items-center rounded-full border border-primary/20 px-4 text-sm font-semibold text-primary transition hover:border-primary/45 hover:bg-primary/5">
                    Previous
                  </Link>
                ) : null}
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => {
                  const href = page === 1 ? "/blog" : `/blog/page/${page}`;
                  const isCurrent = page === currentPage;

                  return (
                    <Link
                      key={page}
                      href={href}
                      aria-current={isCurrent ? "page" : undefined}
                      aria-label={isCurrent ? `Page ${page}, current page` : `Go to blog page ${page}`}
                      className={`inline-flex h-10 min-w-10 items-center justify-center rounded-full border px-3 text-sm font-semibold transition ${
                        isCurrent
                          ? "border-primary bg-primary text-white"
                          : "border-primary/20 text-primary hover:border-primary/45 hover:bg-primary/5"
                      }`}
                    >
                      {page}
                    </Link>
                  );
                })}
                {currentPage < totalPages ? (
                  <Link href={`/blog/page/${currentPage + 1}`} className="inline-flex min-h-10 items-center rounded-full border border-primary/20 px-4 text-sm font-semibold text-primary transition hover:border-primary/45 hover:bg-primary/5">
                    Next
                  </Link>
                ) : null}
              </nav>
            ) : null}
          </>
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
  );
}
