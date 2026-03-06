"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { formatTime } from "./logic";

export function StopwatchTool() {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const startRef = useRef(0);
  const rafRef = useRef<number>();
  const savedRef = useRef(0);

  const tick = useCallback(() => {
    setElapsed(savedRef.current + (Date.now() - startRef.current));
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  const start = () => {
    startRef.current = Date.now();
    setRunning(true);
    rafRef.current = requestAnimationFrame(tick);
  };

  const stop = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    savedRef.current += Date.now() - startRef.current;
    setRunning(false);
  };

  const reset = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setRunning(false);
    setElapsed(0);
    savedRef.current = 0;
    setLaps([]);
  };

  const lap = () => {
    setLaps((prev) => [elapsed, ...prev]);
  };

  useEffect(() => {
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  return (
    <div className="space-y-5">
      <div className="text-center">
        <p className="font-mono text-6xl font-bold text-gray-900 tabular-nums dark:text-gray-100 sm:text-7xl">
          {formatTime(elapsed)}
        </p>
      </div>

      <div className="flex justify-center gap-3">
        {!running ? (
          <button onClick={start} className="btn-primary px-8 py-2.5 text-lg">
            {elapsed > 0 ? "Resume" : "Start"}
          </button>
        ) : (
          <button onClick={stop} className="rounded-lg bg-red-600 px-8 py-2.5 text-lg font-medium text-white hover:bg-red-700 transition-colors">
            Stop
          </button>
        )}
        {running && (
          <button onClick={lap} className="btn-secondary px-6 py-2.5 text-lg">
            Lap
          </button>
        )}
        {!running && elapsed > 0 && (
          <button onClick={reset} className="btn-secondary px-6 py-2.5 text-lg">
            Reset
          </button>
        )}
      </div>

      {laps.length > 0 && (
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 dark:text-gray-400">
            Laps ({laps.length})
          </h3>
          <div className="max-h-48 overflow-y-auto space-y-1">
            {laps.map((lapTime, i) => (
              <div key={i} className="flex justify-between text-sm font-mono">
                <span className="text-gray-500 dark:text-gray-400">Lap {laps.length - i}</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">{formatTime(lapTime)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
