"use client";
import { useState } from "react";

export function SerpPreviewTool() {
  const [title, setTitle] = useState("Your Page Title - Brand Name");
  const [url, setUrl] = useState("https://example.com/page");
  const [desc, setDesc] = useState("This is the meta description that appears in search results. Keep it under 160 characters for best results.");

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title Tag <span className="text-gray-400">({title.length}/60)</span></label>
        <input className="input-field" value={title} onChange={e => setTitle(e.target.value)} />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">URL</label>
        <input className="input-field font-mono text-sm" value={url} onChange={e => setUrl(e.target.value)} />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Meta Description <span className="text-gray-400">({desc.length}/160)</span></label>
        <textarea className="input-field min-h-[80px]" value={desc} onChange={e => setDesc(e.target.value)} />
      </div>
      <div className="mt-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
        <p className="text-xs text-gray-500 mb-1">Google Search Preview</p>
        <div>
          <p className="text-[#1a0dab] text-lg leading-tight hover:underline cursor-pointer" style={{fontFamily:"arial,sans-serif"}}>{title.slice(0, 60) || "Page Title"}</p>
          <p className="text-sm text-[#006621] mt-0.5" style={{fontFamily:"arial,sans-serif"}}>{url}</p>
          <p className="text-sm text-[#545454] mt-0.5 line-clamp-2" style={{fontFamily:"arial,sans-serif"}}>{desc.slice(0, 160) || "Meta description..."}</p>
        </div>
      </div>
    </div>
  );
}
