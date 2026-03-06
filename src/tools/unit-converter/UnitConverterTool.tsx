"use client";

import { useState, useMemo } from "react";
import { getCategories, getUnits, convert, type UnitCategory } from "./logic";

const CATEGORY_LABELS: Record<UnitCategory, string> = {
  length: "📏 Length",
  weight: "⚖️ Weight",
  temperature: "🌡️ Temperature",
  speed: "🏎️ Speed",
  data: "💾 Data",
  time: "⏰ Time",
  area: "📐 Area",
};

export function UnitConverterTool() {
  const categories = getCategories();
  const [category, setCategory] = useState<UnitCategory>("length");
  const [value, setValue] = useState("1");
  const units = getUnits(category);
  const unitKeys = Object.keys(units);
  const [fromUnit, setFromUnit] = useState(unitKeys[0]);
  const [toUnit, setToUnit] = useState(unitKeys[1]);

  const result = useMemo(() => {
    const num = parseFloat(value);
    if (isNaN(num)) return null;
    return convert(num, fromUnit, toUnit, category);
  }, [value, fromUnit, toUnit, category]);

  const allConversions = useMemo(() => {
    const num = parseFloat(value);
    if (isNaN(num)) return [];
    return unitKeys
      .filter((u) => u !== fromUnit)
      .map((u) => ({ unit: u, name: units[u].name, value: convert(num, fromUnit, u, category) }));
  }, [value, fromUnit, category, unitKeys, units]);

  const handleCategoryChange = (cat: UnitCategory) => {
    setCategory(cat);
    const newUnits = Object.keys(getUnits(cat));
    setFromUnit(newUnits[0]);
    setToUnit(newUnits[1] || newUnits[0]);
  };

  const swap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              category === cat
                ? "bg-brand-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            }`}
          >
            {CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-[1fr,auto,1fr] items-end gap-3">
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">From</label>
          <select className="input-field mb-2" value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}>
            {unitKeys.map((u) => (
              <option key={u} value={u}>{units[u].name} ({u})</option>
            ))}
          </select>
          <input
            type="number"
            className="input-field text-lg"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoFocus
          />
        </div>
        <button onClick={swap} className="btn-secondary mb-1 px-3" title="Swap">⇄</button>
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">To</label>
          <select className="input-field mb-2" value={toUnit} onChange={(e) => setToUnit(e.target.value)}>
            {unitKeys.map((u) => (
              <option key={u} value={u}>{units[u].name} ({u})</option>
            ))}
          </select>
          <div className="input-field text-lg bg-gray-50 dark:bg-gray-800 font-bold text-brand-600 dark:text-brand-400">
            {result !== null ? result.toPrecision(8).replace(/\.?0+$/, "") : "—"}
          </div>
        </div>
      </div>

      {allConversions.length > 0 && (
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
          <h3 className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider dark:text-gray-400">All Conversions</h3>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {allConversions.map((c) => (
              <div key={c.unit} className="text-sm">
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {c.value.toPrecision(6).replace(/\.?0+$/, "")}
                </span>{" "}
                <span className="text-gray-500 dark:text-gray-400">{c.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
