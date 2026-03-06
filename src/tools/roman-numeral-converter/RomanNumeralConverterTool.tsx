"use client";

import { useState } from "react";
import { intToRoman, romanToInt } from "./logic";

export function RomanNumeralConverterTool() {
  const [decimal, setDecimal] = useState("");
  const [roman, setRoman] = useState("");

  const handleDecimal = (v: string) => {
    setDecimal(v);
    const n = parseInt(v);
    if (!isNaN(n) && n > 0 && n <= 3999) {
      setRoman(intToRoman(n));
    } else {
      setRoman("");
    }
  };

  const handleRoman = (v: string) => {
    setRoman(v.toUpperCase());
    const n = romanToInt(v);
    if (n !== null) {
      setDecimal(n.toString());
    } else {
      setDecimal("");
    }
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
            Decimal (1-3999)
          </label>
          <input
            type="number"
            className="input-field text-2xl text-center font-mono"
            value={decimal}
            onChange={(e) => handleDecimal(e.target.value)}
            min={1}
            max={3999}
            placeholder="42"
            autoFocus
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
            Roman Numeral
          </label>
          <input
            type="text"
            className="input-field text-2xl text-center font-mono"
            value={roman}
            onChange={(e) => handleRoman(e.target.value)}
            placeholder="XLII"
          />
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
        <h3 className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">Reference Table</h3>
        <div className="grid grid-cols-4 gap-2 text-sm sm:grid-cols-7">
          {[
            [1, "I"], [4, "IV"], [5, "V"], [9, "IX"], [10, "X"], [40, "XL"], [50, "L"],
            [90, "XC"], [100, "C"], [400, "CD"], [500, "D"], [900, "CM"], [1000, "M"],
          ].map(([n, r]) => (
            <div key={String(n)} className="rounded border border-gray-200 bg-white px-2 py-1 text-center dark:border-gray-600 dark:bg-gray-700">
              <span className="block text-xs text-gray-500 dark:text-gray-400">{n}</span>
              <span className="font-mono font-bold text-gray-900 dark:text-gray-100">{r}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
