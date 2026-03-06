export function jsonToTypescript(json: string, rootName: string = "Root"): string {
  const parsed = JSON.parse(json);
  const interfaces: string[] = [];
  generateInterface(parsed, rootName, interfaces);
  return interfaces.join("\n\n");
}

function generateInterface(obj: unknown, name: string, interfaces: string[]): string {
  if (Array.isArray(obj)) {
    if (obj.length === 0) return "unknown[]";
    const itemType = generateInterface(obj[0], name + "Item", interfaces);
    return `${itemType}[]`;
  }

  if (obj === null) return "null";

  switch (typeof obj) {
    case "string": return "string";
    case "number": return "number";
    case "boolean": return "boolean";
    case "object": {
      const lines: string[] = [];
      for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
        const safeName = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : `"${key}"`;
        const childType = generateInterface(value, capitalize(key), interfaces);
        lines.push(`  ${safeName}: ${childType};`);
      }
      interfaces.push(`interface ${name} {\n${lines.join("\n")}\n}`);
      return name;
    }
    default: return "unknown";
  }
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1).replace(/[^a-zA-Z0-9]/g, "");
}
