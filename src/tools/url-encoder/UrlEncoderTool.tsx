"use client";

import { useState, useEffect } from "react";
import { encodeUrl, decodeUrl } from "./logic";
import { CopyButton } from "@/components/CopyButton";

type Mode = "encode" | "decode";

export function UrlEncoderTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<Mode>("encode");

  useEffect(() => {
    if (!input.trim()) {
      setOutput("");
      setError(null);
      return;
    }
    try {
      setOutput(mode === "encode" ? encodeUrl(input) : decodeUrl(input));
      setError(null);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Processing failed");
      setOutput("");
    }
  }, [input, mode]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex rounded-lg border border-gray-200 p-0.5 dark:border-gray-700">
          {(["encode", "decode"] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => { setMode(m); setInput(""); }}
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
          {input && (
            <button onClick={() => setInput("")} className="btn-secondary text-xs">Clear</button>
          )}
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400">
          {error}
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
            {mode === "encode" ? "Plain URL / Text" : "Encoded URL"}
          </label>
          <textarea
            className="textarea-field h-[20rem]"
            placeholder={mode === "encode" ? "Paste a URL or text to encode…" : "Paste URL-encoded string…"}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            spellCheck={false}
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
            {mode === "encode" ? "Encoded Output" : "Decoded Output"}
          </label>
          <textarea
            className="textarea-field h-[20rem] bg-gray-50 dark:bg-gray-800"
            value={output}
            readOnly
            placeholder="Result appears here automatically…"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}
