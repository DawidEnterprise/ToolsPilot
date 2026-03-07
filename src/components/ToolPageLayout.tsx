import Link from "next/link";
import type { ToolDefinition } from "@/lib/types";
import { getCategoryMeta } from "@/lib/types";
import { AdSlot } from "./AdSlot";
import { getToolBySlug } from "@/lib/registry";
import { getUsageHint } from "@/lib/usage-hints";

interface ToolPageLayoutProps {
  tool: ToolDefinition;
  children: React.ReactNode;
}

export function ToolPageLayout({ tool, children }: ToolPageLayoutProps) {
  const category = getCategoryMeta(tool.category);
  const hint = getUsageHint(tool.slug);

  const relatedToolDefs = (tool.relatedTools ?? [])
    .map((slug) => getToolBySlug(slug))
    .filter(Boolean) as ToolDefinition[];

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col">
      {/* Sub-nav bar */}
      <div className="border-b border-gray-100 bg-gray-50/50 dark:border-gray-800 dark:bg-gray-900/50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
            <Link href="/" className="hover:text-brand-600 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/tools" className="hover:text-brand-600 transition-colors">Tools</Link>
            <span>/</span>
            <Link href={`/categories/${tool.category}`} className="hover:text-brand-600 transition-colors">{category.label}</Link>
          </nav>
          {relatedToolDefs.length > 0 && (
            <div className="hidden items-center gap-2 sm:flex">
              <span className="text-xs text-gray-400 dark:text-gray-500">Related:</span>
              {relatedToolDefs.slice(0, 3).map((r) => (
                <Link
                  key={r.slug}
                  href={`/tools/${r.slug}`}
                  className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600 hover:bg-brand-50 hover:text-brand-600 transition-colors dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-brand-400"
                >
                  {r.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main content — fills the viewport */}
      <div className="flex-1 flex flex-col">
        <div className="mx-auto w-full max-w-7xl px-4 pt-5 pb-2 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{tool.name}</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{tool.description}</p>
          {hint && (
            <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
              <span className="font-medium text-gray-500 dark:text-gray-400">How to use:</span> {hint}
            </p>
          )}
        </div>

        <AdSlot position="tool-top" className="mx-auto w-full max-w-7xl px-4 py-2 sm:px-6 lg:px-8" />

        {/* Tool body — width depends on layout type */}
        <div className={`flex-1 flex flex-col px-4 pb-2 sm:px-6 ${
          tool.layout === 'full' ? '' :
          tool.layout === 'compact' ? 'max-w-3xl mx-auto w-full' :
          'max-w-4xl mx-auto w-full'
        }`}>
          <div className="flex-1 min-h-0">
            {children}
          </div>
        </div>

        <div className="flex items-center gap-4 px-4 pb-2 sm:px-6 lg:px-8">
          <div className="flex-1">
            <AdSlot position="tool-bottom" />
          </div>
          <div className="hidden xl:block w-[300px] flex-shrink-0">
            <AdSlot position="sidebar" />
          </div>
        </div>
      </div>
    </div>
  );
}
