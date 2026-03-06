"use client";

import { useState, useEffect, useCallback } from "react";
import { calculateCountdown, type CountdownResult } from "./logic";
import { CopyButton } from "@/components/CopyButton";

export function CountdownTimerTool() {
  const [targetDate, setTargetDate] = useState("");
  const [targetTime, setTargetTime] = useState("00:00");
  const [label, setLabel] = useState("");
  const [countdown, setCountdown] = useState<CountdownResult | null>(null);

  const getTarget = useCallback(() => {
    if (!targetDate) return null;
    return new Date(`${targetDate}T${targetTime || "00:00"}:00`);
  }, [targetDate, targetTime]);

  useEffect(() => {
    const target = getTarget();
    if (!target || isNaN(target.getTime())) {
      setCountdown(null);
      return;
    }

    const tick = () => setCountdown(calculateCountdown(target));
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [getTarget]);

  const shareText = countdown
    ? `${label || "Countdown"}: ${countdown.days}d ${countdown.hours}h ${countdown.minutes}m ${countdown.seconds}s`
    : "";

  return (
    <div className="space-y-5">
      <div>
        <label className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
          Event Name (optional)
        </label>
        <input
          type="text"
          className="input-field"
          placeholder="My Event"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
            Target Date
          </label>
          <input
            type="date"
            className="input-field"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
            autoFocus
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
            Time
          </label>
          <input
            type="time"
            className="input-field"
            value={targetTime}
            onChange={(e) => setTargetTime(e.target.value)}
          />
        </div>
      </div>

      {countdown && (
        <div className="space-y-4">
          {label && (
            <p className="text-center text-lg font-medium text-gray-700 dark:text-gray-300">
              {countdown.isPast ? `Since ${label}` : `Until ${label}`}
            </p>
          )}
          <div className="grid grid-cols-4 gap-3">
            {[
              { value: countdown.days, label: "Days" },
              { value: countdown.hours, label: "Hours" },
              { value: countdown.minutes, label: "Minutes" },
              { value: countdown.seconds, label: "Seconds" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-gray-200 bg-gray-50 py-4 text-center dark:border-gray-700 dark:bg-gray-800"
              >
                <p className="text-3xl font-bold text-brand-600 dark:text-brand-400 tabular-nums sm:text-4xl">
                  {String(item.value).padStart(2, "0")}
                </p>
                <p className="mt-1 text-xs font-medium text-gray-500 dark:text-gray-400">{item.label}</p>
              </div>
            ))}
          </div>

          {countdown.isPast && (
            <p className="text-center text-sm text-yellow-600 dark:text-yellow-400">
              This date has passed — showing elapsed time.
            </p>
          )}

          <div className="flex justify-center">
            <CopyButton text={shareText} label="Copy countdown" />
          </div>
        </div>
      )}
    </div>
  );
}
