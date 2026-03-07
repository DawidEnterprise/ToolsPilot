"use client";

import { useState, useMemo } from "react";
import { generateMetaTags, type MetaTags } from "./logic";

const DEFAULT_TAGS: MetaTags = {
  title: "My Website - Best Tools Online",
  description: "Discover free online tools for developers and creators.",
  keywords: "tools, online, free, developer",
  author: "",
  robots: "index, follow",
  canonical: "https://example.com",
  ogTitle: "",
  ogDescription: "",
  ogImage: "",
  ogUrl: "",
  ogType: "website",
  twitterCard: "summary_large_image",
  twitterTitle: "",
  twitterDescription: "",
  twitterImage: "",
  viewport: "width=device-width, initial-scale=1.0",
  charset: "UTF-8",
};

export function MetaTagGeneratorTool() {
  const [tags, setTags] = useState<MetaTags>(DEFAULT_TAGS);

  const output = useMemo(() => generateMetaTags({
    ...tags,
    ogTitle: tags.ogTitle || tags.title,
    ogDescription: tags.ogDescription || tags.description,
    twitterTitle: tags.twitterTitle || tags.title,
    twitterDescription: tags.twitterDescription || tags.description,
  }), [tags]);

  const set = (key: keyof MetaTags, val: string) => setTags((t) => ({ ...t, [key]: val }));
  const copy = () => { navigator.clipboard.writeText(output); };

  const titleLen = tags.title.length;
  const descLen = tags.description.length;

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Basic Meta</h3>
          <div>
            <div className="flex justify-between">
              <label className="mb-1 block text-xs text-gray-500 dark:text-gray-400">Title</label>
              <span className={`text-xs ${titleLen > 60 ? "text-red-500" : "text-gray-400"}`}>{titleLen}/60</span>
            </div>
            <input type="text" className="input-field" value={tags.title} onChange={(e) => set("title", e.target.value)} autoFocus />
          </div>
          <div>
            <div className="flex justify-between">
              <label className="mb-1 block text-xs text-gray-500 dark:text-gray-400">Description</label>
              <span className={`text-xs ${descLen > 160 ? "text-red-500" : "text-gray-400"}`}>{descLen}/160</span>
            </div>
            <textarea className="input-field min-h-[60px]" value={tags.description} onChange={(e) => set("description", e.target.value)} />
          </div>
          <input type="text" className="input-field" value={tags.keywords} onChange={(e) => set("keywords", e.target.value)} placeholder="Keywords (comma separated)" />
          <input type="text" className="input-field" value={tags.canonical} onChange={(e) => set("canonical", e.target.value)} placeholder="Canonical URL" />
          <input type="text" className="input-field" value={tags.author} onChange={(e) => set("author", e.target.value)} placeholder="Author" />

          <h3 className="pt-2 text-sm font-semibold text-gray-700 dark:text-gray-300">Open Graph</h3>
          <input type="text" className="input-field" value={tags.ogImage} onChange={(e) => set("ogImage", e.target.value)} placeholder="OG Image URL" />
          <input type="text" className="input-field" value={tags.ogUrl} onChange={(e) => set("ogUrl", e.target.value)} placeholder="OG URL" />
        </div>

        <div>
          <div className="mb-1 flex items-center justify-between">
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Generated Tags</label>
            <button onClick={copy} className="text-xs text-brand-500 hover:text-brand-600">Copy</button>
          </div>
          <pre className="overflow-auto min-h-[20rem] rounded-lg border border-gray-200 bg-gray-50 p-3 font-mono text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100">
            {output}
          </pre>
        </div>
      </div>
    </div>
  );
}
