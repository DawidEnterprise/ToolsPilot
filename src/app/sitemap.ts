import type { MetadataRoute } from "next";
import { tools } from "@/lib/registry";
import { CATEGORIES } from "@/lib/types";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://toolspilot.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${SITE_URL}/tools`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/categories`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
    { url: `${SITE_URL}/privacy`, lastModified: now, changeFrequency: "monthly", priority: 0.2 },
    { url: `${SITE_URL}/terms`, lastModified: now, changeFrequency: "monthly", priority: 0.2 },
  ];

  const categoryPages: MetadataRoute.Sitemap = CATEGORIES.map((cat) => ({
    url: `${SITE_URL}/categories/${cat.id}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const toolPages: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: `${SITE_URL}/tools/${tool.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: tool.comingSoon ? 0.4 : 0.8,
  }));

  return [...staticPages, ...categoryPages, ...toolPages];
}
