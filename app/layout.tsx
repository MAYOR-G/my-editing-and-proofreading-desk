import type { Metadata, Viewport } from "next";
import { TawkWidget } from "@/components/TawkWidget";
import { buildPageMetadata, editorialTeamJsonLd, jsonLdScript, organizationJsonLd, siteConfig, siteNavigationJsonLd, websiteJsonLd } from "@/lib/site";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#fffdf7",
  colorScheme: "light"
};

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: siteConfig.defaultTitle,
    description: siteConfig.defaultDescription,
    path: "/",
  }),
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
            editorialTeamJsonLd(),
          ])}
        />
        {children}
        <TawkWidget />
      </body>
    </html>
  );
}
