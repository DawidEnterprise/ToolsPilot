"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { formatTime } from "./logic";

type Mode = "work" | "short-break" | "long-break";

const DEFAULT_DURATIONS: Record<Mode, number> = {
  work: 25 * 60,
  "short-break": 5 * 60,
  "long-break": 15 * 60,
};

const MODE_LABELS: Record<Mode, string> = {
  work: "Focus",
  "short-break": "Short Break",
  "long-break": "Long Break",
};

export function PomodoroTimerTool() {
  const [mode, setMode] = useState<Mode>("work");
  const [remaining, setRemaining] = useState(DEFAULT_DURATIONS.work);
  const [running, setRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clear = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (!running) { clear(); return; }
    intervalRef.current = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          setRunning(false);
          if (mode === "work") {
            setSessions((s) => s + 1);
            try { new Audio("data:audio/wav;base64,UklGRl9vT19teleVBmZm10ACAAAAAEA...").play(); } catch {}
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return clear;
  }, [running, mode, clear]);

  const switchMode = (m: Mode) => {
    clear();
    setRunning(false);
    setMode(m);
    setRemaining(DEFAULT_DURATIONS[m]);
  };

  const reset = () => {
    clear();
    setRunning(false);
    setRemaining(DEFAULT_DURATIONS[mode]);
  };

  const pct = ((DEFAULT_DURATIONS[mode] - remaining) / DEFAULT_DURATIONS[mode]) * 100;

  return (
    <div className="space-y-6">
      <div className="flex justify-center gap-2">
        {(Object.keys(MODE_LABELS) as Mode[]).map((m) => (
          <button
            key={m}
            onClick={() => switchMode(m)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              mode === m
                ? m === "work"
                  ? "bg-red-500 text-white"
                  : "bg-green-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
            }`}
          >
            {MODE_LABELS[m]}
          </button>
        ))}
      </div>

      <div className="flex flex-col items-center">
        <div className="relative flex h-56 w-56 items-center justify-center">
          <svg className="absolute inset-0" viewBox="0 0 200 200">
            <circle
              cx="100" cy="100" r="90"
              fill="none"
              stroke="currentColor"
              className="text-gray-200 dark:text-gray-700"
              strokeWidth="8"
            />
            <circle
              cx="100" cy="100" r="90"
              fill="none"
              stroke="currentColor"
              className={mode === "work" ? "text-red-500" : "text-green-500"}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 90}`}
              strokeDashoffset={`${2 * Math.PI * 90 * (1 - pct / 100)}`}
              transform="rotate(-90 100 100)"
              style={{ transition: "stroke-dashoffset 0.5s" }}
            />
          </svg>
          <span className="text-5xl font-bold text-gray-900 dark:text-gray-100">{formatTime(remaining)}</span>
        </div>
      </div>

      <div className="flex justify-center gap-3">
        <button
          onClick={() => setRunning(!running)}
          className={`rounded-lg px-8 py-3 text-lg font-semibold text-white transition-colors ${
            running ? "bg-yellow-500 hover:bg-yellow-600" : mode === "work" ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {running ? "Pause" : "Start"}
        </button>
        <button onClick={reset} className="btn-secondary px-6 py-3 text-lg">Reset</button>
      </div>

      <p className="text-center text-sm text-gray-500 dark:text-gray-400">
        Focus sessions completed: <span className="font-bold text-gray-900 dark:text-gray-100">{sessions}</span>
      </p>
    </div>
  );
}
