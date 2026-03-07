"use client";

import { useState, useMemo } from "react";
import { findAndReplace } from "./logic";

export function FindAndReplaceTool() {
  const [text, setText] = useState("");
  const [find, setFind] = useState("");
  const [replace, setReplace] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [wholeWord, setWholeWord] = useState(false);
  const [useRegex, setUseRegex] = useState(false);

  const result = useMemo(() => {
    try {
      return findAndReplace(text, find, replace, { caseSensitive, wholeWord, useRegex });
    } catch {
      return { output: text, count: 0 };
    }
  }, [text, find, replace, caseSensitive, wholeWord, useRegex]);

  const copy = () => { navigator.clipboard.writeText(result.output); };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <input type="text" className="input-field" value={find} onChange={(e) => setFind(e.target.value)} placeholder="Find..." autoFocus />
        <input type="text" className="input-field" value={replace} onChange={(e) => setReplace(e.target.value)} placeholder="Replace with..." />
      </div>

      <div className="flex flex-wrap gap-4">
        {[
          { label: "Case sensitive", state: caseSensitive, set: setCaseSensitive },
          { label: "Whole word", state: wholeWord, set: setWholeWord },
          { label: "Use regex", state: useRegex, set: setUseRegex },
        ].map(({ label, state, set }) => (
          <label key={label} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <input type="checkbox" checked={state} onChange={(e) => set(e.target.checked)} className="rounded border-gray-300" />
            {label}
          </label>
        ))}
        {find && <span className="text-sm text-brand-600 dark:text-brand-400">{result.count} match{result.count !== 1 ? "es" : ""}</span>}
      </div>

      <textarea className="input-field h-[20rem]" value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste your text here..." />

      {result.output && result.output !== text && (
        <div>
          <div className="mb-1 flex items-center justify-between">
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Result</label>
            <button onClick={copy} className="text-xs text-brand-500 hover:text-brand-600">Copy</button>
          </div>
          <pre className="h-[20rem] overflow-auto rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm whitespace-pre-wrap dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100">
            {result.output}
          </pre>
        </div>
      )}
    </div>
  );
}
