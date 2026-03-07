"use client";

import { useState, useCallback, useEffect } from "react";
import { formatJson, minifyJson } from "./logic";
import { CopyButton } from "@/components/CopyButton";

type Mode = "format" | "minify";

export function JsonFormatterTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<Mode>("format");
  const [stats, setStats] = useState<{ keys: number; depth: number; sizeBytes: number } | null>(null);

  // Auto-process whenever input or mode changes
  useEffect(() => {
    if (!input.trim()) {
      setOutput("");
      setError(null);
      setStats(null);
      return;
    }

    if (mode === "format") {
      const result = formatJson(input, 2);
      setOutput(result.output);
      setError(result.error || null);
      setStats(result.stats || null);
    } else {
      const result = minifyJson(input);
      setOutput(result.output);
      setError(result.error || null);
      setStats(null);
    }
  }, [input, mode]);

  const handleClear = useCallback(() => {
    setInput("");
    setOutput("");
    setError(null);
    setStats(null);
  }, []);

  return (
    <div className="space-y-4">
      {/* Mode tabs & actions */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex rounded-lg border border-gray-200 p-0.5 dark:border-gray-700">
          <button
            onClick={() => setMode("format")}
            className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
              mode === "format"
                ? "bg-brand-600 text-white shadow-sm"
                : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
            }`}
          >
            Format
          </button>
          <button
            onClick={() => setMode("minify")}
            className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
              mode === "minify"
                ? "bg-brand-600 text-white shadow-sm"
                : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
            }`}
          >
            Minify
          </button>
        </div>

        <div className="flex items-center gap-2">
          {output && <CopyButton text={output} />}
          {input && (
            <button onClick={handleClear} className="btn-secondary text-xs">
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Error inline — shown right above the editors so it's visible */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400">
          {error}
        </div>
      )}

      {/* Input / Output */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
            Paste your JSON
          </label>
          <textarea
            className="textarea-field tool-panel"
            placeholder='{"paste": "your JSON here"}'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            spellCheck={false}
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
            {mode === "format" ? "Formatted Output" : "Minified Output"}
          </label>
          <textarea
            className="textarea-field tool-panel bg-gray-50 dark:bg-gray-800"
            value={output}
            readOnly
            placeholder="Output will appear here automatically…"
            spellCheck={false}
          />
        </div>
      </div>

      {/* Stats — shown subtly at the bottom */}
      {stats && (
        <div className="flex flex-wrap gap-4 text-xs text-gray-500 dark:text-gray-400">
          <span>{stats.keys} keys</span>
          <span>{stats.depth} levels deep</span>
          <span>{(stats.sizeBytes / 1024).toFixed(1)} KB</span>
        </div>
      )}
    </div>
  );
}
