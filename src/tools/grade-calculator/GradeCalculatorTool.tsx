"use client";
import { useState } from "react";

export function GradeCalculatorTool() {
  const [current, setCurrent] = useState("85");
  const [weight, setWeight] = useState("60");
  const [desired, setDesired] = useState("90");
  const cur = parseFloat(current) || 0;
  const w = (parseFloat(weight) || 0) / 100;
  const des = parseFloat(desired) || 0;
  const needed = w < 1 ? (des - cur * w) / (1 - w) : 0;

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Current Grade (%)</label>
          <input type="number" className="input-field" value={current} onChange={e => setCurrent(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Current Weight (%)</label>
          <input type="number" className="input-field" value={weight} onChange={e => setWeight(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Desired Grade (%)</label>
          <input type="number" className="input-field" value={desired} onChange={e => setDesired(e.target.value)} />
        </div>
      </div>
      <div className="rounded-lg bg-gray-50 dark:bg-gray-800 p-4 text-sm">
        <p className="text-gray-700 dark:text-gray-300">You need <strong className="text-lg">{needed.toFixed(1)}%</strong> on the remaining {(100 - (parseFloat(weight)||0)).toFixed(0)}% to get {desired}% overall.</p>
      </div>
    </div>
  );
}
