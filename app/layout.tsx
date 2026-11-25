import type { Metadata, Viewport } from "next";
import { JsonLd } from "@/components/JsonLd";
import { OAuthRedirectWatcher } from "@/components/OAuthRedirectWatcher";
import { TawkWidget } from "@/components/TawkWidget";
import { buildPageMetadata, organizationJsonLd, siteConfig, siteNavigationJsonLd, websiteJsonLd } from "@/lib/site";
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
  },
  other: {
    "trustpilot-one-time-domain-verification-id": "5957a02b-9c29-4b7f-9106-c65c67cdf12b",
  },
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <JsonLd
          data={[
            organizationJsonLd(),
            websiteJsonLd(),
            siteNavigationJsonLd(),
          ]}
        />
        {children}
        <OAuthRedirectWatcher />
        <TawkWidget />
      </body>
    </html>
  );
}
