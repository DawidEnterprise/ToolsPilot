"use client";
import { useState } from "react";

export function LiveHtmlPreviewTool() {
  const [html, setHtml] = useState('<h1 style="color:blue">Hello World</h1>\n<p>Edit this HTML and see the preview below.</p>');

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">HTML / CSS / JS</label>
          <textarea className="input-field tool-panel font-mono text-sm" value={html} onChange={e => setHtml(e.target.value)} />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Preview</label>
          <iframe srcDoc={html} sandbox="allow-scripts" className="w-full tool-panel rounded-lg border border-gray-200 dark:border-gray-700 bg-white" title="Preview" />
        </div>
      </div>
    </div>
  );
}
