"use client";
import { useState } from "react";

export function DateCalculatorTool() {
  const today = new Date().toISOString().split("T")[0];
  const [date1, setDate1] = useState(today);
  const [date2, setDate2] = useState(today);
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffMs = Math.abs(d2.getTime() - d1.getTime());
  const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(days / 7);
  const months = Math.abs((d2.getFullYear() - d1.getFullYear()) * 12 + d2.getMonth() - d1.getMonth());

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Date</label>
          <input type="date" className="input-field" value={date1} onChange={e => setDate1(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">End Date</label>
          <input type="date" className="input-field" value={date2} onChange={e => setDate2(e.target.value)} />
        </div>
      </div>
      <div className="rounded-lg bg-gray-50 dark:bg-gray-800 p-4 grid gap-2 sm:grid-cols-3 text-sm">
        <p className="text-gray-700 dark:text-gray-300">Days: <strong className="text-lg">{days}</strong></p>
        <p className="text-gray-700 dark:text-gray-300">Weeks: <strong>{weeks}</strong></p>
        <p className="text-gray-700 dark:text-gray-300">Months: <strong>{months}</strong></p>
      </div>
    </div>
  );
}
