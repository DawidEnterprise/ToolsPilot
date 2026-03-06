"use client";

import { useState, useCallback } from "react";
import { generateLorem } from "./logic";
import { CopyButton } from "@/components/CopyButton";

export function LoremIpsumTool() {
  const [count, setCount] = useState(3);
  const [startWithLorem, setStartWithLorem] = useState(true);
  const [output, setOutput] = useState(() => generateLorem(3, true));

  const handleGenerate = useCallback(() => {
    setOutput(generateLorem(count, startWithLorem));
  }, [count, startWithLorem]);

  const wordCount = output.split(/\s+/).filter(Boolean).length;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Paragraphs:</label>
          <select
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="input-field w-20 py-2"
          >
            {[1, 2, 3, 4, 5, 7, 10, 15, 20].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>

        <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
          <input
            type="checkbox"
            checked={startWithLorem}
            onChange={(e) => setStartWithLorem(e.target.checked)}
            className="rounded border-gray-300 text-brand-600 focus:ring-brand-500"
          />
          Start with &quot;Lorem ipsum…&quot;
        </label>

        <button onClick={handleGenerate} className="btn-primary">
          Generate
        </button>

        <CopyButton text={output} label="Copy All" />
      </div>

      <div className="rounded-lg border border-gray-200 bg-gray-50 p-5 dark:border-gray-700 dark:bg-gray-800">
        <div className="prose prose-sm max-w-none text-gray-700 dark:prose-invert dark:text-gray-300 whitespace-pre-line">
          {output}
        </div>
      </div>

      <p className="text-xs text-gray-400 dark:text-gray-500">
        {count} paragraphs · {wordCount} words · {output.length} characters
      </p>
    </div>
  );
}
