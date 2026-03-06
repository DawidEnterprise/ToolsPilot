"use client";

import { useState, useEffect } from "react";
import { minifyCss, beautifyCss } from "./logic";
import { CopyButton } from "@/components/CopyButton";

type Mode = "minify" | "beautify";

export function CssMinifierTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<Mode>("minify");
  const [stats, setStats] = useState<{ savedPercent: number } | null>(null);

  useEffect(() => {
    if (!input.trim()) {
      setOutput("");
      setStats(null);
      return;
    }
    if (mode === "minify") {
      const result = minifyCss(input);
      setOutput(result.output);
      setStats({ savedPercent: result.savedPercent });
    } else {
      setOutput(beautifyCss(input));
      setStats(null);
    }
  }, [input, mode]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex rounded-lg border border-gray-200 p-0.5 dark:border-gray-700">
          {(["minify", "beautify"] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`rounded-md px-4 py-1.5 text-sm font-medium capitalize transition-colors ${
                mode === m
                  ? "bg-brand-600 text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          {output && <CopyButton text={output} />}
          {input && <button onClick={() => setInput("")} className="btn-secondary text-xs">Clear</button>}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">CSS Input</label>
          <textarea
            className="textarea-field h-72"
            placeholder={"body {\n  margin: 0;\n  padding: 0;\n}"}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            spellCheck={false}
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
            {mode === "minify" ? "Minified Output" : "Beautified Output"}
          </label>
          <textarea
            className="textarea-field h-72 bg-gray-50 dark:bg-gray-800"
            value={output}
            readOnly
            placeholder="Output appears here…"
            spellCheck={false}
          />
        </div>
      </div>

      {stats && stats.savedPercent > 0 && (
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Reduced by {stats.savedPercent}% — from {input.length} to {output.length} characters
        </p>
      )}
    </div>
  );
}
