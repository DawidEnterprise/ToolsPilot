"use client";

import { useState, useMemo } from "react";
import { convertBase, type NumberBase } from "./logic";
import { CopyButton } from "@/components/CopyButton";

const BASES: { id: NumberBase; label: string; prefix: string }[] = [
  { id: "binary", label: "Binary", prefix: "0b" },
  { id: "octal", label: "Octal", prefix: "0o" },
  { id: "decimal", label: "Decimal", prefix: "" },
  { id: "hex", label: "Hexadecimal", prefix: "0x" },
];

export function NumberBaseConverterTool() {
  const [input, setInput] = useState("");
  const [fromBase, setFromBase] = useState<NumberBase>("decimal");

  const results = useMemo(() => {
    return BASES.map((b) => {
      try {
        return { ...b, value: input.trim() ? convertBase(input, fromBase, b.id) : "", error: null };
      } catch (e: unknown) {
        return { ...b, value: "", error: e instanceof Error ? e.message : "Error" };
      }
    });
  }, [input, fromBase]);

  const hasError = results.some((r) => r.error);

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Enter a number</label>
          <input
            type="text"
            className="input-field font-mono text-lg"
            placeholder="255"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoFocus
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Input base</label>
          <div className="grid grid-cols-2 gap-2">
            {BASES.map((b) => (
              <button
                key={b.id}
                onClick={() => setFromBase(b.id)}
                className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                  fromBase === b.id
                    ? "border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300 dark:border-brand-400"
                    : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {hasError && input.trim() && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400">
          Invalid number for the selected base
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-2">
        {results.map((r) => (
          <div key={r.id} className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-800">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">{r.label}</span>
              {r.value && <CopyButton text={r.value} />}
            </div>
            <code className="text-sm font-mono text-gray-900 dark:text-gray-100">
              {r.value ? `${r.prefix}${r.value}` : "—"}
            </code>
          </div>
        ))}
      </div>
    </div>
  );
}
