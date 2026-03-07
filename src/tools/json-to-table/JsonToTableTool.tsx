"use client";
import { useState } from "react";

export function JsonToTableTool() {
  const [input, setInput] = useState('[{"name":"Alice","age":30},{"name":"Bob","age":25}]');
  const [data, setData] = useState<Record<string,unknown>[]|null>(null);
  const [error, setError] = useState("");

  const parse = () => {
    try {
      const parsed = JSON.parse(input);
      const arr = Array.isArray(parsed) ? parsed : [parsed];
      setData(arr);
      setError("");
    } catch {
      setError("Invalid JSON");
      setData(null);
    }
  };

  const headers = data && data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <div className="space-y-4">
      <textarea className="input-field min-h-[150px] font-mono text-sm" placeholder="Paste JSON array..." value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={parse} className="btn-primary text-sm">View as Table</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {data && headers.length > 0 && (
        <div className="overflow-x-auto border rounded-lg dark:border-gray-700">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800"><tr>{headers.map(h => <th key={h} className="px-3 py-2 text-left font-medium text-gray-700 dark:text-gray-300">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">{data.map((row,i) => <tr key={i}>{headers.map(h => <td key={h} className="px-3 py-2 text-gray-600 dark:text-gray-400">{String(row[h] ?? "")}</td>)}</tr>)}</tbody>
          </table>
        </div>
      )}
    </div>
  );
}
