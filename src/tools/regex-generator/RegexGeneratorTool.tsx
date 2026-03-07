"use client";
import { useState } from "react";

const PATTERNS: [string,string,string][] = [
  ["Email","^[\\w.-]+@[\\w.-]+\\.[a-zA-Z]{2,}$","Match email addresses"],
  ["URL","https?:\\/\\/[\\w.-]+(?:\\.[a-zA-Z]{2,})(?:\\/[^\\s]*)?","Match URLs"],
  ["Phone (US)","\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}","Match US phone numbers"],
  ["IP Address","\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\b","Match IPv4 addresses"],
  ["Date (YYYY-MM-DD)","\\d{4}-\\d{2}-\\d{2}","Match ISO dates"],
  ["Time (HH:MM)","\\d{2}:\\d{2}","Match time format"],
  ["Hex Color","#[0-9a-fA-F]{3,8}","Match hex color codes"],
  ["HTML Tag","<[^>]+>","Match HTML tags"],
  ["Numbers Only","^\\d+$","Match only numbers"],
  ["Letters Only","^[a-zA-Z]+$","Match only letters"],
  ["Alphanumeric","^[a-zA-Z0-9]+$","Match letters and numbers"],
  ["Whitespace","\\s+","Match whitespace"],
  ["No Whitespace","^\\S+$","Match non-whitespace strings"],
  ["ZIP Code (US)","\\d{5}(-\\d{4})?","Match US ZIP codes"],
  ["SSN","\\d{3}-\\d{2}-\\d{4}","Match SSN format"],
  ["Credit Card","\\d{4}[- ]?\\d{4}[- ]?\\d{4}[- ]?\\d{4}","Match credit card numbers"],
];

export function RegexGeneratorTool() {
  const [search, setSearch] = useState("");
  const [test, setTest] = useState("");
  const [selected, setSelected] = useState(PATTERNS[0]);
  const filtered = PATTERNS.filter(([name,,desc]) => name.toLowerCase().includes(search.toLowerCase()) || desc.toLowerCase().includes(search.toLowerCase()));
  let matches: string[] = [];
  try { matches = test.match(new RegExp(selected[1], "g")) || []; } catch { /* invalid regex */ }

  return (
    <div className="space-y-4">
      <input className="input-field" placeholder="Search patterns..." value={search} onChange={e => setSearch(e.target.value)} />
      <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
        {filtered.map(([name, pattern, desc]) => (
          <button key={name} onClick={() => setSelected([name, pattern, desc])} className={"text-left rounded-lg border p-3 text-sm transition-colors " + (selected[0] === name ? "border-brand-500 bg-brand-50 dark:bg-brand-950 dark:border-brand-400" : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600")}>
            <p className="font-medium text-gray-900 dark:text-gray-100">{name}</p>
            <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
          </button>
        ))}
      </div>
      <div className="rounded-lg bg-gray-50 dark:bg-gray-800 p-4 font-mono text-sm">
        <p className="text-gray-500 text-xs mb-1">{selected[0]}:</p>
        <p className="text-gray-900 dark:text-gray-100 break-all">{selected[1]}</p>
      </div>
      <button onClick={() => navigator.clipboard.writeText(selected[1])} className="btn-primary text-sm">Copy Regex</button>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Test String</label>
        <textarea className="input-field min-h-[80px] font-mono text-sm" value={test} onChange={e => setTest(e.target.value)} placeholder="Enter text to test the regex..." />
        {test && <p className="text-sm mt-2 text-gray-700 dark:text-gray-300">{matches.length} match{matches.length!==1?"es":""}: {matches.map((m,i) => <span key={i} className="font-mono bg-yellow-100 dark:bg-yellow-900 px-1 rounded mr-1">{m}</span>)}</p>}
      </div>
    </div>
  );
}
