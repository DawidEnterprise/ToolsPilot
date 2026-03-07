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
      <textarea className="input-field min-h-[150px] font-mono" placeholder="Paste JSON here..." value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={convert} className="btn-primary text-sm">Convert to XML</button>
      <textarea className="input-field min-h-[150px] font-mono bg-gray-50 dark:bg-gray-800" readOnly value={output} />
      {output && <button onClick={() => navigator.clipboard.writeText(output)} className="btn-secondary text-sm">Copy XML</button>}
    </div>
  );
}
