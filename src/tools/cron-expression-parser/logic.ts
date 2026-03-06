export interface CronPart {
  value: string;
  label: string;
  description: string;
}

export interface CronResult {
  valid: boolean;
  description: string;
  parts: CronPart[];
  nextRuns: string[];
  error?: string;
}

const FIELD_LABELS = ["Minute", "Hour", "Day of Month", "Month", "Day of Week"];
const MONTH_NAMES = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function describeField(value: string, label: string): string {
  if (value === "*") return `every ${label.toLowerCase()}`;
  if (value.includes("/")) {
    const [, step] = value.split("/");
    return `every ${step} ${label.toLowerCase()}(s)`;
  }
  if (value.includes(",")) return `${label.toLowerCase()} ${value}`;
  if (value.includes("-")) {
    const [start, end] = value.split("-");
    return `${label.toLowerCase()} ${start} through ${end}`;
  }
  if (label === "Month") return MONTH_NAMES[parseInt(value)] || value;
  if (label === "Day of Week") return DAY_NAMES[parseInt(value)] || value;
  return `at ${label.toLowerCase()} ${value}`;
}

export function parseCron(expression: string): CronResult {
  const trimmed = expression.trim();
  const fields = trimmed.split(/\s+/);

  if (fields.length !== 5) {
    return { valid: false, description: "", parts: [], nextRuns: [], error: "Cron expression must have 5 fields" };
  }

  const parts: CronPart[] = fields.map((value, i) => ({
    value,
    label: FIELD_LABELS[i],
    description: describeField(value, FIELD_LABELS[i]),
  }));

  // Build human description
  const descs: string[] = [];
  const [min, hour, dom, month, dow] = fields;

  if (min === "*" && hour === "*") descs.push("Every minute");
  else if (min !== "*" && hour === "*") descs.push(`At minute ${min} of every hour`);
  else if (min !== "*" && hour !== "*") descs.push(`At ${hour.padStart(2, "0")}:${min.padStart(2, "0")}`);
  else descs.push(`Every minute during hour ${hour}`);

  if (dom !== "*") descs.push(`on day ${dom} of the month`);
  if (month !== "*") descs.push(`in ${describeField(month, "Month")}`);
  if (dow !== "*") descs.push(`on ${describeField(dow, "Day of Week")}`);

  // Calculate next runs
  const nextRuns: string[] = [];
  const now = new Date();
  const candidate = new Date(now);
  candidate.setSeconds(0);
  candidate.setMilliseconds(0);

  for (let i = 0; i < 10000 && nextRuns.length < 5; i++) {
    candidate.setMinutes(candidate.getMinutes() + 1);
    if (matchesCronField(min, candidate.getMinutes()) &&
        matchesCronField(hour, candidate.getHours()) &&
        matchesCronField(dom, candidate.getDate()) &&
        matchesCronField(month, candidate.getMonth() + 1) &&
        matchesCronField(dow, candidate.getDay())) {
      nextRuns.push(candidate.toLocaleString());
    }
  }

  return { valid: true, description: descs.join(", "), parts, nextRuns };
}

function matchesCronField(field: string, value: number): boolean {
  if (field === "*") return true;
  if (field.includes("/")) {
    const [base, step] = field.split("/");
    const s = parseInt(step);
    const b = base === "*" ? 0 : parseInt(base);
    return (value - b) % s === 0 && value >= b;
  }
  if (field.includes(",")) return field.split(",").some(f => parseInt(f) === value);
  if (field.includes("-")) {
    const [start, end] = field.split("-").map(Number);
    return value >= start && value <= end;
  }
  return parseInt(field) === value;
}
