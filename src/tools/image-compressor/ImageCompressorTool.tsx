"use client";

import { useState, useCallback } from "react";
import { compressImage, formatBytes, type CompressResult } from "./logic";

type OutputFormat = "image/jpeg" | "image/webp" | "image/png";

export function ImageCompressorTool() {
  const [quality, setQuality] = useState(75);
  const [maxWidth, setMaxWidth] = useState(0);
  const [format, setFormat] = useState<OutputFormat>("image/jpeg");
  const [result, setResult] = useState<CompressResult | null>(null);
  const [processing, setProcessing] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleFile = useCallback(
    async (file: File) => {
      if (!file.type.startsWith("image/")) return;
      setProcessing(true);
      setFileName(file.name);
      try {
        const compressed = await compressImage(file, quality, maxWidth, format);
        setResult(compressed);
      } catch {
        setResult(null);
      }
      setProcessing(false);
    },
    [quality, maxWidth, format]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const download = () => {
    if (!result) return;
    const ext = format === "image/jpeg" ? "jpg" : format === "image/webp" ? "webp" : "png";
    const a = document.createElement("a");
    a.href = result.dataUrl;
    a.download = `compressed.${ext}`;
    a.click();
  };

  return (
    <div className="space-y-5">
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="flex min-h-[120px] cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 transition-colors hover:border-brand-400 dark:border-gray-600 dark:bg-gray-800"
        onClick={() => document.getElementById("compress-file-input")?.click()}
      >
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {fileName || "Drop image here or click to select"}
          </p>
          <p className="text-xs text-gray-400 mt-1">JPG, PNG, WebP supported</p>
        </div>
        <input
          id="compress-file-input"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
            Quality: {quality}%
          </label>
          <input
            type="range"
            min="10"
            max="100"
            value={quality}
            onChange={(e) => setQuality(parseInt(e.target.value))}
            className="w-full"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
            Max Width (0 = original)
          </label>
          <input
            type="number"
            className="input-field"
            value={maxWidth || ""}
            onChange={(e) => setMaxWidth(parseInt(e.target.value) || 0)}
            placeholder="0"
            min="0"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
            Output Format
          </label>
          <select
            className="input-field"
            value={format}
            onChange={(e) => setFormat(e.target.value as OutputFormat)}
          >
            <option value="image/jpeg">JPEG</option>
            <option value="image/webp">WebP</option>
            <option value="image/png">PNG</option>
          </select>
        </div>
      </div>

      {processing && (
        <p className="text-center text-sm text-gray-500">Compressing...</p>
      )}

      {result && !processing && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-center dark:border-gray-700 dark:bg-gray-800">
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">Original</span>
              <p className="mt-1 text-lg font-bold text-gray-900 dark:text-gray-100">{formatBytes(result.originalSize)}</p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-center dark:border-gray-700 dark:bg-gray-800">
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">Compressed</span>
              <p className="mt-1 text-lg font-bold text-brand-600 dark:text-brand-400">{formatBytes(result.compressedSize)}</p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-center dark:border-gray-700 dark:bg-gray-800">
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">Savings</span>
              <p className={`mt-1 text-lg font-bold ${result.savings > 0 ? "text-green-600" : "text-red-600"}`}>
                {result.savings > 0 ? "-" : "+"}{Math.abs(result.savings).toFixed(1)}%
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <button onClick={download} className="btn-primary">
              Download Compressed Image
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
