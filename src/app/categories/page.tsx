import type { Metadata } from "next";
import Link from "next/link";
import { CATEGORIES } from "@/lib/types";
import { tools } from "@/lib/registry";
import { AdSlot } from "@/components/AdSlot";

export const metadata: Metadata = {
  title: "Categories",
  description: "Browse tools by category: image, developer, text, file converter, SEO and more.",
};

export default function CategoriesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="section-heading">Categories</h1>
      <p className="mt-2 text-gray-500 dark:text-gray-400">Browse our tools by category</p>

      <AdSlot position="tool-top" className="mt-6" />

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map((cat) => {
          const count = tools.filter((t) => t.category === cat.id).length;
          return (
            <Link
              key={cat.id}
              href={`/categories/${cat.id}`}
              className="tool-card flex items-center gap-4"
            >
              <span className="text-4xl">{cat.icon}</span>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{cat.label}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">{count} tools</p>
                <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">{cat.description}</p>
              </div>
            </Link>
          );
        })}
      </div>

      <AdSlot position="tool-bottom" className="mt-10" />
    </div>
  );
}
