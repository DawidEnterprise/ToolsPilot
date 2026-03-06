export interface HSL {
  h: number;
  s: number;
  l: number;
}

export function hexToHsl(hex: string): HSL {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / d + 2) / 6;
    else h = ((r - g) / d + 4) / 6;
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

export function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

export type Harmony = "complementary" | "analogous" | "triadic" | "split-complementary" | "tetradic" | "monochromatic";

export function generatePalette(hex: string, harmony: Harmony): string[] {
  const hsl = hexToHsl(hex);
  switch (harmony) {
    case "complementary":
      return [hex, hslToHex((hsl.h + 180) % 360, hsl.s, hsl.l)];
    case "analogous":
      return [hslToHex((hsl.h + 330) % 360, hsl.s, hsl.l), hex, hslToHex((hsl.h + 30) % 360, hsl.s, hsl.l)];
    case "triadic":
      return [hex, hslToHex((hsl.h + 120) % 360, hsl.s, hsl.l), hslToHex((hsl.h + 240) % 360, hsl.s, hsl.l)];
    case "split-complementary":
      return [hex, hslToHex((hsl.h + 150) % 360, hsl.s, hsl.l), hslToHex((hsl.h + 210) % 360, hsl.s, hsl.l)];
    case "tetradic":
      return [hex, hslToHex((hsl.h + 90) % 360, hsl.s, hsl.l), hslToHex((hsl.h + 180) % 360, hsl.s, hsl.l), hslToHex((hsl.h + 270) % 360, hsl.s, hsl.l)];
    case "monochromatic":
      return [
        hslToHex(hsl.h, hsl.s, Math.max(hsl.l - 30, 5)),
        hslToHex(hsl.h, hsl.s, Math.max(hsl.l - 15, 10)),
        hex,
        hslToHex(hsl.h, hsl.s, Math.min(hsl.l + 15, 90)),
        hslToHex(hsl.h, hsl.s, Math.min(hsl.l + 30, 95)),
      ];
  }
}
