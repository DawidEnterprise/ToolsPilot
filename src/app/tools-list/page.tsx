import type { Metadata } from "next";
import { tools } from "@/lib/registry";
import { CATEGORIES } from "@/lib/types";
import { ToolCard } from "@/components/ToolCard";
import { AdSlot } from "@/components/AdSlot";

export const metadata: Metadata = {
  title: "All Free Online Tools — Complete Tools List | ToolsPilot",
  description:
    "Browse all free online tools for developers, designers, writers, and marketers. Image converters, calculators, SEO tools, and more — all free, no signup required.",
  keywords:
    "free online tools, developer tools, image converter, pdf converter, calculator, seo tools, text tools, json formatter, qr code generator, password generator, unit converter",
};

export default function ToolsListPage() {
  const published = tools.filter((t) => !t.comingSoon);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
        All {published.length} Free Online Tools
      </h1>
      <p className="mt-2 text-gray-500 dark:text-gray-400">
        Browser-based tools — no signup, no installation, no file uploads to servers.
      </p>

      <AdSlot position="tool-top" className="my-8" />

      {CATEGORIES.map((cat, idx) => {
        const catTools = published.filter((t) => t.category === cat.id);
        if (catTools.length === 0) return null;
        return (
          <div key={cat.id} id={cat.id}>
            <section className="mt-10">
              <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                {cat.icon} {cat.label}
                <span className="ml-2 text-sm font-normal text-gray-500">{catTools.length}</span>
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

      <AdSlot position="multiplex" className="mt-12" />
      <AdSlot position="tool-bottom" className="mt-6" />
    </div>
  );
}
