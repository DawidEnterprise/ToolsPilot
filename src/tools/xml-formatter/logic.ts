export function formatXml(input: string, indent: number = 2): { output: string; error: string | null } {
  if (!input.trim()) return { output: "", error: null };
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(input, "application/xml");
    const errorNode = doc.querySelector("parsererror");
    if (errorNode) throw new Error(errorNode.textContent || "Invalid XML");

    return { output: prettyPrint(input, indent), error: null };
  } catch (e: unknown) {
    return { output: "", error: e instanceof Error ? e.message : "Invalid XML" };
  }
}

export function minifyXml(input: string): { output: string; error: string | null } {
  if (!input.trim()) return { output: "", error: null };
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(input, "application/xml");
    const errorNode = doc.querySelector("parsererror");
    if (errorNode) throw new Error(errorNode.textContent || "Invalid XML");

    const minified = input.replace(/>\s+</g, "><").replace(/\s+/g, " ").trim();
    return { output: minified, error: null };
  } catch (e: unknown) {
    return { output: "", error: e instanceof Error ? e.message : "Invalid XML" };
  }
}

function prettyPrint(xml: string, indentSize: number): string {
  const tab = " ".repeat(indentSize);
  let formatted = "";
  let indent = 0;

  // Normalize whitespace between tags
  const normalized = xml.replace(/>\s*</g, ">\n<").trim();
  const lines = normalized.split("\n");

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    // Closing tag
    if (trimmed.startsWith("</")) {
      indent = Math.max(0, indent - 1);
    }

    formatted += tab.repeat(indent) + trimmed + "\n";

    // Opening tag (not self-closing, not a closing tag, not a declaration)
    if (
      trimmed.startsWith("<") &&
      !trimmed.startsWith("</") &&
      !trimmed.startsWith("<?") &&
      !trimmed.startsWith("<!") &&
      !trimmed.endsWith("/>") &&
      !trimmed.includes("</")
    ) {
      indent++;
    }
  }

  return formatted.trimEnd();
}
