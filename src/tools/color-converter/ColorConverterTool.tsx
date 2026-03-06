"use client";

import { useState, useMemo } from "react";
import { parseColor } from "./logic";
import { CopyButton } from "@/components/CopyButton";

export function ColorConverterTool() {
  const [input, setInput] = useState("#3b82f6");
  const color = useMemo(() => parseColor(input), [input]);

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
            Enter a color
          </label>
          <input
            type="text"
            className="input-field font-mono"
            placeholder="#3b82f6 or rgb(59, 130, 246)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoFocus
          />
          <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">Accepts HEX (#rrggbb) or RGB (rgb(r,g,b))</p>
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
            Pick a color
          </label>
          <input
            type="color"
            value={color?.hex || "#3b82f6"}
            onChange={(e) => setInput(e.target.value)}
            className="h-12 w-full cursor-pointer rounded-lg border border-gray-200 dark:border-gray-700"
          />
        </div>
      </div>

      {color && (
        <>
          {/* Preview */}
          <div
            className="h-24 rounded-xl border border-gray-200 shadow-inner dark:border-gray-700"
            style={{ backgroundColor: color.hex }}
          />

          {/* Values */}
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { label: "HEX", value: color.hex },
              { label: "RGB", value: `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})` },
              { label: "HSL", value: `hsl(${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%)` },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-800"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">{label}</span>
                  <CopyButton text={value} />
                </div>
                <code className="text-sm font-mono text-gray-900 dark:text-gray-100">{value}</code>
              </div>
            ))}
          </div>
        </>
      )}

      {input.trim() && !color && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400">
          Could not parse color. Try a HEX value like #ff6600 or rgb(255, 102, 0)
        </div>
      )}
    </div>
  );
}
