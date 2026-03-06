export function whatIsXPercentOfY(x: number, y: number): number {
  return (x / 100) * y;
}

export function xIsWhatPercentOfY(x: number, y: number): number {
  if (y === 0) return 0;
  return (x / y) * 100;
}

export function percentageChange(from: number, to: number): number {
  if (from === 0) return 0;
  return ((to - from) / Math.abs(from)) * 100;
}

export function percentageIncrease(value: number, percent: number): number {
  return value + (value * percent) / 100;
}

export function percentageDecrease(value: number, percent: number): number {
  return value - (value * percent) / 100;
}
