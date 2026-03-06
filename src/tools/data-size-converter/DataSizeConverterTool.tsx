"use client";

import { useState, useMemo } from "react";
import { DATA_UNITS, convertDataSize, convertAll, transferTime } from "./logic";

export function DataSizeConverterTool() {
  const [value, setValue] = useState("1");
  const [fromIdx, setFromIdx] = useState(6); // MB
  const [toIdx, setToIdx] = useState(9); // GB
  const [speed, setSpeed] = useState("100");

  const num = parseFloat(value) || 0;
  const converted = useMemo(() => convertDataSize(num, fromIdx, toIdx), [num, fromIdx, toIdx]);
  const all = useMemo(() => convertAll(num, fromIdx), [num, fromIdx]);
  const time = useMemo(() => transferTime(num * DATA_UNITS[fromIdx].bits, parseFloat(speed) || 0), [num, fromIdx, speed]);

  const formatNum = (n: number): string => {
    if (n === 0) return "0";
    if (Math.abs(n) >= 1) return n.toLocaleString("en-US", { maximumFractionDigits: 4 });
    return n.toExponential(4);
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 items-end">
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Value</label>
          <input type="number" className="input-field text-lg text-center" value={value} onChange={(e) => setValue(e.target.value)} autoFocus />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">From</label>
          <select className="input-field" value={fromIdx} onChange={(e) => setFromIdx(parseInt(e.target.value))}>
            {DATA_UNITS.map((u, i) => <option key={i} value={i}>{u.name}</option>)}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">To</label>
          <select className="input-field" value={toIdx} onChange={(e) => setToIdx(parseInt(e.target.value))}>
            {DATA_UNITS.map((u, i) => <option key={i} value={i}>{u.name}</option>)}
          </select>
        </div>
      </div>

      <div className="rounded-lg border border-brand-200 bg-brand-50 px-5 py-4 text-center dark:border-brand-700 dark:bg-brand-900/20">
        <p className="text-3xl font-bold text-brand-800 dark:text-brand-200">{formatNum(converted)} <span className="text-lg font-normal">{DATA_UNITS[toIdx].name}</span></p>
      </div>

      <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
        <span className="text-sm text-gray-600 dark:text-gray-400">Transfer time at</span>
        <input type="number" className="input-field w-24 text-center" value={speed} onChange={(e) => setSpeed(e.target.value)} />
        <span className="text-sm text-gray-600 dark:text-gray-400">Mbps:</span>
        <span className="text-lg font-bold text-gray-900 dark:text-gray-100">{time}</span>
      </div>

      <div className="rounded-lg border border-gray-200 dark:border-gray-700">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Unit</th>
              <th className="px-3 py-2 text-right text-xs font-medium text-gray-500">Value</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {all.filter(a => a.value > 0 && a.value < 1e18).map((a) => (
              <tr key={a.name} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="px-3 py-1.5 text-gray-700 dark:text-gray-300">{a.name}</td>
                <td className="px-3 py-1.5 text-right font-mono text-gray-900 dark:text-gray-100">{formatNum(a.value)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
