"use client";

import { useState } from "react";

type TempUnit = "celsius" | "fahrenheit" | "kelvin";

const UNITS: { id: TempUnit; label: string; symbol: string }[] = [
  { id: "celsius", label: "Celsius", symbol: "°C" },
  { id: "fahrenheit", label: "Fahrenheit", symbol: "°F" },
  { id: "kelvin", label: "Kelvin", symbol: "K" },
];

function convert(value: number, from: TempUnit, to: TempUnit): number {
  if (from === to) return value;
  // Convert to Celsius first
  let c = value;
  if (from === "fahrenheit") c = (value - 32) * (5 / 9);
  if (from === "kelvin") c = value - 273.15;
  // Convert from Celsius to target
  if (to === "celsius") return c;
  if (to === "fahrenheit") return c * (9 / 5) + 32;
  return c + 273.15; // kelvin
}

export function TemperatureConverterTool() {
  const [value, setValue] = useState("100");
  const [from, setFrom] = useState<TempUnit>("celsius");
  const [to, setTo] = useState<TempUnit>("fahrenheit");

  const num = parseFloat(value);
  const result = !isNaN(num) ? convert(num, from, to) : NaN;

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <div className="space-y-5">
      {/* From */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">From</label>
        <div className="flex gap-2">
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
            placeholder="Enter value"
          />
          <select
            value={from}
            onChange={(e) => setFrom(e.target.value as TempUnit)}
            className="rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
          >
            {UNITS.map((u) => <option key={u.id} value={u.id}>{u.label} ({u.symbol})</option>)}
          </select>
        </div>
      </div>

      {/* Swap */}
      <div className="flex justify-center">
        <button onClick={swap} className="rounded-full border border-gray-200 bg-white p-2 text-gray-500 transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700" title="Swap">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" /></svg>
        </button>
      </div>

      {/* To */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">To</label>
        <div className="flex gap-2">
          <div className="flex-1 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm font-semibold text-brand-600 dark:border-gray-700 dark:bg-gray-800 dark:text-brand-400">
            {!isNaN(result) ? result.toLocaleString(undefined, { maximumFractionDigits: 6 }) : "—"}
          </div>
          <select
            value={to}
            onChange={(e) => setTo(e.target.value as TempUnit)}
            className="rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
          >
            {UNITS.map((u) => <option key={u.id} value={u.id}>{u.label} ({u.symbol})</option>)}
          </select>
        </div>
      </div>

      {/* Quick reference */}
      {!isNaN(num) && (
        <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">All conversions</p>
          <div className="grid grid-cols-3 gap-3 text-center">
            {UNITS.map((u) => (
              <div key={u.id}>
                <p className="text-xs text-gray-400">{u.label}</p>
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                  {convert(num, from, u.id).toLocaleString(undefined, { maximumFractionDigits: 4 })} {u.symbol}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
