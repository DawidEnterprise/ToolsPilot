"use client";

import { useState, useMemo } from "react";
import { generatePalette, hexToHsl, type Harmony } from "./logic";

const HARMONIES: { id: Harmony; label: string }[] = [
  { id: "complementary", label: "Complementary" },
  { id: "analogous", label: "Analogous" },
  { id: "triadic", label: "Triadic" },
  { id: "split-complementary", label: "Split-Comp." },
  { id: "tetradic", label: "Tetradic" },
  { id: "monochromatic", label: "Monochromatic" },
];

export function ColorPaletteGeneratorTool() {
  const [color, setColor] = useState("#3b82f6");
  const [harmony, setHarmony] = useState<Harmony>("analogous");
  const [copied, setCopied] = useState<string | null>(null);

  const palette = useMemo(() => generatePalette(color, harmony), [color, harmony]);

  const copy = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopied(hex);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="h-10 w-14 cursor-pointer rounded border border-gray-300 dark:border-gray-600"
          />
          <input
            type="text"
            value={color}
            onChange={(e) => /^#[0-9a-fA-F]{6}$/.test(e.target.value) && setColor(e.target.value)}
            className="input-field w-28 font-mono"
            maxLength={7}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {HARMONIES.map((h) => (
            <button
              key={h.id}
              onClick={() => setHarmony(h.id)}
              className={`rounded-md border px-3 py-1.5 text-sm font-medium transition-colors ${
                harmony === h.id
                  ? "border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300"
                  : "border-gray-200 text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800"
              }`}
            >
              {h.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-2 overflow-hidden rounded-xl">
        {palette.map((hex, i) => {
          const hsl = hexToHsl(hex);
          const isLight = hsl.l > 60;
          return (
            <button
              key={i}
              onClick={() => copy(hex)}
              className="group relative flex flex-1 flex-col items-center justify-end py-6 transition-all hover:flex-[1.3]"
              style={{ backgroundColor: hex, minHeight: "160px" }}
            >
              <span
                className={`rounded-md px-2 py-1 text-sm font-mono font-bold ${
                  isLight ? "bg-black/10 text-gray-900" : "bg-white/15 text-white"
                }`}
              >
                {copied === hex ? "Copied!" : hex.toUpperCase()}
              </span>
            </button>
          );
        })}
      </div>

      <div className="rounded-lg border border-gray-200 dark:border-gray-700">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Color</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">HEX</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">HSL</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {palette.map((hex, i) => {
              const hsl = hexToHsl(hex);
              return (
                <tr key={i} onClick={() => copy(hex)} className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="px-3 py-2"><div className="h-6 w-6 rounded" style={{ backgroundColor: hex }} /></td>
                  <td className="px-3 py-2 font-mono text-gray-900 dark:text-gray-100">{hex.toUpperCase()}</td>
                  <td className="px-3 py-2 text-gray-600 dark:text-gray-400">hsl({hsl.h}, {hsl.s}%, {hsl.l}%)</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
