"use client";
import { useState } from "react";

function optimizeSvg(svg: string): string {
  let s = svg;
  s = s.replace(/<!--[\s\S]*?-->/g, "");
  s = s.replace(/\s(xmlns:(?!svg)[a-z]+)="[^"]*"/gi, "");
  s = s.replace(/<metadata[\s\S]*?<\/metadata>/gi, "");
  s = s.replace(/<desc[\s\S]*?<\/desc>/gi, "");
  s = s.replace(/<title[\s\S]*?<\/title>/gi, "");
  s = s.replace(/\s{2,}/g, " ");
  s = s.replace(/>\s+</g, "><");
  return s.trim();
}

export function SvgOptimizerTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const optimize = () => setOutput(optimizeSvg(input));
  const origSize = new Blob([input]).size;
  const optSize = new Blob([output]).size;
  const saved = origSize > 0 ? ((1 - optSize / origSize) * 100).toFixed(0) : "0";

  return (
    <div className="space-y-4">
      <textarea className="input-field min-h-[200px] font-mono text-sm" placeholder="Paste SVG markup here..." value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={optimize} className="btn-primary text-sm">Optimize SVG</button>
      {output && (
        <p className="text-xs text-gray-500">{origSize} → {optSize} bytes ({saved}% saved)</p>
      )}
      <textarea className="input-field min-h-[200px] font-mono text-sm bg-gray-50 dark:bg-gray-800" readOnly value={output} />
      {output && <button onClick={() => navigator.clipboard.writeText(output)} className="btn-secondary text-sm">Copy</button>}
    </div>
  );
}
