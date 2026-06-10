import type { Metadata } from "next";
import { BRAND_NAME, COMPANY_ADDRESS, COMPANY_PHONE, COMPANY_PHONE_TEL, SUPPORT_EMAIL } from "@/lib/contact-info";

const FALLBACK_SITE_URL = "https://www.editandproofread.com";

function normalizeSiteUrl(value: string | undefined) {
  const raw = value?.trim() || FALLBACK_SITE_URL;
  try {
    const url = new URL(raw);
    return url.origin.replace(/\/$/, "");
  } catch {
    return FALLBACK_SITE_URL;
  }
}

function normalizePath(path = "/") {
  if (!path || path === "/") return "/";
  return path.startsWith("/") ? path : `/${path}`;
}

export const siteConfig = {
  siteName: BRAND_NAME,
  siteUrl: normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),
  alternateDomains: (process.env.NEXT_PUBLIC_ALTERNATE_DOMAINS || "")
    .split(",")
    .map((domain) => normalizeSiteUrl(domain))
    .filter(Boolean),
  defaultTitle: `${BRAND_NAME} | Editing and Proofreading Services`,
  defaultDescription:
    "Premium proofreading, editing, formatting, translation, and writing support with secure uploads, verified payments, and project dashboards.",
  defaultOgImage: "/assets/brand.jpeg",
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
  type?: "website" | "article";
  noIndex?: boolean;
};

export function buildPageMetadata({
  title,
  description,
  path = "/",
  image = siteConfig.defaultOgImage,
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
          alt: siteConfig.siteName,
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
    robots: noIndex
      ? {
          index: false,
          follow: true,
        }
      : undefined,
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
    email: siteConfig.contactEmail,
    telephone: siteConfig.contactPhoneTel,
    address: organizationJsonLd().address,
    areaServed: "Worldwide",
    description: siteConfig.defaultDescription,
    priceRange: "$$",
  };
}

export function serviceJsonLd(service: { name: string; description: string; slug: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl(`/services/${service.slug}`)}#service`,
    name: service.name,
    description: service.description,
    url: absoluteUrl(`/services/${service.slug}`),
    provider: {
      "@id": `${siteConfig.siteUrl}/#organization`,
    },
    areaServed: "Worldwide",
  };
}

export function jsonLdScript(data: unknown) {
  return {
    __html: JSON.stringify(data).replace(/</g, "\\u003c"),
  };
}
