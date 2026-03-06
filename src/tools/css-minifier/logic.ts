export function minifyCss(input: string): { output: string; savedPercent: number } {
  if (!input.trim()) return { output: "", savedPercent: 0 };

  let css = input;
  // Remove comments
  css = css.replace(/\/\*[\s\S]*?\*\//g, "");
  // Remove newlines and extra whitespace
  css = css.replace(/\s+/g, " ");
  // Remove space around selectors/braces
  css = css.replace(/\s*{\s*/g, "{");
  css = css.replace(/\s*}\s*/g, "}");
  css = css.replace(/\s*;\s*/g, ";");
  css = css.replace(/\s*:\s*/g, ":");
  css = css.replace(/\s*,\s*/g, ",");
  // Remove trailing semicolons before }
  css = css.replace(/;}/g, "}");
  css = css.trim();

  const savedPercent = input.length > 0
    ? Math.round((1 - css.length / input.length) * 100)
    : 0;

  return { output: css, savedPercent };
}

export function beautifyCss(input: string): string {
  if (!input.trim()) return "";

  // First minify to normalize
  const { output: minified } = minifyCss(input);

  let result = "";
  let indent = 0;
  const tab = "  ";

  for (let i = 0; i < minified.length; i++) {
    const char = minified[i];
    if (char === "{") {
      result += " {\n";
      indent++;
      result += tab.repeat(indent);
    } else if (char === "}") {
      result += "\n";
      indent = Math.max(0, indent - 1);
      result += tab.repeat(indent) + "}\n";
      if (indent === 0) result += "\n";
      result += tab.repeat(indent);
    } else if (char === ";") {
      result += ";\n" + tab.repeat(indent);
    } else if (char === ":" && minified[i + 1] !== " ") {
      result += ": ";
    } else {
      result += char;
    }
  }

  return result.trim();
}
