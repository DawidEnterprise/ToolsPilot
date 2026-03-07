"use client";
import { useState } from "react";

export function MortgageCalculatorTool() {
  const [loan, setLoan] = useState("300000");
  const [rate, setRate] = useState("6.5");
  const [years, setYears] = useState("30");
  const P = parseFloat(loan) || 0;
  const r = (parseFloat(rate) || 0) / 100 / 12;
  const n = (parseFloat(years) || 0) * 12;
  const monthly = r > 0 ? P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1) : P / n;
  const total = monthly * n;
  const interest = total - P;

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Loan Amount ($)</label>
          <input type="number" className="input-field" value={loan} onChange={e => setLoan(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Annual Rate (%)</label>
          <input type="number" className="input-field" step="0.1" value={rate} onChange={e => setRate(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Loan Term (years)</label>
          <input type="number" className="input-field" value={years} onChange={e => setYears(e.target.value)} />
        </div>
      </div>
      <div className="rounded-lg bg-gray-50 dark:bg-gray-800 p-4 space-y-1 text-sm">
        <p className="text-gray-700 dark:text-gray-300">Monthly payment: <strong className="text-lg">${monthly.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</strong></p>
        <p className="text-gray-700 dark:text-gray-300">Total paid: <strong>${total.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</strong></p>
        <p className="text-gray-700 dark:text-gray-300">Total interest: <strong className="text-red-600">${interest.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</strong></p>
      </div>
    </div>
  );
}
