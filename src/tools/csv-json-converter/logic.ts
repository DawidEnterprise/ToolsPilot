export function csvToJson(csv: string): { output: string; error: string | null; rowCount: number } {
  if (!csv.trim()) return { output: "", error: null, rowCount: 0 };
  try {
    const lines = csv.trim().split("\n");
    if (lines.length < 2) return { output: JSON.stringify([{ value: lines[0] }], null, 2), error: null, rowCount: 1 };

    const headers = parseCsvLine(lines[0]);
    const rows = lines.slice(1).map((line) => {
      const values = parseCsvLine(line);
      const obj: Record<string, string> = {};
      headers.forEach((h, i) => { obj[h.trim()] = (values[i] || "").trim(); });
      return obj;
    });

    return { output: JSON.stringify(rows, null, 2), error: null, rowCount: rows.length };
  } catch (e: unknown) {
    return { output: "", error: e instanceof Error ? e.message : "Parse error", rowCount: 0 };
  }
}

export function jsonToCsv(json: string): { output: string; error: string | null } {
  if (!json.trim()) return { output: "", error: null };
  try {
    const parsed = JSON.parse(json);
    if (!Array.isArray(parsed)) throw new Error("JSON must be an array of objects");
    if (parsed.length === 0) return { output: "", error: null };

    const headers = Object.keys(parsed[0]);
    const rows = parsed.map((row: Record<string, unknown>) =>
      headers.map((h) => {
        const val = String(row[h] ?? "");
        return val.includes(",") || val.includes('"') || val.includes("\n")
          ? `"${val.replace(/"/g, '""')}"`
          : val;
      }).join(",")
    );

    return { output: [headers.join(","), ...rows].join("\n"), error: null };
  } catch (e: unknown) {
    return { output: "", error: e instanceof Error ? e.message : "Invalid JSON" };
  }
}

function parseCsvLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') {
      if (inQuotes && line[i + 1] === '"') { current += '"'; i++; }
      else inQuotes = !inQuotes;
    } else if (c === "," && !inQuotes) {
      result.push(current);
      current = "";
    } else {
      current += c;
    }
  }
  result.push(current);
  return result;
}
