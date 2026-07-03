import { notFound, permanentRedirect } from "next/navigation";

const serviceRedirects: Record<string, string> = {
  "academic-editing": "/academic-proofreading",
  "express-service": "/proofreading-services",
  "non-academic-editing": "/business-proofreading",
  "manuscript-formatting": "/manuscript-editing",
  translation: "/translation-review",
  "writing-support": "/editing-services",
};

export function generateStaticParams() {
  return Object.keys(serviceRedirects).map((slug) => ({ slug }));
}

export const dynamicParams = false;

export default function LegacyServiceDetailPage({ params }: { params: { slug: string } }) {
  const destination = serviceRedirects[params.slug];

  if (!destination) {
    notFound();
  }

  permanentRedirect(destination);
}
