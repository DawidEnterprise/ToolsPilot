import Link from "next/link";
import { tools } from "@/lib/registry";
import { CATEGORIES } from "@/lib/types";
import { ToolCard } from "@/components/ToolCard";
import { AdSlot } from "@/components/AdSlot";
import { siteConfig } from "@/lib/config";

export default function HomePage() {
  const published = tools.filter((t) => !t.comingSoon);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: siteConfig.name,
            url: siteConfig.url,
            description: siteConfig.description,
            potentialAction: {
              "@type": "SearchAction",
              target: `${siteConfig.url}/tools?q={search_term_string}`,
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Free Online Tools
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            {published.length} browser-based tools — no signup, no uploads, completely private.
          </p>
        </div>

        <AdSlot position="tool-top" className="mb-8" />

        {/* ── Trending Tools — based on actual usage data ── */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
            🔥 Trending Tools
          </h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {["png-to-jpg", "html-encoder", "live-html-preview", "text-diff"]
              .map((slug) => published.find((t) => t.slug === slug))
              .filter(Boolean)
              .map((tool) => (
                <ToolCard key={tool!.slug} tool={tool!} />
              ))}
          </div>
        </section>

        {CATEGORIES.map((cat, idx) => {
          const catTools = published.filter((t) => t.category === cat.id);
          if (catTools.length === 0) return null;
          return (
            <div key={cat.id}>
              <section className="mt-10 first:mt-0">
                <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  {cat.icon} {cat.label}
                </h2>
                <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {catTools.map((tool) => (
                    <ToolCard key={tool.slug} tool={tool} />
                  ))}
                </div>
              </section>
              {idx % 2 === 1 && <AdSlot position="in-feed" className="mt-8" />}
            </div>
          );
        })}

        <AdSlot position="multiplex" className="mt-10" />

        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <Link href="/tools" className="text-brand-600 hover:underline dark:text-brand-400">
            Browse all {published.length} tools →
          </Link>
        </div>
      </div>
    </>
  );
}
