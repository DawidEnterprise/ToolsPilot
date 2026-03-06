export interface FindReplaceResult {
  output: string;
  count: number;
}

export function findAndReplace(
  text: string,
  find: string,
  replace: string,
  options: { caseSensitive: boolean; wholeWord: boolean; useRegex: boolean }
): FindReplaceResult {
  if (!find) return { output: text, count: 0 };

  let flags = "g";
  if (!options.caseSensitive) flags += "i";

  let pattern: string;
  if (options.useRegex) {
    pattern = find;
  } else {
    pattern = find.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  if (options.wholeWord) {
    pattern = `\\b${pattern}\\b`;
  }

  const regex = new RegExp(pattern, flags);
  const matches = text.match(regex);
  const count = matches ? matches.length : 0;
  const output = text.replace(regex, replace);

  return { output, count };
}
