"use client";
import { useState } from "react";

export function HexToRgbTool() {
  const [hex, setHex] = useState("#3b82f6");
  const clean = hex.replace("#", "");
  const r = parseInt(clean.substring(0, 2), 16) || 0;
  const g = parseInt(clean.substring(2, 4), 16) || 0;
  const b = parseInt(clean.substring(4, 6), 16) || 0;

  return (
    <div className="space-y-4">
      <div className="flex gap-3 items-end">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">HEX Color</label>
          <input className="input-field font-mono" value={hex} onChange={e => setHex(e.target.value)} placeholder="#3b82f6" />
        </div>
        <div className="h-10 w-10 rounded border border-gray-300 dark:border-gray-600" style={{ backgroundColor: hex }} />
      </div>
      <div className="rounded-lg bg-gray-50 dark:bg-gray-800 p-4 font-mono text-sm space-y-1">
        <p className="text-gray-700 dark:text-gray-300">RGB: <strong>rgb({r}, {g}, {b})</strong></p>
        <p className="text-gray-700 dark:text-gray-300">R: {r} &nbsp; G: {g} &nbsp; B: {b}</p>
      </div>
      <button onClick={() => navigator.clipboard.writeText("rgb(" + r + ", " + g + ", " + b + ")")} className="btn-primary text-sm">Copy RGB</button>
    </div>
  );
}
