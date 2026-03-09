"use client";

import { useState, useCallback } from "react";

export function PdfCompressorTool() {
  const [fileName, setFileName] = useState("");
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const [compressing, setCompressing] = useState(false);
  const [done, setDone] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [error, setError] = useState("");

  const handleFile = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    setDone(false);
    setFileName(file.name);
    setOriginalSize(file.size);
    setCompressing(true);

    try {
      const data = await file.arrayBuffer();
      const { PDFDocument } = await import("pdf-lib");
      const src = await PDFDocument.load(data, { ignoreEncryption: true });

      // Re-create a new PDF copying all pages — strips unused objects, metadata bloat, etc.
      const out = await PDFDocument.create();
      const pages = await out.copyPages(src, src.getPageIndices());
      pages.forEach((p) => out.addPage(p));

      // Save with object-stream compression
      const bytes = await out.save({
        useObjectStreams: true,
        addDefaultPage: false,
      });

      const blob = new Blob([bytes.slice().buffer], { type: "application/pdf" });
      if (downloadUrl) URL.revokeObjectURL(downloadUrl);
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      setCompressedSize(bytes.length);
      setDone(true);
    } catch {
      setError("Could not compress this PDF. It may be corrupted or encrypted.");
    } finally {
      setCompressing(false);
    }
    e.target.value = "";
  }, [downloadUrl]);

  const download = () => {
    if (!downloadUrl) return;
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = fileName.replace(/\.pdf$/i, "") + "-compressed.pdf";
    a.click();
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const savings = originalSize > 0 ? ((1 - compressedSize / originalSize) * 100).toFixed(1) : "0";

  return (
    <div className="space-y-5">
      {/* Upload */}
      <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-8 transition hover:border-brand-400 hover:bg-brand-50/30 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-brand-500 dark:hover:bg-gray-800/50">
        <svg className="mb-2 h-10 w-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{compressing ? "Compressing…" : "Click to upload a PDF file"}</span>
        <span className="mt-1 text-xs text-gray-400">Your file never leaves your browser</span>
        <input type="file" accept=".pdf,application/pdf" onChange={handleFile} className="hidden" disabled={compressing} />
      </label>

      {error && <p className="text-sm text-red-500">{error}</p>}

      {/* Results */}
      {done && (
        <div className="space-y-4">
          <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
            <p className="truncate text-sm font-medium text-gray-800 dark:text-gray-200">{fileName}</p>
            <div className="mt-3 grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-xs text-gray-400">Original</p>
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">{formatSize(originalSize)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Compressed</p>
                <p className="text-sm font-semibold text-brand-600">{formatSize(compressedSize)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Saved</p>
                <p className={`text-sm font-semibold ${Number(savings) > 0 ? "text-emerald-600" : "text-amber-500"}`}>
                  {Number(savings) > 0 ? `${savings}%` : "No reduction"}
                </p>
              </div>
            </div>
            {/* Size comparison bar */}
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
              <div
                className="h-full rounded-full bg-brand-500 transition-all"
                style={{ width: `${Math.max(5, (compressedSize / originalSize) * 100)}%` }}
              />
            </div>
          </div>

          <button
            onClick={download}
            className="w-full rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
          >
            Download Compressed PDF
          </button>
        </div>
      )}
    </div>
  );
}
