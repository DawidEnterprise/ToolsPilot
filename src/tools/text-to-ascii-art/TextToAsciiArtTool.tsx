"use client";

import { useState, useMemo } from "react";
import { textToAsciiArt } from "./logic";

export function TextToAsciiArtTool() {
  const [input, setInput] = useState("HELLO");

  const output = useMemo(() => textToAsciiArt(input), [input]);

  const copy = () => { navigator.clipboard.writeText(output); };

  return (
    <div className="space-y-4">
      <input
        type="text"
        className="input-field text-lg"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your text..."
        maxLength={30}
        autoFocus
      />

      {output && (
        <div className="relative">
          <button onClick={copy} className="absolute right-2 top-2 btn-secondary text-xs">Copy</button>
          <pre className="overflow-x-auto rounded-lg border border-gray-200 bg-gray-950 p-4 font-mono text-sm leading-tight text-green-400 dark:border-gray-700">
            {output}
          </pre>
        </div>
      )}
    </div>
  );
}
