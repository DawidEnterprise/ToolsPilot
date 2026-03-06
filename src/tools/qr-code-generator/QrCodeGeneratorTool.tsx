"use client";

import { useState, useMemo, useCallback } from "react";
import { generateQrSvg } from "./logic";

export function QrCodeGeneratorTool() {
  const [text, setText] = useState("");
  const [size, setSize] = useState(256);

  const svg = useMemo(() => {
    if (!text) return "";
    try {
      return generateQrSvg(text, size);
    } catch {
      return "";
    }
  }, [text, size]);

  const download = useCallback((format: "svg" | "png") => {
    if (!svg) return;
    if (format === "svg") {
      const blob = new Blob([svg], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "qrcode.svg";
      a.click();
      URL.revokeObjectURL(url);
    } else {
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d")!;
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
        const url = canvas.toDataURL("image/png");
        const a = document.createElement("a");
        a.href = url;
        a.download = "qrcode.png";
        a.click();
      };
      img.src = "data:image/svg+xml;base64," + btoa(svg);
    }
  }, [svg, size]);

  return (
    <div className="space-y-5">
      <div>
        <label className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
          Text, URL, or data
        </label>
        <textarea
          className="input-field min-h-[80px]"
          placeholder="https://example.com or any text..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={300}
          autoFocus
        />
        <p className="mt-1 text-xs text-gray-400">{text.length}/300 characters</p>
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
          Size: {size}px
        </label>
        <input
          type="range"
          min="128"
          max="512"
          step="64"
          value={size}
          onChange={(e) => setSize(parseInt(e.target.value))}
          className="w-full"
        />
      </div>

      {svg && (
        <div className="space-y-4">
          <div className="flex justify-center rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
            <div dangerouslySetInnerHTML={{ __html: svg }} />
          </div>
          <div className="flex justify-center gap-3">
            <button onClick={() => download("png")} className="btn-primary">
              Download PNG
            </button>
            <button onClick={() => download("svg")} className="btn-secondary">
              Download SVG
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
