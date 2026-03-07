"use client";
import { useState } from "react";

export function CssFlexboxGeneratorTool() {
  const [dir, setDir] = useState("row");
  const [justify, setJustify] = useState("center");
  const [align, setAlign] = useState("center");
  const [wrap, setWrap] = useState("nowrap");
  const [gap, setGap] = useState("10");
  const css = "display: flex;\nflex-direction: " + dir + ";\njustify-content: " + justify + ";\nalign-items: " + align + ";\nflex-wrap: " + wrap + ";\ngap: " + gap + "px;";

  return (
    <div className="space-y-4">
      <div className="h-40 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-2" style={{display:"flex",flexDirection:dir as React.CSSProperties["flexDirection"],justifyContent:justify,alignItems:align,flexWrap:wrap as React.CSSProperties["flexWrap"],gap:gap+"px"}}>
        {[1,2,3,4].map(i => <div key={i} className="bg-brand-500 text-white rounded px-3 py-2 text-sm font-mono">{i}</div>)}
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <div><label className="text-xs text-gray-500">Direction</label><select className="input-field text-sm" value={dir} onChange={e => setDir(e.target.value)}><option value="row">row</option><option value="row-reverse">row-reverse</option><option value="column">column</option><option value="column-reverse">column-reverse</option></select></div>
        <div><label className="text-xs text-gray-500">Justify Content</label><select className="input-field text-sm" value={justify} onChange={e => setJustify(e.target.value)}><option value="flex-start">flex-start</option><option value="center">center</option><option value="flex-end">flex-end</option><option value="space-between">space-between</option><option value="space-around">space-around</option><option value="space-evenly">space-evenly</option></select></div>
        <div><label className="text-xs text-gray-500">Align Items</label><select className="input-field text-sm" value={align} onChange={e => setAlign(e.target.value)}><option value="flex-start">flex-start</option><option value="center">center</option><option value="flex-end">flex-end</option><option value="stretch">stretch</option><option value="baseline">baseline</option></select></div>
        <div><label className="text-xs text-gray-500">Wrap</label><select className="input-field text-sm" value={wrap} onChange={e => setWrap(e.target.value)}><option value="nowrap">nowrap</option><option value="wrap">wrap</option><option value="wrap-reverse">wrap-reverse</option></select></div>
        <div><label className="text-xs text-gray-500">Gap (px)</label><input type="number" className="input-field text-sm" value={gap} onChange={e => setGap(e.target.value)} /></div>
      </div>
      <textarea className="input-field font-mono text-sm bg-gray-50 dark:bg-gray-800 min-h-[100px]" readOnly value={css} />
      <button onClick={() => navigator.clipboard.writeText(css)} className="btn-primary text-sm">Copy CSS</button>
    </div>
  );
}
