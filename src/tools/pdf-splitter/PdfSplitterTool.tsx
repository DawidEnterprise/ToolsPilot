"use client";

import { useState, useCallback } from "react";

export function PdfSplitterTool() {
  const [fileName, setFileName] = useState("");
  const [pdfData, setPdfData] = useState<ArrayBuffer | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [selectedPages, setSelectedPages] = useState<Set<number>>(new Set());
  const [splitting, setSplitting] = useState(false);
  const [error, setError] = useState("");

  const handleFile = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    try {
      const data = await file.arrayBuffer();
      const { PDFDocument } = await import("pdf-lib");
      const pdf = await PDFDocument.load(data, { ignoreEncryption: true });
      const count = pdf.getPageCount();
      setPdfData(data);
      setPageCount(count);
      setFileName(file.name);
      setSelectedPages(new Set(Array.from({ length: count }, (_, i) => i)));
    } catch {
      setError("Could not read this PDF. It may be corrupted or encrypted.");
    }
    e.target.value = "";
  }, []);

  const togglePage = (idx: number) => {
    setSelectedPages((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) {
        next.delete(idx);
      } else {
        next.add(idx);
      }
      return next;
    });
  };

  const selectAll = () => setSelectedPages(new Set(Array.from({ length: pageCount }, (_, i) => i)));
  const selectNone = () => setSelectedPages(new Set());

  const split = async () => {
    if (!pdfData || selectedPages.size === 0) return;
    setSplitting(true);
    setError("");
    try {
      const { PDFDocument } = await import("pdf-lib");
      const src = await PDFDocument.load(pdfData, { ignoreEncryption: true });
      const out = await PDFDocument.create();
      const indices = Array.from(selectedPages).sort((a, b) => a - b);
      const pages = await out.copyPages(src, indices);
      pages.forEach((p) => out.addPage(p));
      const bytes = await out.save();
      const blob = new Blob([bytes.slice().buffer], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const baseName = fileName.replace(/\.pdf$/i, "");
      a.download = `${baseName}-split.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      setError("Failed to split the PDF.");
    } finally {
      setSplitting(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* Upload */}
      <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-8 transition hover:border-brand-400 hover:bg-brand-50/30 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-brand-500 dark:hover:bg-gray-800/50">
        <svg className="mb-2 h-10 w-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-3-3v6m9 3V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2z" /></svg>
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{fileName || "Click to upload a PDF file"}</span>
        <input type="file" accept=".pdf,application/pdf" onChange={handleFile} className="hidden" />
      </label>

      {error && <p className="text-sm text-red-500">{error}</p>}

      {/* Page selector */}
      {pageCount > 0 && (
        <>
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <span className="font-semibold text-gray-800 dark:text-gray-200">{pageCount}</span> pages — <span className="font-semibold text-brand-600">{selectedPages.size}</span> selected
            </p>
            <div className="flex gap-2">
              <button onClick={selectAll} className="rounded bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700">Select All</button>
              <button onClick={selectNone} className="rounded bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700">Deselect All</button>
            </div>
          </div>

          <div className="grid grid-cols-6 gap-2 sm:grid-cols-8 md:grid-cols-10">
            {Array.from({ length: pageCount }, (_, i) => (
              <button
                key={i}
                onClick={() => togglePage(i)}
                className={`flex h-12 items-center justify-center rounded-lg border text-sm font-medium transition ${
                  selectedPages.has(i)
                    ? "border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300"
                    : "border-gray-200 bg-white text-gray-400 hover:border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-gray-600"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={split}
            disabled={selectedPages.size === 0 || splitting}
            className="w-full rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {splitting ? "Splitting…" : `Extract ${selectedPages.size} Page${selectedPages.size !== 1 ? "s" : ""}`}
          </button>
        </>
      )}
    </div>
  );
}
