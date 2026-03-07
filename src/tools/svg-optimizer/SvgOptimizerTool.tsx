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
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">SVG Input</label>
          <textarea className="input-field tool-panel font-mono text-sm" placeholder="Paste SVG markup here..." value={input} onChange={e => setInput(e.target.value)} />
        </div>
        <div>
          <div className="mb-1 flex items-center justify-between">
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Optimized Output</label>
            {output && <button onClick={() => navigator.clipboard.writeText(output)} className="text-xs text-brand-500 hover:text-brand-600">Copy</button>}
          </div>
          <textarea className="input-field tool-panel font-mono text-sm bg-gray-50 dark:bg-gray-800" readOnly value={output} />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button onClick={optimize} className="btn-primary text-sm">Optimize SVG</button>
        {output && <p className="text-xs text-gray-500">{origSize} → {optSize} bytes ({saved}% saved)</p>}
      </div>
    </div>
  );
}
