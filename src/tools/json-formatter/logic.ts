/**
 * JSON Formatter logic — pure functions, no React dependency.
 */

export interface JsonFormatResult {
  success: boolean;
  output: string;
  error?: string;
  stats?: {
    keys: number;
    depth: number;
    sizeBytes: number;
  };
}

export function formatJson(input: string, indent: number = 2): JsonFormatResult {
  if (!input.trim()) {
    return { success: false, output: "", error: "Input is empty" };
  }

  try {
    const parsed = JSON.parse(input);
    const output = JSON.stringify(parsed, null, indent);
    return {
      success: true,
      output,
      stats: {
        keys: countKeys(parsed),
        depth: measureDepth(parsed),
        sizeBytes: new Blob([output]).size,
      },
    };
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Invalid JSON";
    return { success: false, output: "", error: message };
  }
}

export function minifyJson(input: string): JsonFormatResult {
  if (!input.trim()) {
    return { success: false, output: "", error: "Input is empty" };
  }

  try {
    const parsed = JSON.parse(input);
    const output = JSON.stringify(parsed);
    return { success: true, output };
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Invalid JSON";
    return { success: false, output: "", error: message };
  }
}

function countKeys(obj: unknown): number {
  if (typeof obj !== "object" || obj === null) return 0;
  if (Array.isArray(obj)) return obj.reduce((sum, item) => sum + countKeys(item), 0);
  return Object.keys(obj).reduce((sum, key) => sum + 1 + countKeys((obj as Record<string, unknown>)[key]), 0);
}

function measureDepth(obj: unknown, current = 0): number {
  if (typeof obj !== "object" || obj === null) return current;
  if (Array.isArray(obj)) {
    return obj.length === 0 ? current + 1 : Math.max(...obj.map((item) => measureDepth(item, current + 1)));
  }
  const values = Object.values(obj);
  return values.length === 0 ? current + 1 : Math.max(...values.map((v) => measureDepth(v, current + 1)));
}
