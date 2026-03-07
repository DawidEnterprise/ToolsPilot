"use client";
import { useState } from "react";

function inferType(val: unknown): string {
  if (val === null || val === undefined) return "String";
  if (typeof val === "boolean") return "Boolean";
  if (typeof val === "number") return Number.isInteger(val) ? "Int" : "Float";
  if (typeof val === "string") return "String";
  if (Array.isArray(val)) return "[" + (val.length > 0 ? inferType(val[0]) : "String") + "]";
  return "Object";
}

function jsonToGraphql(obj: unknown, name?: string): string {
  if (typeof obj !== "object" || obj === null || Array.isArray(obj)) return "";
  const typeName = name || "Root";
  const fields: string[] = [];
  const nested: string[] = [];
  for (const [key, val] of Object.entries(obj as Record<string,unknown>)) {
    if (typeof val === "object" && val !== null && !Array.isArray(val)) {
      const childType = key.charAt(0).toUpperCase() + key.slice(1);
      fields.push("  " + key + ": " + childType);
      nested.push(jsonToGraphql(val, childType));
    } else if (Array.isArray(val) && val.length > 0 && typeof val[0] === "object") {
      const childType = key.charAt(0).toUpperCase() + key.slice(1) + "Item";
      fields.push("  " + key + ": [" + childType + "]");
      nested.push(jsonToGraphql(val[0], childType));
    } else {
      fields.push("  " + key + ": " + inferType(val));
    }
  }
  return "type " + typeName + " {\n" + fields.join("\n") + "\n}" + (nested.length ? "\n\n" + nested.join("\n\n") : "");
}

export function JsonToGraphqlTool() {
  const [input, setInput] = useState('{"user":{"name":"John","age":30},"posts":[{"title":"Hello","likes":5}]}');
  const [output, setOutput] = useState("");

  const convert = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(jsonToGraphql(parsed));
    } catch {
      setOutput("Error: Invalid JSON");
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
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">GraphQL Schema</label>
            {output && <button onClick={() => navigator.clipboard.writeText(output)} className="text-xs text-brand-500 hover:text-brand-600">Copy</button>}
          </div>
          <textarea className="input-field h-[24rem] font-mono bg-gray-50 dark:bg-gray-800" readOnly value={output} />
        </div>
      </div>
      <button onClick={convert} className="btn-primary text-sm">Generate GraphQL Schema</button>
    </div>
  );
}
