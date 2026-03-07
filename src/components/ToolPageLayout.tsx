import Link from "next/link";
import type { ToolDefinition } from "@/lib/types";
import { getCategoryMeta } from "@/lib/types";
import { AdSlot } from "./AdSlot";
import { getToolBySlug } from "@/lib/registry";

interface ToolPageLayoutProps {
  tool: ToolDefinition;
  children: React.ReactNode;
}

export function ToolPageLayout({ tool, children }: ToolPageLayoutProps) {
  const category = getCategoryMeta(tool.category);

  const relatedToolDefs = (tool.relatedTools ?? [])
    .map((slug) => getToolBySlug(slug))
    .filter(Boolean) as ToolDefinition[];

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
      {/* Top bar: breadcrumb + related links */}
      <nav className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500 dark:text-gray-400">
        <Link href="/" className="hover:text-brand-600 transition-colors">Home</Link>
        <span aria-hidden="true">/</span>
        <Link href="/tools" className="hover:text-brand-600 transition-colors">Tools</Link>
        <span aria-hidden="true">/</span>
        <Link href={`/categories/${tool.category}`} className="hover:text-brand-600 transition-colors">{category.label}</Link>
        {relatedToolDefs.length > 0 && (
          <>
            <span className="ml-auto" />
            {relatedToolDefs.slice(0, 3).map((r) => (
              <Link
                key={r.slug}
                href={`/tools/${r.slug}`}
                className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-colors dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
              >
                {r.name}
              </Link>
            ))}
          </>
        )}
      </nav>

      {/* Header */}
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{tool.name}</h1>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{tool.description}</p>

      <AdSlot position="tool-top" className="my-4" />

      {/* Tool body */}
      <div className="rounded-xl border border-gray-200/80 bg-white p-6 shadow-sm ring-1 ring-gray-900/5 dark:border-gray-700/60 dark:bg-gray-900 dark:ring-white/5">
        {children}
      </div>

      <AdSlot position="tool-bottom" className="mt-4" />
    </div>
  );
}
