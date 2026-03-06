"use client";

import { useState, useMemo } from "react";
import { generateSlug } from "./logic";
import { CopyButton } from "@/components/CopyButton";

export function SlugGeneratorTool() {
  const [input, setInput] = useState("");
  const slug = useMemo(() => generateSlug(input), [input]);

  return (
    <div className="space-y-5">
      <div>
        <label className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
          Your text or title
        </label>
        <input
          type="text"
          className="input-field text-lg"
          placeholder="My Blog Post Title — Enter anything here!"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoFocus
        />
      </div>

      {slug && (
        <div className="rounded-lg border border-gray-200 bg-gray-50 px-5 py-4 dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">URL-Friendly Slug</span>
            <CopyButton text={slug} />
          </div>
          <code className="block text-lg font-mono text-brand-600 dark:text-brand-400 break-all">{slug}</code>
          <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
            Preview: example.com/blog/<strong>{slug}</strong>
          </p>
        </div>
      )}
    </div>
  );
}
