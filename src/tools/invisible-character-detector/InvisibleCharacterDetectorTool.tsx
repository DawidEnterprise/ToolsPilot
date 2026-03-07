"use client";
import { useState } from "react";

const INVISIBLES: Record<number, string> = {0:"NULL",8:"BACKSPACE",9:"TAB",10:"LINE FEED",13:"CARRIAGE RETURN",32:"SPACE",160:"NO-BREAK SPACE",173:"SOFT HYPHEN",8203:"ZERO WIDTH SPACE",8204:"ZERO WIDTH NON-JOINER",8205:"ZERO WIDTH JOINER",8206:"LEFT-TO-RIGHT MARK",8207:"RIGHT-TO-LEFT MARK",8232:"LINE SEPARATOR",8233:"PARAGRAPH SEPARATOR",8288:"WORD JOINER",65279:"BYTE ORDER MARK",65532:"OBJECT REPLACEMENT"};

export function InvisibleCharacterDetectorTool() {
  const [input, setInput] = useState("");
  const chars = input.split("").map((c, i) => {
    const code = c.charCodeAt(0);
    const name = INVISIBLES[code];
    return { char: c, code, index: i, invisible: !!name, name: name || null };
  });
  const found = chars.filter(c => c.invisible && c.code !== 32 && c.code !== 10 && c.code !== 9);

  return (
    <div className="space-y-4">
      <textarea className="textarea-field font-mono" placeholder="Paste text to scan for hidden characters..." value={input} onChange={e => setInput(e.target.value)} />
      <div className="rounded-lg bg-gray-50 dark:bg-gray-800 p-4 text-sm">
        <p className="text-gray-700 dark:text-gray-300">{input.length} characters total, <strong className={found.length > 0 ? "text-red-600" : "text-green-600"}>{found.length} hidden character{found.length !== 1 ? "s" : ""} found</strong></p>
        {found.length > 0 && (
          <ul className="mt-2 space-y-1">
            {found.map((c, i) => (
              <li key={i} className="text-red-600 dark:text-red-400 font-mono">Position {c.index}: U+{c.code.toString(16).toUpperCase().padStart(4, "0")} ({c.name})</li>
            ))}
          </ul>
        )}
      </div>
      {found.length > 0 && (
        <button onClick={() => setInput(input.split("").filter((_, i) => !found.some(f => f.index === i)).join(""))} className="btn-primary text-sm">Remove Hidden Characters</button>
      )}
    </div>
  );
}
