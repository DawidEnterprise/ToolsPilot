"use client";
import { useState } from "react";

function toXml(obj: unknown, root?: string): string {
  if (obj === null || obj === undefined) return "";
  if (typeof obj !== "object") return String(obj);
  if (Array.isArray(obj)) return obj.map(item => "<item>" + toXml(item) + "</item>").join("\n");
  const lines: string[] = [];
  for (const [key, val] of Object.entries(obj as Record<string,unknown>)) {
    const tag = key.replace(/[^a-zA-Z0-9_]/g, "_");
    if (Array.isArray(val)) {
      val.forEach(item => lines.push("<" + tag + ">" + toXml(item) + "</" + tag + ">"));
    } else if (typeof val === "object" && val !== null) {
      lines.push("<" + tag + ">\n" + toXml(val) + "\n</" + tag + ">");
    } else {
      lines.push("<" + tag + ">" + String(val) + "</" + tag + ">");
    }
  }
  if (root) return "<" + root + ">\n" + lines.join("\n") + "\n</" + root + ">";
  return lines.join("\n");
}

export function JsonToXmlTool() {
  const [input, setInput] = useState('{"name":"John","age":30,"items":[1,2,3]}');
  const [output, setOutput] = useState("");

  const convert = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput('<?xml version="1.0" encoding="UTF-8"?>\n' + toXml(parsed, "root"));
    } catch {
      setOutput("Error: Invalid JSON input");
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">JSON Input</label>
          <textarea className="input-field h-[24rem] font-mono" placeholder="Paste JSON here..." value={input} onChange={e => setInput(e.target.value)} />
        </div>
        <div>
          <div className="mb-1 flex items-center justify-between">
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">XML Output</label>
            {output && <button onClick={() => navigator.clipboard.writeText(output)} className="text-xs text-brand-500 hover:text-brand-600">Copy</button>}
          </div>
          <textarea className="input-field h-[24rem] font-mono bg-gray-50 dark:bg-gray-800" readOnly value={output} />
        </div>
      </div>
      <button onClick={convert} className="btn-primary text-sm">Convert to XML</button>
    </div>
  );
}
