export function encodeUrl(input: string): string {
  return encodeURIComponent(input);
}

export function decodeUrl(input: string): string {
  try {
    return decodeURIComponent(input.trim());
  } catch {
    throw new Error("Invalid URL-encoded string");
  }
}
