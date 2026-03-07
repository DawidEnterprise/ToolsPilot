"use client";

import { useState, useCallback } from "react";
import { FileDropZone } from "@/components/FileDropZone";
import { downloadBlob } from "@/lib/utils";

interface FileResult {
  name: string;
  blob: Blob;
  preview: string;
  originalSize: number;
  newSize: number;
}

async function convertToBlob(file: File): Promise<{ blob: Blob; originalSize: number; newSize: number }> {
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

  return { blob, originalSize: file.size, newSize: blob.size };
}

export function JpgToPngTool() {
  const [results, setResults] = useState<FileResult[]>([]);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = useCallback(async (files: File[]) => {
    setError(null);
    setProcessing(true);
    const converted: FileResult[] = [];

    for (const file of files) {
      try {
        const { blob, originalSize, newSize } = await convertToBlob(file);
        converted.push({
          name: file.name.replace(/\.[^.]+$/, ".png"),
          blob,
          preview: URL.createObjectURL(blob),
          originalSize,
          newSize,
        });
      } catch {
        setError(`Failed to convert ${file.name}`);
      }
    }

    setResults((prev) => [...prev, ...converted]);
    setProcessing(false);
  }, []);

  const handleReset = () => {
    results.forEach((r) => URL.revokeObjectURL(r.preview));
    setResults([]);
    setError(null);
  };

  const formatSize = (bytes: number) =>
    bytes < 1024 * 1024 ? `${(bytes / 1024).toFixed(1)} KB` : `${(bytes / (1024 * 1024)).toFixed(2)} MB`;

  return (
    <div className="space-y-5">
      <FileDropZone
        accept="image/jpeg,image/jpg,image/webp,image/bmp"
        onFiles={handleFiles}
        multiple
        label="Drop images here, or click to browse"
        maxSizeMB={20}
      />

      {processing && (
        <div className="flex items-center justify-center gap-3 py-4">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-brand-600 border-t-transparent" />
          <span className="text-sm text-gray-600 dark:text-gray-400">Converting…</span>
        </div>
      )}

      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}

      {results.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {results.length} file{results.length > 1 ? "s" : ""} converted
            </p>
            <div className="flex items-center gap-3">
              {results.length > 1 && (
                <button
                  onClick={() => results.forEach((r) => downloadBlob(r.blob, r.name))}
                  className="btn-primary px-3 py-1.5 text-xs"
                >
                  Save All
                </button>
              )}
              <button onClick={handleReset} className="text-xs text-gray-500 hover:text-red-500 transition-colors">
                Clear all
              </button>
            </div>
          </div>

          {results.map((r, i) => (
            <div key={i} className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-800">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={r.preview} alt="" className="h-12 w-12 rounded object-cover flex-shrink-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZjBmMGYwIi8+PHJlY3QgeD0iMTAiIHk9IjEwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiNmMGYwZjAiLz48L3N2Zz4=')]" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-100">{r.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {formatSize(r.originalSize)} → {formatSize(r.newSize)} · PNG with transparency
                </p>
              </div>
              <button
                onClick={() => downloadBlob(r.blob, r.name)}
                className="btn-primary px-3 py-1.5 text-xs flex-shrink-0"
              >
                Download
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
