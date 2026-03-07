"use client";
import { useState } from "react";

const POWER_WORDS = ["free","new","you","best","how","secret","proven","easy","amazing","instant","guaranteed","discover","exclusive","ultimate"];
const EMOTIONAL_WORDS = ["love","hate","fear","shocking","surprising","unbelievable","incredible","terrifying","brilliant","devastating"];

export function HeadingAnalyzerTool() {
  const [headline, setHeadline] = useState("");
  const words = headline.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const charCount = headline.length;
  const power = words.filter(w => POWER_WORDS.includes(w.toLowerCase())).length;
  const emotional = words.filter(w => EMOTIONAL_WORDS.includes(w.toLowerCase())).length;
  const hasNumber = /\d/.test(headline);
  let score = 0;
  if (wordCount >= 6 && wordCount <= 13) score += 25;
  else if (wordCount >= 4) score += 15;
  if (charCount <= 70) score += 20;
  if (power > 0) score += 20;
  if (emotional > 0) score += 15;
  if (hasNumber) score += 10;
  if (headline[0] === headline[0]?.toUpperCase()) score += 10;

  return (
    <div className="space-y-4">
      <input className="input-field text-lg" placeholder="Enter your headline..." value={headline} onChange={e => setHeadline(e.target.value)} />
      {headline && (
        <div className="rounded-lg bg-gray-50 dark:bg-gray-800 p-4 space-y-3 text-sm">
          <div className="flex items-center gap-3">
            <span className={"text-2xl font-bold " + (score >= 70 ? "text-green-600" : score >= 40 ? "text-yellow-600" : "text-red-600")}>{score}/100</span>
            <span className="text-gray-600 dark:text-gray-400">{score >= 70 ? "Great headline!" : score >= 40 ? "Good, but could improve" : "Needs work"}</span>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            <p className="text-gray-600 dark:text-gray-400">Words: <strong>{wordCount}</strong> {wordCount >= 6 && wordCount <= 13 ? "✓" : "(aim for 6–13)"}</p>
            <p className="text-gray-600 dark:text-gray-400">Characters: <strong>{charCount}</strong> {charCount <= 70 ? "✓" : "(keep under 70)"}</p>
            <p className="text-gray-600 dark:text-gray-400">Power words: <strong>{power}</strong></p>
            <p className="text-gray-600 dark:text-gray-400">Emotional words: <strong>{emotional}</strong></p>
            <p className="text-gray-600 dark:text-gray-400">Has number: <strong>{hasNumber ? "Yes ✓" : "No"}</strong></p>
          </div>
        </div>
      )}
    </div>
  );
}
