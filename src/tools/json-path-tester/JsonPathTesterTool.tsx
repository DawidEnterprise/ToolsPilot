"use client";

import { useState, useMemo } from "react";
import { queryJsonPath } from "./logic";

export function JsonPathTesterTool() {
  const [json, setJson] = useState('{\n  "store": {\n    "books": [\n      { "title": "Book A", "price": 10 },\n      { "title": "Book B", "price": 20 }\n    ],\n    "name": "My Store"\n  }\n}');
  const [path, setPath] = useState("$.store.books[*].title");

  const result = useMemo(() => {
    try {
      const r = queryJsonPath(json, path);
      return { results: r, error: "" };
    } catch (e) {
      return { results: [], error: e instanceof Error ? e.message : "Error" };
    }
  }, [json, path]);

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
          JSONPath Expression
        </label>
        <input
          type="text"
          className="input-field font-mono"
          value={path}
          onChange={(e) => setPath(e.target.value)}
          placeholder="$.store.books[*].title"
          autoFocus
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">JSON Input</label>
          <textarea
            className="input-field tool-panel font-mono text-sm"
            value={json}
            onChange={(e) => setJson(e.target.value)}
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
            Results ({result.results.length} matches)
          </label>
          {result.error ? (
            <div className="tool-panel overflow-auto rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
              {result.error}
            </div>
          ) : (
            <div className="tool-panel overflow-auto space-y-2 rounded-lg border border-gray-200 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-900">
              {result.results.length === 0 ? (
                <p className="text-sm text-gray-400">No matches found</p>
              ) : (
                result.results.map((r, i) => (
                  <div key={i} className="rounded border border-gray-200 bg-white p-2 dark:border-gray-700 dark:bg-gray-800">
                    <span className="text-xs text-gray-500 dark:text-gray-400">{r.path}</span>
                    <pre className="mt-1 font-mono text-sm text-gray-900 dark:text-gray-100">
                      {typeof r.value === "object" ? JSON.stringify(r.value, null, 2) : String(r.value)}
                    </pre>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
