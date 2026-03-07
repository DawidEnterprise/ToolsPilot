import Link from "next/link";
import type { ToolDefinition } from "@/lib/types";
import { getCategoryMeta } from "@/lib/types";
import { AdSlot } from "./AdSlot";
import { getToolBySlug, getPublishedTools } from "@/lib/registry";
import { toolSeoData } from "@/lib/seo-data";
interface ToolPageLayoutProps {
  tool: ToolDefinition;
  children: React.ReactNode;
}

/**
 * Shared wrapper for every tool page.
 * Two-column on desktop: main tool area + sticky sidebar ad.
 * Six ad placements total for maximum revenue:
 *   1. Leaderboard above the tool
 *   2. Sticky sidebar ad (desktop only)
 *   3. In-article below the tool output
 *   4. Multiplex in related tools section  
 *   5. Rectangle at the very bottom
 *   6. Anchor ad (global — see layout.tsx)
 */
export function ToolPageLayout({ tool, children }: ToolPageLayoutProps) {
  const category = getCategoryMeta(tool.category);
  const seo = toolSeoData[tool.slug];

  const relatedToolDefs = (tool.relatedTools ?? [])
    .map((slug) => getToolBySlug(slug))
    .filter(Boolean) as ToolDefinition[];

  // Popular tools for sidebar (exclude current tool)
  const popularSlugs = ["json-formatter", "png-to-jpg", "word-counter", "base64-encoder", "password-generator", "image-resizer", "csv-json-converter", "hash-generator"];
  const popularTools = popularSlugs
    .filter((s) => s !== tool.slug)
    .map((s) => getToolBySlug(s))
    .filter(Boolean) as ToolDefinition[];

  const allToolCount = getPublishedTools().length;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        <ol className="flex items-center gap-1.5">
          <li><Link href="/" className="hover:text-brand-600 transition-colors">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href="/tools" className="hover:text-brand-600 transition-colors">Tools</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href={`/categories/${tool.category}`} className="hover:text-brand-600 transition-colors">{category.label}</Link></li>
          <li aria-hidden="true">/</li>
          <li className="font-medium text-gray-900 dark:text-gray-100">{tool.name}</li>
        </ol>
      </nav>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-gray-100">
          {tool.name}
        </h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">{tool.description}</p>
      </div>

      {/* Ad 1: Leaderboard above the tool */}
      <AdSlot position="tool-top" className="mb-6" />

      {/* Two-column layout: main + sidebar */}
      <div className="flex gap-8">
        {/* Main column */}
        <div className="min-w-0 flex-1">
          {/* Tool body */}
          <div className="rounded-xl border border-gray-200/80 bg-white p-6 shadow-sm ring-1 ring-gray-900/5 dark:border-gray-700/60 dark:bg-gray-900 dark:ring-white/5">
            {children}
          </div>

          {/* Ad 3: In-article below the tool */}
          <AdSlot position="in-content" className="mt-6" />

          {/* Keyword-rich content sections for SEO */}
          {seo?.content && seo.content.length > 0 && (
            <section className="mt-10 space-y-8">
              {seo.content.map((section, i) => (
                <div key={i}>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                    {section.heading}
                  </h2>
                  <p className="mt-2 leading-relaxed text-gray-600 dark:text-gray-400">
                    {section.body}
                  </p>
                </div>
              ))}
            </section>
          )}

          {/* FAQ section for search rich results */}
          {seo?.faqs && seo.faqs.length > 0 && (
            <section className="mt-10">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                Frequently Asked Questions
              </h2>
              <dl className="mt-4 divide-y divide-gray-200 dark:divide-gray-700">
                {seo.faqs.map((faq, i) => (
                  <div key={i} className="py-4">
                    <dt className="font-medium text-gray-900 dark:text-gray-100">
                      {faq.question}
                    </dt>
                    <dd className="mt-2 text-gray-600 dark:text-gray-400">
                      {faq.answer}
                    </dd>
                    {/* In-feed ad after 2nd FAQ for long pages */}
                    {i === 1 && seo.faqs.length > 2 && (
                      <AdSlot position="in-feed" className="mt-4" />
                    )}
                  </div>
                ))}
              </dl>
            </section>
          )}

          {/* Long description / SEO content */}
          {tool.longDescription && (
            <section className="prose prose-gray mt-10 max-w-none dark:prose-invert">
              <h2>About {tool.name}</h2>
              <p>{tool.longDescription}</p>
            </section>
          )}

          {/* Related tools */}
          {relatedToolDefs.length > 0 && (
            <section className="mt-10">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Related Tools</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {relatedToolDefs.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/tools/${related.slug}`}
                    className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm transition-all hover:border-brand-300 hover:shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:hover:border-brand-500"
                  >
                    <span className="text-lg">
                      {related.icon === "image" && "🖼️"}
                      {related.icon === "code" && "🛠️"}
                      {related.icon === "type" && "📝"}
                      {related.icon === "file" && "📁"}
                      {related.icon === "misc" && "🔑"}
                      {!["image", "code", "type", "file", "misc"].includes(related.icon) && "🧰"}
                    </span>
                    <div>
                      <span className="font-medium text-gray-900 dark:text-gray-100">{related.name}</span>
                      <p className="text-xs text-gray-500 line-clamp-1 dark:text-gray-400">{related.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Ad 4: Multiplex / content recommendation */}
          <AdSlot position="multiplex" className="mt-8" />

          {/* Ad 5: Rectangle at the very bottom */}
          <AdSlot position="tool-bottom" className="mt-6" />
        </div>

        {/* Sidebar — desktop only */}
        <aside className="hidden w-[300px] shrink-0 lg:block" aria-label="Sidebar">
          <div className="sticky top-24 space-y-6">
            {/* Ad 2: Sidebar sticky ad */}
            <AdSlot position="sidebar" />

            {/* Popular tools — internal linking power */}
            <div className="rounded-xl border border-gray-200/80 bg-white p-5 shadow-sm dark:border-gray-700/60 dark:bg-gray-900">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">🔥 Popular Tools</h3>
              <ul className="mt-3 space-y-2">
                {popularTools.slice(0, 6).map((t) => (
                  <li key={t.slug}>
                    <Link
                      href={`/tools/${t.slug}`}
                      className="text-sm text-gray-600 hover:text-brand-600 transition-colors dark:text-gray-400 dark:hover:text-brand-400"
                    >
                      {t.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/tools"
                    className="text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300"
                  >
                    All {allToolCount} tools →
                  </Link>
                </li>
              </ul>
            </div>

            {/* Related tools sidebar */}
            {relatedToolDefs.length > 0 && (
              <div className="rounded-xl border border-gray-200/80 bg-white p-5 shadow-sm dark:border-gray-700/60 dark:bg-gray-900">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Related Tools</h3>
                <ul className="mt-3 space-y-2">
                  {relatedToolDefs.slice(0, 4).map((related) => (
                    <li key={related.slug}>
                      <Link
                        href={`/tools/${related.slug}`}
                        className="text-sm text-gray-600 hover:text-brand-600 transition-colors dark:text-gray-400 dark:hover:text-brand-400"
                      >
                        {related.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Ad: Second sidebar ad — more below-fold revenue */}
            <AdSlot position="footer" />
          </div>
        </aside>
      </div>
    </div>
  );
}
