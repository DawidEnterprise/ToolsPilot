"use client";

import { useState, useCallback, useRef } from "react";
import { FileDropZone } from "@/components/FileDropZone";
import { downloadBlob } from "@/lib/utils";

export function ImageResizerTool() {
  const [image, setImage] = useState<{ file: File; url: string; width: number; height: number } | null>(null);
  const [targetW, setTargetW] = useState(0);
  const [targetH, setTargetH] = useState(0);
  const [keepAspect, setKeepAspect] = useState(true);
  const [result, setResult] = useState<{ blob: Blob; url: string } | null>(null);
  const [processing, setProcessing] = useState(false);
  const aspectRef = useRef(1);

  const handleFile = useCallback(async (file: File) => {
    if (result?.url) URL.revokeObjectURL(result.url);
    setResult(null);

    const img = new Image();
    const url = URL.createObjectURL(file);
    await new Promise<void>((res) => { img.onload = () => res(); img.src = url; });

    aspectRef.current = img.naturalWidth / img.naturalHeight;
    setTargetW(img.naturalWidth);
    setTargetH(img.naturalHeight);
    setImage({ file, url, width: img.naturalWidth, height: img.naturalHeight });
  }, [result]);

  const updateWidth = (w: number) => {
    setTargetW(w);
    if (keepAspect) setTargetH(Math.round(w / aspectRef.current));
  };

  const updateHeight = (h: number) => {
    setTargetH(h);
    if (keepAspect) setTargetW(Math.round(h * aspectRef.current));
  };

  const resize = useCallback(async () => {
    if (!image) return;
    setProcessing(true);
    try {
      const img = new Image();
      await new Promise<void>((res, rej) => { img.onload = () => res(); img.onerror = () => rej(); img.src = image.url; });
      const canvas = document.createElement("canvas");
      canvas.width = targetW;
      canvas.height = targetH;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, targetW, targetH);

      const mimeType = image.file.type === "image/png" ? "image/png" : "image/jpeg";
      const blob = await new Promise<Blob>((res, rej) => {
        canvas.toBlob((b) => (b ? res(b) : rej()), mimeType, 0.92);
      });
      setResult({ blob, url: URL.createObjectURL(blob) });
    } finally {
      setProcessing(false);
    }
  }, [image, targetW, targetH]);

  const handleReset = () => {
    if (image?.url) URL.revokeObjectURL(image.url);
    if (result?.url) URL.revokeObjectURL(result.url);
    setImage(null);
    setResult(null);
  };

  const presets = [
    { label: "HD", w: 1280, h: 720 },
    { label: "Full HD", w: 1920, h: 1080 },
    { label: "Instagram", w: 1080, h: 1080 },
    { label: "Twitter Header", w: 1500, h: 500 },
    { label: "Thumbnail", w: 300, h: 300 },
  ];

  return (
    <div className="space-y-6">
      {!image && (
        <FileDropZone accept="image/*" onFile={handleFile} label="Drop your image here" maxSizeMB={20} />
      )}

      {image && !result && (
        <>
          <div className="flex items-center gap-4">
            <img src={image.url} alt="Preview" className="h-20 w-20 rounded-lg object-cover border border-gray-200 dark:border-gray-700" />
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <p>Original: {image.width} × {image.height}</p>
              <p className="text-xs">{(image.file.size / 1024).toFixed(0)} KB · {image.file.type}</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">Width (px)</label>
              <input type="number" className="input-field" value={targetW} onChange={(e) => updateWidth(Number(e.target.value))} min={1} />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">Height (px)</label>
              <input type="number" className="input-field" value={targetH} onChange={(e) => updateHeight(Number(e.target.value))} min={1} />
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
            <input type="checkbox" checked={keepAspect} onChange={(e) => setKeepAspect(e.target.checked)} className="rounded border-gray-300 text-brand-600 focus:ring-brand-500" />
            Lock aspect ratio
          </label>

          <div className="flex flex-wrap gap-2">
            {presets.map((p) => (
              <button
                key={p.label}
                onClick={() => { setTargetW(p.w); setTargetH(p.h); }}
                className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-600 hover:border-brand-300 hover:bg-brand-50 transition-colors dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:border-brand-600"
              >
                {p.label} ({p.w}×{p.h})
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <button onClick={resize} className="btn-primary" disabled={processing}>
              {processing ? "Resizing…" : "Resize Image"}
            </button>
            <button onClick={handleReset} className="btn-secondary">Start Over</button>
          </div>
        </>
      )}

      {result && (
        <>
          <div className="rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700 dark:bg-green-950 dark:border-green-800 dark:text-green-400">
            ✓ Resized to {targetW} × {targetH}
          </div>
          <img src={result.url} alt="Resized" className="max-h-80 rounded-lg border border-gray-200 object-contain dark:border-gray-700" />
          <div className="flex gap-3">
            <button onClick={() => downloadBlob(result.blob, `resized-${targetW}x${targetH}.${image?.file.type === "image/png" ? "png" : "jpg"}`)} className="btn-primary">Download</button>
            <button onClick={handleReset} className="btn-secondary">Resize Another</button>
          </div>
        </>
      )}
    </div>
  );
}
