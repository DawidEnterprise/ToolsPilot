"use client";
import { useState } from "react";

export function LiveHtmlPreviewTool() {
  const [html, setHtml] = useState('<h1 style="color:blue">Hello World</h1>\n<p>Edit this HTML and see the preview below.</p>');

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">HTML / CSS / JS</label>
        <textarea className="input-field min-h-[200px] font-mono text-sm" value={html} onChange={e => setHtml(e.target.value)} />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Preview</label>
        <iframe srcDoc={html} sandbox="allow-scripts" className="w-full min-h-[200px] rounded-lg border border-gray-200 dark:border-gray-700 bg-white" title="Preview" />
      </div>
    </div>
  );
}
