export interface CompressResult {
  blob: Blob;
  originalSize: number;
  compressedSize: number;
  savings: number;
  dataUrl: string;
}

export async function compressImage(
  file: File,
  quality: number,
  maxWidth: number,
  outputFormat: "image/jpeg" | "image/webp" | "image/png"
): Promise<CompressResult> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);

      let width = img.naturalWidth;
      let height = img.naturalHeight;

      if (maxWidth > 0 && width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (!blob) return reject(new Error("Compression failed"));
          const reader = new FileReader();
          reader.onload = () => {
            resolve({
              blob,
              originalSize: file.size,
              compressedSize: blob.size,
              savings: ((file.size - blob.size) / file.size) * 100,
              dataUrl: reader.result as string,
            });
          };
          reader.readAsDataURL(blob);
        },
        outputFormat,
        quality / 100
      );
    };

    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = url;
  });
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(2) + " MB";
}
