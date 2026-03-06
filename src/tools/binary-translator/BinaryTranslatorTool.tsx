"use client";

import { useState, useMemo } from "react";
import {
  textToBinary,
  binaryToText,
  textToHex,
  hexToText,
  textToOctal,
  octalToText,
} from "./logic";
import { CopyButton } from "@/components/CopyButton";

type Mode = "binary" | "hex" | "octal";
type Direction = "encode" | "decode";

export function BinaryTranslatorTool() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<Mode>("binary");
  const [direction, setDirection] = useState<Direction>("encode");

  const result = useMemo(() => {
    if (!input) return "";
    if (direction === "encode") {
      return mode === "binary" ? textToBinary(input) : mode === "hex" ? textToHex(input) : textToOctal(input);
    }
    return mode === "binary" ? binaryToText(input) : mode === "hex" ? hexToText(input) : octalToText(input);
  }, [input, mode, direction]);

  return (
    <div className="space-y-5">
      <div className="flex gap-2">
        {(["binary", "hex", "octal"] as Mode[]).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              mode === m
                ? "bg-brand-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            }`}
          >
            {m.charAt(0).toUpperCase() + m.slice(1)}
          </button>
        ))}
        <span className="mx-2 self-center text-gray-300 dark:text-gray-600">|</span>
        {(["encode", "decode"] as Direction[]).map((d) => (
          <button
            key={d}
            onClick={() => { setDirection(d); setInput(""); }}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              direction === d
                ? "bg-brand-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            }`}
          >
            {d === "encode" ? "Text → Code" : "Code → Text"}
          </button>
        ))}
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
          {direction === "encode" ? "Text Input" : `${mode.charAt(0).toUpperCase() + mode.slice(1)} Input`}
        </label>
        <textarea
          className="input-field min-h-[100px] font-mono"
          placeholder={direction === "encode" ? "Enter text here..." : `Enter ${mode} values...`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoFocus
        />
      </div>

      {result && (
        <div className="rounded-lg border border-gray-200 bg-gray-50 px-5 py-4 dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
              {direction === "encode" ? `${mode.charAt(0).toUpperCase() + mode.slice(1)} Output` : "Text Output"}
            </span>
            <CopyButton text={result} />
          </div>
          <pre className="whitespace-pre-wrap break-all text-sm font-mono text-gray-900 dark:text-gray-100">
            {result}
          </pre>
        </div>
      )}
    </div>
  );
}
