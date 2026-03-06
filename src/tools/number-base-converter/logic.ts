export type NumberBase = "binary" | "octal" | "decimal" | "hex";

const BASE_MAP: Record<NumberBase, number> = { binary: 2, octal: 8, decimal: 10, hex: 16 };

export function convertBase(input: string, from: NumberBase, to: NumberBase): string {
  if (!input.trim()) return "";
  const clean = input.trim().replace(/^0[xXbBoO]/, "");
  const decimal = parseInt(clean, BASE_MAP[from]);
  if (isNaN(decimal)) throw new Error("Invalid number for selected base");
  return decimal.toString(BASE_MAP[to]).toUpperCase();
}
