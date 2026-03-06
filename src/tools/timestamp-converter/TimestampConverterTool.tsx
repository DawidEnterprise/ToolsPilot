"use client";

import { useState, useEffect } from "react";
import { timestampToDate, dateToTimestamp, formatDate, formatISO, formatRelative } from "./logic";
import { CopyButton } from "@/components/CopyButton";

export function TimestampConverterTool() {
  const [tsInput, setTsInput] = useState("");
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const currentTs = Math.floor(now / 1000);
  const parsed = tsInput.trim() ? (() => {
    try {
      const num = Number(tsInput.trim());
      if (isNaN(num)) return null;
      return timestampToDate(num);
    } catch {
      return null;
    }
  })() : null;

  const nowParts = dateToTimestamp(new Date(now));

  return (
    <div className="space-y-6">
      {/* Current time */}
      <div className="rounded-lg bg-gradient-to-r from-brand-50 to-brand-100 px-5 py-4 dark:from-brand-950 dark:to-brand-900">
        <p className="text-xs font-medium text-brand-600/70 uppercase tracking-wider mb-1 dark:text-brand-400/70">
          Current Unix Timestamp
        </p>
        <div className="flex items-center gap-3">
          <code className="text-3xl font-bold text-brand-700 font-mono dark:text-brand-300">{currentTs}</code>
          <CopyButton text={String(currentTs)} />
        </div>
        <p className="text-sm text-brand-600/80 mt-1 dark:text-brand-400/80">{formatDate(new Date(now))}</p>
      </div>

      {/* Timestamp to Date */}
      <div>
        <label className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
          Convert Timestamp to Date
        </label>
        <input
          type="text"
          className="input-field font-mono"
          placeholder="Enter Unix timestamp (e.g. 1700000000)"
          value={tsInput}
          onChange={(e) => setTsInput(e.target.value)}
          autoFocus
        />
      </div>

      {tsInput.trim() && !parsed && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400">
          Not a valid number
        </div>
      )}

      {parsed && (
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { label: "Local Time", value: formatDate(parsed) },
            { label: "ISO 8601", value: formatISO(parsed) },
            { label: "Relative", value: formatRelative(parsed) },
            { label: "Seconds", value: String(dateToTimestamp(parsed).seconds) },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">{label}</span>
                <CopyButton text={value} />
              </div>
              <p className="mt-1 text-sm font-medium text-gray-900 font-mono dark:text-gray-100">{value}</p>
            </div>
          ))}
        </div>
      )}

      {/* Quick reference */}
      <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-800">
        <p className="text-xs font-semibold text-gray-500 mb-2 dark:text-gray-400">Quick Reference</p>
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 dark:text-gray-400">
          <p>Seconds: <code className="text-gray-900 dark:text-gray-100">{nowParts.seconds}</code></p>
          <p>Milliseconds: <code className="text-gray-900 dark:text-gray-100">{nowParts.milliseconds}</code></p>
        </div>
      </div>
    </div>
  );
}
