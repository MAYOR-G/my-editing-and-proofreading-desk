export type BlogPost = {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  author: string;
  datePublished: string;
  dateUpdated: string;
  readingTime: string;
  metaTitle: string;
  metaDescription: string;
  heroImage: string;
  heroImageAlt: string;
  content: Array<{
    heading?: string;
    paragraphs: string[];
  }>;
};

// Add only owner-approved editorial guides. Do not seed or publish placeholder articles.
export const blogPosts: BlogPost[] = [];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
