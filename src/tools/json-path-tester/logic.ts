export interface JsonPathResult {
  path: string;
  value: unknown;
}

export function queryJsonPath(json: string, path: string): JsonPathResult[] {
  const data = JSON.parse(json);
  const results: JsonPathResult[] = [];

  const segments = parsePath(path);
  if (segments.length === 0) return [{ path: "$", value: data }];

  traverse(data, segments, 0, "$", results);
  return results;
}

function parsePath(path: string): string[] {
  let p = path.trim();
  if (p.startsWith("$")) p = p.slice(1);
  if (p.startsWith(".")) p = p.slice(1);
  if (!p) return [];

  const segments: string[] = [];
  const re = /(\w+)|\[(\d+|\*)\]/g;
  let match;
  while ((match = re.exec(p)) !== null) {
    segments.push(match[1] || match[2]);
  }
  return segments;
}

function traverse(
  data: unknown,
  segments: string[],
  idx: number,
  currentPath: string,
  results: JsonPathResult[]
) {
  if (idx >= segments.length) {
    results.push({ path: currentPath, value: data });
    return;
  }

  const seg = segments[idx];

  if (seg === "*") {
    if (Array.isArray(data)) {
      data.forEach((item, i) => traverse(item, segments, idx + 1, `${currentPath}[${i}]`, results));
    } else if (data && typeof data === "object") {
      for (const [key, val] of Object.entries(data as Record<string, unknown>)) {
        traverse(val, segments, idx + 1, `${currentPath}.${key}`, results);
      }
    }
    return;
  }

  if (Array.isArray(data) && /^\d+$/.test(seg)) {
    const i = parseInt(seg);
    if (i < data.length) {
      traverse(data[i], segments, idx + 1, `${currentPath}[${i}]`, results);
    }
    return;
  }

  if (data && typeof data === "object" && !Array.isArray(data)) {
    const obj = data as Record<string, unknown>;
    if (seg in obj) {
      traverse(obj[seg], segments, idx + 1, `${currentPath}.${seg}`, results);
    }
  }
}
