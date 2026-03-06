"use client";

import { useState, useMemo } from "react";
import { parseCron } from "./logic";

const PRESETS = [
  { label: "Every minute", value: "* * * * *" },
  { label: "Every hour", value: "0 * * * *" },
  { label: "Every day at midnight", value: "0 0 * * *" },
  { label: "Every Monday at 9am", value: "0 9 * * 1" },
  { label: "Every 5 minutes", value: "*/5 * * * *" },
  { label: "First of month", value: "0 0 1 * *" },
];

export function CronExpressionParserTool() {
  const [expression, setExpression] = useState("*/5 * * * *");

  const result = useMemo(() => parseCron(expression), [expression]);

  return (
    <div className="space-y-5">
      <div>
        <label className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
          Cron Expression
        </label>
        <input
          type="text"
          className="input-field text-xl font-mono text-center"
          value={expression}
          onChange={(e) => setExpression(e.target.value)}
          placeholder="* * * * *"
          autoFocus
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {PRESETS.map((p) => (
          <button
            key={p.value}
            onClick={() => setExpression(p.value)}
            className="rounded-md border border-gray-200 px-3 py-1 text-xs font-medium text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800"
          >
            {p.label}
          </button>
        ))}
      </div>

      {result.error && (
        <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">{result.error}</p>
      )}

      {result.valid && (
        <div className="space-y-4">
          <div className="rounded-lg border border-brand-200 bg-brand-50 px-4 py-3 dark:border-brand-700 dark:bg-brand-900/20">
            <p className="text-lg font-medium text-brand-800 dark:text-brand-200">{result.description}</p>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {result.parts.map((part) => (
              <div key={part.label} className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800">
                <p className="text-xl font-mono font-bold text-gray-900 dark:text-gray-100">{part.value}</p>
                <p className="mt-1 text-xs font-medium text-gray-500 dark:text-gray-400">{part.label}</p>
              </div>
            ))}
          </div>

          {result.nextRuns.length > 0 && (
            <div>
              <h3 className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">Next 5 Runs</h3>
              <ul className="space-y-1">
                {result.nextRuns.map((run, i) => (
                  <li key={i} className="rounded border border-gray-100 bg-gray-50 px-3 py-1.5 text-sm text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
                    {run}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
