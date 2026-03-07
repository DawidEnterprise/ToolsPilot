"use client";
import { useState } from "react";

export function CanonicalTagGeneratorTool() {
  const [url, setUrl] = useState("https://example.com/page");
  const tag = '<link rel="canonical" href="' + url + '" />';

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Canonical URL</label>
        <input className="input-field font-mono" value={url} onChange={e => setUrl(e.target.value)} placeholder="https://example.com/page" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Generated Tag</label>
        <textarea className="input-field font-mono text-sm bg-gray-50 dark:bg-gray-800 min-h-[60px]" readOnly value={tag} />
      </div>
      <button onClick={() => navigator.clipboard.writeText(tag)} className="btn-primary text-sm">Copy Tag</button>
    </div>
  );
}
