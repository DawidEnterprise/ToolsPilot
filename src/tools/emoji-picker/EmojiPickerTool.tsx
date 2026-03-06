"use client";

import { useState } from "react";
import { EMOJI_CATEGORIES } from "./logic";

export function EmojiPickerTool() {
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState("");
  const [activeCategory, setActiveCategory] = useState(EMOJI_CATEGORIES[0].name);

  const copy = (emoji: string) => {
    navigator.clipboard.writeText(emoji);
    setCopied(emoji);
    setTimeout(() => setCopied(""), 1500);
  };

  const filteredCategories = search.trim()
    ? EMOJI_CATEGORIES.map(c => ({
        ...c,
        emojis: c.emojis.filter(() => c.name.toLowerCase().includes(search.toLowerCase())),
      })).filter(c => c.emojis.length > 0)
    : EMOJI_CATEGORIES.filter(c => c.name === activeCategory);

  return (
    <div className="space-y-4">
      <input
        type="text"
        className="input-field"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by category..."
        autoFocus
      />

      {!search && (
        <div className="flex flex-wrap gap-2">
          {EMOJI_CATEGORIES.map((c) => (
            <button
              key={c.name}
              onClick={() => setActiveCategory(c.name)}
              className={`rounded-md px-3 py-1.5 text-sm font-medium ${
                activeCategory === c.name
                  ? "bg-brand-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400"
              }`}
            >
              {c.emojis[0]} {c.name}
            </button>
          ))}
        </div>
      )}

      {copied && (
        <p className="text-center text-sm text-brand-600 dark:text-brand-400">
          Copied {copied} to clipboard!
        </p>
      )}

      {filteredCategories.map((cat) => (
        <div key={cat.name}>
          {search && <h3 className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">{cat.name}</h3>}
          <div className="grid grid-cols-8 gap-1 sm:grid-cols-12 md:grid-cols-16">
            {cat.emojis.map((emoji, i) => (
              <button
                key={i}
                onClick={() => copy(emoji)}
                className="flex h-10 w-10 items-center justify-center rounded-md text-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                title="Click to copy"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
