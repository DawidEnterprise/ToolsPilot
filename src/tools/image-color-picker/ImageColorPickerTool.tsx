"use client";
import { useState, useRef, useCallback } from "react";
import { FileDropZone } from "@/components/FileDropZone";

export function ImageColorPickerTool() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageUrl, setImageUrl] = useState<string|null>(null);
  const [color, setColor] = useState<{hex:string;r:number;g:number;b:number}|null>(null);

  const handleFile = useCallback((file: File) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current!;
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      canvas.getContext("2d")!.drawImage(img, 0, 0);
      setImageUrl(url);
    };
    img.src = url;
  }, []);

  const pickColor = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) * (canvas.width / rect.width));
    const y = Math.floor((e.clientY - rect.top) * (canvas.height / rect.height));
    const [r,g,b] = canvas.getContext("2d")!.getImageData(x, y, 1, 1).data;
    const hex = "#" + [r,g,b].map(v => v.toString(16).padStart(2,"0")).join("");
    setColor({hex,r,g,b});
  };

  return (
    <div className="space-y-4">
      {!imageUrl && <FileDropZone accept="image/*" onFile={handleFile} label="Drop an image to pick colors" maxSizeMB={20} />}
      <canvas ref={canvasRef} onClick={pickColor} className={"max-w-full rounded border border-gray-200 dark:border-gray-700 " + (imageUrl ? "cursor-crosshair" : "hidden")} />
      {color && (
        <div className="flex items-center gap-4 rounded-lg bg-gray-50 dark:bg-gray-800 p-4">
          <div className="h-12 w-12 rounded border border-gray-300 dark:border-gray-600" style={{backgroundColor:color.hex}} />
          <div className="text-sm font-mono space-y-0.5">
            <p className="text-gray-700 dark:text-gray-300">{color.hex.toUpperCase()}</p>
            <p className="text-gray-500">rgb({color.r}, {color.g}, {color.b})</p>
          </div>
          <button onClick={() => navigator.clipboard.writeText(color.hex)} className="btn-primary text-xs ml-auto">Copy HEX</button>
        </div>
      )}
      {imageUrl && <button onClick={() => { setImageUrl(null); setColor(null); }} className="btn-secondary text-sm">New Image</button>}
    </div>
  );
}
