import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap"
});

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
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  );
}
