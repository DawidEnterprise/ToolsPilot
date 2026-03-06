export type LineBreakAction = "remove" | "single" | "double" | "to-comma" | "to-space";

export function processLineBreaks(text: string, action: LineBreakAction): string {
  if (!text) return "";
  switch (action) {
    case "remove":
      return text.replace(/\r?\n/g, "");
    case "single":
      return text.replace(/(\r?\n){2,}/g, "\n").trim();
    case "double":
      return text.replace(/(\r?\n)+/g, "\n\n").trim();
    case "to-comma":
      return text.split(/\r?\n/).filter(Boolean).join(", ");
    case "to-space":
      return text.split(/\r?\n/).filter(Boolean).join(" ");
  }
}
