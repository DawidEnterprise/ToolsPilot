"use client";
import { useState, useMemo } from "react";

function markdownToHtml(md: string): string {
  let html = md;
  html = html.replace(/^### (.+)$/gm, "<h3>$1</h3>");
  html = html.replace(/^## (.+)$/gm, "<h2>$1</h2>");
  html = html.replace(/^# (.+)$/gm, "<h1>$1</h1>");
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");
  html = html.replace(/\`(.+?)\`/g, "<code>$1</code>");
  html = html.replace(/^\- (.+)$/gm, "<li>$1</li>");
  html = html.replace(/((?:<li>.*?<\/li>\n?)+)/gm, "<ul>$1</ul>");
  html = html.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');
  html = html.replace(/^(?!<[hulo])(.*\S.*)$/gm, "<p>$1</p>");
  return html;
}

export function MarkdownEditorTool() {
  const [md, setMd] = useState("# Hello World\n\nThis is **bold** and *italic* text.\n\n## Features\n\n- Item one\n- Item two\n\nVisit [example](https://example.com)");
  const html = useMemo(() => markdownToHtml(md), [md]);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Markdown</label>
          <textarea className="input-field h-[24rem] font-mono text-sm" value={md} onChange={e => setMd(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Preview</label>
          <div className="input-field h-[24rem] prose prose-sm dark:prose-invert overflow-auto" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </div>
      <button onClick={() => navigator.clipboard.writeText(html)} className="btn-primary text-sm">Copy HTML</button>
    </div>
  );
}
