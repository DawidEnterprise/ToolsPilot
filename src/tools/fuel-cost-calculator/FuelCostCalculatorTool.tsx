"use client";
import { useState } from "react";

export function FuelCostCalculatorTool() {
  const [distance, setDistance] = useState("500");
  const [mpg, setMpg] = useState("25");
  const [price, setPrice] = useState("3.50");
  const d = parseFloat(distance) || 0;
  const m = parseFloat(mpg) || 1;
  const p = parseFloat(price) || 0;
  const gallons = d / m;
  const cost = gallons * p;

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Distance (miles)</label>
          <input type="number" className="input-field" value={distance} onChange={e => setDistance(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Fuel Economy (MPG)</label>
          <input type="number" className="input-field" value={mpg} onChange={e => setMpg(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Gas Price ($/gal)</label>
          <input type="number" className="input-field" step="0.01" value={price} onChange={e => setPrice(e.target.value)} />
        </div>
      </div>
      <div className="rounded-lg bg-gray-50 dark:bg-gray-800 p-4 space-y-1 text-sm">
        <p className="text-gray-700 dark:text-gray-300">Fuel needed: <strong>{gallons.toFixed(1)} gallons</strong></p>
        <p className="text-gray-700 dark:text-gray-300">Trip cost: <strong className="text-lg">${cost.toFixed(2)}</strong></p>
      </div>
    </div>
  );
}
