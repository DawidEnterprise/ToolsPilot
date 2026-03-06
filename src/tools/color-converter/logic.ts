export interface ColorValues {
  hex: string;
  rgb: { r: number; g: number; b: number };
  hsl: { h: number; s: number; l: number };
}

export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const clean = hex.replace("#", "");
  if (!/^[0-9a-fA-F]{6}$/.test(clean)) return null;
  return {
    r: parseInt(clean.slice(0, 2), 16),
    g: parseInt(clean.slice(2, 4), 16),
    b: parseInt(clean.slice(4, 6), 16),
  };
}

export function rgbToHex(r: number, g: number, b: number): string {
  return (
    "#" +
    [r, g, b].map((c) => Math.max(0, Math.min(255, Math.round(c))).toString(16).padStart(2, "0")).join("")
  );
}

export function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0,
    s = 0;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / d + 2) / 6;
    else h = ((r - g) / d + 4) / 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

export function parseColor(input: string): ColorValues | null {
  const trimmed = input.trim();

  // Hex
  const hexClean = trimmed.replace("#", "");
  if (/^[0-9a-fA-F]{6}$/.test(hexClean) || /^[0-9a-fA-F]{3}$/.test(hexClean)) {
    const expanded = hexClean.length === 3
      ? hexClean.split("").map((c) => c + c).join("")
      : hexClean;
    const rgb = hexToRgb(expanded)!;
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    return { hex: "#" + expanded.toLowerCase(), rgb, hsl };
  }

  // rgb(r, g, b)
  const rgbMatch = trimmed.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);
  if (rgbMatch) {
    const r = parseInt(rgbMatch[1]), g = parseInt(rgbMatch[2]), b = parseInt(rgbMatch[3]);
    return { hex: rgbToHex(r, g, b), rgb: { r, g, b }, hsl: rgbToHsl(r, g, b) };
  }

  return null;
}
