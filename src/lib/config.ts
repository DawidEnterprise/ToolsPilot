const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://toolspilot.dev";
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "ToolsPilot";

export const siteConfig = {
  name: SITE_NAME,
  url: SITE_URL,
  description:
    "100+ free browser tools for developers, designers & marketers. Image converters, code formatters, text utilities, SEO analyzers & calculators — no signup, no uploads, 100% private.",
  ogImage: `${SITE_URL}/og-default.png`,
  twitterHandle: "@toolspilot",
  locale: "en_US",
};
