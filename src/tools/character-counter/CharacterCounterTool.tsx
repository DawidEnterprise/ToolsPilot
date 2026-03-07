"use client";

import { useState, useMemo } from "react";

const LIMITS = [
  { name: "Twitter / X", limit: 280 },
  { name: "Instagram Caption", limit: 2200 },
  { name: "LinkedIn Post", limit: 3000 },
  { name: "YouTube Title", limit: 100 },
  { name: "Meta Description", limit: 160 },
  { name: "Meta Title", limit: 60 },
];

export function CharacterCounterTool() {
  const [input, setInput] = useState("");

  const chars = input.length;
  const charsNoSpaces = input.replace(/\s/g, "").length;
  const words = input.trim() ? input.trim().split(/\s+/).length : 0;

  const limits = useMemo(
    () => LIMITS.map((l) => ({ ...l, percent: Math.min(100, (chars / l.limit) * 100), over: chars > l.limit })),
    [chars]
  );

  return (
    <div className="space-y-5">
      <textarea
        className="textarea-field h-[20rem]"
        placeholder="Type or paste text to count characters…"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        autoFocus
      />

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Characters", value: chars },
          { label: "No Spaces", value: charsNoSpaces },
          { label: "Words", value: words },
        ].map((item) => (
          <div key={item.label} className="rounded-lg bg-brand-50 px-4 py-3 text-center dark:bg-brand-950">
            <p className="text-2xl font-bold text-brand-700 dark:text-brand-400">{item.value.toLocaleString()}</p>
            <p className="text-xs text-brand-600/70 dark:text-brand-400/70">{item.label}</p>
          </div>
        ))}
      </div>

      {/* Social media limits */}
      <div className="space-y-3">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400">Platform Limits</p>
        {limits.map((l) => (
          <div key={l.name}>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className={l.over ? "text-red-600 font-medium dark:text-red-400" : "text-gray-600 dark:text-gray-400"}>{l.name}</span>
              <span className={l.over ? "text-red-600 font-medium dark:text-red-400" : "text-gray-500 dark:text-gray-400"}>
                {chars}/{l.limit}
              </span>
            </div>
            <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${l.over ? "bg-red-500" : "bg-brand-500"}`}
                style={{ width: `${Math.min(100, l.percent)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
