export function timestampToDate(ts: number): Date {
  // Auto-detect seconds vs milliseconds
  if (ts < 1e12) return new Date(ts * 1000); // seconds
  return new Date(ts); // milliseconds
}

export function dateToTimestamp(date: Date): { seconds: number; milliseconds: number } {
  return {
    seconds: Math.floor(date.getTime() / 1000),
    milliseconds: date.getTime(),
  };
}

export function formatDate(date: Date): string {
  return date.toLocaleString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  });
}

export function formatISO(date: Date): string {
  return date.toISOString();
}

export function formatRelative(date: Date): string {
  const diff = Date.now() - date.getTime();
  const absDiff = Math.abs(diff);
  const future = diff < 0;
  const prefix = future ? "in " : "";
  const suffix = future ? "" : " ago";

  if (absDiff < 60000) return `${prefix}${Math.round(absDiff / 1000)}s${suffix}`;
  if (absDiff < 3600000) return `${prefix}${Math.round(absDiff / 60000)}m${suffix}`;
  if (absDiff < 86400000) return `${prefix}${Math.round(absDiff / 3600000)}h${suffix}`;
  return `${prefix}${Math.round(absDiff / 86400000)}d${suffix}`;
}
