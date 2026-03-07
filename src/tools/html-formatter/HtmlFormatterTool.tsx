"use client";
import { useState } from "react";

function beautifyHtml(html: string): string {
  const indent = "  ";
  let result = "";
  let level = 0;
  const tokens = html.replace(/>\s*</g, ">\n<").split("\n");
  for (const token of tokens) {
    const t = token.trim();
    if (!t) continue;
    if (t.startsWith("</")) level = Math.max(0, level - 1);
    result += indent.repeat(level) + t + "\n";
    if (t.startsWith("<") && !t.startsWith("</") && !t.startsWith("<!") && !t.endsWith("/>") && !t.includes("</")) level++;
  }
  return result.trim();
}

function minifyHtml(html: string): string {
  return html.replace(/\n\s*/g, "").replace(/>\s+</g, "><").trim();
}

export function HtmlFormatterTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Input HTML</label>
          <textarea className="input-field h-[24rem] font-mono text-sm" placeholder="Paste HTML here..." value={input} onChange={e => setInput(e.target.value)} />
        </div>
        <div>
          <div className="mb-1 flex items-center justify-between">
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Output</label>
            {output && <button onClick={() => navigator.clipboard.writeText(output)} className="text-xs text-brand-500 hover:text-brand-600">Copy</button>}
          </div>
          <textarea className="input-field h-[24rem] font-mono text-sm bg-gray-50 dark:bg-gray-800" readOnly value={output} />
        </div>
      </div>
      <div className="flex gap-2">
        <button onClick={() => setOutput(beautifyHtml(input))} className="btn-primary text-sm">Beautify</button>
        <button onClick={() => setOutput(minifyHtml(input))} className="btn-secondary text-sm">Minify</button>
      </div>
    </div>
  );
}
