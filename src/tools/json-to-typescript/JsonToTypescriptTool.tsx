"use client";

import { useState, useMemo } from "react";
import { jsonToTypescript } from "./logic";

export function JsonToTypescriptTool() {
  const [input, setInput] = useState('{\n  "id": 1,\n  "name": "John",\n  "email": "john@example.com",\n  "active": true,\n  "tags": ["admin", "user"]\n}');
  const [rootName, setRootName] = useState("Root");

  const output = useMemo(() => {
    try {
      return { result: jsonToTypescript(input, rootName), error: "" };
    } catch (e) {
      return { result: "", error: e instanceof Error ? e.message : "Invalid JSON" };
    }
  }, [input, rootName]);

  const copy = () => { navigator.clipboard.writeText(output.result); };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <label className="text-xs font-medium text-gray-500 dark:text-gray-400">Root interface name:</label>
        <input
          type="text"
          className="input-field w-40 font-mono"
          value={rootName}
          onChange={(e) => setRootName(e.target.value || "Root")}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">JSON</label>
          <textarea
            className="input-field min-h-[300px] font-mono text-sm"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoFocus
          />
        </div>
        <div>
          <div className="mb-1 flex items-center justify-between">
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">TypeScript</label>
            {output.result && <button onClick={copy} className="text-xs text-brand-500 hover:text-brand-600">Copy</button>}
          </div>
          {output.error ? (
            <div className="min-h-[300px] rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
              {output.error}
            </div>
          ) : (
            <pre className="min-h-[300px] overflow-auto rounded-lg border border-gray-200 bg-gray-50 p-3 font-mono text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100">
              {output.result}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}
