"use client";

import { useState, useEffect } from "react";
import { csvToJson, jsonToCsv } from "./logic";
import { CopyButton } from "@/components/CopyButton";

type Mode = "csv-to-json" | "json-to-csv";

export function CsvJsonTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<Mode>("csv-to-json");

  useEffect(() => {
    if (!input.trim()) { setOutput(""); setError(null); return; }
    if (mode === "csv-to-json") {
      const r = csvToJson(input);
      setOutput(r.output);
      setError(r.error);
    } else {
      const r = jsonToCsv(input);
      setOutput(r.output);
      setError(r.error);
    }
  }, [input, mode]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex rounded-lg border border-gray-200 p-0.5 dark:border-gray-700">
          {([
            { id: "csv-to-json" as Mode, label: "CSV → JSON" },
            { id: "json-to-csv" as Mode, label: "JSON → CSV" },
          ]).map((m) => (
            <button
              key={m.id}
              onClick={() => { setMode(m.id); setInput(""); }}
              className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
                mode === m.id ? "bg-brand-600 text-white shadow-sm" : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          {output && <CopyButton text={output} />}
          {input && <button onClick={() => setInput("")} className="btn-secondary text-xs">Clear</button>}
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400">{error}</div>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
            {mode === "csv-to-json" ? "CSV Input" : "JSON Input"}
          </label>
          <textarea
            className="textarea-field tool-panel"
            placeholder={mode === "csv-to-json" ? "name,age,city\nAlice,30,NYC\nBob,25,LA" : '[{"name":"Alice","age":"30"}]'}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            spellCheck={false}
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
            {mode === "csv-to-json" ? "JSON Output" : "CSV Output"}
          </label>
          <textarea className="textarea-field tool-panel bg-gray-50 dark:bg-gray-800" value={output} readOnly placeholder="Output appears here…" spellCheck={false} />
        </div>
      </div>
    </div>
  );
}
