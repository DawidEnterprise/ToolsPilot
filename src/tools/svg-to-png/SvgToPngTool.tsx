"use client";
import { useState, useCallback } from "react";
import { FileDropZone } from "@/components/FileDropZone";
import { downloadBlob } from "@/lib/utils";

export function SvgToPngTool() {
  const [result, setResult] = useState<{blob:Blob;url:string}|null>(null);
  const [scale, setScale] = useState(2);

  const handleFile = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const svgText = reader.result as string;
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth * scale;
        canvas.height = img.naturalHeight * scale;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(blob => {
          if (blob) setResult({ blob, url: URL.createObjectURL(blob) });
        }, "image/png");
      };
      img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgText)));
    };
    reader.readAsText(file);
  }, [scale]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <label className="text-sm text-gray-600 dark:text-gray-400">Scale:</label>
        {[1,2,3,4].map(s => <button key={s} onClick={() => setScale(s)} className={s===scale ? "btn-primary text-xs" : "btn-secondary text-xs"}>{s}x</button>)}
      </div>
      <FileDropZone accept="image/svg+xml,.svg" onFile={handleFile} label="Drop an SVG file" maxSizeMB={10} />
      {result && (
        <div className="space-y-3">
          <img src={result.url} alt="Converted" className="max-h-64 rounded border border-gray-200 dark:border-gray-700" />
          <button onClick={() => downloadBlob(result.blob, "converted.png")} className="btn-primary text-sm">Download PNG</button>
        </div>
      )}
    </div>
  );
}
