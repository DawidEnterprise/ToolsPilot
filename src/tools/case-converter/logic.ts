export type CaseType = "uppercase" | "lowercase" | "titlecase" | "sentencecase" | "camelcase" | "pascalcase" | "snakecase" | "kebabcase" | "dotcase";

export function convertCase(input: string, type: CaseType): string {
  switch (type) {
    case "uppercase":
      return input.toUpperCase();
    case "lowercase":
      return input.toLowerCase();
    case "titlecase":
      return input.replace(/\b\w/g, (c) => c.toUpperCase());
    case "sentencecase":
      return input
        .toLowerCase()
        .replace(/(^\s*\w|[.!?]\s+\w)/g, (c) => c.toUpperCase());
    case "camelcase":
      return toWords(input)
        .map((w, i) => (i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()))
        .join("");
    case "pascalcase":
      return toWords(input)
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join("");
    case "snakecase":
      return toWords(input).map((w) => w.toLowerCase()).join("_");
    case "kebabcase":
      return toWords(input).map((w) => w.toLowerCase()).join("-");
    case "dotcase":
      return toWords(input).map((w) => w.toLowerCase()).join(".");
    default:
      return input;
  }
}

function toWords(input: string): string[] {
  return input
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}
