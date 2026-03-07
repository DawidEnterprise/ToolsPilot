"use client";

import { useState, useMemo } from "react";
import { formatSql } from "./logic";

export function SqlFormatterTool() {
  const [input, setInput] = useState("");
  const [uppercase, setUppercase] = useState(true);

  const output = useMemo(() => formatSql(input, uppercase), [input, uppercase]);

  const copy = () => { navigator.clipboard.writeText(output); };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <input
            type="checkbox"
            checked={uppercase}
            onChange={(e) => setUppercase(e.target.checked)}
            className="rounded border-gray-300"
          />
          Uppercase keywords
        </label>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Input SQL</label>
          <textarea
            className="input-field h-[24rem] font-mono text-sm"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="SELECT id, name, email FROM users WHERE active = 1 AND role = 'admin' ORDER BY name ASC"
            autoFocus
          />
        </div>
        <div>
          <div className="mb-1 flex items-center justify-between">
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Formatted</label>
            {output && <button onClick={copy} className="text-xs text-brand-500 hover:text-brand-600">Copy</button>}
          </div>
          <pre className="h-[24rem] overflow-auto rounded-lg border border-gray-200 bg-gray-50 p-3 font-mono text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100">
            {output || <span className="text-gray-400">Formatted SQL will appear here...</span>}
          </pre>
        </div>
      </div>
    </div>
  );
}
