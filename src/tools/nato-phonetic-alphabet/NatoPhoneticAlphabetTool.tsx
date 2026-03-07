"use client";
import { useState } from "react";

const NATO: Record<string, string> = {A:"Alpha",B:"Bravo",C:"Charlie",D:"Delta",E:"Echo",F:"Foxtrot",G:"Golf",H:"Hotel",I:"India",J:"Juliet",K:"Kilo",L:"Lima",M:"Mike",N:"November",O:"Oscar",P:"Papa",Q:"Quebec",R:"Romeo",S:"Sierra",T:"Tango",U:"Uniform",V:"Victor",W:"Whiskey",X:"X-ray",Y:"Yankee",Z:"Zulu","0":"Zero","1":"One","2":"Two","3":"Three","4":"Four","5":"Five","6":"Six","7":"Seven","8":"Eight","9":"Niner"};

export function NatoPhoneticAlphabetTool() {
  const [input, setInput] = useState("");
  const output = input.toUpperCase().split("").map(c => NATO[c] || (c === " " ? " / " : c)).join(" ");

  return (
    <div className="space-y-4">
      <textarea className="input-field min-h-[100px]" placeholder="Enter text to convert..." value={input} onChange={e => setInput(e.target.value)} />
      <textarea className="input-field min-h-[100px] bg-gray-50 dark:bg-gray-800" readOnly value={output} />
      <button onClick={() => navigator.clipboard.writeText(output)} className="btn-primary text-sm">Copy</button>
    </div>
  );
}
