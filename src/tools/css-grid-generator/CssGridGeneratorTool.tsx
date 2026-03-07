"use client";
import { useState } from "react";

export function CssGridGeneratorTool() {
  const [cols, setCols] = useState("3");
  const [rows, setRows] = useState("2");
  const [gap, setGap] = useState("10");
  const [colSize, setColSize] = useState("1fr");
  const [rowSize, setRowSize] = useState("auto");
  const totalCells = (+cols||1) * (+rows||1);
  const css = "display: grid;\ngrid-template-columns: repeat(" + cols + ", " + colSize + ");\ngrid-template-rows: repeat(" + rows + ", " + rowSize + ");\ngap: " + gap + "px;";

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-2" style={{display:"grid",gridTemplateColumns:"repeat("+cols+", 1fr)",gridTemplateRows:"repeat("+rows+", 50px)",gap:gap+"px"}}>
        {Array.from({length:Math.min(totalCells,12)},(_,i)=> <div key={i} className="bg-brand-500 text-white rounded flex items-center justify-center text-sm font-mono">{i+1}</div>)}
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <div><label className="text-xs text-gray-500">Columns</label><input type="number" className="input-field text-sm" min={1} max={12} value={cols} onChange={e => setCols(e.target.value)} /></div>
        <div><label className="text-xs text-gray-500">Rows</label><input type="number" className="input-field text-sm" min={1} max={12} value={rows} onChange={e => setRows(e.target.value)} /></div>
        <div><label className="text-xs text-gray-500">Gap (px)</label><input type="number" className="input-field text-sm" value={gap} onChange={e => setGap(e.target.value)} /></div>
        <div><label className="text-xs text-gray-500">Column Size</label><input className="input-field text-sm" value={colSize} onChange={e => setColSize(e.target.value)} /></div>
        <div><label className="text-xs text-gray-500">Row Size</label><input className="input-field text-sm" value={rowSize} onChange={e => setRowSize(e.target.value)} /></div>
      </div>
      <textarea className="input-field font-mono text-sm bg-gray-50 dark:bg-gray-800 min-h-[80px]" readOnly value={css} />
      <button onClick={() => navigator.clipboard.writeText(css)} className="btn-primary text-sm">Copy CSS</button>
    </div>
  );
}
