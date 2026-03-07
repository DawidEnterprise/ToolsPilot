"use client";
import { useState } from "react";

function countSyllables(word: string): number {
  const w = word.toLowerCase().replace(/[^a-z]/g, "");
  if (w.length <= 3) return 1;
  const count = w.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "").match(/[aeiouy]{1,2}/g)?.length || 1;
  return Math.max(1, count);
}

export function ReadabilityScoreTool() {
  const [input, setInput] = useState("");
  const sentences = input.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const words = input.split(/\s+/).filter(w => w.replace(/[^a-z]/gi, "").length > 0);
  const syllables = words.reduce((s, w) => s + countSyllables(w), 0);
  const sentenceCount = Math.max(1, sentences.length);
  const wordCount = Math.max(1, words.length);
  const flesch = 206.835 - 1.015 * (wordCount / sentenceCount) - 84.6 * (syllables / wordCount);
  const fk = 0.39 * (wordCount / sentenceCount) + 11.8 * (syllables / wordCount) - 15.59;
  const level = flesch >= 80 ? "Easy (6th grade)" : flesch >= 60 ? "Standard (8th-9th grade)" : flesch >= 40 ? "Difficult (college)" : "Very Difficult (graduate)";

  return (
    <div className="space-y-4">
      <textarea className="textarea-field" placeholder="Paste your text to analyze readability..." value={input} onChange={e => setInput(e.target.value)} />
      {words.length > 2 && (
        <div className="rounded-lg bg-gray-50 dark:bg-gray-800 p-4 space-y-2 text-sm">
          <p className="text-gray-700 dark:text-gray-300">Flesch Reading Ease: <strong className="text-lg">{flesch.toFixed(1)}</strong></p>
          <p className="text-gray-700 dark:text-gray-300">Flesch-Kincaid Grade: <strong>{fk.toFixed(1)}</strong></p>
          <p className="text-gray-700 dark:text-gray-300">Level: <strong>{level}</strong></p>
          <hr className="border-gray-200 dark:border-gray-700" />
          <div className="grid grid-cols-3 gap-2 text-gray-600 dark:text-gray-400">
            <p>Words: {wordCount}</p>
            <p>Sentences: {sentenceCount}</p>
            <p>Syllables: {syllables}</p>
          </div>
        </div>
      )}
    </div>
  );
}
