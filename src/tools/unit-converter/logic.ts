export type UnitCategory = "length" | "weight" | "temperature" | "speed" | "data" | "time" | "area";

export interface UnitDef {
  name: string;
  toBase: (v: number) => number;
  fromBase: (v: number) => number;
}

const unitData: Record<UnitCategory, Record<string, UnitDef>> = {
  length: {
    m: { name: "Meters", toBase: (v) => v, fromBase: (v) => v },
    km: { name: "Kilometers", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
    cm: { name: "Centimeters", toBase: (v) => v / 100, fromBase: (v) => v * 100 },
    mm: { name: "Millimeters", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
    mi: { name: "Miles", toBase: (v) => v * 1609.344, fromBase: (v) => v / 1609.344 },
    ft: { name: "Feet", toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
    in: { name: "Inches", toBase: (v) => v * 0.0254, fromBase: (v) => v / 0.0254 },
    yd: { name: "Yards", toBase: (v) => v * 0.9144, fromBase: (v) => v / 0.9144 },
  },
  weight: {
    kg: { name: "Kilograms", toBase: (v) => v, fromBase: (v) => v },
    g: { name: "Grams", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
    mg: { name: "Milligrams", toBase: (v) => v / 1e6, fromBase: (v) => v * 1e6 },
    lb: { name: "Pounds", toBase: (v) => v * 0.453592, fromBase: (v) => v / 0.453592 },
    oz: { name: "Ounces", toBase: (v) => v * 0.0283495, fromBase: (v) => v / 0.0283495 },
    ton: { name: "Metric Tons", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
  },
  temperature: {
    c: {
      name: "Celsius",
      toBase: (v) => v,
      fromBase: (v) => v,
    },
    f: {
      name: "Fahrenheit",
      toBase: (v) => (v - 32) * (5 / 9),
      fromBase: (v) => v * (9 / 5) + 32,
    },
    k: {
      name: "Kelvin",
      toBase: (v) => v - 273.15,
      fromBase: (v) => v + 273.15,
    },
  },
  speed: {
    "m/s": { name: "Meters/sec", toBase: (v) => v, fromBase: (v) => v },
    "km/h": { name: "Km/hour", toBase: (v) => v / 3.6, fromBase: (v) => v * 3.6 },
    mph: { name: "Miles/hour", toBase: (v) => v * 0.44704, fromBase: (v) => v / 0.44704 },
    knot: { name: "Knots", toBase: (v) => v * 0.514444, fromBase: (v) => v / 0.514444 },
  },
  data: {
    B: { name: "Bytes", toBase: (v) => v, fromBase: (v) => v },
    KB: { name: "Kilobytes", toBase: (v) => v * 1024, fromBase: (v) => v / 1024 },
    MB: { name: "Megabytes", toBase: (v) => v * 1024 ** 2, fromBase: (v) => v / 1024 ** 2 },
    GB: { name: "Gigabytes", toBase: (v) => v * 1024 ** 3, fromBase: (v) => v / 1024 ** 3 },
    TB: { name: "Terabytes", toBase: (v) => v * 1024 ** 4, fromBase: (v) => v / 1024 ** 4 },
  },
  time: {
    s: { name: "Seconds", toBase: (v) => v, fromBase: (v) => v },
    min: { name: "Minutes", toBase: (v) => v * 60, fromBase: (v) => v / 60 },
    hr: { name: "Hours", toBase: (v) => v * 3600, fromBase: (v) => v / 3600 },
    day: { name: "Days", toBase: (v) => v * 86400, fromBase: (v) => v / 86400 },
    wk: { name: "Weeks", toBase: (v) => v * 604800, fromBase: (v) => v / 604800 },
    yr: { name: "Years", toBase: (v) => v * 31557600, fromBase: (v) => v / 31557600 },
  },
  area: {
    "m²": { name: "Sq Meters", toBase: (v) => v, fromBase: (v) => v },
    "km²": { name: "Sq Kilometers", toBase: (v) => v * 1e6, fromBase: (v) => v / 1e6 },
    "ft²": { name: "Sq Feet", toBase: (v) => v * 0.092903, fromBase: (v) => v / 0.092903 },
    acre: { name: "Acres", toBase: (v) => v * 4046.86, fromBase: (v) => v / 4046.86 },
    ha: { name: "Hectares", toBase: (v) => v * 10000, fromBase: (v) => v / 10000 },
  },
};

export function getCategories(): UnitCategory[] {
  return Object.keys(unitData) as UnitCategory[];
}

export function getUnits(category: UnitCategory): Record<string, UnitDef> {
  return unitData[category];
}

export function convert(value: number, fromUnit: string, toUnit: string, category: UnitCategory): number {
  const units = unitData[category];
  const base = units[fromUnit].toBase(value);
  return units[toUnit].fromBase(base);
}
