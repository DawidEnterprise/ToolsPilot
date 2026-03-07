"use client";
import { useState, useCallback } from "react";
import { FileDropZone } from "@/components/FileDropZone";
import { downloadBlob } from "@/lib/utils";

export function WebpToPngTool() {
  const [results, setResults] = useState<{name:string;blob:Blob;url:string;size:number}[]>([]);
  const [processing, setProcessing] = useState(false);

  const handleFiles = useCallback(async (files: File[]) => {
    setProcessing(true);
    const converted: typeof results = [];
    for (const file of files) {
      const img = new Image();
      const url = URL.createObjectURL(file);
      await new Promise<void>(res => { img.onload = () => res(); img.src = url; });
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth; canvas.height = img.naturalHeight;
      canvas.getContext("2d")!.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);
      const blob = await new Promise<Blob>((res, rej) => canvas.toBlob(b => b ? res(b) : rej(), "image/png"));
      converted.push({ name: file.name.replace(/\.[^.]+$/, ".png"), blob, url: URL.createObjectURL(blob), size: blob.size });
    }
    setResults(prev => [...prev, ...converted]);
    setProcessing(false);
  }, []);

  return (
    <div className="space-y-4">
      <FileDropZone accept="image/webp,.webp" onFiles={handleFiles} multiple label="Drop WebP images" maxSizeMB={20} />
      {processing && <p className="text-sm text-gray-500">Converting...</p>}
      {results.length > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {results.length} files converted
          </p>
          <button
            onClick={() => results.forEach((r) => downloadBlob(r.blob, r.name))}
            className="btn-primary px-3 py-1.5 text-xs"
          >
            Save All
          </button>
        </div>
      )}
      {results.map((r, i) => (
        <div key={i} className="flex items-center gap-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-3">
          <img src={r.url} alt="" className="h-12 w-12 rounded object-cover" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate text-gray-900 dark:text-gray-100">{r.name}</p>
            <p className="text-xs text-gray-500">{(r.size/1024).toFixed(1)} KB</p>
          </div>
          <button onClick={() => downloadBlob(r.blob, r.name)} className="btn-primary text-xs px-3 py-1.5">Download</button>
        </div>
      ))}
    </div>
  );
}
