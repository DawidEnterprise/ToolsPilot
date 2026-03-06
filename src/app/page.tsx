import Link from "next/link";
import { tools } from "@/lib/registry";
import { CATEGORIES } from "@/lib/types";
import { ToolCard } from "@/components/ToolCard";
import { AdSlot } from "@/components/AdSlot";
import { siteConfig } from "@/lib/config";

export default function HomePage() {
  const featured = tools.filter((t) => !t.comingSoon).slice(0, 9);
  const totalTools = tools.length;

  return (
    <>
      {/* JSON-LD for Organization */}
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

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-100/40 via-transparent to-transparent dark:from-brand-900/20" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 sm:py-28 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl dark:text-gray-100">
            <span className="text-brand-600">{totalTools}+</span> Free Online Tools
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
            Convert images, format code, count words and more — all in your browser.
            No signup, no uploads to external servers. Fast, free, and private.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link href="/tools" className="btn-primary text-base px-8 py-3">
              Browse All Tools
            </Link>
            <Link href="#categories" className="btn-secondary text-base px-8 py-3">
              Explore Categories
            </Link>
          </div>
        </div>
      </section>

      {/* Featured tools */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="section-heading text-center">Popular Tools</h2>
        <p className="mt-2 text-center text-gray-500 dark:text-gray-400">Jump right in — our most used tools</p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/tools" className="text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors dark:text-brand-400 dark:hover:text-brand-300">
            View all {totalTools} tools →
          </Link>
        </div>
      </section>

      {/* Ad: In-content between featured tools and categories */}
      <AdSlot position="in-content" className="mx-auto max-w-3xl px-4" />

      {/* Categories */}
      <section id="categories" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="section-heading text-center">Categories</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((cat) => {
            const count = tools.filter((t) => t.category === cat.id).length;
            return (
              <Link
                key={cat.id}
                href={`/categories/${cat.id}`}
                className="tool-card flex items-center gap-4"
              >
                <span className="text-3xl">{cat.icon}</span>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">{cat.label}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{count} tools — {cat.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Ad: Multiplex (content recommendation grid) before trust bar */}
      <AdSlot position="multiplex" className="mx-auto max-w-5xl px-4" />

      {/* Trust bar */}
      <section className="border-t border-gray-100 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 text-center sm:grid-cols-3">
            <div>
              <p className="text-3xl font-bold text-brand-600">{totalTools}+</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Free Tools</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-brand-600">100%</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Browser-based &amp; Private</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-brand-600">0</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Sign-ups Required</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
