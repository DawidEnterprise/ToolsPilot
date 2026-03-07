"use client";

import { useState, useMemo } from "react";
import { analyzeText } from "./logic";

export function WordCounterTool() {
  const [input, setInput] = useState("");
  const stats = useMemo(() => analyzeText(input), [input]);

  const formatTime = (minutes: number) => {
    if (minutes < 1) return `${Math.ceil(minutes * 60)} sec`;
    return `~${Math.ceil(minutes)} min`;
  };

  const hasText = stats.words > 0;

  return (
    <div className="space-y-6">
      {/* Textarea first — this is the primary action */}
      <textarea
        className="textarea-field tool-panel"
        placeholder="Start typing or paste your text here…"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        autoFocus
      />

      {/* Main stats — always visible so user sees counts update live */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Words", value: stats.words },
          { label: "Characters", value: stats.characters },
          { label: "Sentences", value: stats.sentences },
          { label: "Paragraphs", value: stats.paragraphs },
        ].map((item) => (
          <div key={item.label} className="rounded-lg bg-brand-50 px-4 py-3 text-center dark:bg-brand-950">
            <p className="text-2xl font-bold text-brand-700 dark:text-brand-400">{item.value.toLocaleString()}</p>
            <p className="text-xs text-brand-600/70 dark:text-brand-400/70">{item.label}</p>
          </div>
        ))}
      </div>

      {/* Extra details — only show when there's text */}
      {hasText && (
        <div className="rounded-lg border border-gray-200 bg-gray-50 px-5 py-4 dark:border-gray-700 dark:bg-gray-800">
          <div className="grid gap-x-8 gap-y-2 sm:grid-cols-2 text-sm text-gray-600 dark:text-gray-400">
            <p>Characters (no spaces): <strong className="text-gray-900 dark:text-gray-100">{stats.charactersNoSpaces.toLocaleString()}</strong></p>
            <p>Reading time: <strong className="text-gray-900 dark:text-gray-100">{formatTime(stats.readingTimeMinutes)}</strong></p>
            <p>Average word length: <strong className="text-gray-900 dark:text-gray-100">{stats.averageWordLength.toFixed(1)} chars</strong></p>
            <p>Speaking time: <strong className="text-gray-900 dark:text-gray-100">{formatTime(stats.speakingTimeMinutes)}</strong></p>
          </div>
        </div>
      )}
    </div>
  );
}
