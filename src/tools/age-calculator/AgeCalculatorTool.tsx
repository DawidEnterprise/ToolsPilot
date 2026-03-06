"use client";

import { useState } from "react";
import { calculateAge } from "./logic";

export function AgeCalculatorTool() {
  const [birthDate, setBirthDate] = useState("");

  const date = birthDate ? new Date(birthDate + "T00:00:00") : null;
  const valid = date && !isNaN(date.getTime()) && date < new Date();
  const result = valid ? calculateAge(date) : null;

  return (
    <div className="space-y-5">
      <div>
        <label className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
          Date of Birth
        </label>
        <input
          type="date"
          className="input-field text-lg"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          max={new Date().toISOString().split("T")[0]}
          autoFocus
        />
      </div>

      {result && (
        <div className="space-y-4">
          <div className="rounded-lg border border-gray-200 bg-gray-50 px-5 py-4 dark:border-gray-700 dark:bg-gray-800">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">Your Age</span>
            <p className="mt-1 text-3xl font-bold text-brand-600 dark:text-brand-400">
              {result.years} years, {result.months} months, {result.days} days
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-800">
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">Total Days Lived</span>
              <p className="mt-1 text-xl font-bold text-gray-900 dark:text-gray-100">
                {result.totalDays.toLocaleString()}
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-800">
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">Next Birthday In</span>
              <p className="mt-1 text-xl font-bold text-gray-900 dark:text-gray-100">
                {result.daysUntilBirthday} days
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
