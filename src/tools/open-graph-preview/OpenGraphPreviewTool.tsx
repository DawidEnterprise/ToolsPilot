"use client";

import { useState } from "react";
import type { OgData } from "./logic";

export function OpenGraphPreviewTool() {
  const [data, setData] = useState<OgData>({
    title: "My Amazing Website",
    description: "Discover the best tools and resources for developers, designers, and creators.",
    url: "https://example.com/page",
    imageUrl: "https://via.placeholder.com/1200x630/3b82f6/ffffff?text=OG+Image",
    siteName: "Example.com",
    type: "website",
  });

  const set = (key: keyof OgData, val: string) => setData((d) => ({ ...d, [key]: val }));

  const ogTags = `<meta property="og:title" content="${data.title}">
<meta property="og:description" content="${data.description}">
<meta property="og:url" content="${data.url}">
<meta property="og:image" content="${data.imageUrl}">
<meta property="og:site_name" content="${data.siteName}">
<meta property="og:type" content="${data.type}">`;

  const copy = () => { navigator.clipboard.writeText(ogTags); };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="space-y-3">
          <input type="text" className="input-field" value={data.title} onChange={(e) => set("title", e.target.value)} placeholder="Title" autoFocus />
          <textarea className="input-field min-h-[60px]" value={data.description} onChange={(e) => set("description", e.target.value)} placeholder="Description" />
          <input type="text" className="input-field" value={data.url} onChange={(e) => set("url", e.target.value)} placeholder="URL" />
          <input type="text" className="input-field" value={data.imageUrl} onChange={(e) => set("imageUrl", e.target.value)} placeholder="Image URL" />
          <input type="text" className="input-field" value={data.siteName} onChange={(e) => set("siteName", e.target.value)} placeholder="Site Name" />
        </div>

        <div className="space-y-4">
          {/* Facebook Preview */}
          <div>
            <h3 className="mb-2 text-xs font-semibold text-gray-500 uppercase dark:text-gray-400">Facebook / LinkedIn Preview</h3>
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
              {data.imageUrl && (
                <div className="h-40 bg-gray-200 dark:bg-gray-700">
                  <img src={data.imageUrl} alt="" className="h-full w-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                </div>
              )}
              <div className="px-3 py-2">
                <p className="text-xs text-gray-500 uppercase">{data.siteName || new URL(data.url || "https://example.com").hostname}</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 line-clamp-2">{data.title}</p>
                <p className="text-xs text-gray-500 line-clamp-2 dark:text-gray-400">{data.description}</p>
              </div>
            </div>
          </div>

          {/* Twitter Preview */}
          <div>
            <h3 className="mb-2 text-xs font-semibold text-gray-500 uppercase dark:text-gray-400">Twitter/X Preview</h3>
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
              {data.imageUrl && (
                <div className="h-40 bg-gray-200 dark:bg-gray-700">
                  <img src={data.imageUrl} alt="" className="h-full w-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                </div>
              )}
              <div className="px-3 py-2">
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{data.title}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{data.description}</p>
                <p className="text-xs text-gray-400 mt-1">{data.url}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative">
        <button onClick={copy} className="absolute right-2 top-2 btn-secondary text-xs">Copy Tags</button>
        <pre className="overflow-auto rounded-lg border border-gray-200 bg-gray-50 p-4 font-mono text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100">
          {ogTags}
        </pre>
      </div>
    </div>
  );
}
