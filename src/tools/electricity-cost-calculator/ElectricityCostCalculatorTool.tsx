"use client";
import { useState } from "react";

export function ElectricityCostCalculatorTool() {
  const [watts, setWatts] = useState("1000");
  const [hours, setHours] = useState("8");
  const [rate, setRate] = useState("0.12");
  const w = parseFloat(watts) || 0;
  const h = parseFloat(hours) || 0;
  const r = parseFloat(rate) || 0;
  const dailyKwh = (w * h) / 1000;
  const dailyCost = dailyKwh * r;
  const monthlyCost = dailyCost * 30;
  const yearlyCost = dailyCost * 365;

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Power (Watts)</label>
          <input type="number" className="input-field" value={watts} onChange={e => setWatts(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Hours per day</label>
          <input type="number" className="input-field" value={hours} onChange={e => setHours(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Rate ($/kWh)</label>
          <input type="number" className="input-field" step="0.01" value={rate} onChange={e => setRate(e.target.value)} />
        </div>
      </div>
      <div className="rounded-lg bg-gray-50 dark:bg-gray-800 p-4 grid gap-2 sm:grid-cols-3 text-sm">
        <p className="text-gray-700 dark:text-gray-300">Daily: <strong>${dailyCost.toFixed(2)}</strong></p>
        <p className="text-gray-700 dark:text-gray-300">Monthly: <strong>${monthlyCost.toFixed(2)}</strong></p>
        <p className="text-gray-700 dark:text-gray-300">Yearly: <strong>${yearlyCost.toFixed(2)}</strong></p>
      </div>
    </div>
  );
}
