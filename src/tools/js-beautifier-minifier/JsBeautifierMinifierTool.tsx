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

      <textarea
        className="input-field min-h-[200px] font-mono text-sm"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste your JavaScript here..."
        autoFocus
      />

      <button onClick={process} className="btn-primary">
        {mode === "beautify" ? "Beautify" : "Minify"} Code
      </button>

      {error && <p className="text-sm text-red-500">{error}</p>}

      {output && (
        <div className="relative">
          <button onClick={copy} className="absolute right-2 top-2 btn-secondary text-xs">Copy</button>
          <pre className="max-h-96 overflow-auto rounded-lg border border-gray-200 bg-gray-50 p-4 font-mono text-sm dark:border-gray-700 dark:bg-gray-900">
            {output}
          </pre>
        </div>
      )}
    </div>
  );
}
