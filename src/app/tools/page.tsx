import type { Metadata } from "next";
import { tools } from "@/lib/registry";
import { CATEGORIES } from "@/lib/types";
import { ToolCard } from "@/components/ToolCard";
import { AdSlot } from "@/components/AdSlot";

export const metadata: Metadata = {
  title: "All Free Online Tools — Developer, Image, Text & SEO Tools | ToolsPilot",
  description:
    "Browse 163 free online tools: JSON formatter, image converter, PDF tools, calculators, SEO tools, and more. No signup required. 100% browser-based.",
  keywords:
    "free online tools, developer tools, image converter, json formatter, pdf converter, calculator online, text tools, seo tools, password generator, qr code generator",
};

export default function ToolsPage() {
  const published = tools.filter((t) => !t.comingSoon);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="section-heading">All Tools</h1>
      <p className="mt-2 text-gray-500 dark:text-gray-400">
        {published.length} tools across {CATEGORIES.length} categories
      </p>

      {CATEGORIES.map((cat, idx) => {
        const catTools = published.filter((t) => t.category === cat.id);
        if (catTools.length === 0) return null;
        return (
          <div key={cat.id}>
            <section className="mt-12">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                {cat.icon} {cat.label}
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {catTools.map((tool) => (
                  <ToolCard key={tool.slug} tool={tool} />
                ))}
              </div>
            </section>
            {/* In-feed ad every 2 categories — blends with the listing */}
            {idx % 2 === 1 && idx < CATEGORIES.length - 1 && (
              <AdSlot position="in-feed" className="mt-8" />
            )}
          </div>
        );
      })}

      {/* Bottom ad after all categories */}
      <AdSlot position="tool-bottom" className="mt-12" />
    </div>
  );
}
