"use client";

import { useState, useCallback } from "react";
import { beautifyJs, minifyJs } from "./logic";

export function JsBeautifierMinifierTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"beautify" | "minify">("beautify");
  const [error, setError] = useState("");

  const process = useCallback(() => {
    setError("");
    try {
      if (mode === "beautify") {
        setOutput(beautifyJs(input));
      } else {
        setOutput(minifyJs(input));
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid JavaScript");
    }
  }, [input, mode]);

  const copy = () => { navigator.clipboard.writeText(output); };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button
          onClick={() => setMode("beautify")}
          className={`rounded-md px-4 py-2 text-sm font-medium ${mode === "beautify" ? "bg-brand-500 text-white" : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"}`}
        >
          Beautify
        </button>
        <button
          onClick={() => setMode("minify")}
          className={`rounded-md px-4 py-2 text-sm font-medium ${mode === "minify" ? "bg-brand-500 text-white" : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"}`}
        >
          Minify
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Input</label>
          <textarea
            className="input-field tool-panel font-mono text-sm"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your JavaScript here..."
            autoFocus
          />
        </div>
        <div>
          <div className="mb-1 flex items-center justify-between">
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Output</label>
            {output && <button onClick={copy} className="text-xs text-brand-500 hover:text-brand-600">Copy</button>}
          </div>
          <pre className="tool-panel overflow-auto rounded-lg border border-gray-200 bg-gray-50 p-3 font-mono text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100">
            {output || <span className="text-gray-400">Output will appear here...</span>}
          </pre>
        </div>
      </div>

      <button onClick={process} className="btn-primary">
        {mode === "beautify" ? "Beautify" : "Minify"} Code
      </button>

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
