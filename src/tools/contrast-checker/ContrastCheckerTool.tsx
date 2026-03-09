"use client";

import { useState } from "react";

function hexToRgb(hex: string): [number, number, number] | null {
  const m = hex.replace("#", "").match(/^([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
  if (!m) return null;
  return [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)];
}

function relativeLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function contrastRatio(l1: number, l2: number): number {
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

type Level = "AAA" | "AA" | "Fail";

function getLevel(ratio: number, size: "normal" | "large"): Level {
  if (size === "large") {
    if (ratio >= 4.5) return "AAA";
    if (ratio >= 3) return "AA";
    return "Fail";
  }
  if (ratio >= 7) return "AAA";
  if (ratio >= 4.5) return "AA";
  return "Fail";
}

const BADGE: Record<Level, string> = {
  AAA: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400",
  AA: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400",
  Fail: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400",
};

export function ContrastCheckerTool() {
  const [fg, setFg] = useState("#1e293b");
  const [bg, setBg] = useState("#ffffff");

  const fgRgb = hexToRgb(fg);
  const bgRgb = hexToRgb(bg);

  const ratio =
    fgRgb && bgRgb
      ? contrastRatio(relativeLuminance(...fgRgb), relativeLuminance(...bgRgb))
      : NaN;

  const normalLevel = !isNaN(ratio) ? getLevel(ratio, "normal") : "Fail";
  const largeLevel = !isNaN(ratio) ? getLevel(ratio, "large") : "Fail";

  const swap = () => { setFg(bg); setBg(fg); };

  return (
    <div className="space-y-5">
      {/* Color inputs */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Text Color</label>
          <div className="flex items-center gap-2">
            <input type="color" value={fg} onChange={(e) => setFg(e.target.value)} className="h-10 w-10 cursor-pointer rounded border border-gray-300 dark:border-gray-700" />
            <input type="text" value={fg} onChange={(e) => setFg(e.target.value)} className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm font-mono dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" placeholder="#000000" />
          </div>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Background Color</label>
          <div className="flex items-center gap-2">
            <input type="color" value={bg} onChange={(e) => setBg(e.target.value)} className="h-10 w-10 cursor-pointer rounded border border-gray-300 dark:border-gray-700" />
            <input type="text" value={bg} onChange={(e) => setBg(e.target.value)} className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm font-mono dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" placeholder="#ffffff" />
          </div>
        </div>
      </div>

      {/* Swap */}
      <div className="flex justify-center">
        <button onClick={swap} className="rounded-full border border-gray-200 bg-white p-2 text-gray-500 transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700" title="Swap colors">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12l-4-4m0 8H4l4 4" /></svg>
        </button>
      </div>

      {/* Ratio display */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 text-center dark:border-gray-700 dark:bg-gray-900">
        <p className="text-xs uppercase tracking-wider text-gray-400">Contrast Ratio</p>
        <p className="mt-1 text-4xl font-extrabold text-gray-900 dark:text-gray-100">
          {!isNaN(ratio) ? ratio.toFixed(2) : "—"}
          <span className="text-lg text-gray-400"> : 1</span>
        </p>
      </div>

      {/* WCAG results */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
          <p className="text-xs text-gray-400">Normal Text</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">(below 18pt / 14pt bold)</p>
          <span className={`mt-2 inline-block rounded-full px-3 py-0.5 text-sm font-bold ${BADGE[normalLevel]}`}>{normalLevel}</span>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
          <p className="text-xs text-gray-400">Large Text</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">(18pt+ / 14pt+ bold)</p>
          <span className={`mt-2 inline-block rounded-full px-3 py-0.5 text-sm font-bold ${BADGE[largeLevel]}`}>{largeLevel}</span>
        </div>
      </div>

      {/* Live preview */}
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Preview</p>
        <div className="rounded-xl p-6" style={{ backgroundColor: bg, color: fg }}>
          <p className="text-2xl font-bold">The quick brown fox</p>
          <p className="mt-1 text-base">jumps over the lazy dog. 0123456789</p>
          <p className="mt-2 text-sm">This text uses your selected color combination. Check if it&apos;s readable.</p>
        </div>
      </div>

      {/* WCAG reference */}
      <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-xs text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
        <p className="font-semibold text-gray-700 dark:text-gray-300">WCAG 2.1 Requirements</p>
        <ul className="mt-1 list-inside list-disc space-y-0.5">
          <li><strong>AA:</strong> 4.5:1 for normal text, 3:1 for large text</li>
          <li><strong>AAA:</strong> 7:1 for normal text, 4.5:1 for large text</li>
          <li>Large text = 18pt (24px) or 14pt (18.5px) bold</li>
        </ul>
      </div>
    </div>
  );
}
