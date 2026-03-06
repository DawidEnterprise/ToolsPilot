export function textToBinary(text: string): string {
  return Array.from(text)
    .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
    .join(" ");
}

export function binaryToText(binary: string): string {
  const cleaned = binary.replace(/[^01\s]/g, "").trim();
  if (!cleaned) return "";
  return cleaned
    .split(/\s+/)
    .map((byte) => {
      const code = parseInt(byte, 2);
      return isNaN(code) ? "" : String.fromCharCode(code);
    })
    .join("");
}

export function textToHex(text: string): string {
  return Array.from(text)
    .map((char) => char.charCodeAt(0).toString(16).padStart(2, "0"))
    .join(" ");
}

export function hexToText(hex: string): string {
  const cleaned = hex.replace(/[^0-9a-fA-F\s]/g, "").trim();
  if (!cleaned) return "";
  return cleaned
    .split(/\s+/)
    .map((h) => {
      const code = parseInt(h, 16);
      return isNaN(code) ? "" : String.fromCharCode(code);
    })
    .join("");
}

export function textToOctal(text: string): string {
  return Array.from(text)
    .map((char) => char.charCodeAt(0).toString(8).padStart(3, "0"))
    .join(" ");
}

export function octalToText(octal: string): string {
  const cleaned = octal.replace(/[^0-7\s]/g, "").trim();
  if (!cleaned) return "";
  return cleaned
    .split(/\s+/)
    .map((o) => {
      const code = parseInt(o, 8);
      return isNaN(code) ? "" : String.fromCharCode(code);
    })
    .join("");
}
