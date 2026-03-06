export interface RobotsTxtConfig {
  userAgent: string;
  allow: string[];
  disallow: string[];
  sitemap: string;
  crawlDelay: string;
}

export function generateRobotsTxt(configs: RobotsTxtConfig[]): string {
  const lines: string[] = [];
  for (const config of configs) {
    lines.push(`User-agent: ${config.userAgent || "*"}`);
    for (const a of config.allow.filter(Boolean)) {
      lines.push(`Allow: ${a}`);
    }
    for (const d of config.disallow.filter(Boolean)) {
      lines.push(`Disallow: ${d}`);
    }
    if (config.crawlDelay) lines.push(`Crawl-delay: ${config.crawlDelay}`);
    lines.push("");
  }
  if (configs[0]?.sitemap) {
    lines.push(`Sitemap: ${configs[0].sitemap}`);
  }
  return lines.join("\n").trim();
}
