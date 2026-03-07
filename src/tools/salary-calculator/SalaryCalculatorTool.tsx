"use client";
import { useState } from "react";

export function SalaryCalculatorTool() {
  const [amount, setAmount] = useState("50000");
  const [basis, setBasis] = useState("annual");
  const val = parseFloat(amount) || 0;
  const annual = basis === "annual" ? val : basis === "monthly" ? val * 12 : basis === "weekly" ? val * 52 : val * 2080;
  const monthly = annual / 12;
  const weekly = annual / 52;
  const hourly = annual / 2080;

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Amount ($)</label>
          <input type="number" className="input-field" value={amount} onChange={e => setAmount(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Period</label>
          <select className="input-field" value={basis} onChange={e => setBasis(e.target.value)}>
            <option value="annual">Annual</option>
            <option value="monthly">Monthly</option>
            <option value="weekly">Weekly</option>
            <option value="hourly">Hourly</option>
          </select>
        </div>
      </div>
      <div className="rounded-lg bg-gray-50 dark:bg-gray-800 p-4 grid gap-2 sm:grid-cols-2 text-sm">
        <p className="text-gray-700 dark:text-gray-300">Annual: <strong>${annual.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</strong></p>
        <p className="text-gray-700 dark:text-gray-300">Monthly: <strong>${monthly.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</strong></p>
        <p className="text-gray-700 dark:text-gray-300">Weekly: <strong>${weekly.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</strong></p>
        <p className="text-gray-700 dark:text-gray-300">Hourly: <strong>${hourly.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</strong></p>
      </div>
    </div>
  );
}
