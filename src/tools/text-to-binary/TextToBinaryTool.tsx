"use client";
import { useState } from "react";

export function TextToBinaryTool() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState("encode");

  const output = mode === "encode"
    ? input.split("").map(c => c.charCodeAt(0).toString(2).padStart(8, "0")).join(" ")
    : input.trim().split(/\s+/).map(b => String.fromCharCode(parseInt(b, 2))).join("");

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button onClick={() => setMode("encode")} className={mode === "encode" ? "btn-primary text-xs" : "btn-secondary text-xs"}>Text → Binary</button>
        <button onClick={() => setMode("decode")} className={mode === "decode" ? "btn-primary text-xs" : "btn-secondary text-xs"}>Binary → Text</button>
      </div>
      <textarea className="input-field min-h-[120px] font-mono" placeholder={mode === "encode" ? "Enter text..." : "Enter binary (space-separated)..."} value={input} onChange={e => setInput(e.target.value)} />
      <textarea className="input-field min-h-[120px] font-mono bg-gray-50 dark:bg-gray-800" readOnly value={output} />
      <button onClick={() => navigator.clipboard.writeText(output)} className="btn-primary text-sm">Copy</button>
    </div>
  );
}
