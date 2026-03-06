import type { ToolDefinition } from "@/lib/types";
import { siteConfig } from "@/lib/config";
import { toolSeoData } from "@/lib/seo-data";
import type { Metadata } from "next";

/**
 * Generates optimized Next.js Metadata for a tool page.
 * Uses SEO-optimized titles and descriptions when available.
 */
export function generateToolMetadata(tool: ToolDefinition): Metadata {
  const url = `${siteConfig.url}/tools/${tool.slug}`;
  const seo = toolSeoData[tool.slug];

  const title = seo?.seoTitle ?? `${tool.name} — Free Online Tool`;
  const description = seo?.seoDescription ?? tool.description;

  return {
    title,
    description,
    keywords: tool.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: `${tool.name} | ${siteConfig.name}`,
      description,
      url,
      siteName: siteConfig.name,
      type: "website",
      images: [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: tool.name,
      description,
    },
  };
}

/**
 * Generates JSON-LD structured data array for a tool page.
 * Includes WebApplication schema + FAQPage schema when FAQ data exists.
 */
export function generateToolJsonLd(tool: ToolDefinition): Record<string, unknown>[] {
  const seo = toolSeoData[tool.slug];
  const url = `${siteConfig.url}/tools/${tool.slug}`;

  const webApp: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.name,
    description: seo?.seoDescription ?? tool.description,
    url,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript. Works in all modern browsers.",
    isAccessibleForFree: true,
    inLanguage: "en",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    featureList: tool.keywords.join(", "),
  };

  const schemas: Record<string, unknown>[] = [webApp];

  // Add FAQ schema if FAQs exist
  if (seo?.faqs && seo.faqs.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: seo.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    });
  }

  // Add BreadcrumbList schema
  schemas.push({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tools",
        item: `${siteConfig.url}/tools`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: tool.name,
        item: url,
      },
    ],
  });

  return schemas;
}
