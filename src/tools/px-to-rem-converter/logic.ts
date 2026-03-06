export function pxToRem(px: number, base: number): number {
  return px / base;
}

export function remToPx(rem: number, base: number): number {
  return rem * base;
}

export function generateTable(base: number): { px: number; rem: string }[] {
  return [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 48, 56, 64, 72, 80, 96].map(
    (px) => ({ px, rem: (px / base).toFixed(4).replace(/0+$/, "").replace(/\.$/, "") })
  );
}
