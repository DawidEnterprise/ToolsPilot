"use client";

import { useState, useCallback } from "react";
import { FileDropZone } from "@/components/FileDropZone";
import { downloadBlob } from "@/lib/utils";

type QualityPreset = "best" | "balanced" | "smallest";

const PRESETS: { id: QualityPreset; label: string; quality: number }[] = [
  { id: "best", label: "Best", quality: 0.95 },
  { id: "balanced", label: "Balanced", quality: 0.85 },
  { id: "smallest", label: "Smallest", quality: 0.65 },
];

interface FileResult {
  name: string;
  blob: Blob;
  preview: string;
  originalSize: number;
  convertedSize: number;
}

export function WebpToJpgTool() {
  const [preset, setPreset] = useState<QualityPreset>("balanced");
  const [results, setResults] = useState<FileResult[]>([]);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = useCallback(
    async (files: File[]) => {
      setError(null);
      setProcessing(true);
      const quality = PRESETS.find((p) => p.id === preset)!.quality;
      const converted: FileResult[] = [];

      for (const file of files) {
        try {
          const img = new Image();
          const url = URL.createObjectURL(file);
          await new Promise<void>((res, rej) => {
            img.onload = () => res();
            img.onerror = () => rej(new Error("Failed to load image"));
            img.src = url;
          });

          const canvas = document.createElement("canvas");
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          const ctx = canvas.getContext("2d")!;
          // White background for JPG (no transparency)
          ctx.fillStyle = "#FFFFFF";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);
          URL.revokeObjectURL(url);

          const blob = await new Promise<Blob>((res, rej) =>
            canvas.toBlob((b) => (b ? res(b) : rej(new Error("Conversion failed"))), "image/jpeg", quality)
          );

          converted.push({
            name: file.name.replace(/\.[^.]+$/, ".jpg"),
            blob,
            preview: URL.createObjectURL(blob),
            originalSize: file.size,
            convertedSize: blob.size,
          });
        } catch {
          setError(`Failed to convert ${file.name}`);
        }
      }

      setResults((prev) => [...prev, ...converted]);
      setProcessing(false);
    },
    [preset]
  );

  const handleReset = () => {
    results.forEach((r) => URL.revokeObjectURL(r.preview));
    setResults([]);
    setError(null);
  };

  const formatSize = (bytes: number) =>
    bytes < 1024 * 1024
      ? `${(bytes / 1024).toFixed(1)} KB`
      : `${(bytes / (1024 * 1024)).toFixed(2)} MB`;

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600 dark:text-gray-400">Quality:</span>
        {PRESETS.map((p) => (
          <button
            key={p.id}
            onClick={() => setPreset(p.id)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
              preset === p.id
                ? "bg-brand-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <FileDropZone
        accept="image/webp,.webp"
        onFiles={handleFiles}
        multiple
        label="Drop WebP images here, or click to browse"
        maxSizeMB={20}
      />

      {processing && (
        <div className="flex items-center justify-center gap-3 py-4">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-brand-600 border-t-transparent" />
          <span className="text-sm text-gray-600 dark:text-gray-400">Converting…</span>
        </div>
      )}

      {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}

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

          {results.map((r, i) => {
            const savings = ((1 - r.convertedSize / r.originalSize) * 100).toFixed(0);
            return (
              <div key={i} className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-800">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={r.preview} alt="" className="h-12 w-12 rounded object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-100">{r.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {formatSize(r.originalSize)} → {formatSize(r.convertedSize)}
                    {Number(savings) > 0 && ` · ${savings}% smaller`}
                  </p>
                </div>
                <button
                  onClick={() => downloadBlob(r.blob, r.name)}
                  className="btn-primary px-3 py-1.5 text-xs flex-shrink-0"
                >
                  Download
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
