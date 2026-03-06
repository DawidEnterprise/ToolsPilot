const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://toolspilot.dev";
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "ToolsPilot";

export const siteConfig = {
  name: SITE_NAME,
  url: SITE_URL,
  description:
    "500+ free online tools for developers, designers and marketers. Convert files, format code, generate text and more — all in your browser.",
  ogImage: `${SITE_URL}/og-default.png`,
  twitterHandle: "@toolspilot",
  locale: "en_US",
};
