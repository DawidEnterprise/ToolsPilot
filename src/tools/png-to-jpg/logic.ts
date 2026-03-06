/**
 * PNG → JPG conversion logic — runs entirely in the browser via Canvas API.
 */

export interface ConversionResult {
  blob: Blob;
  originalSize: number;
  convertedSize: number;
  width: number;
  height: number;
}

/**
 * Convert a PNG (or any image) File to a JPG Blob using the browser Canvas API.
 * @param file  - Source image file
 * @param quality - JPEG quality 0–1 (default 0.92)
 */
export function convertPngToJpg(file: File, quality: number = 0.92): Promise<ConversionResult> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        URL.revokeObjectURL(url);
        return reject(new Error("Canvas context unavailable"));
      }

      // Draw white background (JPG has no transparency)
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          URL.revokeObjectURL(url);
          if (!blob) return reject(new Error("Conversion failed"));
          resolve({
            blob,
            originalSize: file.size,
            convertedSize: blob.size,
            width: canvas.width,
            height: canvas.height,
          });
        },
        "image/jpeg",
        quality
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load image"));
    };

    img.src = url;
  });
}
