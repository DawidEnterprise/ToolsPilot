export function generateRandomNumbers(
  min: number,
  max: number,
  count: number,
  allowDuplicates: boolean
): number[] {
  if (min > max) [min, max] = [max, min];
  const range = max - min + 1;

  if (!allowDuplicates && count > range) {
    count = range;
  }

  const results: number[] = [];
  const seen = new Set<number>();

  for (let i = 0; i < count; i++) {
    let num: number;
    if (allowDuplicates) {
      const arr = new Uint32Array(1);
      crypto.getRandomValues(arr);
      num = min + (arr[0] % range);
    } else {
      do {
        const arr = new Uint32Array(1);
        crypto.getRandomValues(arr);
        num = min + (arr[0] % range);
      } while (seen.has(num));
      seen.add(num);
    }
    results.push(num);
  }

  return results;
}
