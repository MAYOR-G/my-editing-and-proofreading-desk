import type { Metadata } from "next";
import { BRAND_NAME, COMPANY_ADDRESS, COMPANY_PHONE, COMPANY_PHONE_TEL, SUPPORT_EMAIL } from "@/lib/contact-info";
import { SERVICE_OPTIONS } from "@/lib/pricing";
import { seoServicePages } from "@/lib/seo-service-pages";

export const PRODUCTION_SITE_URL = "https://www.editandproofread.com";
export const SITE_LAST_MODIFIED = "2026-07-07";

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

export const siteAuthor = {
  name: "My Editing and Proofreading Desk Editorial Team",
  description:
    "Human editors and proofreaders reviewing academic, business, manuscript, application, and professional documents.",
};

const serviceOfferCatalog = SERVICE_OPTIONS.map((service) => ({
  "@type": "Offer",
  name: service.label,
  description: service.note,
  priceCurrency: "USD",
  availability: "https://schema.org/InStock",
  url: absoluteUrl("/pricing"),
  priceSpecification: "fixedPrice" in service && service.fixedPrice
    ? {
        "@type": "UnitPriceSpecification",
        price: service.fixedPrice,
        priceCurrency: "USD",
        unitText: "project",
      }
    : {
        "@type": "UnitPriceSpecification",
        price: service.rate,
        priceCurrency: "USD",
        unitText: "word",
      },
}));

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
      languages: {
        "en-US": url,
      },
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
    foundingLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Wilmington",
        addressRegion: "DE",
        addressCountry: "US",
      },
    },
    knowsAbout: [
      "Professional editing",
      "Professional proofreading",
      "Academic proofreading",
      "Dissertation proofreading",
      "Thesis editing",
      "Manuscript editing",
      "Business proofreading",
      "Document formatting",
      "Translation review",
    ],
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
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.siteUrl}/blog?query={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function siteNavigationJsonLd() {
  const primaryLinks = [
    { name: "Services", path: "/services" },
    { name: "Pricing", path: "/pricing" },
    { name: "Submit Document", path: "/submit" },
    { name: "AI Editing Tool", path: "/ai-editing-tool" },
    { name: "Editors", path: "/editors" },
    { name: "Blog", path: "/blog" },
    { name: "FAQ", path: "/faq" },
    { name: "Contact", path: "/contact" },
    ...seoServicePages.map((service) => ({
      name: service.name,
      path: `/${service.slug}`,
    })),
  ];

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${siteConfig.siteUrl}/#site-navigation`,
    name: "Primary site navigation",
    itemListElement: primaryLinks.map((item, index) => ({
      "@type": "SiteNavigationElement",
      position: index + 1,
      name: item.name,
      url: absoluteUrl(item.path),
    })),
  };
}

export function editorialTeamJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteConfig.siteUrl}/#editorial-team`,
    name: siteAuthor.name,
    description: siteAuthor.description,
    worksFor: {
      "@id": `${siteConfig.siteUrl}/#organization`,
    },
    knowsAbout: [
      "Editing",
      "Proofreading",
      "Academic writing",
      "Business writing",
      "Manuscript preparation",
      "Document formatting",
    ],
  };
}

export function webPageJsonLd(page: {
  path: string;
  name: string;
  description: string;
  dateModified?: string;
  isPartOf?: string;
}) {
  const url = absoluteUrl(page.path);

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: page.name,
    description: page.description,
    inLanguage: "en-US",
    dateModified: page.dateModified ?? SITE_LAST_MODIFIED,
    isPartOf: {
      "@id": page.isPartOf ?? `${siteConfig.siteUrl}/#website`,
    },
    publisher: {
      "@id": `${siteConfig.siteUrl}/#organization`,
    },
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
    address: {
      "@type": "PostalAddress",
      streetAddress: "1007 N Orange St. 4th Floor Suite #5723",
      addressLocality: "Wilmington",
      addressRegion: "DE",
      postalCode: "19801",
      addressCountry: "US",
    },
    priceRange: "$$",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Editing and proofreading service options",
      itemListElement: serviceOfferCatalog,
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
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: 0.022,
      highPrice: 0.055,
      offerCount: SERVICE_OPTIONS.length,
      url: absoluteUrl("/pricing"),
      availability: "https://schema.org/InStock",
    },
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
  body?: Array<{ heading: string; paragraphs: unknown[]; bullets?: unknown[]; numberedSteps?: unknown[] }>;
  faq?: Array<{ question: string; answer: string }>;
  metaDescription?: string;
}) {
  const url = absoluteUrl(`/blog/${post.slug}`);
  const textBlocks = post.body?.flatMap((section) => [
    section.heading,
    ...section.paragraphs.flat(),
    ...(section.bullets?.flat() ?? []),
    ...(section.numberedSteps?.flat() ?? []),
  ]) ?? [];
  const wordCount = textBlocks
    .map((block) => typeof block === "string" ? block : "")
    .join(" ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

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
    keywords: [post.category, "editing", "proofreading", "professional editing services"].filter(Boolean),
    wordCount: wordCount > 0 ? wordCount : undefined,
    author: {
      "@id": `${siteConfig.siteUrl}/#editorial-team`,
    },
    publisher: {
      "@id": `${siteConfig.siteUrl}/#organization`,
    },
    mainEntity: post.faq?.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
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
