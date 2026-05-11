import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#fffdf7",
  colorScheme: "light"
};

export const metadata: Metadata = {
  title: "My Editing and Proofreading Desk",
  description: "Premium proofreading, editing, formatting, translation, and writing support with secure uploads, verified payments, and project dashboards.",
  metadataBase: new URL("https://editandproofread.com")
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
