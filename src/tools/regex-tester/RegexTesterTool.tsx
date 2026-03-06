"use client";

import { useState, useMemo } from "react";
import { testRegex } from "./logic";

const FLAG_OPTIONS = [
  { flag: "g", label: "Global", desc: "Find all matches" },
  { flag: "i", label: "Case Insensitive", desc: "Ignore case" },
  { flag: "m", label: "Multiline", desc: "^ and $ match line boundaries" },
  { flag: "s", label: "Dotall", desc: ". matches newlines" },
];

export function RegexTesterTool() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [testString, setTestString] = useState("");

  const toggleFlag = (f: string) => {
    setFlags((prev) => (prev.includes(f) ? prev.replace(f, "") : prev + f));
  };

  const { matches, error } = useMemo(
    () => testRegex(pattern, flags, testString),
    [pattern, flags, testString]
  );

  // Build highlighted text
  const highlighted = useMemo(() => {
    if (!matches.length || !testString) return null;
    const parts: { text: string; isMatch: boolean }[] = [];
    let lastIndex = 0;
    for (const m of matches) {
      if (m.index > lastIndex) {
        parts.push({ text: testString.slice(lastIndex, m.index), isMatch: false });
      }
      parts.push({ text: m.match, isMatch: true });
      lastIndex = m.index + m.match.length;
    }
    if (lastIndex < testString.length) {
      parts.push({ text: testString.slice(lastIndex), isMatch: false });
    }
    return parts;
  }, [matches, testString]);

  return (
    <div className="space-y-5">
      {/* Pattern input */}
      <div>
        <label className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
          Regular Expression
        </label>
        <div className="flex items-center gap-2">
          <span className="text-gray-400 font-mono text-lg">/</span>
          <input
            type="text"
            className="input-field flex-1 font-mono"
            placeholder="your pattern here"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            autoFocus
            spellCheck={false}
          />
          <span className="text-gray-400 font-mono text-lg">/</span>
          <span className="text-sm font-mono text-brand-600 dark:text-brand-400 min-w-[2rem]">{flags}</span>
        </div>
      </div>

      {/* Flags */}
      <div className="flex flex-wrap gap-2">
        {FLAG_OPTIONS.map((f) => (
          <button
            key={f.flag}
            onClick={() => toggleFlag(f.flag)}
            title={f.desc}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              flags.includes(f.flag)
                ? "bg-brand-100 text-brand-700 ring-1 ring-brand-300 dark:bg-brand-950 dark:text-brand-300 dark:ring-brand-700"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
            }`}
          >
            {f.flag} — {f.label}
          </button>
        ))}
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400">
          {error}
        </div>
      )}

      {/* Test string */}
      <div>
        <label className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
          Test String
        </label>
        <textarea
          className="textarea-field h-36"
          placeholder="Type or paste text to test against…"
          value={testString}
          onChange={(e) => setTestString(e.target.value)}
          spellCheck={false}
        />
      </div>

      {/* Highlighted preview */}
      {highlighted && (
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
            Matches Highlighted
          </label>
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 font-mono text-sm whitespace-pre-wrap break-all dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100">
            {highlighted.map((part, i) =>
              part.isMatch ? (
                <mark key={i} className="bg-brand-200 text-brand-900 rounded px-0.5 dark:bg-brand-800 dark:text-brand-100">
                  {part.text}
                </mark>
              ) : (
                <span key={i}>{part.text}</span>
              )
            )}
          </div>
        </div>
      )}

      {/* Match info */}
      {matches.length > 0 && (
        <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-800">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {matches.length} match{matches.length !== 1 ? "es" : ""} found
          </p>
          <div className="max-h-48 overflow-y-auto space-y-1">
            {matches.map((m, i) => (
              <div key={i} className="flex items-baseline gap-3 text-xs">
                <span className="text-gray-400 w-6 text-right">{i + 1}.</span>
                <code className="text-brand-600 dark:text-brand-400">&quot;{m.match}&quot;</code>
                <span className="text-gray-400">at index {m.index}</span>
                {m.groups.length > 0 && (
                  <span className="text-gray-500">groups: [{m.groups.map((g) => `"${g}"`).join(", ")}]</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
