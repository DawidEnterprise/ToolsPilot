"use client";
import { useState } from "react";

export function CsvToTableTool() {
  const [input, setInput] = useState("Name,Age,City\nAlice,30,NYC\nBob,25,LA");
  const [sep, setSep] = useState(",");
  const rows = input.trim().split("\n").map(r => r.split(sep));
  const headers = rows[0] || [];
  const body = rows.slice(1);
  const html = "<table>\n  <thead>\n    <tr>" + headers.map(h => "<th>" + h.trim() + "</th>").join("") + "</tr>\n  </thead>\n  <tbody>\n" + body.map(r => "    <tr>" + r.map(c => "<td>" + c.trim() + "</td>").join("") + "</tr>").join("\n") + "\n  </tbody>\n</table>";

  return (
    <div className="space-y-4">
      <textarea className="input-field min-h-[150px] font-mono text-sm" placeholder="Paste CSV data..." value={input} onChange={e => setInput(e.target.value)} />
      <div className="flex items-center gap-2">
        <label className="text-sm text-gray-600 dark:text-gray-400">Separator:</label>
        <select className="input-field w-24" value={sep} onChange={e => setSep(e.target.value)}>
          <option value=",">Comma</option>
          <option value="\t">Tab</option>
          <option value=";">Semicolon</option>
        </select>
      </div>
      {headers.length > 0 && (
        <div className="overflow-x-auto border rounded-lg dark:border-gray-700">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800"><tr>{headers.map((h,i) => <th key={i} className="px-3 py-2 text-left font-medium text-gray-700 dark:text-gray-300">{h.trim()}</th>)}</tr></thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">{body.map((r,i) => <tr key={i}>{r.map((c,j) => <td key={j} className="px-3 py-2 text-gray-600 dark:text-gray-400">{c.trim()}</td>)}</tr>)}</tbody>
          </table>
        </div>
      )}
      <textarea className="input-field min-h-[100px] font-mono text-xs bg-gray-50 dark:bg-gray-800" readOnly value={html} />
      <button onClick={() => navigator.clipboard.writeText(html)} className="btn-secondary text-sm">Copy HTML</button>
    </div>
  );
}
