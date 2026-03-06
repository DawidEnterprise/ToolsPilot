const KEYWORDS = [
  "SELECT", "FROM", "WHERE", "AND", "OR", "NOT", "IN", "ON", "AS", "JOIN",
  "LEFT", "RIGHT", "INNER", "OUTER", "FULL", "CROSS", "GROUP", "BY", "ORDER",
  "HAVING", "LIMIT", "OFFSET", "INSERT", "INTO", "VALUES", "UPDATE", "SET",
  "DELETE", "CREATE", "TABLE", "ALTER", "DROP", "INDEX", "UNION", "ALL",
  "DISTINCT", "CASE", "WHEN", "THEN", "ELSE", "END", "EXISTS", "BETWEEN",
  "LIKE", "IS", "NULL", "ASC", "DESC", "WITH", "RECURSIVE",
];

export function formatSql(sql: string, uppercase: boolean = true): string {
  if (!sql.trim()) return "";

  let result = sql.trim();

  // Normalize whitespace
  result = result.replace(/\s+/g, " ");

  // Major clause keywords on new lines
  const majorKeywords = [
    "SELECT", "FROM", "WHERE", "GROUP BY", "ORDER BY", "HAVING",
    "LIMIT", "OFFSET", "INSERT INTO", "VALUES", "UPDATE", "SET",
    "DELETE FROM", "CREATE TABLE", "ALTER TABLE", "DROP TABLE",
    "JOIN", "LEFT JOIN", "RIGHT JOIN", "INNER JOIN", "OUTER JOIN",
    "FULL JOIN", "CROSS JOIN", "UNION", "UNION ALL", "WITH",
  ];

  for (const kw of majorKeywords) {
    const regex = new RegExp(`\\b${kw}\\b`, "gi");
    result = result.replace(regex, `\n${kw.toUpperCase()}`);
  }

  // AND/OR on new lines with indent
  result = result.replace(/\b(AND|OR)\b/gi, "\n  $1");

  // Indent after SELECT
  result = result.replace(/\nSELECT\s/g, "\nSELECT\n  ");

  // Commas in SELECT list
  result = result.replace(/,\s*/g, ",\n  ");

  // Clean up leading newline
  result = result.replace(/^\n+/, "");

  if (uppercase) {
    for (const kw of KEYWORDS) {
      const regex = new RegExp(`\\b${kw}\\b`, "gi");
      result = result.replace(regex, kw);
    }
  }

  return result;
}
