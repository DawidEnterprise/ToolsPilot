"use client";

import { useState } from "react";
import { sortJsonKeys } from "./logic";
import { CopyButton } from "@/components/CopyButton";

export function JsonSorterTool() {
  const [input, setInput] = useState("");
  const [ascending, setAscending] = useState(true);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const handleSort = () => {
    try {
      setError("");
      setResult(sortJsonKeys(input, ascending));
    } catch {
      setError("Invalid JSON. Please check your input and try again.");
      setResult("");
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <label className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
          JSON Input
        </label>
        <textarea
          className="input-field tool-panel font-mono text-sm"
          placeholder='{"zebra": 1, "apple": 2, "mango": 3}'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoFocus
        />
      </div>

      <div className="flex items-center gap-4">
        <div className="flex gap-2">
          <button
            onClick={() => setAscending(true)}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              ascending
                ? "bg-brand-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            }`}
          >
            A → Z
          </button>
          <button
            onClick={() => setAscending(false)}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              !ascending
                ? "bg-brand-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            }`}
          >
            Z → A
          </button>
        </div>
        <button onClick={handleSort} className="btn-primary">
          Sort Keys
        </button>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400">
          {error}
        </div>
      )}

      {result && (
        <div className="rounded-lg border border-gray-200 bg-gray-50 px-5 py-4 dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">Sorted JSON</span>
            <CopyButton text={result} />
          </div>
          <pre className="whitespace-pre-wrap text-sm font-mono text-gray-900 dark:text-gray-100 tool-panel overflow-y-auto">
            {result}
          </pre>
        </div>
      )}
    </div>
  );
}
