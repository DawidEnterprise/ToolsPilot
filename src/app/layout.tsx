import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AdSlot } from "@/components/AdSlot";
import { AdSenseScript } from "@/components/AdSenseScript";
import { AnalyticsScript } from "@/components/AnalyticsScript";
import { ClarityScript } from "@/components/ClarityScript";
import { ThemeProvider } from "@/components/ThemeProvider";
import { siteConfig } from "@/lib/config";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Free Online Tools for Everyone`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "online tools",
    "free tools",
    "developer tools",
    "image converter",
    "json formatter",
    "file converter",
    "text tools",
    "seo tools",
    "browser tools",
    "no signup tools",
  ],
  authors: [{ name: siteConfig.name }],
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
  },
  alternates: { canonical: siteConfig.url },
  icons: {
    icon: [
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <head>
        <AdSenseScript />
        <AnalyticsScript />
        <ClarityScript />
      </head>
      <body className="flex min-h-screen flex-col bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
        <ThemeProvider>
          <Header />
          <main className="flex-1">{children}</main>
          {/* Footer ad — appears above the site footer on every page */}
          <AdSlot position="footer" className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 lg:px-8" />
          <Footer />
          {/* Global anchor ad — sticky bottom, highest viewability */}
          <AdSlot position="anchor" className="fixed bottom-0 left-0 right-0 z-40" />
        </ThemeProvider>
      </body>
    </html>
  );
}
