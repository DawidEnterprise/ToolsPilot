"use client";

import { useState, useCallback } from "react";
import { FileDropZone } from "@/components/FileDropZone";
import { downloadBlob } from "@/lib/utils";

export function JpgToPngTool() {
  const [result, setResult] = useState<{ blob: Blob; preview: string; originalSize: number; newSize: number } | null>(null);
  const [originalPreview, setOriginalPreview] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState("converted.png");

  const handleFile = useCallback(async (file: File) => {
    setError(null);
    setResult(null);
    setProcessing(true);
    setOriginalPreview(URL.createObjectURL(file));
    setFileName(file.name.replace(/\.[^.]+$/, ".png"));

    try {
      const img = new Image();
      const url = URL.createObjectURL(file);

      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("Failed to load image"));
        img.src = url;
      });

      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);

      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (b) => (b ? resolve(b) : reject(new Error("Conversion failed"))),
          "image/png"
        );
      });

      setResult({
        blob,
        preview: URL.createObjectURL(blob),
        originalSize: file.size,
        newSize: blob.size,
      });
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Conversion failed");
    } finally {
      setProcessing(false);
    }
  }, []);

  const handleReset = () => {
    if (result?.preview) URL.revokeObjectURL(result.preview);
    if (originalPreview) URL.revokeObjectURL(originalPreview);
    setResult(null);
    setOriginalPreview(null);
    setError(null);
  };

  const formatSize = (bytes: number) =>
    bytes < 1024 * 1024 ? `${(bytes / 1024).toFixed(1)} KB` : `${(bytes / (1024 * 1024)).toFixed(2)} MB`;

  return (
    <div className="space-y-6">
      {!result && (
        <FileDropZone accept="image/jpeg,image/jpg,image/webp,image/bmp" onFile={handleFile} label="Drop your JPG image here" maxSizeMB={20} />
      )}

      {processing && (
        <div className="flex items-center justify-center gap-3 py-8">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-brand-600 border-t-transparent" />
          <span className="text-sm text-gray-600 dark:text-gray-400">Converting…</span>
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400">{error}</div>
      )}

      {result && (
        <>
          <div className="rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700 dark:bg-green-950 dark:border-green-800 dark:text-green-400">
            ✓ Converted! {formatSize(result.originalSize)} → {formatSize(result.newSize)} (PNG with transparency support)
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {originalPreview && (
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1 dark:text-gray-400">Original</p>
                <img src={originalPreview} alt="Original" className="rounded-lg border border-gray-200 max-h-64 object-contain w-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZjBmMGYwIi8+PHJlY3QgeD0iMTAiIHk9IjEwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiNmMGYwZjAiLz48L3N2Zz4=')] dark:border-gray-700" />
              </div>
            )}
            <div>
              <p className="text-xs font-medium text-gray-500 mb-1 dark:text-gray-400">Converted PNG</p>
              <img src={result.preview} alt="Converted" className="rounded-lg border border-gray-200 max-h-64 object-contain w-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZjBmMGYwIi8+PHJlY3QgeD0iMTAiIHk9IjEwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiNmMGYwZjAiLz48L3N2Zz4=')] dark:border-gray-700" />
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={() => downloadBlob(result.blob, fileName)} className="btn-primary">Download PNG</button>
            <button onClick={handleReset} className="btn-secondary">Convert Another</button>
          </div>
        </>
      )}
    </div>
  );
}
