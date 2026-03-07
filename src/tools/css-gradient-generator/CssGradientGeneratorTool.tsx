"use client";
import { useState } from "react";

export function CssGradientGeneratorTool() {
  const [type, setType] = useState("linear");
  const [angle, setAngle] = useState(135);
  const [color1, setColor1] = useState("#667eea");
  const [color2, setColor2] = useState("#764ba2");
  const gradient = type === "linear" ? "linear-gradient(" + angle + "deg, " + color1 + ", " + color2 + ")" : "radial-gradient(circle, " + color1 + ", " + color2 + ")";
  const css = "background: " + gradient + ";";

  return (
    <div className="space-y-4">
      <div className="h-40 rounded-lg border border-gray-200 dark:border-gray-700" style={{background: gradient}} />
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex gap-2 items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Color 1</label>
            <div className="flex gap-2"><input type="color" value={color1} onChange={e => setColor1(e.target.value)} className="h-10 w-10" /><input className="input-field font-mono text-sm flex-1" value={color1} onChange={e => setColor1(e.target.value)} /></div>
          </div>
        </div>
        <div className="flex gap-2 items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Color 2</label>
            <div className="flex gap-2"><input type="color" value={color2} onChange={e => setColor2(e.target.value)} className="h-10 w-10" /><input className="input-field font-mono text-sm flex-1" value={color2} onChange={e => setColor2(e.target.value)} /></div>
          </div>
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <select className="input-field w-32" value={type} onChange={e => setType(e.target.value)}>
          <option value="linear">Linear</option>
          <option value="radial">Radial</option>
        </select>
        {type === "linear" && (
          <div className="flex-1 flex items-center gap-2">
            <label className="text-sm text-gray-600 dark:text-gray-400">Angle:</label>
            <input type="range" min={0} max={360} value={angle} onChange={e => setAngle(+e.target.value)} className="flex-1" />
            <span className="text-sm text-gray-600 dark:text-gray-400 w-10">{angle}°</span>
          </div>
        )}
      </div>
      <textarea className="input-field font-mono text-sm bg-gray-50 dark:bg-gray-800 min-h-[60px]" readOnly value={css} />
      <button onClick={() => navigator.clipboard.writeText(css)} className="btn-primary text-sm">Copy CSS</button>
    </div>
  );
}
