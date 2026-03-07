"use client";
import { useState } from "react";

export function PasswordStrengthCheckerTool() {
  const [pw, setPw] = useState("");
  const checks = [
    { label: "At least 8 characters", pass: pw.length >= 8 },
    { label: "Uppercase letter", pass: /[A-Z]/.test(pw) },
    { label: "Lowercase letter", pass: /[a-z]/.test(pw) },
    { label: "Number", pass: /[0-9]/.test(pw) },
    { label: "Special character", pass: /[^A-Za-z0-9]/.test(pw) },
    { label: "12+ characters", pass: pw.length >= 12 },
  ];
  const score = checks.filter(c => c.pass).length;
  const strength = score <= 2 ? "Weak" : score <= 4 ? "Moderate" : "Strong";
  const color = score <= 2 ? "text-red-600" : score <= 4 ? "text-yellow-600" : "text-green-600";

  return (
    <div className="space-y-4">
      <input type="text" className="input-field font-mono" placeholder="Enter password to check..." value={pw} onChange={e => setPw(e.target.value)} autoComplete="off" />
      {pw && (
        <div className="rounded-lg bg-gray-50 dark:bg-gray-800 p-4 text-sm space-y-3">
          <p className={"font-bold text-lg " + color}>{strength} ({score}/{checks.length})</p>
          <div className="w-full h-2 bg-gray-200 rounded dark:bg-gray-700">
            <div className={"h-2 rounded transition-all " + (score <= 2 ? "bg-red-500" : score <= 4 ? "bg-yellow-500" : "bg-green-500")} style={{ width: (score / checks.length * 100) + "%" }} />
          </div>
          <ul className="space-y-1">
            {checks.map((c, i) => (
              <li key={i} className={c.pass ? "text-green-600 dark:text-green-400" : "text-gray-400"}>{c.pass ? "✓" : "✗"} {c.label}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
