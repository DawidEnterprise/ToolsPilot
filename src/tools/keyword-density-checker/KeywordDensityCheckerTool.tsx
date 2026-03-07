"use client";
import { useState } from "react";

export function KeywordDensityCheckerTool() {
  const [input, setInput] = useState("");
  const words = input.toLowerCase().replace(/[^a-z0-9\s]/g, "").split(/\s+/).filter(Boolean);
  const total = words.length;
  const freq: Record<string,number> = {};
  words.forEach(w => { freq[w] = (freq[w]||0) + 1; });
  const sorted = Object.entries(freq).sort((a,b) => b[1]-a[1]).slice(0, 30);

  return (
    <div className="space-y-4">
      <textarea className="input-field tool-panel" placeholder="Paste your content here to analyze keyword density..." value={input} onChange={e => setInput(e.target.value)} />
      {total > 0 && (
        <div className="rounded-lg bg-gray-50 dark:bg-gray-800 p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{total} words, {Object.keys(freq).length} unique</p>
          <table className="w-full text-sm">
            <thead><tr><th className="text-left py-1 text-gray-500">Keyword</th><th className="text-right py-1 text-gray-500">Count</th><th className="text-right py-1 text-gray-500">Density</th></tr></thead>
            <tbody>
              {sorted.map(([word, count]) => (
                <tr key={word} className="border-t border-gray-200 dark:border-gray-700">
                  <td className="py-1 font-mono text-gray-700 dark:text-gray-300">{word}</td>
                  <td className="py-1 text-right text-gray-600 dark:text-gray-400">{count}</td>
                  <td className="py-1 text-right text-gray-600 dark:text-gray-400">{(count/total*100).toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
