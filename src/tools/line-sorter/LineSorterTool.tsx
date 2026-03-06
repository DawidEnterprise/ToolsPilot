"use client";

import { useState, useMemo } from "react";
import { CopyButton } from "@/components/CopyButton";

type SortMode = "az" | "za" | "length-asc" | "length-desc" | "shuffle" | "reverse";

export function LineSorterTool() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<SortMode>("az");
  const [removeDuplicates, setRemoveDuplicates] = useState(false);
  const [removeEmpty, setRemoveEmpty] = useState(true);

  const output = useMemo(() => {
    let lines = input.split("\n");
    if (removeEmpty) lines = lines.filter((l) => l.trim());
    if (removeDuplicates) lines = [...new Set(lines)];

    switch (mode) {
      case "az": lines.sort((a, b) => a.localeCompare(b)); break;
      case "za": lines.sort((a, b) => b.localeCompare(a)); break;
      case "length-asc": lines.sort((a, b) => a.length - b.length); break;
      case "length-desc": lines.sort((a, b) => b.length - a.length); break;
      case "shuffle":
        for (let i = lines.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [lines[i], lines[j]] = [lines[j], lines[i]];
        }
        break;
      case "reverse": lines.reverse(); break;
    }
    return lines.join("\n");
  }, [input, mode, removeDuplicates, removeEmpty]);

  const modes: { id: SortMode; label: string }[] = [
    { id: "az", label: "A → Z" }, { id: "za", label: "Z → A" },
    { id: "length-asc", label: "Short → Long" }, { id: "length-desc", label: "Long → Short" },
    { id: "reverse", label: "Reverse" }, { id: "shuffle", label: "Shuffle" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        {modes.map((m) => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              mode === m.id
                ? "bg-brand-100 text-brand-700 ring-1 ring-brand-300 dark:bg-brand-950 dark:text-brand-300 dark:ring-brand-700"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-4">
        <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
          <input type="checkbox" checked={removeDuplicates} onChange={(e) => setRemoveDuplicates(e.target.checked)} className="rounded border-gray-300 text-brand-600 focus:ring-brand-500" />
          Remove duplicates
        </label>
        <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
          <input type="checkbox" checked={removeEmpty} onChange={(e) => setRemoveEmpty(e.target.checked)} className="rounded border-gray-300 text-brand-600 focus:ring-brand-500" />
          Remove empty lines
        </label>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Input Lines</label>
          <textarea className="textarea-field h-64" placeholder={"banana\napple\ncherry\napple"} value={input} onChange={(e) => setInput(e.target.value)} spellCheck={false} />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Sorted Output</label>
            {output && <CopyButton text={output} />}
          </div>
          <textarea className="textarea-field h-64 bg-gray-50 dark:bg-gray-800" value={output} readOnly placeholder="Sorted output…" spellCheck={false} />
        </div>
      </div>
    </div>
  );
}
