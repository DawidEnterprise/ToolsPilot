export function repeatText(
  text: string,
  count: number,
  separator: string
): string {
  if (!text || count <= 0) return "";
  const clamped = Math.min(count, 10000);
  return Array(clamped).fill(text).join(separator);
}
