export interface DataSizeUnit {
  name: string;
  bits: number;
}

export const DATA_UNITS: DataSizeUnit[] = [
  { name: "Bits (b)", bits: 1 },
  { name: "Bytes (B)", bits: 8 },
  { name: "Kilobits (Kb)", bits: 1000 },
  { name: "Kilobytes (KB)", bits: 8000 },
  { name: "Kibibytes (KiB)", bits: 8 * 1024 },
  { name: "Megabits (Mb)", bits: 1e6 },
  { name: "Megabytes (MB)", bits: 8e6 },
  { name: "Mebibytes (MiB)", bits: 8 * 1024 * 1024 },
  { name: "Gigabits (Gb)", bits: 1e9 },
  { name: "Gigabytes (GB)", bits: 8e9 },
  { name: "Gibibytes (GiB)", bits: 8 * 1024 * 1024 * 1024 },
  { name: "Terabits (Tb)", bits: 1e12 },
  { name: "Terabytes (TB)", bits: 8e12 },
  { name: "Tebibytes (TiB)", bits: 8 * 1024 * 1024 * 1024 * 1024 },
  { name: "Petabytes (PB)", bits: 8e15 },
  { name: "Pebibytes (PiB)", bits: 8 * Math.pow(1024, 5) },
];

export function convertDataSize(value: number, fromIdx: number, toIdx: number): number {
  const fromBits = value * DATA_UNITS[fromIdx].bits;
  return fromBits / DATA_UNITS[toIdx].bits;
}

export function convertAll(value: number, fromIdx: number): { name: string; value: number }[] {
  const bits = value * DATA_UNITS[fromIdx].bits;
  return DATA_UNITS.map((u) => ({ name: u.name, value: bits / u.bits }));
}

export function transferTime(sizeInBits: number, speedMbps: number): string {
  if (speedMbps <= 0 || sizeInBits <= 0) return "0s";
  const seconds = sizeInBits / (speedMbps * 1e6);
  if (seconds < 1) return `${(seconds * 1000).toFixed(1)}ms`;
  if (seconds < 60) return `${seconds.toFixed(1)}s`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ${Math.round(seconds % 60)}s`;
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return `${h}h ${m}m`;
}
