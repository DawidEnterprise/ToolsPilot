"use client";

import { useState, useCallback } from "react";
import { convertPngToJpg, type ConversionResult } from "./logic";
import { FileDropZone } from "@/components/FileDropZone";
import { downloadBlob } from "@/lib/utils";

type QualityPreset = "best" | "balanced" | "smallest";

const PRESETS: { id: QualityPreset; label: string; description: string; quality: number }[] = [
  { id: "best", label: "Best Quality", description: "Highest quality, larger file", quality: 0.95 },
  { id: "balanced", label: "Balanced", description: "Great quality, good compression", quality: 0.85 },
  { id: "smallest", label: "Smallest File", description: "Smaller file, some quality loss", quality: 0.65 },
];

export function PngToJpgTool() {
  const [preset, setPreset] = useState<QualityPreset>("balanced");
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [originalPreview, setOriginalPreview] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState("converted.jpg");

  const activePreset = PRESETS.find((p) => p.id === preset)!;

  const handleFile = useCallback(
    async (file: File) => {
      setError(null);
      setResult(null);
      if (preview) URL.revokeObjectURL(preview);
      setPreview(null);
      if (originalPreview) URL.revokeObjectURL(originalPreview);
      setOriginalPreview(URL.createObjectURL(file));
      setProcessing(true);
      setFileName(file.name.replace(/\.[^.]+$/, ".jpg"));

      try {
        const quality = PRESETS.find((p) => p.id === preset)!.quality;
        const r = await convertPngToJpg(file, quality);
        setResult(r);
        setPreview(URL.createObjectURL(r.blob));
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : "Conversion failed");
      } finally {
        setProcessing(false);
      }
    },
    [preset, preview, originalPreview]
  );

  const handleDownload = () => {
    if (result) downloadBlob(result.blob, fileName);
  };

  const handleReset = () => {
    setResult(null);
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    if (originalPreview) URL.revokeObjectURL(originalPreview);
    setOriginalPreview(null);
    setError(null);
    setFileName("converted.jpg");
  };

  const formatSize = (bytes: number) =>
    bytes < 1024 * 1024
      ? `${(bytes / 1024).toFixed(1)} KB`
      : `${(bytes / (1024 * 1024)).toFixed(2)} MB`;

  const savingsPercent = result
    ? ((1 - result.convertedSize / result.originalSize) * 100).toFixed(0)
    : null;

  return (
    <div className="space-y-6">
      {/* Step 1: Pick quality */}
      {!result && (
        <>
          <div>
            <p className="text-sm font-medium text-gray-700 mb-3 dark:text-gray-300">
              Choose output quality:
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              {PRESETS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPreset(p.id)}
                  className={`rounded-lg border-2 px-4 py-3 text-left transition-all ${
                    preset === p.id
                      ? "border-brand-500 bg-brand-50 ring-1 ring-brand-500/30 dark:bg-brand-950 dark:border-brand-400"
                      : "border-gray-200 bg-white hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600"
                  }`}
                >
                  <span className={`text-sm font-semibold ${preset === p.id ? "text-brand-700 dark:text-brand-300" : "text-gray-900 dark:text-gray-100"}`}>
                    {p.label}
                  </span>
                  <span className="block text-xs text-gray-500 mt-0.5 dark:text-gray-400">{p.description}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Upload */}
          <FileDropZone
            accept="image/png,image/webp,image/bmp"
            onFile={handleFile}
            label="Drop your image here, or click to browse"
            maxSizeMB={20}
          />
        </>
      )}

      {processing && (
        <div className="flex items-center justify-center gap-3 py-8">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-brand-600 border-t-transparent" />
          <span className="text-sm text-gray-600 dark:text-gray-400">Converting your image…</span>
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400">
          Something went wrong: {error}
        </div>
      )}

      {/* Result */}
      {result && preview && (
        <div className="space-y-6">
          {/* Success banner */}
          <div className="flex items-center gap-3 rounded-lg bg-green-50 border border-green-200 px-4 py-3 dark:bg-green-950 dark:border-green-800">
            <span className="text-green-600 text-lg dark:text-green-400">✓</span>
            <div className="flex-1">
              <p className="text-sm font-medium text-green-800 dark:text-green-300">Conversion complete!</p>
              <p className="text-xs text-green-600 dark:text-green-400">
                {formatSize(result.originalSize)} → {formatSize(result.convertedSize)}
                {savingsPercent && Number(savingsPercent) > 0 && ` (${savingsPercent}% smaller)`}
                {savingsPercent && Number(savingsPercent) <= 0 && ` (file size increased — JPG isn't always smaller for this type of image)`}
              </p>
            </div>
          </div>

          {/* Preview */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="mb-2 text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Original</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {originalPreview && <img src={originalPreview} alt="Original" className="max-h-56 rounded-lg border border-gray-200 object-contain dark:border-gray-700" />}
            </div>
            <div>
              <p className="mb-2 text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Converted JPG</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={preview} alt="Converted JPG" className="max-h-56 rounded-lg border border-gray-200 object-contain dark:border-gray-700" />
            </div>
          </div>

          <p className="text-xs text-gray-500 text-center dark:text-gray-400">
            {result.width} × {result.height} px · {activePreset.label} preset
          </p>

          {/* Actions */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <button onClick={handleDownload} className="btn-primary flex-1 py-3 text-base">
              ⬇ Download JPG
            </button>
            <button onClick={handleReset} className="btn-secondary flex-1 py-3 text-base">
              Convert Another Image
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
