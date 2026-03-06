"use client";

import { useState, useMemo } from "react";
import { textToMorse, morseToText } from "./logic";
import { CopyButton } from "@/components/CopyButton";

type Direction = "encode" | "decode";

export function MorseCodeTranslatorTool() {
  const [input, setInput] = useState("");
  const [direction, setDirection] = useState<Direction>("encode");

  const result = useMemo(() => {
    if (!input) return "";
    return direction === "encode" ? textToMorse(input) : morseToText(input);
  }, [input, direction]);

  return (
    <div className="space-y-5">
      <div className="flex gap-2">
        {(["encode", "decode"] as Direction[]).map((d) => (
          <button
            key={d}
            onClick={() => { setDirection(d); setInput(""); }}
            className={`rounded-lg px-4 py-1.5 text-sm font-medium transition-colors ${
              direction === d
                ? "bg-brand-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            }`}
          >
            {d === "encode" ? "Text → Morse" : "Morse → Text"}
          </button>
        ))}
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
          {direction === "encode" ? "Text Input" : "Morse Code Input"}
        </label>
        <textarea
          className="input-field min-h-[100px] font-mono"
          placeholder={direction === "encode" ? "Enter text here..." : "Enter morse code (e.g. .... . .-.. .-.. ---)"}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoFocus
        />
      </div>

      {result && (
        <div className="rounded-lg border border-gray-200 bg-gray-50 px-5 py-4 dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
              {direction === "encode" ? "Morse Code" : "Decoded Text"}
            </span>
            <CopyButton text={result} />
          </div>
          <pre className="whitespace-pre-wrap break-all text-lg font-mono text-brand-600 dark:text-brand-400">
            {result}
          </pre>
        </div>
      )}

      <div className="text-xs text-gray-500 dark:text-gray-400">
        <p>Use spaces between letters and / between words. Example: .... . .-.. .-.. --- / .-- --- .-. .-.. -..</p>
      </div>
    </div>
  );
}
