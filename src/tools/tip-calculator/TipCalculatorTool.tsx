"use client";

import { useState, useMemo } from "react";
import { calculateTip } from "./logic";

const PRESETS = [10, 15, 18, 20, 25];

export function TipCalculatorTool() {
  const [bill, setBill] = useState("");
  const [tipPercent, setTipPercent] = useState(18);
  const [split, setSplit] = useState("1");

  const numBill = parseFloat(bill);
  const numSplit = parseInt(split) || 1;

  const result = useMemo(
    () => (!isNaN(numBill) && numBill > 0 ? calculateTip(numBill, tipPercent, numSplit) : null),
    [numBill, tipPercent, numSplit]
  );

  return (
    <div className="space-y-5">
      <div>
        <label className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
          Bill Amount ($)
        </label>
        <input
          type="number"
          className="input-field text-2xl"
          placeholder="0.00"
          value={bill}
          onChange={(e) => setBill(e.target.value)}
          min="0"
          step="0.01"
          autoFocus
        />
      </div>

      <div>
        <label className="mb-2 block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
          Tip Percentage: {tipPercent}%
        </label>
        <div className="flex gap-2 mb-2">
          {PRESETS.map((p) => (
            <button
              key={p}
              onClick={() => setTipPercent(p)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                tipPercent === p
                  ? "bg-brand-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              {p}%
            </button>
          ))}
        </div>
        <input
          type="range"
          min="0"
          max="50"
          value={tipPercent}
          onChange={(e) => setTipPercent(parseInt(e.target.value))}
          className="w-full"
        />
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
          Split Between
        </label>
        <input
          type="number"
          className="input-field"
          value={split}
          onChange={(e) => setSplit(e.target.value)}
          min="1"
          max="100"
        />
      </div>

      {result && (
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-800">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">Tip Amount</span>
            <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-gray-100">${result.tipAmount.toFixed(2)}</p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-800">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">Total</span>
            <p className="mt-1 text-2xl font-bold text-brand-600 dark:text-brand-400">${result.totalAmount.toFixed(2)}</p>
          </div>
          {numSplit > 1 && (
            <>
              <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-800">
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">Tip Per Person</span>
                <p className="mt-1 text-xl font-bold text-gray-900 dark:text-gray-100">${result.tipPerPerson.toFixed(2)}</p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-800">
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">Per Person</span>
                <p className="mt-1 text-xl font-bold text-brand-600 dark:text-brand-400">${result.perPerson.toFixed(2)}</p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
