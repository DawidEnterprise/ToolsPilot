export function beautifyJs(code: string): string {
  let result = "";
  let indent = 0;
  let inString: string | null = null;
  let escaped = false;
  let i = 0;

  const addNewline = () => {
    result += "\n" + "  ".repeat(indent);
  };

  while (i < code.length) {
    const ch = code[i];

    // Handle string literals
    if (inString) {
      result += ch;
      if (escaped) { escaped = false; }
      else if (ch === "\\") { escaped = true; }
      else if (ch === inString) { inString = null; }
      i++;
      continue;
    }

    if (ch === '"' || ch === "'" || ch === "`") {
      inString = ch;
      result += ch;
      i++;
      continue;
    }

    // Skip single-line comments
    if (ch === "/" && code[i + 1] === "/") {
      const end = code.indexOf("\n", i);
      const commentEnd = end === -1 ? code.length : end;
      result += code.slice(i, commentEnd);
      i = commentEnd;
      continue;
    }

    // Skip multi-line comments
    if (ch === "/" && code[i + 1] === "*") {
      const end = code.indexOf("*/", i + 2);
      const commentEnd = end === -1 ? code.length : end + 2;
      result += code.slice(i, commentEnd);
      i = commentEnd;
      continue;
    }

    if (ch === "{" || ch === "[") {
      result += " " + ch;
      indent++;
      addNewline();
      i++;
      continue;
    }

    if (ch === "}" || ch === "]") {
      indent = Math.max(0, indent - 1);
      addNewline();
      result += ch;
      i++;
      continue;
    }

    if (ch === ",") {
      result += ch;
      addNewline();
      i++;
      continue;
    }

    if (ch === ";") {
      result += ch;
      addNewline();
      i++;
      continue;
    }

    // Collapse whitespace
    if (/\s/.test(ch)) {
      if (result.length > 0 && !/\s/.test(result[result.length - 1])) {
        result += " ";
      }
      i++;
      continue;
    }

    result += ch;
    i++;
  }

  return result.trim();
}

export function minifyJs(code: string): string {
  let result = code;
  // Remove single-line comments (but not URLs like http://)
  result = result.replace(/(?<![:"'])\/\/[^\n]*/g, "");
  // Remove multi-line comments
  result = result.replace(/\/\*[\s\S]*?\*\//g, "");
  // Collapse whitespace
  result = result.replace(/\s+/g, " ");
  // Remove spaces around operators
  result = result.replace(/\s*([{}()=;,:<>+\-*/%&|!?])\s*/g, "$1");
  return result.trim();
}
