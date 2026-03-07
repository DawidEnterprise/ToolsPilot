"use client";

import { useState, useEffect } from "react";
import { encodeHtmlEntities, decodeHtmlEntities } from "./logic";
import { CopyButton } from "@/components/CopyButton";

type Mode = "encode" | "decode";

export function HtmlEncoderTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<Mode>("encode");

  useEffect(() => {
    if (!input.trim()) { setOutput(""); return; }
    setOutput(mode === "encode" ? encodeHtmlEntities(input) : decodeHtmlEntities(input));
  }, [input, mode]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex rounded-lg border border-gray-200 p-0.5 dark:border-gray-700">
          {(["encode", "decode"] as Mode[]).map((m) => (
            <button key={m} onClick={() => { setMode(m); setInput(""); }} className={`rounded-md px-4 py-1.5 text-sm font-medium capitalize transition-colors ${mode === m ? "bg-brand-600 text-white shadow-sm" : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"}`}>{m}</button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          {output && <CopyButton text={output} />}
          {input && <button onClick={() => setInput("")} className="btn-secondary text-xs">Clear</button>}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">{mode === "encode" ? "HTML / Text" : "Encoded HTML"}</label>
          <textarea className="textarea-field tool-panel" placeholder={mode === "encode" ? '<p>Hello & "World"</p>' : '&lt;p&gt;Hello &amp; &quot;World&quot;&lt;/p&gt;'} value={input} onChange={(e) => setInput(e.target.value)} spellCheck={false} />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">{mode === "encode" ? "Encoded" : "Decoded"} Output</label>
          <textarea className="textarea-field tool-panel bg-gray-50 dark:bg-gray-800" value={output} readOnly placeholder="Result appears here…" spellCheck={false} />
        </div>
      </div>
    </div>
  );
}
