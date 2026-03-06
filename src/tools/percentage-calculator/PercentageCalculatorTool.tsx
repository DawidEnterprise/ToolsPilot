"use client";

import { useState } from "react";
import {
  whatIsXPercentOfY,
  xIsWhatPercentOfY,
  percentageChange,
  percentageIncrease,
  percentageDecrease,
} from "./logic";

type Mode = "whatIs" | "isWhat" | "change" | "increase" | "decrease";

export function PercentageCalculatorTool() {
  const [mode, setMode] = useState<Mode>("whatIs");
  const [a, setA] = useState("");
  const [b, setB] = useState("");

  const numA = parseFloat(a);
  const numB = parseFloat(b);
  const valid = !isNaN(numA) && !isNaN(numB);

  const result = valid
    ? mode === "whatIs"
      ? whatIsXPercentOfY(numA, numB)
      : mode === "isWhat"
        ? xIsWhatPercentOfY(numA, numB)
        : mode === "change"
          ? percentageChange(numA, numB)
          : mode === "increase"
            ? percentageIncrease(numA, numB)
            : percentageDecrease(numA, numB)
    : null;

  const modes: { id: Mode; label: string; labelA: string; labelB: string; resultLabel: string }[] = [
    { id: "whatIs", label: "What is X% of Y?", labelA: "Percentage (%)", labelB: "Number", resultLabel: "Result" },
    { id: "isWhat", label: "X is what % of Y?", labelA: "Value", labelB: "Total", resultLabel: "Percentage" },
    { id: "change", label: "% Change", labelA: "From", labelB: "To", resultLabel: "Change (%)" },
    { id: "increase", label: "Increase by %", labelA: "Number", labelB: "Increase by (%)", resultLabel: "Result" },
    { id: "decrease", label: "Decrease by %", labelA: "Number", labelB: "Decrease by (%)", resultLabel: "Result" },
  ];

  const current = modes.find((m) => m.id === mode)!;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {modes.map((m) => (
          <button
            key={m.id}
            onClick={() => { setMode(m.id); setA(""); setB(""); }}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              mode === m.id
                ? "bg-brand-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
            {current.labelA}
          </label>
          <input
            type="number"
            className="input-field text-lg"
            placeholder="0"
            value={a}
            onChange={(e) => setA(e.target.value)}
            autoFocus
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
            {current.labelB}
          </label>
          <input
            type="number"
            className="input-field text-lg"
            placeholder="0"
            value={b}
            onChange={(e) => setB(e.target.value)}
          />
        </div>
      </div>

      {result !== null && (
        <div className="rounded-lg border border-gray-200 bg-gray-50 px-5 py-4 dark:border-gray-700 dark:bg-gray-800">
          <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">{current.resultLabel}</span>
          <p className="mt-1 text-3xl font-bold text-brand-600 dark:text-brand-400">
            {mode === "isWhat" || mode === "change"
              ? `${result.toFixed(2)}%`
              : result.toFixed(2)}
          </p>
        </div>
      )}
    </div>
  );
}
