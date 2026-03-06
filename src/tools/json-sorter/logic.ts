export function sortJsonKeys(input: string, ascending: boolean = true): string {
  const parsed = JSON.parse(input);
  const sorted = deepSortKeys(parsed, ascending);
  return JSON.stringify(sorted, null, 2);
}

function deepSortKeys(value: unknown, ascending: boolean): unknown {
  if (Array.isArray(value)) {
    return value.map((item) => deepSortKeys(item, ascending));
  }
  if (value !== null && typeof value === "object") {
    const obj = value as Record<string, unknown>;
    const keys = Object.keys(obj).sort((a, b) =>
      ascending ? a.localeCompare(b) : b.localeCompare(a)
    );
    const result: Record<string, unknown> = {};
    for (const key of keys) {
      result[key] = deepSortKeys(obj[key], ascending);
    }
    return result;
  }
  return value;
}
