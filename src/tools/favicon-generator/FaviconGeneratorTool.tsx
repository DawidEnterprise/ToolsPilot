"use client";

import { useState, useMemo, useCallback } from "react";
import { generateFaviconSvg, svgToDataUrl } from "./logic";

export function FaviconGeneratorTool() {
  const [text, setText] = useState("T");
  const [bgColor, setBgColor] = useState("#3b82f6");
  const [textColor, setTextColor] = useState("#ffffff");
  const [shape, setShape] = useState<"circle" | "rounded-square" | "square">("rounded-square");

  const svg = useMemo(() => generateFaviconSvg(text || "T", bgColor, textColor, shape), [text, bgColor, textColor, shape]);
  const dataUrl = useMemo(() => svgToDataUrl(svg), [svg]);

  const downloadSvg = useCallback(() => {
    const blob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "favicon.svg";
    a.click();
    URL.revokeObjectURL(url);
  }, [svg]);

  const downloadPng = useCallback(async () => {
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d")!;
    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "favicon.png";
        a.click();
        URL.revokeObjectURL(url);
      });
    };
    img.src = dataUrl;
  }, [dataUrl]);

  const htmlCode = `<link rel="icon" type="image/svg+xml" href="/favicon.svg">`;
  const copy = () => { navigator.clipboard.writeText(htmlCode); };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Text (1-3 chars)</label>
            <input type="text" className="input-field text-center text-xl font-mono" value={text} onChange={(e) => setText(e.target.value.slice(0, 3))} maxLength={3} autoFocus />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs text-gray-500 dark:text-gray-400">Background</label>
              <div className="flex items-center gap-2">
                <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="h-8 w-10 cursor-pointer rounded" />
                <input type="text" className="input-field font-mono text-sm" value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs text-gray-500 dark:text-gray-400">Text Color</label>
              <div className="flex items-center gap-2">
                <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} className="h-8 w-10 cursor-pointer rounded" />
                <input type="text" className="input-field font-mono text-sm" value={textColor} onChange={(e) => setTextColor(e.target.value)} />
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            {(["circle", "rounded-square", "square"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setShape(s)}
                className={`rounded-md px-3 py-1.5 text-sm font-medium capitalize ${
                  shape === s
                    ? "bg-brand-500 text-white"
                    : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                }`}
              >
                {s.replace("-", " ")}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="rounded-lg border border-gray-200 bg-white p-8 dark:border-gray-700 dark:bg-gray-900">
            <div dangerouslySetInnerHTML={{ __html: svg }} style={{ width: 64, height: 64 }} />
          </div>
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span>Preview sizes:</span>
            <div dangerouslySetInnerHTML={{ __html: svg }} style={{ width: 16, height: 16 }} />
            <div dangerouslySetInnerHTML={{ __html: svg }} style={{ width: 32, height: 32 }} />
            <div dangerouslySetInnerHTML={{ __html: svg }} style={{ width: 48, height: 48 }} />
          </div>
          <div className="flex gap-2">
            <button onClick={downloadSvg} className="btn-primary text-sm">Download SVG</button>
            <button onClick={downloadPng} className="btn-secondary text-sm">Download PNG</button>
          </div>
        </div>
      </div>

      <div className="relative">
        <button onClick={copy} className="absolute right-2 top-2 btn-secondary text-xs">Copy</button>
        <pre className="rounded-lg border border-gray-200 bg-gray-50 p-3 font-mono text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100">
          {htmlCode}
        </pre>
      </div>
    </div>
  );
}
