/* ──────────────────────────────────────────────────────────
   Tool Registry — single source of truth for every tool.
   To add a tool: 1) add an entry here  2) create the page
   under /src/tools/<slug>/   — that's it.
   ────────────────────────────────────────────────────────── */

import { ToolDefinition } from "./types";

export const tools: ToolDefinition[] = [
  // ─── Image Tools ─────────────────────────────────
  {
    slug: "png-to-jpg",
    name: "PNG to JPG Converter",
    description: "Convert PNG images to JPG format online for free. Reduce file size while maintaining quality.",
    category: "image",
    icon: "image",
    keywords: ["png", "jpg", "convert", "image", "compress"],
    relatedTools: ["jpg-to-png", "image-resizer"],
  },
  {
    slug: "jpg-to-png",
    name: "JPG to PNG Converter",
    description: "Convert JPG images to PNG format online for free. Preserve transparency and quality.",
    category: "image",
    icon: "image",
    keywords: ["jpg", "png", "convert", "image", "transparency"],
    relatedTools: ["png-to-jpg", "image-resizer"],
  },
  {
    slug: "image-resizer",
    name: "Image Resizer",
    description: "Resize images to any dimension online. Preset sizes for social media, HD, and custom dimensions.",
    category: "image",
    icon: "image",
    keywords: ["resize", "image", "dimension", "scale", "crop"],
    relatedTools: ["png-to-jpg", "jpg-to-png"],
  },

  // ─── Developer Tools ─────────────────────────────
  {
    slug: "json-formatter",
    name: "JSON Formatter & Validator",
    description: "Format, validate, and beautify JSON data online. Free JSON pretty printer with syntax highlighting.",
    category: "developer",
    icon: "code",
    keywords: ["json", "format", "validate", "beautify", "pretty", "print"],
    relatedTools: ["json-to-yaml", "yaml-to-json", "xml-formatter", "csv-json-converter"],
  },
  {
    slug: "json-to-yaml",
    name: "JSON to YAML Converter",
    description: "Convert JSON to YAML format instantly. Free online converter with copy support.",
    category: "developer",
    icon: "code",
    keywords: ["json", "yaml", "convert"],
    relatedTools: ["json-formatter", "yaml-to-json"],
  },
  {
    slug: "yaml-to-json",
    name: "YAML to JSON Converter",
    description: "Convert YAML to JSON format instantly. Free online converter with validation.",
    category: "developer",
    icon: "code",
    keywords: ["yaml", "json", "convert"],
    relatedTools: ["json-formatter", "json-to-yaml"],
  },
  {
    slug: "xml-formatter",
    name: "XML Formatter & Minifier",
    description: "Format, beautify, and minify XML online. Free XML pretty printer and validator.",
    category: "developer",
    icon: "code",
    keywords: ["xml", "format", "beautify", "validate", "minify"],
    relatedTools: ["json-formatter", "css-minifier"],
  },
  {
    slug: "csv-json-converter",
    name: "CSV ↔ JSON Converter",
    description: "Convert between CSV and JSON formats instantly. Free two-way converter.",
    category: "developer",
    icon: "code",
    keywords: ["csv", "json", "convert", "table", "data"],
    relatedTools: ["json-formatter", "json-to-yaml"],
  },
  {
    slug: "base64-encoder",
    name: "Base64 Encoder / Decoder",
    description: "Encode and decode Base64 strings online. Free Base64 conversion tool.",
    category: "developer",
    icon: "code",
    keywords: ["base64", "encode", "decode", "convert"],
    relatedTools: ["url-encoder", "html-encoder"],
  },
  {
    slug: "url-encoder",
    name: "URL Encoder / Decoder",
    description: "Encode and decode URLs online. Free URL encoding tool for developers.",
    category: "developer",
    icon: "code",
    keywords: ["url", "encode", "decode", "percent"],
    relatedTools: ["base64-encoder", "html-encoder"],
  },
  {
    slug: "html-encoder",
    name: "HTML Entity Encoder / Decoder",
    description: "Encode and decode HTML entities online. Convert special characters to HTML-safe strings.",
    category: "developer",
    icon: "code",
    keywords: ["html", "entity", "encode", "decode", "special", "characters"],
    relatedTools: ["base64-encoder", "url-encoder"],
  },
  {
    slug: "uuid-generator",
    name: "UUID Generator",
    description: "Generate random UUIDs (v4) online. Free bulk UUID generation tool.",
    category: "developer",
    icon: "code",
    keywords: ["uuid", "guid", "generate", "random"],
    relatedTools: ["password-generator", "hash-generator"],
  },
  {
    slug: "regex-tester",
    name: "Regex Tester",
    description: "Test regular expressions online with real-time matching and highlighting. Free regex tool.",
    category: "developer",
    icon: "code",
    keywords: ["regex", "regular", "expression", "test", "match"],
    relatedTools: ["text-diff", "json-formatter"],
  },
  {
    slug: "jwt-decoder",
    name: "JWT Decoder",
    description: "Decode and inspect JSON Web Tokens online. View header, payload and expiration.",
    category: "developer",
    icon: "code",
    keywords: ["jwt", "token", "decode", "json", "web", "auth"],
    relatedTools: ["base64-encoder", "hash-generator"],
  },
  {
    slug: "hash-generator",
    name: "Hash Generator (SHA-1, SHA-256, SHA-512)",
    description: "Generate SHA-1, SHA-256, and SHA-512 hashes online. Free hash calculator using Web Crypto API.",
    category: "developer",
    icon: "code",
    keywords: ["hash", "sha1", "sha256", "sha512", "checksum", "crypto"],
    relatedTools: ["password-generator", "uuid-generator"],
  },
  {
    slug: "timestamp-converter",
    name: "Unix Timestamp Converter",
    description: "Convert Unix timestamps to human-readable dates and vice versa. Live clock included.",
    category: "developer",
    icon: "code",
    keywords: ["timestamp", "unix", "epoch", "date", "convert", "time"],
    relatedTools: ["number-base-converter"],
  },
  {
    slug: "number-base-converter",
    name: "Number Base Converter",
    description: "Convert between Binary, Octal, Decimal, and Hexadecimal number systems instantly.",
    category: "developer",
    icon: "code",
    keywords: ["binary", "hex", "octal", "decimal", "number", "base", "convert"],
    relatedTools: ["timestamp-converter", "hash-generator"],
  },
  {
    slug: "css-minifier",
    name: "CSS Minifier & Beautifier",
    description: "Minify and beautify CSS online. Reduce file size or make CSS readable again.",
    category: "developer",
    icon: "code",
    keywords: ["css", "minify", "beautify", "compress", "format"],
    relatedTools: ["json-formatter", "xml-formatter"],
  },
  {
    slug: "markdown-to-html",
    name: "Markdown to HTML Converter",
    description: "Convert Markdown to HTML with live preview. Free online Markdown renderer.",
    category: "developer",
    icon: "code",
    keywords: ["markdown", "html", "convert", "render", "preview"],
    relatedTools: ["html-encoder", "json-formatter"],
  },
  {
    slug: "color-converter",
    name: "Color Converter (HEX / RGB / HSL)",
    description: "Convert colors between HEX, RGB, and HSL formats. Free color picker and converter.",
    category: "developer",
    icon: "code",
    keywords: ["color", "hex", "rgb", "hsl", "convert", "picker"],
    relatedTools: ["css-minifier"],
  },

  // ─── Text Tools ──────────────────────────────────
  {
    slug: "word-counter",
    name: "Word Counter",
    description: "Count words, characters, sentences and paragraphs online. Free text analysis tool.",
    category: "text",
    icon: "type",
    keywords: ["word", "count", "character", "sentence", "paragraph"],
    relatedTools: ["character-counter", "case-converter"],
  },
  {
    slug: "character-counter",
    name: "Character Counter",
    description: "Count characters with social media platform limits. Twitter, Instagram, LinkedIn and more.",
    category: "text",
    icon: "type",
    keywords: ["character", "count", "twitter", "instagram", "social", "limit"],
    relatedTools: ["word-counter", "case-converter"],
  },
  {
    slug: "case-converter",
    name: "Case Converter",
    description: "Convert text to uppercase, lowercase, title case, camelCase, snake_case and more.",
    category: "text",
    icon: "type",
    keywords: ["case", "convert", "uppercase", "lowercase", "title", "camel", "snake"],
    relatedTools: ["word-counter", "slug-generator"],
  },
  {
    slug: "slug-generator",
    name: "URL Slug Generator",
    description: "Generate URL-friendly slugs from any text. Free SEO slug tool with live preview.",
    category: "text",
    icon: "type",
    keywords: ["slug", "url", "seo", "generate", "permalink"],
    relatedTools: ["case-converter", "url-encoder"],
  },
  {
    slug: "lorem-ipsum-generator",
    name: "Lorem Ipsum Generator",
    description: "Generate placeholder Lorem Ipsum text. Free dummy text for designs and prototypes.",
    category: "text",
    icon: "type",
    keywords: ["lorem", "ipsum", "placeholder", "dummy", "text"],
    relatedTools: ["word-counter", "password-generator"],
  },
  {
    slug: "text-diff",
    name: "Text Diff / Compare",
    description: "Compare two texts side-by-side and see the differences highlighted. Free online diff tool.",
    category: "text",
    icon: "type",
    keywords: ["diff", "compare", "text", "difference", "merge"],
    relatedTools: ["word-counter", "line-sorter"],
  },
  {
    slug: "line-sorter",
    name: "Line Sorter & Deduplicator",
    description: "Sort lines alphabetically, by length, remove duplicates, or shuffle. Free text line tool.",
    category: "text",
    icon: "type",
    keywords: ["sort", "lines", "deduplicate", "remove", "duplicates", "shuffle"],
    relatedTools: ["text-diff", "case-converter"],
  },

  // ─── Misc / Utility ──────────────────────────────
  {
    slug: "password-generator",
    name: "Password Generator",
    description: "Generate strong, secure passwords with customizable length and character types. Free and private.",
    category: "misc",
    icon: "misc",
    keywords: ["password", "generate", "secure", "random", "strong"],
    relatedTools: ["uuid-generator", "hash-generator"],
  },

  // ─── Calculators ─────────────────────────────────
  {
    slug: "percentage-calculator",
    name: "Percentage Calculator",
    description: "Calculate percentages instantly. What is X% of Y, percentage change, increase and decrease.",
    category: "misc",
    icon: "misc",
    keywords: ["percentage", "calculator", "percent", "change", "increase", "decrease"],
    relatedTools: ["tip-calculator", "bmi-calculator"],
  },
  {
    slug: "age-calculator",
    name: "Age Calculator",
    description: "Calculate your exact age in years, months and days. Next birthday countdown included.",
    category: "misc",
    icon: "misc",
    keywords: ["age", "calculator", "birthday", "date", "years", "months", "days"],
    relatedTools: ["countdown-timer", "timestamp-converter"],
  },
  {
    slug: "tip-calculator",
    name: "Tip Calculator",
    description: "Calculate tips and split bills easily. Custom tip percentage with per-person breakdown.",
    category: "misc",
    icon: "misc",
    keywords: ["tip", "calculator", "bill", "split", "restaurant", "gratuity"],
    relatedTools: ["percentage-calculator", "bmi-calculator"],
  },
  {
    slug: "bmi-calculator",
    name: "BMI Calculator",
    description: "Calculate your Body Mass Index with metric or imperial units. Free BMI health tool.",
    category: "misc",
    icon: "misc",
    keywords: ["bmi", "body", "mass", "index", "calculator", "health", "weight"],
    relatedTools: ["percentage-calculator", "age-calculator"],
  },
  {
    slug: "countdown-timer",
    name: "Countdown Timer",
    description: "Count down to any date and time. Live countdown with days, hours, minutes, seconds.",
    category: "misc",
    icon: "misc",
    keywords: ["countdown", "timer", "date", "event", "clock", "days"],
    relatedTools: ["age-calculator", "timestamp-converter"],
  },
  {
    slug: "random-number-generator",
    name: "Random Number Generator",
    description: "Generate cryptographically random numbers with custom range and count. Free RNG tool.",
    category: "misc",
    icon: "misc",
    keywords: ["random", "number", "generator", "rng", "dice", "range"],
    relatedTools: ["password-generator", "uuid-generator"],
  },

  // ─── More Text Tools ─────────────────────────────
  {
    slug: "text-repeater",
    name: "Text Repeater",
    description: "Repeat any text multiple times with custom separator. Free text repeat tool.",
    category: "text",
    icon: "type",
    keywords: ["repeat", "text", "duplicate", "copy", "multiply"],
    relatedTools: ["word-counter", "lorem-ipsum-generator"],
  },
  {
    slug: "binary-translator",
    name: "Binary Translator",
    description: "Convert text to binary, hexadecimal, or octal and back. Free encoding translator.",
    category: "developer",
    icon: "code",
    keywords: ["binary", "translator", "text", "hex", "octal", "encode", "decode"],
    relatedTools: ["base64-encoder", "number-base-converter"],
  },
  {
    slug: "morse-code-translator",
    name: "Morse Code Translator",
    description: "Translate text to Morse code and Morse code to text instantly. Free online translator.",
    category: "text",
    icon: "type",
    keywords: ["morse", "code", "translator", "encode", "decode", "dots", "dashes"],
    relatedTools: ["binary-translator", "case-converter"],
  },

  // ─── More Developer Tools ────────────────────────
  {
    slug: "json-sorter",
    name: "JSON Key Sorter",
    description: "Sort JSON object keys alphabetically (A-Z or Z-A). Deep sorting for nested objects.",
    category: "developer",
    icon: "code",
    keywords: ["json", "sort", "keys", "alphabetical", "order", "organize"],
    relatedTools: ["json-formatter", "json-to-yaml"],
  },
];

/** Lookup a tool by slug. Returns undefined if not found. */
export function getToolBySlug(slug: string): ToolDefinition | undefined {
  return tools.find((t) => t.slug === slug);
}

/** Get all tools in a category */
export function getToolsByCategory(category: string): ToolDefinition[] {
  return tools.filter((t) => t.category === category);
}

/** Get all published (non-coming-soon) tools */
export function getPublishedTools(): ToolDefinition[] {
  return tools.filter((t) => !t.comingSoon);
}

/** Get all tool slugs (for static path generation) */
export function getAllToolSlugs(): string[] {
  return tools.map((t) => t.slug);
}
