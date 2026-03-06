"use client";

import { useState, useEffect } from "react";
import { jsonToYaml } from "./logic";
import { CopyButton } from "@/components/CopyButton";

export function JsonToYamlTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const { output: o, error: e } = jsonToYaml(input);
    setOutput(o);
    setError(e);
  }, [input]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-gray-500 dark:text-gray-400">Paste JSON on the left, get YAML on the right</p>
        <div className="flex items-center gap-2">
          {output && <CopyButton text={output} />}
          {input && <button onClick={() => setInput("")} className="btn-secondary text-xs">Clear</button>}
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400">
          {error}
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">JSON Input</label>
          <textarea
            className="textarea-field h-72"
            placeholder='{"key": "value"}'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            spellCheck={false}
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">YAML Output</label>
          <textarea
            className="textarea-field h-72 bg-gray-50 dark:bg-gray-800"
            value={output}
            readOnly
            placeholder="YAML output appears here…"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}
