import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CATEGORIES, type ToolCategory } from "@/lib/types";
import { getToolsByCategory } from "@/lib/registry";
import { ToolCard } from "@/components/ToolCard";
import { AdSlot } from "@/components/AdSlot";

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = CATEGORIES.find((c) => c.id === category);
  if (!cat) return {};
  return {
    title: cat.label,
    description: `Free ${cat.label.toLowerCase()} — ${cat.description}`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = CATEGORIES.find((c) => c.id === category);
  if (!cat) notFound();

  const catTools = getToolsByCategory(category as ToolCategory);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="section-heading">
        {cat.icon} {cat.label}
      </h1>
      <p className="mt-2 text-gray-500 dark:text-gray-400">{cat.description} — {catTools.length} tools</p>

      {/* Top ad */}
      <AdSlot position="tool-top" className="mt-6" />

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {catTools.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>

      {/* Bottom ad */}
      <AdSlot position="tool-bottom" className="mt-10" />
    </div>
  );
}
