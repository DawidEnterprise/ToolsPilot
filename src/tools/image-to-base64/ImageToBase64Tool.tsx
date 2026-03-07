"use client";
import { useState, useCallback } from "react";
import { FileDropZone } from "@/components/FileDropZone";

export function ImageToBase64Tool() {
  const [result, setResult] = useState("");

  const handleFile = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = () => setResult(reader.result as string);
    reader.readAsDataURL(file);
  }, []);

  return (
    <div className="space-y-4">
      <FileDropZone accept="image/*" onFile={handleFile} label="Drop an image to convert" maxSizeMB={10} />
      {result && (
        <>
          <textarea className="input-field font-mono text-xs min-h-[10rem] max-h-[20rem] bg-gray-50 dark:bg-gray-800" readOnly value={result} />
          <div className="flex gap-2">
            <button onClick={() => navigator.clipboard.writeText(result)} className="btn-primary text-sm">Copy Data URI</button>
            <button onClick={() => setResult("")} className="btn-secondary text-sm">Clear</button>
          </div>
        </>
      )}
    </div>
  );
}
