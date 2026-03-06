"use client";

import { useState, useMemo } from "react";
import { pxToRem, remToPx, generateTable } from "./logic";

export function PxToRemConverterTool() {
  const [base, setBase] = useState("16");
  const [pxVal, setPxVal] = useState("16");
  const [remVal, setRemVal] = useState("1");
  const basePx = parseFloat(base) || 16;

  const handlePx = (v: string) => {
    setPxVal(v);
    const n = parseFloat(v);
    if (!isNaN(n)) setRemVal(pxToRem(n, basePx).toFixed(4).replace(/0+$/, "").replace(/\.$/, ""));
  };

  const handleRem = (v: string) => {
    setRemVal(v);
    const n = parseFloat(v);
    if (!isNaN(n)) setPxVal(remToPx(n, basePx).toFixed(2).replace(/0+$/, "").replace(/\.$/, ""));
  };

  const table = useMemo(() => generateTable(basePx), [basePx]);

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-4">
        <label className="text-sm text-gray-600 dark:text-gray-400">Base font size:</label>
        <div className="flex items-center gap-1">
          <input
            type="number"
            className="input-field w-20 text-center"
            value={base}
            onChange={(e) => { setBase(e.target.value); }}
            min="1"
          />
          <span className="text-sm text-gray-500">px</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 items-end">
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Pixels (px)</label>
          <input
            type="number"
            className="input-field text-2xl font-mono text-center"
            value={pxVal}
            onChange={(e) => handlePx(e.target.value)}
            autoFocus
          />
        </div>
        <div className="flex justify-center">
          <button
            className="rounded-full p-2 text-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            ⇄
          </button>
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">REM</label>
          <input
            type="number"
            className="input-field text-2xl font-mono text-center"
            value={remVal}
            onChange={(e) => handleRem(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 dark:border-gray-700">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Pixels</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">REM</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {table.map(({ px, rem }) => (
              <tr key={px} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="px-4 py-1.5 font-mono text-gray-900 dark:text-gray-100">{px}px</td>
                <td className="px-4 py-1.5 font-mono text-gray-900 dark:text-gray-100">{rem}rem</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
