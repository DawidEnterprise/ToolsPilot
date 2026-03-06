export interface AspectRatioResult {
  ratio: string;
  simplifiedW: number;
  simplifiedH: number;
}

function gcd(a: number, b: number): number {
  a = Math.abs(Math.round(a));
  b = Math.abs(Math.round(b));
  while (b) { [a, b] = [b, a % b]; }
  return a;
}

export function calculateAspectRatio(w: number, h: number): AspectRatioResult {
  if (w <= 0 || h <= 0) return { ratio: "", simplifiedW: 0, simplifiedH: 0 };
  const d = gcd(w, h);
  const sw = w / d;
  const sh = h / d;
  return { ratio: `${sw}:${sh}`, simplifiedW: sw, simplifiedH: sh };
}

export function scaleToWidth(w: number, h: number, newW: number): number {
  if (w <= 0 || h <= 0 || newW <= 0) return 0;
  return Math.round((newW / w) * h);
}

export function scaleToHeight(w: number, h: number, newH: number): number {
  if (w <= 0 || h <= 0 || newH <= 0) return 0;
  return Math.round((newH / h) * w);
}
