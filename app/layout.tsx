import type { Metadata, Viewport } from "next";
import { TawkWidget } from "@/components/TawkWidget";
import { buildPageMetadata, jsonLdScript, organizationJsonLd, siteConfig, siteNavigationJsonLd, websiteJsonLd } from "@/lib/site";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#fffdf7",
  colorScheme: "light"
};

const rootMetadata = buildPageMetadata({
    title: siteConfig.defaultTitle,
    description: siteConfig.defaultDescription,
    path: "/",
  });

export const metadata: Metadata = {
  ...rootMetadata,
  // Canonicals and robots directives belong to individual routes. Keeping
  // them out of the root prevents 404/private pages inheriting homepage signals.
  alternates: undefined,
  robots: undefined,
  icons: {
    icon: [
      { url: "/assets/logo.png", type: "image/png" },
    ],
    shortcut: "/assets/logo.png",
    apple: "/assets/logo.png",
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdScript([
            organizationJsonLd(),
            websiteJsonLd(),
            siteNavigationJsonLd(),
          ])}
        />
        {children}
        <TawkWidget />
      </body>
    </html>
  );
}
