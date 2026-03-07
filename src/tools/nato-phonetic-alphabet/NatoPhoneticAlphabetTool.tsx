"use client";
import { useState } from "react";

const NATO: Record<string, string> = {A:"Alpha",B:"Bravo",C:"Charlie",D:"Delta",E:"Echo",F:"Foxtrot",G:"Golf",H:"Hotel",I:"India",J:"Juliet",K:"Kilo",L:"Lima",M:"Mike",N:"November",O:"Oscar",P:"Papa",Q:"Quebec",R:"Romeo",S:"Sierra",T:"Tango",U:"Uniform",V:"Victor",W:"Whiskey",X:"X-ray",Y:"Yankee",Z:"Zulu","0":"Zero","1":"One","2":"Two","3":"Three","4":"Four","5":"Five","6":"Six","7":"Seven","8":"Eight","9":"Niner"};

export function NatoPhoneticAlphabetTool() {
  const [input, setInput] = useState("");
  const output = input.toUpperCase().split("").map(c => NATO[c] || (c === " " ? " / " : c)).join(" ");

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Text Input</label>
          <textarea className="input-field tool-panel" placeholder="Enter text to convert..." value={input} onChange={e => setInput(e.target.value)} />
        </div>
        <div>
          <div className="mb-1 flex items-center justify-between">
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">NATO Phonetic</label>
            <button onClick={() => navigator.clipboard.writeText(output)} className="text-xs text-brand-500 hover:text-brand-600">Copy</button>
          </div>
          <textarea className="input-field tool-panel bg-gray-50 dark:bg-gray-800" readOnly value={output} />
        </div>
      </div>
    </div>
  );
}
