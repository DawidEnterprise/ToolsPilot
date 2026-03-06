"use client";

import { useState, useMemo } from "react";
import { repeatText } from "./logic";
import { CopyButton } from "@/components/CopyButton";

const SEPARATOR_OPTIONS = [
  { label: "New Line", value: "\n" },
  { label: "Space", value: " " },
  { label: "Comma", value: ", " },
  { label: "None", value: "" },
];

export function TextRepeaterTool() {
  const [text, setText] = useState("");
  const [count, setCount] = useState("3");
  const [separator, setSeparator] = useState("\n");

  const result = useMemo(
    () => repeatText(text, parseInt(count) || 0, separator),
    [text, count, separator]
  );

  return (
    <div className="space-y-5">
      <div>
        <label className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
          Text to Repeat
        </label>
        <textarea
          className="input-field min-h-[80px]"
          placeholder="Enter text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          autoFocus
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
            Repeat Count
          </label>
          <input
            type="number"
            className="input-field"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            min="1"
            max="10000"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
            Separator
          </label>
          <div className="flex gap-2">
            {SEPARATOR_OPTIONS.map((opt) => (
              <button
                key={opt.label}
                onClick={() => setSeparator(opt.value)}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  separator === opt.value
                    ? "bg-brand-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {result && (
        <div className="rounded-lg border border-gray-200 bg-gray-50 px-5 py-4 dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
              Result ({result.length} characters)
            </span>
            <CopyButton text={result} />
          </div>
          <pre className="whitespace-pre-wrap break-all text-sm font-mono text-gray-900 dark:text-gray-100 max-h-60 overflow-y-auto">
            {result}
          </pre>
        </div>
      )}
    </div>
  );
}
