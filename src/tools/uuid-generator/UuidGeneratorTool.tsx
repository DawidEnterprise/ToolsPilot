"use client";

import { useState, useCallback } from "react";
import { generateUUIDs } from "./logic";
import { CopyButton } from "@/components/CopyButton";

const COUNT_OPTIONS = [1, 5, 10, 25, 50];

export function UuidGeneratorTool() {
  const [uuids, setUuids] = useState<string[]>(() => generateUUIDs(1));
  const [count, setCount] = useState(1);
  const [uppercase, setUppercase] = useState(false);
  const [noDashes, setNoDashes] = useState(false);

  const generate = useCallback(() => {
    setUuids(generateUUIDs(count));
  }, [count]);

  const formatted = uuids.map((u) => {
    let v = noDashes ? u.replace(/-/g, "") : u;
    if (uppercase) v = v.toUpperCase();
    return v;
  });

  const allText = formatted.join("\n");

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Count:</label>
          <select
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="input-field w-20 py-2"
          >
            {COUNT_OPTIONS.map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>

        <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
          <input
            type="checkbox"
            checked={uppercase}
            onChange={(e) => setUppercase(e.target.checked)}
            className="rounded border-gray-300 text-brand-600 focus:ring-brand-500"
          />
          Uppercase
        </label>

        <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
          <input
            type="checkbox"
            checked={noDashes}
            onChange={(e) => setNoDashes(e.target.checked)}
            className="rounded border-gray-300 text-brand-600 focus:ring-brand-500"
          />
          No dashes
        </label>

        <button onClick={generate} className="btn-primary">
          Generate
        </button>
      </div>

      <div className="relative rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
        <div className="absolute top-2 right-2">
          <CopyButton text={allText} label="Copy All" />
        </div>
        <div className="max-h-80 overflow-y-auto p-4 font-mono text-sm text-gray-900 dark:text-gray-100">
          {formatted.map((u, i) => (
            <div key={i} className="flex items-center gap-2 py-1 group">
              <span className="text-xs text-gray-400 w-6 text-right">{i + 1}.</span>
              <code className="flex-1 select-all">{u}</code>
              <button
                onClick={() => navigator.clipboard.writeText(u)}
                className="opacity-0 group-hover:opacity-100 text-xs text-brand-600 hover:text-brand-700 transition-opacity dark:text-brand-400"
              >
                Copy
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
