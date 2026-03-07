import type { Metadata } from "next";
import { tools } from "@/lib/registry";
import { CATEGORIES } from "@/lib/types";
import { ToolCard } from "@/components/ToolCard";
import { AdSlot } from "@/components/AdSlot";

export const metadata: Metadata = {
  title: "All 163 Free Online Tools — Complete Tools List | ToolsPilot",
  description:
    "Browse our complete list of 163 free online tools for developers, designers, writers, and marketers. PDF converters, image editors, calculators, SEO tools, and more — all free, no signup required.",
  keywords:
    "free online tools, developer tools, image converter, pdf converter, calculator, seo tools, text tools, json formatter, qr code generator, password generator, unit converter",
};

export default function ToolsListPage() {
  const publishedTools = tools.filter((t) => !t.comingSoon);
  const comingSoonTools = tools.filter((t) => t.comingSoon);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Hero / Intro */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
          All {tools.length} Free Online Tools
        </h1>
        <p className="mt-4 text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          The most comprehensive collection of free browser-based tools. No signup, no installation,
          no file uploads to servers. Everything runs privately in your browser.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <span className="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-700 ring-1 ring-inset ring-green-600/20 dark:bg-green-900/30 dark:text-green-400 dark:ring-green-500/30">
            ✅ {publishedTools.length} Available Now
          </span>
          <span className="inline-flex items-center rounded-full bg-amber-50 px-3 py-1 text-sm font-medium text-amber-700 ring-1 ring-inset ring-amber-600/20 dark:bg-amber-900/30 dark:text-amber-400 dark:ring-amber-500/30">
            🔜 {comingSoonTools.length} Coming Soon
          </span>
        </div>
      </div>

      {/* Top ad */}
      <AdSlot position="tool-top" className="mb-8" />

      {/* Table of Contents */}
      <nav className="mb-12 rounded-lg border border-gray-200 dark:border-gray-700 p-6 bg-gray-50 dark:bg-gray-800/50">
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">Categories</h2>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((cat) => {
            const catAll = tools.filter((t) => t.category === cat.id);
            const catPublished = catAll.filter((t) => !t.comingSoon);
            if (catAll.length === 0) return null;
            return (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <span>{cat.icon}</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">{cat.label}</span>
                <span className="ml-auto text-xs text-gray-500">
                  {catPublished.length}/{catAll.length}
                </span>
              </a>
            );
          })}
        </div>
      </nav>

      {/* Tool listings by category */}
      {CATEGORIES.map((cat, idx) => {
        const catTools = tools.filter((t) => t.category === cat.id);
        if (catTools.length === 0) return null;

        const available = catTools.filter((t) => !t.comingSoon);
        const upcoming = catTools.filter((t) => t.comingSoon);

        return (
          <div key={cat.id} id={cat.id}>
            <section className="mt-12">
              <div className="flex items-baseline gap-3 mb-1">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  {cat.icon} {cat.label}
                </h2>
                <span className="text-sm text-gray-500">
                  {available.length} available · {upcoming.length} coming soon
                </span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{cat.description}</p>

              {/* Available tools */}
              {available.length > 0 && (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {available.map((tool) => (
                    <ToolCard key={tool.slug} tool={tool} />
                  ))}
                </div>
              )}

              {/* Coming soon tools */}
              {upcoming.length > 0 && (
                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {upcoming.map((tool) => (
                    <ToolCard key={tool.slug} tool={tool} />
                  ))}
                </div>
              )}
            </section>

            {/* In-feed ad every 2 categories */}
            {idx % 2 === 1 && idx < CATEGORIES.length - 1 && (
              <AdSlot position="in-feed" className="mt-8" />
            )}
          </div>
        );
      })}

      {/* Multiplex ad after all tools */}
      <AdSlot position="multiplex" className="mt-12" />

      {/* SEO content section */}
      <section className="mt-16 prose prose-gray dark:prose-invert max-w-none">
        <h2>Why Use ToolsPilot&apos;s Free Online Tools?</h2>
        <p>
          ToolsPilot offers {tools.length} free online tools that run entirely in your browser.
          Unlike other tool websites, we never upload your files to any server — everything
          is processed locally using JavaScript and modern Web APIs. This means your data
          stays completely private and secure.
        </p>
        <h3>Tool Categories</h3>
        <ul>
          <li><strong>Image Tools</strong> — Convert between PNG, JPG, WebP, SVG. Resize, crop, compress, and edit images without Photoshop.</li>
          <li><strong>File Converters</strong> — Convert PDF, Word, Excel, EPUB, and other document formats instantly.</li>
          <li><strong>Developer Tools</strong> — JSON formatter, regex tester, JWT decoder, Base64 encoder, SQL formatter, and 30+ more developer utilities.</li>
          <li><strong>Text Tools</strong> — Word counter, case converter, text diff, find and replace, Morse code translator, and more.</li>
          <li><strong>SEO Tools</strong> — Meta tag generator, Open Graph preview, robots.txt generator, SERP preview, and schema markup tools.</li>
          <li><strong>Calculators</strong> — Percentage, BMI, loan, tip, age, and 15+ other calculators for everyday use.</li>
        </ul>
        <h3>Frequently Asked Questions</h3>
        <h4>Are these tools really free?</h4>
        <p>
          Yes, all {publishedTools.length} available tools are 100% free to use with no signup,
          no watermarks, and no usage limits. We&apos;re adding {comingSoonTools.length} more tools soon.
        </p>
        <h4>Is my data safe?</h4>
        <p>
          Absolutely. All tools run in your browser. Your files, text, and data are never
          uploaded to any server. We use client-side JavaScript for all processing.
        </p>
        <h4>Do I need to create an account?</h4>
        <p>
          No. Every tool works instantly — no signup, no login, no email required.
          Just open the tool and start using it.
        </p>
      </section>

      {/* Bottom ad */}
      <AdSlot position="tool-bottom" className="mt-12" />
    </div>
  );
}
