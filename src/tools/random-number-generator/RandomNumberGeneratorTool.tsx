"use client";

import { useState } from "react";
import { generateRandomNumbers } from "./logic";
import { CopyButton } from "@/components/CopyButton";

export function RandomNumberGeneratorTool() {
  const [min, setMin] = useState("1");
  const [max, setMax] = useState("100");
  const [count, setCount] = useState("1");
  const [allowDuplicates, setAllowDuplicates] = useState(true);
  const [results, setResults] = useState<number[]>([]);

  const generate = () => {
    const numMin = parseInt(min) || 0;
    const numMax = parseInt(max) || 100;
    const numCount = Math.min(parseInt(count) || 1, 1000);
    setResults(generateRandomNumbers(numMin, numMax, numCount, allowDuplicates));
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
            Minimum
          </label>
          <input type="number" className="input-field" value={min} onChange={(e) => setMin(e.target.value)} />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
            Maximum
          </label>
          <input type="number" className="input-field" value={max} onChange={(e) => setMax(e.target.value)} />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
            Count
          </label>
          <input
            type="number"
            className="input-field"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            min="1"
            max="1000"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
          <input
            type="checkbox"
            checked={allowDuplicates}
            onChange={(e) => setAllowDuplicates(e.target.checked)}
            className="rounded border-gray-300"
          />
          Allow duplicates
        </label>
        <button onClick={generate} className="btn-primary">
          Generate
        </button>
      </div>

      {results.length > 0 && (
        <div className="rounded-lg border border-gray-200 bg-gray-50 px-5 py-4 dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
              {results.length} Random Number{results.length > 1 ? "s" : ""}
            </span>
            <CopyButton text={results.join(", ")} />
          </div>
          <div className="flex flex-wrap gap-2">
            {results.map((n, i) => (
              <span
                key={i}
                className="inline-flex items-center rounded-md bg-brand-50 px-3 py-1.5 text-lg font-mono font-bold text-brand-700 ring-1 ring-inset ring-brand-700/10 dark:bg-brand-900/30 dark:text-brand-400 dark:ring-brand-400/20"
              >
                {n}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
