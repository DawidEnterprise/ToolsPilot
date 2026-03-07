"use client";
import { useState } from "react";

export function CompoundInterestCalculatorTool() {
  const [principal, setPrincipal] = useState("10000");
  const [rate, setRate] = useState("7");
  const [years, setYears] = useState("10");
  const [compound, setCompound] = useState("12");
  const P = parseFloat(principal) || 0;
  const r = (parseFloat(rate) || 0) / 100;
  const t = parseFloat(years) || 0;
  const n = parseFloat(compound) || 1;
  const A = P * Math.pow(1 + r / n, n * t);
  const interest = A - P;

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Principal ($)</label>
          <input type="number" className="input-field" value={principal} onChange={e => setPrincipal(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Annual Rate (%)</label>
          <input type="number" className="input-field" value={rate} onChange={e => setRate(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Years</label>
          <input type="number" className="input-field" value={years} onChange={e => setYears(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Compound per year</label>
          <select className="input-field" value={compound} onChange={e => setCompound(e.target.value)}>
            <option value="1">Annually</option>
            <option value="4">Quarterly</option>
            <option value="12">Monthly</option>
            <option value="365">Daily</option>
          </select>
        </div>
      </div>
      <div className="rounded-lg bg-gray-50 dark:bg-gray-800 p-4 space-y-1 text-sm">
        <p className="text-gray-700 dark:text-gray-300">Future value: <strong className="text-lg">${A.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</strong></p>
        <p className="text-gray-700 dark:text-gray-300">Total interest: <strong className="text-green-600">${interest.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</strong></p>
      </div>
    </div>
  );
}
