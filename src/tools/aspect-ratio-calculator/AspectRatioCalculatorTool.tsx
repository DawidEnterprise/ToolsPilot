"use client";

import { useState, useMemo } from "react";
import { calculateAspectRatio, scaleToWidth, scaleToHeight } from "./logic";

const PRESETS = [
  { label: "16:9", w: 1920, h: 1080 },
  { label: "4:3", w: 1024, h: 768 },
  { label: "1:1", w: 1080, h: 1080 },
  { label: "21:9", w: 2560, h: 1080 },
  { label: "9:16", w: 1080, h: 1920 },
  { label: "3:2", w: 1440, h: 960 },
];

export function AspectRatioCalculatorTool() {
  const [width, setWidth] = useState("1920");
  const [height, setHeight] = useState("1080");
  const [newW, setNewW] = useState("1280");
  const [newH, setNewH] = useState("");

  const w = parseFloat(width) || 0;
  const h = parseFloat(height) || 0;

  const ratio = useMemo(() => calculateAspectRatio(w, h), [w, h]);

  const handleNewWidth = (v: string) => {
    setNewW(v);
    const nw = parseFloat(v);
    if (!isNaN(nw) && w > 0 && h > 0) setNewH(scaleToWidth(w, h, nw).toString());
  };

  const handleNewHeight = (v: string) => {
    setNewH(v);
    const nh = parseFloat(v);
    if (!isNaN(nh) && w > 0 && h > 0) setNewW(scaleToHeight(w, h, nh).toString());
  };

  const applyPreset = (p: typeof PRESETS[0]) => {
    setWidth(p.w.toString());
    setHeight(p.h.toString());
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {PRESETS.map((p) => (
          <button key={p.label} onClick={() => applyPreset(p)} className="rounded-md border border-gray-200 px-3 py-1 text-xs font-medium text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800">
            {p.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Width</label>
          <input type="number" className="input-field text-lg text-center" value={width} onChange={(e) => setWidth(e.target.value)} min="1" autoFocus />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Height</label>
          <input type="number" className="input-field text-lg text-center" value={height} onChange={(e) => setHeight(e.target.value)} min="1" />
        </div>
      </div>

      {ratio.ratio && (
        <div className="rounded-lg border border-brand-200 bg-brand-50 px-5 py-4 text-center dark:border-brand-700 dark:bg-brand-900/20">
          <span className="text-xs font-semibold text-brand-600 dark:text-brand-400">Aspect Ratio</span>
          <p className="text-3xl font-bold text-brand-800 dark:text-brand-200">{ratio.ratio}</p>
        </div>
      )}

      <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
        <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">Scale Dimensions</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-xs text-gray-500 dark:text-gray-400">New Width</label>
            <input type="number" className="input-field text-center" value={newW} onChange={(e) => handleNewWidth(e.target.value)} />
          </div>
          <div>
            <label className="mb-1 block text-xs text-gray-500 dark:text-gray-400">New Height</label>
            <input type="number" className="input-field text-center" value={newH} onChange={(e) => handleNewHeight(e.target.value)} />
          </div>
        </div>
      </div>

      {w > 0 && h > 0 && (
        <div className="flex justify-center">
          <div
            className="rounded border-2 border-dashed border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-800"
            style={{ width: "200px", height: `${200 * (h / w)}px`, maxHeight: "200px" }}
          >
            <div className="flex h-full items-center justify-center text-xs text-gray-400">{w} x {h}</div>
          </div>
        </div>
      )}
    </div>
  );
}
