/* ──────────────────────────────────────────────────────────
   Tool Registry — Central type system for the entire platform.
   Every tool must satisfy the ToolDefinition interface.
   ────────────────────────────────────────────────────────── */

export type ToolCategory =
  | "image"
  | "file-converter"
  | "developer"
  | "text"
  | "seo"
  | "misc";

export interface ToolDefinition {
  /** URL-safe slug, e.g. "json-formatter" */
  slug: string;
  /** Human-readable name shown in UI & SEO title */
  name: string;
  /** Short tagline (≤ 160 chars) — used for meta description */
  description: string;
  /** Long description for the tool page (supports markdown) */
  longDescription?: string;
  /** Category for grouping */
  category: ToolCategory;
  /** Icon name (maps to component library or SVG) */
  icon: string;
  /** Keywords for search and structured data */
  keywords: string[];
  /** Whether the tool requires server-side processing (Azure Function) */
  requiresServer?: boolean;
  /** Related tool slugs shown on the tool page */
  relatedTools?: string[];
  /** Schema.org type override (default: WebApplication) */
  schemaType?: string;
  /** If true, tool is coming soon (renders placeholder) */
  comingSoon?: boolean;
}

export interface ToolCategory_Meta {
  id: ToolCategory;
  label: string;
  description: string;
  icon: string;
}

export const CATEGORIES: ToolCategory_Meta[] = [
  { id: "image", label: "Image Tools", description: "Edit, convert, and optimize images", icon: "🖼️" },
  { id: "file-converter", label: "File Converters", description: "Convert between file formats", icon: "📁" },
  { id: "developer", label: "Developer Tools", description: "JSON, YAML, regex and more", icon: "🛠️" },
  { id: "text", label: "Text Tools", description: "Count, convert, and generate text", icon: "📝" },
  { id: "seo", label: "SEO Tools", description: "Analyze and optimize for search engines", icon: "🔍" },
  { id: "misc", label: "Miscellaneous", description: "Calculators, generators and more", icon: "🧰" },
];

export function getCategoryMeta(id: ToolCategory): ToolCategory_Meta {
  return CATEGORIES.find((c) => c.id === id)!;
}
