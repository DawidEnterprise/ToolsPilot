export function encodeBase64(input: string): string {
  try {
    return btoa(unescape(encodeURIComponent(input)));
  } catch {
    throw new Error("Failed to encode — input may contain invalid characters");
  }
}

export function decodeBase64(input: string): string {
  try {
    return decodeURIComponent(escape(atob(input.trim())));
  } catch {
    throw new Error("Invalid Base64 string");
  }
}
