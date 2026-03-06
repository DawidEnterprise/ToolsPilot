import type { Metadata } from "next";
import { tools } from "@/lib/registry";
import { CATEGORIES } from "@/lib/types";
import { ToolCard } from "@/components/ToolCard";
import { AdSlot } from "@/components/AdSlot";

export const metadata: Metadata = {
  title: "All Tools",
  description: "Browse our complete collection of free online tools for developers, designers and marketers.",
};

export default function ToolsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="section-heading">All Tools</h1>
      <p className="mt-2 text-gray-500 dark:text-gray-400">
        {tools.length} tools across {CATEGORIES.length} categories
      </p>

      {CATEGORIES.map((cat, idx) => {
        const catTools = tools.filter((t) => t.category === cat.id);
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
