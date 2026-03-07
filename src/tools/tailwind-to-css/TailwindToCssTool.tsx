"use client";
import { useState } from "react";

const MAP: Record<string,string> = {
  "flex": "display: flex;", "grid": "display: grid;", "block": "display: block;", "hidden": "display: none;", "inline": "display: inline;",
  "relative": "position: relative;", "absolute": "position: absolute;", "fixed": "position: fixed;", "sticky": "position: sticky;",
  "items-center": "align-items: center;", "items-start": "align-items: flex-start;", "items-end": "align-items: flex-end;",
  "justify-center": "justify-content: center;", "justify-between": "justify-content: space-between;", "justify-start": "justify-content: flex-start;",
  "text-center": "text-align: center;", "text-left": "text-align: left;", "text-right": "text-align: right;",
  "font-bold": "font-weight: 700;", "font-semibold": "font-weight: 600;", "font-medium": "font-weight: 500;", "font-normal": "font-weight: 400;",
  "text-sm": "font-size: 0.875rem;", "text-lg": "font-size: 1.125rem;", "text-xl": "font-size: 1.25rem;", "text-2xl": "font-size: 1.5rem;",
  "rounded": "border-radius: 0.25rem;", "rounded-lg": "border-radius: 0.5rem;", "rounded-full": "border-radius: 9999px;",
  "p-0": "padding: 0;", "p-1": "padding: 0.25rem;", "p-2": "padding: 0.5rem;", "p-4": "padding: 1rem;", "p-6": "padding: 1.5rem;", "p-8": "padding: 2rem;",
  "m-0": "margin: 0;", "m-1": "margin: 0.25rem;", "m-2": "margin: 0.5rem;", "m-4": "margin: 1rem;", "m-auto": "margin: auto;",
  "w-full": "width: 100%;", "h-full": "height: 100%;", "w-screen": "width: 100vw;", "h-screen": "height: 100vh;",
  "overflow-hidden": "overflow: hidden;", "overflow-auto": "overflow: auto;", "overflow-scroll": "overflow: scroll;",
  "border": "border-width: 1px;", "border-0": "border-width: 0;", "border-2": "border-width: 2px;",
  "opacity-50": "opacity: 0.5;", "opacity-75": "opacity: 0.75;", "opacity-100": "opacity: 1;",
  "cursor-pointer": "cursor: pointer;", "cursor-default": "cursor: default;",
  "gap-1": "gap: 0.25rem;", "gap-2": "gap: 0.5rem;", "gap-4": "gap: 1rem;", "gap-6": "gap: 1.5rem;",
};

export function TailwindToCssTool() {
  const [input, setInput] = useState("flex items-center justify-between p-4 rounded-lg font-bold text-lg");
  const classes = input.trim().split(/\s+/);
  const output = classes.map(c => MAP[c] || ("/* unknown: " + c + " */")).join("\n");

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Tailwind Classes</label>
          <textarea className="input-field h-[24rem] font-mono text-sm" placeholder="Paste Tailwind classes..." value={input} onChange={e => setInput(e.target.value)} />
        </div>
        <div>
          <div className="mb-1 flex items-center justify-between">
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">CSS Output</label>
            <button onClick={() => navigator.clipboard.writeText(output)} className="text-xs text-brand-500 hover:text-brand-600">Copy</button>
          </div>
          <textarea className="input-field h-[24rem] font-mono text-sm bg-gray-50 dark:bg-gray-800" readOnly value={output} />
        </div>
      </div>
    </div>
  );
}
