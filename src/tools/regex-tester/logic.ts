export interface RegexMatch {
  match: string;
  index: number;
  groups: string[];
}

export function testRegex(pattern: string, flags: string, testString: string): { matches: RegexMatch[]; error: string | null } {
  if (!pattern) return { matches: [], error: null };
  try {
    const regex = new RegExp(pattern, flags);
    const matches: RegexMatch[] = [];

    if (flags.includes("g")) {
      let m: RegExpExecArray | null;
      while ((m = regex.exec(testString)) !== null) {
        matches.push({ match: m[0], index: m.index, groups: m.slice(1) });
        if (m[0].length === 0) regex.lastIndex++;
      }
    } else {
      const m = regex.exec(testString);
      if (m) {
        matches.push({ match: m[0], index: m.index, groups: m.slice(1) });
      }
    }

    return { matches, error: null };
  } catch (e: unknown) {
    return { matches: [], error: e instanceof Error ? e.message : "Invalid regex" };
  }
}
