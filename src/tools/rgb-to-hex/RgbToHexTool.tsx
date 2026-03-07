"use client";
import { useState } from "react";

export function RgbToHexTool() {
  const [r, setR] = useState(59);
  const [g, setG] = useState(130);
  const [b, setB] = useState(246);
  const hex = "#" + [r, g, b].map(v => Math.max(0, Math.min(255, v)).toString(16).padStart(2, "0")).join("");

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Red (0-255)</label>
          <input type="number" className="input-field" min={0} max={255} value={r} onChange={e => setR(+e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Green (0-255)</label>
          <input type="number" className="input-field" min={0} max={255} value={g} onChange={e => setG(+e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Blue (0-255)</label>
          <input type="number" className="input-field" min={0} max={255} value={b} onChange={e => setB(+e.target.value)} />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded border border-gray-300 dark:border-gray-600" style={{ backgroundColor: hex }} />
        <span className="font-mono text-lg font-bold text-gray-900 dark:text-gray-100">{hex.toUpperCase()}</span>
      </div>
      <button onClick={() => navigator.clipboard.writeText(hex)} className="btn-primary text-sm">Copy HEX</button>
    </div>
  );
}
