"use client";

import { useCallback, useState, useRef } from "react";

interface FileDropZoneProps {
  accept: string;
  maxSizeMB?: number;
  onFile: (file: File) => void;
  label?: string;
}

export function FileDropZone({
  accept,
  maxSizeMB = 10,
  onFile,
  label = "Drop your file here, or click to browse",
}: FileDropZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = useCallback(
    (file: File) => {
      setError(null);
      if (file.size > maxSizeMB * 1024 * 1024) {
        setError(`File is too large (${(file.size / 1024 / 1024).toFixed(1)} MB). Maximum size is ${maxSizeMB} MB.`);
        return;
      }
      onFile(file);
    },
    [maxSizeMB, onFile]
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={onDrop}
      onClick={() => inputRef.current?.click()}
      className={`cursor-pointer rounded-xl border-2 border-dashed p-10 text-center transition-colors ${
        dragging
          ? "border-brand-400 bg-brand-50 dark:bg-brand-950"
          : "border-gray-300 bg-gray-50 hover:border-brand-300 hover:bg-brand-50/50 dark:border-gray-600 dark:bg-gray-800 dark:hover:border-brand-500 dark:hover:bg-brand-950/50"
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />
      <div className="text-4xl mb-3">
        {dragging ? "📥" : "🖼️"}
      </div>
      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</p>
      <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
        Supported formats: {accept.split(",").map(f => f.split("/")[1]?.toUpperCase()).filter(Boolean).join(", ")}
      </p>
      {error && (
        <div className="mt-3 rounded-md bg-red-50 border border-red-200 px-3 py-2 text-xs text-red-600 dark:bg-red-950 dark:border-red-800 dark:text-red-400">
          {error}
        </div>
      )}
    </div>
  );
}
