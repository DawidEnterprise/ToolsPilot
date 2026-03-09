"use client";

import { useState, useCallback } from "react";

interface PdfFile {
  id: string;
  name: string;
  data: ArrayBuffer;
  pageCount: number;
}

export function PdfMergerTool() {
  const [files, setFiles] = useState<PdfFile[]>([]);
  const [merging, setMerging] = useState(false);
  const [error, setError] = useState("");

  const handleFiles = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files ?? []);
    setError("");

    const newFiles: PdfFile[] = [];
    for (const file of selected) {
      if (file.type !== "application/pdf") {
        setError(`"${file.name}" is not a PDF file.`);
        continue;
      }
      const data = await file.arrayBuffer();
      const { PDFDocument } = await import("pdf-lib");
      try {
        const pdf = await PDFDocument.load(data, { ignoreEncryption: true });
        newFiles.push({
          id: crypto.randomUUID(),
          name: file.name,
          data,
          pageCount: pdf.getPageCount(),
        });
      } catch {
        setError(`Could not read "${file.name}". It may be corrupted or encrypted.`);
      }
    }
    setFiles((prev) => [...prev, ...newFiles]);
    e.target.value = "";
  }, []);

  const removeFile = (id: string) => setFiles((prev) => prev.filter((f) => f.id !== id));

  const moveFile = (idx: number, dir: -1 | 1) => {
    setFiles((prev) => {
      const next = [...prev];
      const target = idx + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[idx], next[target]] = [next[target], next[idx]];
      return next;
    });
  };

  const merge = async () => {
    if (files.length < 2) return;
    setMerging(true);
    setError("");
    try {
      const { PDFDocument } = await import("pdf-lib");
      const merged = await PDFDocument.create();
      for (const file of files) {
        const src = await PDFDocument.load(file.data, { ignoreEncryption: true });
        const pages = await merged.copyPages(src, src.getPageIndices());
        pages.forEach((p) => merged.addPage(p));
      }
      const bytes = await merged.save();
      const blob = new Blob([bytes.slice().buffer], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "merged.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      setError("Failed to merge PDFs. One or more files may be corrupted.");
    } finally {
      setMerging(false);
    }
  };

  const totalPages = files.reduce((s, f) => s + f.pageCount, 0);

  return (
    <div className="space-y-5">
      {/* Upload area */}
      <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-8 transition hover:border-brand-400 hover:bg-brand-50/30 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-brand-500 dark:hover:bg-gray-800/50">
        <svg className="mb-2 h-10 w-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" /></svg>
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Click or drag PDF files here</span>
        <span className="mt-1 text-xs text-gray-400">Select multiple files at once</span>
        <input type="file" accept=".pdf,application/pdf" multiple onChange={handleFiles} className="hidden" />
      </label>

      {error && <p className="text-sm text-red-500">{error}</p>}

      {/* File list */}
      {files.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
            {files.length} files — {totalPages} total pages
          </p>
          {files.map((file, idx) => (
            <div key={file.id} className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 dark:border-gray-700 dark:bg-gray-900">
              <span className="flex h-8 w-8 items-center justify-center rounded bg-red-100 text-xs font-bold text-red-600 dark:bg-red-900/40 dark:text-red-400">PDF</span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-800 dark:text-gray-200">{file.name}</p>
                <p className="text-xs text-gray-400">{file.pageCount} page{file.pageCount !== 1 ? "s" : ""}</p>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => moveFile(idx, -1)} disabled={idx === 0} className="rounded p-1 text-gray-400 hover:bg-gray-100 disabled:opacity-30 dark:hover:bg-gray-800" title="Move up">↑</button>
                <button onClick={() => moveFile(idx, 1)} disabled={idx === files.length - 1} className="rounded p-1 text-gray-400 hover:bg-gray-100 disabled:opacity-30 dark:hover:bg-gray-800" title="Move down">↓</button>
                <button onClick={() => removeFile(file.id)} className="rounded p-1 text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30" title="Remove">✕</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Merge button */}
      <button
        onClick={merge}
        disabled={files.length < 2 || merging}
        className="w-full rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {merging ? "Merging…" : `Merge ${files.length} PDFs into One`}
      </button>
    </div>
  );
}
