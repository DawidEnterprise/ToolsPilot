export interface PasswordOptions {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
}

const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWER = "abcdefghijklmnopqrstuvwxyz";
const NUMS = "0123456789";
const SYMS = "!@#$%^&*()_+-=[]{}|;:,.<>?";

export function generatePassword(opts: PasswordOptions): string {
  let chars = "";
  if (opts.uppercase) chars += UPPER;
  if (opts.lowercase) chars += LOWER;
  if (opts.numbers) chars += NUMS;
  if (opts.symbols) chars += SYMS;
  if (!chars) chars = LOWER + NUMS;

  const array = new Uint32Array(opts.length);
  crypto.getRandomValues(array);
  return Array.from(array, (n) => chars[n % chars.length]).join("");
}

export function getStrength(password: string): { score: number; label: string; color: string } {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (password.length >= 16) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2) return { score, label: "Weak", color: "red" };
  if (score <= 4) return { score, label: "Fair", color: "amber" };
  if (score <= 5) return { score, label: "Good", color: "blue" };
  return { score, label: "Strong", color: "green" };
}
