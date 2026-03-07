"use client";

import { useState, useMemo } from "react";
import { processLineBreaks, type LineBreakAction } from "./logic";

const ACTIONS: { id: LineBreakAction; label: string }[] = [
  { id: "remove", label: "Remove All" },
  { id: "single", label: "Single Line" },
  { id: "double", label: "Double Space" },
  { id: "to-comma", label: "Join with Commas" },
  { id: "to-space", label: "Join with Spaces" },
];

export function RemoveLineBreaksTool() {
  const [input, setInput] = useState("");
  const [action, setAction] = useState<LineBreakAction>("remove");

  const output = useMemo(() => processLineBreaks(input, action), [input, action]);

  const copy = () => { navigator.clipboard.writeText(output); };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {ACTIONS.map((a) => (
          <button
            key={a.id}
            onClick={() => setAction(a.id)}
            className={`rounded-md px-3 py-1.5 text-sm font-medium ${
              action === a.id
                ? "bg-brand-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400"
            }`}
          >
            {a.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Input</label>
          <textarea
            className="input-field h-[24rem]"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste text with line breaks..."
            autoFocus
          />
        </div>
        <div>
          <div className="mb-1 flex items-center justify-between">
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Output</label>
            {output && <button onClick={copy} className="text-xs text-brand-500 hover:text-brand-600">Copy</button>}
          </div>
          <textarea
            className="input-field h-[24rem]"
            value={output}
            readOnly
          />
        </div>
      </div>
    </div>
  );
}
