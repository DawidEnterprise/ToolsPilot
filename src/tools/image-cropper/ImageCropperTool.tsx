"use client";
import { useState, useRef, useCallback } from "react";
import { FileDropZone } from "@/components/FileDropZone";
import { downloadBlob } from "@/lib/utils";

export function ImageCropperTool() {
  const imgRef = useRef<HTMLImageElement>(null);
  const [imageUrl, setImageUrl] = useState<string|null>(null);
  const [crop, setCrop] = useState({x:0,y:0,w:200,h:200});
  const [imgSize, setImgSize] = useState({w:0,h:0});

  const handleFile = useCallback((file: File) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => { setImgSize({w:img.naturalWidth,h:img.naturalHeight}); setCrop({x:0,y:0,w:Math.min(200,img.naturalWidth),h:Math.min(200,img.naturalHeight)}); };
    img.src = url;
    setImageUrl(url);
  }, []);

  const doCrop = () => {
    if (!imageUrl) return;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = crop.w; canvas.height = crop.h;
      canvas.getContext("2d")!.drawImage(img, crop.x, crop.y, crop.w, crop.h, 0, 0, crop.w, crop.h);
      canvas.toBlob(blob => { if (blob) downloadBlob(blob, "cropped.png"); }, "image/png");
    };
    img.src = imageUrl;
  };

  return (
    <div className="space-y-4">
      {!imageUrl && <FileDropZone accept="image/*" onFile={handleFile} label="Drop an image to crop" maxSizeMB={20} />}
      {imageUrl && (
        <>
          <img ref={imgRef} src={imageUrl} alt="Preview" className="max-w-full max-h-64 rounded border border-gray-200 dark:border-gray-700" />
          <div className="grid gap-3 sm:grid-cols-4">
            <div><label className="text-xs text-gray-500">X</label><input type="number" className="input-field text-sm" value={crop.x} onChange={e => setCrop({...crop,x:+e.target.value})} min={0} max={imgSize.w} /></div>
            <div><label className="text-xs text-gray-500">Y</label><input type="number" className="input-field text-sm" value={crop.y} onChange={e => setCrop({...crop,y:+e.target.value})} min={0} max={imgSize.h} /></div>
            <div><label className="text-xs text-gray-500">Width</label><input type="number" className="input-field text-sm" value={crop.w} onChange={e => setCrop({...crop,w:+e.target.value})} min={1} /></div>
            <div><label className="text-xs text-gray-500">Height</label><input type="number" className="input-field text-sm" value={crop.h} onChange={e => setCrop({...crop,h:+e.target.value})} min={1} /></div>
          </div>
          <div className="flex gap-2">
            <button onClick={doCrop} className="btn-primary text-sm">Crop & Download</button>
            <button onClick={() => setImageUrl(null)} className="btn-secondary text-sm">New Image</button>
          </div>
        </>
      )}
    </div>
  );
}
