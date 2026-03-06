"use client";

import { useState, useEffect } from "react";
import { generateAllHashes, type HashAlgorithm } from "./logic";
import { CopyButton } from "@/components/CopyButton";

const ALGORITHMS: HashAlgorithm[] = ["SHA-1", "SHA-256", "SHA-512"];

export function HashGeneratorTool() {
  const [input, setInput] = useState("");
  const [hashes, setHashes] = useState<Record<HashAlgorithm, string> | null>(null);

  useEffect(() => {
    if (!input) {
      setHashes(null);
      return;
    }
    let cancelled = false;
    generateAllHashes(input).then((h) => {
      if (!cancelled) setHashes(h);
    });
    return () => { cancelled = true; };
  }, [input]);

  return (
    <div className="space-y-5">
      <div>
        <label className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
          Enter text to hash
        </label>
        <textarea
          className="textarea-field h-32"
          placeholder="Type or paste text here…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoFocus
        />
      </div>

      {hashes && (
        <div className="space-y-3">
          {ALGORITHMS.map((algo) => (
            <div
              key={algo}
              className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">{algo}</span>
                <CopyButton text={hashes[algo]} />
              </div>
              <code className="block text-sm text-gray-900 break-all font-mono dark:text-gray-100">
                {hashes[algo]}
              </code>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
