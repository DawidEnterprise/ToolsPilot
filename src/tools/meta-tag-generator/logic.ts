export interface MetaTags {
  title: string;
  description: string;
  keywords: string;
  author: string;
  robots: string;
  canonical: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogUrl: string;
  ogType: string;
  twitterCard: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  viewport: string;
  charset: string;
}

export function generateMetaTags(tags: MetaTags): string {
  const lines: string[] = [];
  lines.push(`<meta charset="${tags.charset || "UTF-8"}">`);
  lines.push(`<meta name="viewport" content="${tags.viewport || "width=device-width, initial-scale=1.0"}">`);
  if (tags.title) lines.push(`<title>${escapeHtml(tags.title)}</title>`);
  if (tags.description) lines.push(`<meta name="description" content="${escapeAttr(tags.description)}">`);
  if (tags.keywords) lines.push(`<meta name="keywords" content="${escapeAttr(tags.keywords)}">`);
  if (tags.author) lines.push(`<meta name="author" content="${escapeAttr(tags.author)}">`);
  if (tags.robots) lines.push(`<meta name="robots" content="${escapeAttr(tags.robots)}">`);
  if (tags.canonical) lines.push(`<link rel="canonical" href="${escapeAttr(tags.canonical)}">`);
  // Open Graph
  if (tags.ogTitle) lines.push(`<meta property="og:title" content="${escapeAttr(tags.ogTitle)}">`);
  if (tags.ogDescription) lines.push(`<meta property="og:description" content="${escapeAttr(tags.ogDescription)}">`);
  if (tags.ogImage) lines.push(`<meta property="og:image" content="${escapeAttr(tags.ogImage)}">`);
  if (tags.ogUrl) lines.push(`<meta property="og:url" content="${escapeAttr(tags.ogUrl)}">`);
  if (tags.ogType) lines.push(`<meta property="og:type" content="${escapeAttr(tags.ogType)}">`);
  // Twitter
  if (tags.twitterCard) lines.push(`<meta name="twitter:card" content="${escapeAttr(tags.twitterCard)}">`);
  if (tags.twitterTitle) lines.push(`<meta name="twitter:title" content="${escapeAttr(tags.twitterTitle)}">`);
  if (tags.twitterDescription) lines.push(`<meta name="twitter:description" content="${escapeAttr(tags.twitterDescription)}">`);
  if (tags.twitterImage) lines.push(`<meta name="twitter:image" content="${escapeAttr(tags.twitterImage)}">`);
  return lines.join("\n");
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function escapeAttr(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
