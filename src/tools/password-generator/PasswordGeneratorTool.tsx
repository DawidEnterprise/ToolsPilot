"use client";

import { useState, useCallback } from "react";
import { generatePassword, getStrength, type PasswordOptions } from "./logic";
import { CopyButton } from "@/components/CopyButton";

export function PasswordGeneratorTool() {
  const [opts, setOpts] = useState<PasswordOptions>({
    length: 16,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const [password, setPassword] = useState(() => generatePassword({ length: 16, uppercase: true, lowercase: true, numbers: true, symbols: true }));

  const strength = getStrength(password);

  const regenerate = useCallback(() => {
    setPassword(generatePassword(opts));
  }, [opts]);

  const updateOpt = <K extends keyof PasswordOptions>(key: K, value: PasswordOptions[K]) => {
    const next = { ...opts, [key]: value };
    setOpts(next);
    setPassword(generatePassword(next));
  };

  const strengthColors: Record<string, string> = {
    red: "bg-red-500",
    amber: "bg-amber-500",
    blue: "bg-blue-500",
    green: "bg-green-500",
  };

  return (
    <div className="space-y-6">
      {/* Password display */}
      <div className="rounded-lg border-2 border-brand-200 bg-brand-50 px-5 py-4 dark:border-brand-800 dark:bg-brand-950">
        <div className="flex items-center gap-3">
          <code className="flex-1 text-lg font-mono text-gray-900 break-all select-all dark:text-gray-100">
            {password}
          </code>
          <CopyButton text={password} />
          <button onClick={regenerate} className="btn-primary text-sm" title="Regenerate">
            ↻
          </button>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <div className="flex-1 h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${strengthColors[strength.color]}`}
              style={{ width: `${(strength.score / 7) * 100}%` }}
            />
          </div>
          <span className="text-xs font-medium text-gray-600 dark:text-gray-400">{strength.label}</span>
        </div>
      </div>

      {/* Options */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="flex items-center justify-between text-sm font-medium text-gray-700 dark:text-gray-300">
            Length: {opts.length}
          </label>
          <input
            type="range"
            min={4}
            max={64}
            value={opts.length}
            onChange={(e) => updateOpt("length", Number(e.target.value))}
            className="w-full mt-2 accent-brand-600"
          />
          <div className="flex justify-between text-xs text-gray-400">
            <span>4</span>
            <span>64</span>
          </div>
        </div>

        <div className="space-y-3">
          {([
            { key: "uppercase" as const, label: "Uppercase (A-Z)" },
            { key: "lowercase" as const, label: "Lowercase (a-z)" },
            { key: "numbers" as const, label: "Numbers (0-9)" },
            { key: "symbols" as const, label: "Symbols (!@#$...)" },
          ]).map(({ key, label }) => (
            <label key={key} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
              <input
                type="checkbox"
                checked={opts[key]}
                onChange={(e) => updateOpt(key, e.target.checked)}
                className="rounded border-gray-300 text-brand-600 focus:ring-brand-500"
              />
              {label}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
