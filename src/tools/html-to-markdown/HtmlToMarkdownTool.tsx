"use client";

import { useState, useMemo } from "react";
import { htmlToMarkdown } from "./logic";

export function HtmlToMarkdownTool() {
  const [input, setInput] = useState('<h1>Hello World</h1>\n<p>This is a <strong>bold</strong> and <em>italic</em> paragraph.</p>\n<ul>\n  <li>Item one</li>\n  <li>Item two</li>\n</ul>\n<a href="https://example.com">Link</a>');

  const output = useMemo(() => htmlToMarkdown(input), [input]);

  const copy = () => { navigator.clipboard.writeText(output); };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">HTML</label>
          <textarea
            className="input-field min-h-[300px] font-mono text-sm"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste HTML here..."
            autoFocus
          />
        </div>
        <div>
          <div className="mb-1 flex items-center justify-between">
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Markdown</label>
            {output && <button onClick={copy} className="text-xs text-brand-500 hover:text-brand-600">Copy</button>}
          </div>
          <pre className="min-h-[300px] overflow-auto rounded-lg border border-gray-200 bg-gray-50 p-3 font-mono text-sm whitespace-pre-wrap dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100">
            {output || <span className="text-gray-400">Markdown will appear here...</span>}
          </pre>
        </div>
      </div>
    </div>
  );
}
