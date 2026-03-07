"use client";
import { useState, useMemo } from "react";

const CHARS = [
  ["✓","Check Mark"],["✗","Ballot X"],["❤","Heart"],["★","Star"],["→","Right Arrow"],["←","Left Arrow"],["↑","Up Arrow"],["↓","Down Arrow"],
  ["©","Copyright"],["®","Registered"],["™","Trademark"],["°","Degree"],["•","Bullet"],["·","Middle Dot"],["±","Plus-Minus"],["÷","Division"],
  ["×","Multiplication"],["≤","Less Or Equal"],["≥","Greater Or Equal"],["≠","Not Equal"],["≈","Approximately"],["∞","Infinity"],["π","Pi"],["∑","Sum"],
  ["∆","Delta"],["€","Euro"],["£","Pound"],["¥","Yen"],["¢","Cent"],["§","Section"],["¶","Pilcrow"],["†","Dagger"],
  ["‡","Double Dagger"],["…","Ellipsis"],["—","Em Dash"],["–","En Dash"],["\u2018","Left Quote"],["\u2019","Right Quote"],["\u201C","Left DblQuote"],["\u201D","Right DblQuote"],
  ["♠","Spade"],["♣","Club"],["♥","Heart Suit"],["♦","Diamond"],["♪","Note"],["♫","Double Note"],["☀","Sun"],["☁","Cloud"],
  ["☂","Umbrella"],["☎","Phone"],["✉","Envelope"],["✂","Scissors"],["✈","Airplane"],["⚡","Lightning"],["⚠","Warning"],["⭐","Star2"],
  ["🔥","Fire"],["💧","Water"],["🎵","Music"],["🔒","Lock"],["🔓","Unlock"],["📌","Pin"],["📎","Paperclip"],["🔍","Search"],
];

export function UnicodeLookupTool() {
  const [search, setSearch] = useState("");
  const filtered = useMemo(() => CHARS.filter(([,name]) => name.toLowerCase().includes(search.toLowerCase())), [search]);

  return (
    <div className="space-y-4">
      <input className="input-field" placeholder="Search characters by name..." value={search} onChange={e => setSearch(e.target.value)} />
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
        {filtered.map(([char, name]) => (
          <button key={name} onClick={() => navigator.clipboard.writeText(char)} className="flex flex-col items-center rounded-lg border border-gray-200 dark:border-gray-700 p-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors" title={name + " — click to copy"}>
            <span className="text-2xl">{char}</span>
            <span className="text-[10px] text-gray-500 mt-1 truncate w-full text-center">{name}</span>
          </button>
        ))}
      </div>
      <p className="text-xs text-gray-400">Click any character to copy it to clipboard.</p>
    </div>
  );
}
