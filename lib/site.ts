import type { Metadata } from "next";
import { BRAND_NAME, COMPANY_ADDRESS, COMPANY_PHONE, COMPANY_PHONE_TEL, SUPPORT_EMAIL } from "@/lib/contact-info";

export const PRODUCTION_SITE_URL = "https://www.editandproofread.com";

function normalizePath(path = "/") {
  if (!path || path === "/") return "/";
  return path.startsWith("/") ? path : `/${path}`;
}

export const siteConfig = {
  siteName: BRAND_NAME,
  siteUrl: PRODUCTION_SITE_URL,
  defaultTitle: "Professional Editing and Proofreading Services",
  defaultDescription:
    "Human editing, proofreading, formatting, and document review for academic, business, author, and professional writing. Secure upload and clear pricing.",
  defaultOgImage: "/assets/og-image.jpg",
  defaultOgImageAlt: `${BRAND_NAME} professional editing and proofreading services`,
  contactEmail: SUPPORT_EMAIL,
  contactPhone: COMPANY_PHONE,
  contactPhoneTel: COMPANY_PHONE_TEL,
  address: COMPANY_ADDRESS,
  socialLinks: [] as string[],
};

export function absoluteUrl(path = "/") {
  return `${siteConfig.siteUrl}${normalizePath(path)}`;
}

export function assetUrl(path: string) {
  return `${siteConfig.siteUrl}${normalizePath(path)}`;
}

type PageMetadataInput = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  noIndex?: boolean;
};

export function buildPageMetadata({
  title,
  description,
  path = "/",
  image = siteConfig.defaultOgImage,
  imageAlt = siteConfig.defaultOgImageAlt,
  type = "website",
  noIndex = false,
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = assetUrl(image);

  return {
    title,
    description,
    metadataBase: new URL(siteConfig.siteUrl),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.siteName,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: imageAlt,
          type: "image/jpeg",
        },
      ],
      locale: "en_US",
      type,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export function organizationJsonLd() {
  const organization: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.siteUrl}/#organization`,
    name: siteConfig.siteName,
    url: siteConfig.siteUrl,
    logo: assetUrl("/assets/logo.png"),
    email: siteConfig.contactEmail,
    telephone: siteConfig.contactPhoneTel,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: siteConfig.contactEmail,
      telephone: siteConfig.contactPhoneTel,
      availableLanguage: "English",
      areaServed: "Worldwide",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "1007 N Orange St. 4th Floor Suite #5723",
      addressLocality: "Wilmington",
      addressRegion: "DE",
      postalCode: "19801",
      addressCountry: "US",
    },
  };

  if (siteConfig.socialLinks.length > 0) {
    organization.sameAs = siteConfig.socialLinks;
  }

  return organization;
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.siteUrl}/#website`,
    name: siteConfig.siteName,
    url: siteConfig.siteUrl,
    publisher: {
      "@id": `${siteConfig.siteUrl}/#organization`,
    },
    inLanguage: "en-US",
  };
}

export function professionalServiceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteConfig.siteUrl}/#professional-service`,
    name: siteConfig.siteName,
    url: siteConfig.siteUrl,
    image: assetUrl(siteConfig.defaultOgImage),
    description: siteConfig.defaultDescription,
    provider: {
      "@id": `${siteConfig.siteUrl}/#organization`,
    },
    areaServed: "Worldwide",
    serviceType: [
      "Professional editing services",
      "Professional proofreading services",
      "Academic proofreading",
      "Business proofreading",
      "Manuscript editing",
      "Document formatting",
    ],
    email: siteConfig.contactEmail,
    telephone: siteConfig.contactPhoneTel,
  };
}

export function serviceJsonLd(service: { name: string; description: string; slug: string; path?: string; serviceType?: string }) {
  const path = service.path ?? `/services/${service.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl(path)}#service`,
    name: service.name,
    description: service.description,
    serviceType: service.serviceType ?? service.name,
    url: absoluteUrl(path),
    provider: {
      "@id": `${siteConfig.siteUrl}/#organization`,
    },
    areaServed: "Worldwide",
    mainEntityOfPage: absoluteUrl(path),
  };
}

export function blogPostingJsonLd(post: {
  title: string;
  excerpt: string;
  slug: string;
  author: string;
  datePublished: string;
  dateUpdated: string;
  heroImage: string;
  heroImageAlt: string;
  category?: string;
}) {
  const url = absoluteUrl(`/blog/${post.slug}`);

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    mainEntityOfPage: url,
    url,
    image: {
      "@type": "ImageObject",
      url: assetUrl(post.heroImage),
      caption: post.heroImageAlt,
    },
    datePublished: post.datePublished,
    dateModified: post.dateUpdated,
    articleSection: post.category,
    author: {
      "@type": "Organization",
      name: post.author,
    },
    publisher: {
      "@id": `${siteConfig.siteUrl}/#organization`,
    },
    inLanguage: "en-US",
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqPageJsonLd(items: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function jsonLdScript(data: unknown) {
  return {
    __html: JSON.stringify(data).replace(/</g, "\\u003c"),
  };
}
