"use client";

import { useState } from "react";

type WeightUnit = "kg" | "g" | "mg" | "lb" | "oz" | "st" | "t";

const UNITS: { id: WeightUnit; label: string; toGrams: number }[] = [
  { id: "kg", label: "Kilograms (kg)", toGrams: 1000 },
  { id: "g", label: "Grams (g)", toGrams: 1 },
  { id: "mg", label: "Milligrams (mg)", toGrams: 0.001 },
  { id: "lb", label: "Pounds (lb)", toGrams: 453.592 },
  { id: "oz", label: "Ounces (oz)", toGrams: 28.3495 },
  { id: "st", label: "Stone (st)", toGrams: 6350.29 },
  { id: "t", label: "Metric Tonnes (t)", toGrams: 1_000_000 },
];

function convert(value: number, from: WeightUnit, to: WeightUnit): number {
  const fromUnit = UNITS.find((u) => u.id === from)!;
  const toUnit = UNITS.find((u) => u.id === to)!;
  return (value * fromUnit.toGrams) / toUnit.toGrams;
}

export function WeightConverterTool() {
  const [value, setValue] = useState("1");
  const [from, setFrom] = useState<WeightUnit>("kg");
  const [to, setTo] = useState<WeightUnit>("lb");

  const num = parseFloat(value);
  const result = !isNaN(num) ? convert(num, from, to) : NaN;

  const swap = () => { setFrom(to); setTo(from); };

  return (
    <div className="space-y-5">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">From</label>
        <div className="flex gap-2">
          <input type="number" value={value} onChange={(e) => setValue(e.target.value)} className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" placeholder="Enter value" />
          <select value={from} onChange={(e) => setFrom(e.target.value as WeightUnit)} className="rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100">
            {UNITS.map((u) => <option key={u.id} value={u.id}>{u.label}</option>)}
          </select>
        </div>
      </div>

      <div className="flex justify-center">
        <button onClick={swap} className="rounded-full border border-gray-200 bg-white p-2 text-gray-500 transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700" title="Swap">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" /></svg>
        </button>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">To</label>
        <div className="flex gap-2">
          <div className="flex-1 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm font-semibold text-brand-600 dark:border-gray-700 dark:bg-gray-800 dark:text-brand-400">
            {!isNaN(result) ? result.toLocaleString(undefined, { maximumFractionDigits: 6 }) : "—"}
          </div>
          <select value={to} onChange={(e) => setTo(e.target.value as WeightUnit)} className="rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100">
            {UNITS.map((u) => <option key={u.id} value={u.id}>{u.label}</option>)}
          </select>
        </div>
      </div>

      {/* Quick reference table */}
      {!isNaN(num) && (
        <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">All conversions</p>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3">
            {UNITS.map((u) => (
              <div key={u.id} className="flex items-baseline justify-between gap-2">
                <span className="text-xs text-gray-400">{u.label.split(" (")[0]}</span>
                <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{convert(num, from, u.id).toLocaleString(undefined, { maximumFractionDigits: 6 })}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
