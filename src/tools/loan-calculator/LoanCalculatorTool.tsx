"use client";

import { useState, useMemo } from "react";
import { calculateLoan } from "./logic";

export function LoanCalculatorTool() {
  const [principal, setPrincipal] = useState("250000");
  const [rate, setRate] = useState("6.5");
  const [years, setYears] = useState("30");
  const [showSchedule, setShowSchedule] = useState(false);

  const result = useMemo(() => {
    const p = parseFloat(principal) || 0;
    const r = parseFloat(rate) || 0;
    const m = (parseInt(years) || 0) * 12;
    return calculateLoan(p, r, m);
  }, [principal, rate, years]);

  const fmt = (n: number) => "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
            Loan Amount ($)
          </label>
          <input type="number" className="input-field text-lg" value={principal} onChange={(e) => setPrincipal(e.target.value)} min="0" autoFocus />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
            Interest Rate (%)
          </label>
          <input type="number" className="input-field text-lg" value={rate} onChange={(e) => setRate(e.target.value)} min="0" step="0.1" />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
            Loan Term (years)
          </label>
          <input type="number" className="input-field text-lg" value={years} onChange={(e) => setYears(e.target.value)} min="1" max="50" />
        </div>
      </div>

      {result.monthlyPayment > 0 && (
        <div className="space-y-4">
          <div className="rounded-lg border border-gray-200 bg-gray-50 px-5 py-4 text-center dark:border-gray-700 dark:bg-gray-800">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">Monthly Payment</span>
            <p className="mt-1 text-4xl font-bold text-brand-600 dark:text-brand-400">{fmt(result.monthlyPayment)}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-center dark:border-gray-700 dark:bg-gray-800">
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">Total Payment</span>
              <p className="mt-1 text-xl font-bold text-gray-900 dark:text-gray-100">{fmt(result.totalPayment)}</p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-center dark:border-gray-700 dark:bg-gray-800">
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">Total Interest</span>
              <p className="mt-1 text-xl font-bold text-red-600 dark:text-red-400">{fmt(result.totalInterest)}</p>
            </div>
          </div>

          <button onClick={() => setShowSchedule(!showSchedule)} className="btn-secondary text-sm">
            {showSchedule ? "Hide" : "Show"} Amortization Schedule
          </button>

          {showSchedule && result.schedule.length > 0 && (
            <div className="max-h-64 overflow-y-auto rounded-lg border border-gray-200 dark:border-gray-700">
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-gray-100 dark:bg-gray-800">
                  <tr>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Month</th>
                    <th className="px-3 py-2 text-right text-xs font-medium text-gray-500">Principal</th>
                    <th className="px-3 py-2 text-right text-xs font-medium text-gray-500">Interest</th>
                    <th className="px-3 py-2 text-right text-xs font-medium text-gray-500">Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {result.schedule.map((row) => (
                    <tr key={row.month}>
                      <td className="px-3 py-1.5 text-gray-700 dark:text-gray-300">{row.month}</td>
                      <td className="px-3 py-1.5 text-right text-gray-900 dark:text-gray-100">{fmt(row.principal)}</td>
                      <td className="px-3 py-1.5 text-right text-gray-900 dark:text-gray-100">{fmt(row.interest)}</td>
                      <td className="px-3 py-1.5 text-right text-gray-900 dark:text-gray-100">{fmt(row.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
