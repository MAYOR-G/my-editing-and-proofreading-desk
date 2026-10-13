import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import SeoServicePage, { generateMetadata as generateSeoServiceMetadata } from "@/app/(seo-services)/[slug]/page";

const serviceRedirects: Record<string, string> = {
  "academic-editing": "/academic-proofreading",
  "express-service": "/proofreading-services",
  "non-academic-editing": "/business-proofreading",
  translation: "/translation-review",
  "writing-support": "/editing-services",
};

export function generateStaticParams() {
  return [
    ...Object.keys(serviceRedirects).map((slug) => ({ slug })),
    { slug: "manuscript-formatting" },
  ];
}

export const dynamicParams = false;

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  if (params.slug === "manuscript-formatting") {
    const meta = generateSeoServiceMetadata({ params: { slug: "document-formatting" } });
    return {
      ...meta,
      alternates: {
        canonical: "https://www.editandproofread.com/document-formatting",
      },
    };
  }
  return {};
}

export default function LegacyServiceDetailPage({ params }: { params: { slug: string } }) {
  if (params.slug === "manuscript-formatting") {
    return <SeoServicePage params={{ slug: "document-formatting" }} />;
  }

  const destination = serviceRedirects[params.slug];

  if (!destination) {
    notFound();
  }

  permanentRedirect(destination);
}
