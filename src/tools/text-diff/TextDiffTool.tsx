"use client";

import { useState, useMemo } from "react";
import { computeDiff } from "./logic";

export function TextDiffTool() {
  const [textA, setTextA] = useState("");
  const [textB, setTextB] = useState("");

  const diff = useMemo(() => {
    if (!textA && !textB) return [];
    return computeDiff(textA, textB);
  }, [textA, textB]);

  const added = diff.filter((d) => d.type === "added").length;
  const removed = diff.filter((d) => d.type === "removed").length;

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Original Text</label>
          <textarea
            className="textarea-field h-48"
            placeholder="Paste the original text…"
            value={textA}
            onChange={(e) => setTextA(e.target.value)}
            spellCheck={false}
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Modified Text</label>
          <textarea
            className="textarea-field h-48"
            placeholder="Paste the modified text…"
            value={textB}
            onChange={(e) => setTextB(e.target.value)}
            spellCheck={false}
          />
        </div>
      </div>

      {diff.length > 0 && (
        <>
          <div className="flex gap-4 text-xs text-gray-500 dark:text-gray-400">
            {added > 0 && <span className="text-green-600 dark:text-green-400">+{added} added</span>}
            {removed > 0 && <span className="text-red-600 dark:text-red-400">-{removed} removed</span>}
            <span>{diff.filter((d) => d.type === "equal").length} unchanged</span>
          </div>
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-1 max-h-96 overflow-y-auto font-mono text-sm dark:border-gray-700 dark:bg-gray-800">
            {diff.map((line, i) => (
              <div
                key={i}
                className={`px-3 py-0.5 ${
                  line.type === "added"
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                    : line.type === "removed"
                    ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                    : "text-gray-700 dark:text-gray-300"
                }`}
              >
                <span className="inline-block w-5 text-gray-400 select-none">
                  {line.type === "added" ? "+" : line.type === "removed" ? "-" : " "}
                </span>
                {line.text || " "}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
