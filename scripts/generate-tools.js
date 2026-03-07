/**
 * Generate 50 tool page.tsx + component files.
 * Run: node scripts/generate-tools.js
 */
const fs = require("fs");
const path = require("path");

const BASE = path.resolve(__dirname, "..");

function slug2pascal(slug) {
  return slug.split("-").map(w => w[0].toUpperCase() + w.slice(1)).join("");
}

function writePage(slug, componentName) {
  const dir = path.join(BASE, "src", "app", "tools", slug);
  fs.mkdirSync(dir, { recursive: true });
  const pageName = componentName.replace("Tool", "Page");
  fs.writeFileSync(
    path.join(dir, "page.tsx"),
    `import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { ${componentName} } from "@/tools/${slug}/${componentName}";

const tool = getToolBySlug("${slug}")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function ${pageName}() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <${componentName} />
      </ToolPageLayout>
    </>
  );
}
`
  );
}

function writeTool(slug, componentName, code) {
  const dir = path.join(BASE, "src", "tools", slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, componentName + ".tsx"), code);
}

// ──────────────────────────────────────────────────
// TOOL DEFINITIONS
// ──────────────────────────────────────────────────

const tools = [];

function add(slug, code) {
  const cn = slug2pascal(slug) + "Tool";
  tools.push({ slug, componentName: cn, code });
}

// ─── TEXT-TO-BINARY ───
add("text-to-binary", `"use client";
import { useState } from "react";

export function TextToBinaryTool() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState("encode");

  const output = mode === "encode"
    ? input.split("").map(c => c.charCodeAt(0).toString(2).padStart(8, "0")).join(" ")
    : input.trim().split(/\\s+/).map(b => String.fromCharCode(parseInt(b, 2))).join("");

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button onClick={() => setMode("encode")} className={mode === "encode" ? "btn-primary text-xs" : "btn-secondary text-xs"}>Text \u2192 Binary</button>
        <button onClick={() => setMode("decode")} className={mode === "decode" ? "btn-primary text-xs" : "btn-secondary text-xs"}>Binary \u2192 Text</button>
      </div>
      <textarea className="input-field min-h-[120px] font-mono" placeholder={mode === "encode" ? "Enter text..." : "Enter binary (space-separated)..."} value={input} onChange={e => setInput(e.target.value)} />
      <textarea className="input-field min-h-[120px] font-mono bg-gray-50 dark:bg-gray-800" readOnly value={output} />
      <button onClick={() => navigator.clipboard.writeText(output)} className="btn-primary text-sm">Copy</button>
    </div>
  );
}
`);

// ─── TEXT-TO-HEX ───
add("text-to-hex", `"use client";
import { useState } from "react";

export function TextToHexTool() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState("encode");

  const output = mode === "encode"
    ? input.split("").map(c => c.charCodeAt(0).toString(16).padStart(2, "0")).join(" ")
    : input.trim().split(/\\s+/).map(h => String.fromCharCode(parseInt(h, 16))).join("");

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button onClick={() => setMode("encode")} className={mode === "encode" ? "btn-primary text-xs" : "btn-secondary text-xs"}>Text \u2192 Hex</button>
        <button onClick={() => setMode("decode")} className={mode === "decode" ? "btn-primary text-xs" : "btn-secondary text-xs"}>Hex \u2192 Text</button>
      </div>
      <textarea className="input-field min-h-[120px] font-mono" placeholder={mode === "encode" ? "Enter text..." : "Enter hex (space-separated)..."} value={input} onChange={e => setInput(e.target.value)} />
      <textarea className="input-field min-h-[120px] font-mono bg-gray-50 dark:bg-gray-800" readOnly value={output} />
      <button onClick={() => navigator.clipboard.writeText(output)} className="btn-primary text-sm">Copy</button>
    </div>
  );
}
`);

// ─── NATO-PHONETIC-ALPHABET ───
add("nato-phonetic-alphabet", `"use client";
import { useState } from "react";

const NATO: Record<string, string> = {A:"Alpha",B:"Bravo",C:"Charlie",D:"Delta",E:"Echo",F:"Foxtrot",G:"Golf",H:"Hotel",I:"India",J:"Juliet",K:"Kilo",L:"Lima",M:"Mike",N:"November",O:"Oscar",P:"Papa",Q:"Quebec",R:"Romeo",S:"Sierra",T:"Tango",U:"Uniform",V:"Victor",W:"Whiskey",X:"X-ray",Y:"Yankee",Z:"Zulu","0":"Zero","1":"One","2":"Two","3":"Three","4":"Four","5":"Five","6":"Six","7":"Seven","8":"Eight","9":"Niner"};

export function NatoPhoneticAlphabetTool() {
  const [input, setInput] = useState("");
  const output = input.toUpperCase().split("").map(c => NATO[c] || (c === " " ? " / " : c)).join(" ");

  return (
    <div className="space-y-4">
      <textarea className="input-field min-h-[100px]" placeholder="Enter text to convert..." value={input} onChange={e => setInput(e.target.value)} />
      <textarea className="input-field min-h-[100px] bg-gray-50 dark:bg-gray-800" readOnly value={output} />
      <button onClick={() => navigator.clipboard.writeText(output)} className="btn-primary text-sm">Copy</button>
    </div>
  );
}
`);

// ─── HEX-TO-RGB ───
add("hex-to-rgb", `"use client";
import { useState } from "react";

export function HexToRgbTool() {
  const [hex, setHex] = useState("#3b82f6");
  const clean = hex.replace("#", "");
  const r = parseInt(clean.substring(0, 2), 16) || 0;
  const g = parseInt(clean.substring(2, 4), 16) || 0;
  const b = parseInt(clean.substring(4, 6), 16) || 0;

  return (
    <div className="space-y-4">
      <div className="flex gap-3 items-end">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">HEX Color</label>
          <input className="input-field font-mono" value={hex} onChange={e => setHex(e.target.value)} placeholder="#3b82f6" />
        </div>
        <div className="h-10 w-10 rounded border border-gray-300 dark:border-gray-600" style={{ backgroundColor: hex }} />
      </div>
      <div className="rounded-lg bg-gray-50 dark:bg-gray-800 p-4 font-mono text-sm space-y-1">
        <p className="text-gray-700 dark:text-gray-300">RGB: <strong>rgb({r}, {g}, {b})</strong></p>
        <p className="text-gray-700 dark:text-gray-300">R: {r} &nbsp; G: {g} &nbsp; B: {b}</p>
      </div>
      <button onClick={() => navigator.clipboard.writeText("rgb(" + r + ", " + g + ", " + b + ")")} className="btn-primary text-sm">Copy RGB</button>
    </div>
  );
}
`);

// ─── RGB-TO-HEX ───
add("rgb-to-hex", `"use client";
import { useState } from "react";

export function RgbToHexTool() {
  const [r, setR] = useState(59);
  const [g, setG] = useState(130);
  const [b, setB] = useState(246);
  const hex = "#" + [r, g, b].map(v => Math.max(0, Math.min(255, v)).toString(16).padStart(2, "0")).join("");

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Red (0-255)</label>
          <input type="number" className="input-field" min={0} max={255} value={r} onChange={e => setR(+e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Green (0-255)</label>
          <input type="number" className="input-field" min={0} max={255} value={g} onChange={e => setG(+e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Blue (0-255)</label>
          <input type="number" className="input-field" min={0} max={255} value={b} onChange={e => setB(+e.target.value)} />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded border border-gray-300 dark:border-gray-600" style={{ backgroundColor: hex }} />
        <span className="font-mono text-lg font-bold text-gray-900 dark:text-gray-100">{hex.toUpperCase()}</span>
      </div>
      <button onClick={() => navigator.clipboard.writeText(hex)} className="btn-primary text-sm">Copy HEX</button>
    </div>
  );
}
`);

// ─── INVISIBLE-CHARACTER-DETECTOR ───
add("invisible-character-detector", `"use client";
import { useState } from "react";

const INVISIBLES: Record<number, string> = {0:"NULL",8:"BACKSPACE",9:"TAB",10:"LINE FEED",13:"CARRIAGE RETURN",32:"SPACE",160:"NO-BREAK SPACE",173:"SOFT HYPHEN",8203:"ZERO WIDTH SPACE",8204:"ZERO WIDTH NON-JOINER",8205:"ZERO WIDTH JOINER",8206:"LEFT-TO-RIGHT MARK",8207:"RIGHT-TO-LEFT MARK",8232:"LINE SEPARATOR",8233:"PARAGRAPH SEPARATOR",8288:"WORD JOINER",65279:"BYTE ORDER MARK",65532:"OBJECT REPLACEMENT"};

export function InvisibleCharacterDetectorTool() {
  const [input, setInput] = useState("");
  const chars = input.split("").map((c, i) => {
    const code = c.charCodeAt(0);
    const name = INVISIBLES[code];
    return { char: c, code, index: i, invisible: !!name, name: name || null };
  });
  const found = chars.filter(c => c.invisible && c.code !== 32 && c.code !== 10 && c.code !== 9);

  return (
    <div className="space-y-4">
      <textarea className="input-field min-h-[120px] font-mono" placeholder="Paste text to scan for hidden characters..." value={input} onChange={e => setInput(e.target.value)} />
      <div className="rounded-lg bg-gray-50 dark:bg-gray-800 p-4 text-sm">
        <p className="text-gray-700 dark:text-gray-300">{input.length} characters total, <strong className={found.length > 0 ? "text-red-600" : "text-green-600"}>{found.length} hidden character{found.length !== 1 ? "s" : ""} found</strong></p>
        {found.length > 0 && (
          <ul className="mt-2 space-y-1">
            {found.map((c, i) => (
              <li key={i} className="text-red-600 dark:text-red-400 font-mono">Position {c.index}: U+{c.code.toString(16).toUpperCase().padStart(4, "0")} ({c.name})</li>
            ))}
          </ul>
        )}
      </div>
      {found.length > 0 && (
        <button onClick={() => setInput(input.split("").filter((_, i) => !found.some(f => f.index === i)).join(""))} className="btn-primary text-sm">Remove Hidden Characters</button>
      )}
    </div>
  );
}
`);

// ─── DISCOUNT-CALCULATOR ───
add("discount-calculator", `"use client";
import { useState } from "react";

export function DiscountCalculatorTool() {
  const [price, setPrice] = useState("100");
  const [discount, setDiscount] = useState("20");
  const p = parseFloat(price) || 0;
  const d = parseFloat(discount) || 0;
  const saved = p * d / 100;
  const final_ = p - saved;

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Original Price ($)</label>
          <input type="number" className="input-field" value={price} onChange={e => setPrice(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Discount (%)</label>
          <input type="number" className="input-field" value={discount} onChange={e => setDiscount(e.target.value)} />
        </div>
      </div>
      <div className="rounded-lg bg-gray-50 dark:bg-gray-800 p-4 space-y-1 text-sm">
        <p className="text-gray-700 dark:text-gray-300">You save: <strong className="text-green-600">\${saved.toFixed(2)}</strong></p>
        <p className="text-gray-700 dark:text-gray-300">Final price: <strong className="text-gray-900 dark:text-gray-100 text-lg">\${final_.toFixed(2)}</strong></p>
      </div>
    </div>
  );
}
`);

// ─── SALARY-CALCULATOR ───
add("salary-calculator", `"use client";
import { useState } from "react";

export function SalaryCalculatorTool() {
  const [amount, setAmount] = useState("50000");
  const [basis, setBasis] = useState("annual");
  const val = parseFloat(amount) || 0;
  const annual = basis === "annual" ? val : basis === "monthly" ? val * 12 : basis === "weekly" ? val * 52 : val * 2080;
  const monthly = annual / 12;
  const weekly = annual / 52;
  const hourly = annual / 2080;

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Amount ($)</label>
          <input type="number" className="input-field" value={amount} onChange={e => setAmount(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Period</label>
          <select className="input-field" value={basis} onChange={e => setBasis(e.target.value)}>
            <option value="annual">Annual</option>
            <option value="monthly">Monthly</option>
            <option value="weekly">Weekly</option>
            <option value="hourly">Hourly</option>
          </select>
        </div>
      </div>
      <div className="rounded-lg bg-gray-50 dark:bg-gray-800 p-4 grid gap-2 sm:grid-cols-2 text-sm">
        <p className="text-gray-700 dark:text-gray-300">Annual: <strong>\${annual.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</strong></p>
        <p className="text-gray-700 dark:text-gray-300">Monthly: <strong>\${monthly.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</strong></p>
        <p className="text-gray-700 dark:text-gray-300">Weekly: <strong>\${weekly.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</strong></p>
        <p className="text-gray-700 dark:text-gray-300">Hourly: <strong>\${hourly.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</strong></p>
      </div>
    </div>
  );
}
`);

// ─── COMPOUND-INTEREST-CALCULATOR ───
add("compound-interest-calculator", `"use client";
import { useState } from "react";

export function CompoundInterestCalculatorTool() {
  const [principal, setPrincipal] = useState("10000");
  const [rate, setRate] = useState("7");
  const [years, setYears] = useState("10");
  const [compound, setCompound] = useState("12");
  const P = parseFloat(principal) || 0;
  const r = (parseFloat(rate) || 0) / 100;
  const t = parseFloat(years) || 0;
  const n = parseFloat(compound) || 1;
  const A = P * Math.pow(1 + r / n, n * t);
  const interest = A - P;

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Principal ($)</label>
          <input type="number" className="input-field" value={principal} onChange={e => setPrincipal(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Annual Rate (%)</label>
          <input type="number" className="input-field" value={rate} onChange={e => setRate(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Years</label>
          <input type="number" className="input-field" value={years} onChange={e => setYears(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Compound per year</label>
          <select className="input-field" value={compound} onChange={e => setCompound(e.target.value)}>
            <option value="1">Annually</option>
            <option value="4">Quarterly</option>
            <option value="12">Monthly</option>
            <option value="365">Daily</option>
          </select>
        </div>
      </div>
      <div className="rounded-lg bg-gray-50 dark:bg-gray-800 p-4 space-y-1 text-sm">
        <p className="text-gray-700 dark:text-gray-300">Future value: <strong className="text-lg">\${A.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</strong></p>
        <p className="text-gray-700 dark:text-gray-300">Total interest: <strong className="text-green-600">\${interest.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</strong></p>
      </div>
    </div>
  );
}
`);

// ─── MORTGAGE-CALCULATOR ───
add("mortgage-calculator", `"use client";
import { useState } from "react";

export function MortgageCalculatorTool() {
  const [loan, setLoan] = useState("300000");
  const [rate, setRate] = useState("6.5");
  const [years, setYears] = useState("30");
  const P = parseFloat(loan) || 0;
  const r = (parseFloat(rate) || 0) / 100 / 12;
  const n = (parseFloat(years) || 0) * 12;
  const monthly = r > 0 ? P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1) : P / n;
  const total = monthly * n;
  const interest = total - P;

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Loan Amount ($)</label>
          <input type="number" className="input-field" value={loan} onChange={e => setLoan(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Annual Rate (%)</label>
          <input type="number" className="input-field" step="0.1" value={rate} onChange={e => setRate(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Loan Term (years)</label>
          <input type="number" className="input-field" value={years} onChange={e => setYears(e.target.value)} />
        </div>
      </div>
      <div className="rounded-lg bg-gray-50 dark:bg-gray-800 p-4 space-y-1 text-sm">
        <p className="text-gray-700 dark:text-gray-300">Monthly payment: <strong className="text-lg">\${monthly.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</strong></p>
        <p className="text-gray-700 dark:text-gray-300">Total paid: <strong>\${total.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</strong></p>
        <p className="text-gray-700 dark:text-gray-300">Total interest: <strong className="text-red-600">\${interest.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</strong></p>
      </div>
    </div>
  );
}
`);

// ─── GPA-CALCULATOR ───
add("gpa-calculator", `"use client";
import { useState } from "react";

const GRADES: Record<string,number> = {"A+":4.0,"A":4.0,"A-":3.7,"B+":3.3,"B":3.0,"B-":2.7,"C+":2.3,"C":2.0,"C-":1.7,"D+":1.3,"D":1.0,"D-":0.7,"F":0.0};

export function GpaCalculatorTool() {
  const [courses, setCourses] = useState([{grade:"A",credits:"3"},{grade:"B+",credits:"3"},{grade:"A-",credits:"4"}]);
  const addCourse = () => setCourses([...courses, {grade:"A",credits:"3"}]);
  const update = (i: number, field: string, val: string) => setCourses(courses.map((c,j) => j===i ? {...c, [field]: val} : c));
  const remove = (i: number) => setCourses(courses.filter((_,j) => j!==i));
  const totalCredits = courses.reduce((s,c) => s + (parseFloat(c.credits)||0), 0);
  const totalPoints = courses.reduce((s,c) => s + (GRADES[c.grade]||0) * (parseFloat(c.credits)||0), 0);
  const gpa = totalCredits > 0 ? totalPoints / totalCredits : 0;

  return (
    <div className="space-y-4">
      {courses.map((c, i) => (
        <div key={i} className="flex gap-2 items-end">
          <div className="flex-1">
            <label className="block text-xs text-gray-500 mb-1">Grade</label>
            <select className="input-field text-sm" value={c.grade} onChange={e => update(i,"grade",e.target.value)}>
              {Object.keys(GRADES).map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
          <div className="w-20">
            <label className="block text-xs text-gray-500 mb-1">Credits</label>
            <input type="number" className="input-field text-sm" value={c.credits} onChange={e => update(i,"credits",e.target.value)} min={1} />
          </div>
          <button onClick={() => remove(i)} className="text-red-500 hover:text-red-700 text-sm pb-2">\u00d7</button>
        </div>
      ))}
      <button onClick={addCourse} className="btn-secondary text-sm">+ Add Course</button>
      <div className="rounded-lg bg-gray-50 dark:bg-gray-800 p-4 text-sm">
        <p className="text-gray-700 dark:text-gray-300">GPA: <strong className="text-lg">{gpa.toFixed(2)}</strong> / 4.00</p>
        <p className="text-gray-500">{totalCredits} total credits</p>
      </div>
    </div>
  );
}
`);

// ─── GRADE-CALCULATOR ───
add("grade-calculator", `"use client";
import { useState } from "react";

export function GradeCalculatorTool() {
  const [current, setCurrent] = useState("85");
  const [weight, setWeight] = useState("60");
  const [desired, setDesired] = useState("90");
  const cur = parseFloat(current) || 0;
  const w = (parseFloat(weight) || 0) / 100;
  const des = parseFloat(desired) || 0;
  const needed = w < 1 ? (des - cur * w) / (1 - w) : 0;

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Current Grade (%)</label>
          <input type="number" className="input-field" value={current} onChange={e => setCurrent(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Current Weight (%)</label>
          <input type="number" className="input-field" value={weight} onChange={e => setWeight(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Desired Grade (%)</label>
          <input type="number" className="input-field" value={desired} onChange={e => setDesired(e.target.value)} />
        </div>
      </div>
      <div className="rounded-lg bg-gray-50 dark:bg-gray-800 p-4 text-sm">
        <p className="text-gray-700 dark:text-gray-300">You need <strong className="text-lg">{needed.toFixed(1)}%</strong> on the remaining {(100 - (parseFloat(weight)||0)).toFixed(0)}% to get {desired}% overall.</p>
      </div>
    </div>
  );
}
`);

// ─── FUEL-COST-CALCULATOR ───
add("fuel-cost-calculator", `"use client";
import { useState } from "react";

export function FuelCostCalculatorTool() {
  const [distance, setDistance] = useState("500");
  const [mpg, setMpg] = useState("25");
  const [price, setPrice] = useState("3.50");
  const d = parseFloat(distance) || 0;
  const m = parseFloat(mpg) || 1;
  const p = parseFloat(price) || 0;
  const gallons = d / m;
  const cost = gallons * p;

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Distance (miles)</label>
          <input type="number" className="input-field" value={distance} onChange={e => setDistance(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Fuel Economy (MPG)</label>
          <input type="number" className="input-field" value={mpg} onChange={e => setMpg(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Gas Price ($/gal)</label>
          <input type="number" className="input-field" step="0.01" value={price} onChange={e => setPrice(e.target.value)} />
        </div>
      </div>
      <div className="rounded-lg bg-gray-50 dark:bg-gray-800 p-4 space-y-1 text-sm">
        <p className="text-gray-700 dark:text-gray-300">Fuel needed: <strong>{gallons.toFixed(1)} gallons</strong></p>
        <p className="text-gray-700 dark:text-gray-300">Trip cost: <strong className="text-lg">\${cost.toFixed(2)}</strong></p>
      </div>
    </div>
  );
}
`);

// ─── ELECTRICITY-COST-CALCULATOR ───
add("electricity-cost-calculator", `"use client";
import { useState } from "react";

export function ElectricityCostCalculatorTool() {
  const [watts, setWatts] = useState("1000");
  const [hours, setHours] = useState("8");
  const [rate, setRate] = useState("0.12");
  const w = parseFloat(watts) || 0;
  const h = parseFloat(hours) || 0;
  const r = parseFloat(rate) || 0;
  const dailyKwh = (w * h) / 1000;
  const dailyCost = dailyKwh * r;
  const monthlyCost = dailyCost * 30;
  const yearlyCost = dailyCost * 365;

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Power (Watts)</label>
          <input type="number" className="input-field" value={watts} onChange={e => setWatts(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Hours per day</label>
          <input type="number" className="input-field" value={hours} onChange={e => setHours(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Rate ($/kWh)</label>
          <input type="number" className="input-field" step="0.01" value={rate} onChange={e => setRate(e.target.value)} />
        </div>
      </div>
      <div className="rounded-lg bg-gray-50 dark:bg-gray-800 p-4 grid gap-2 sm:grid-cols-3 text-sm">
        <p className="text-gray-700 dark:text-gray-300">Daily: <strong>\${dailyCost.toFixed(2)}</strong></p>
        <p className="text-gray-700 dark:text-gray-300">Monthly: <strong>\${monthlyCost.toFixed(2)}</strong></p>
        <p className="text-gray-700 dark:text-gray-300">Yearly: <strong>\${yearlyCost.toFixed(2)}</strong></p>
      </div>
    </div>
  );
}
`);

// ─── CALORIE-CALCULATOR ───
add("calorie-calculator", `"use client";
import { useState } from "react";

export function CalorieCalculatorTool() {
  const [age, setAge] = useState("30");
  const [gender, setGender] = useState("male");
  const [weight, setWeight] = useState("70");
  const [height, setHeight] = useState("175");
  const [activity, setActivity] = useState("1.55");
  const w = parseFloat(weight) || 0;
  const h = parseFloat(height) || 0;
  const a = parseFloat(age) || 0;
  const act = parseFloat(activity) || 1;
  const bmr = gender === "male" ? 10*w + 6.25*h - 5*a + 5 : 10*w + 6.25*h - 5*a - 161;
  const tdee = bmr * act;

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Age</label>
          <input type="number" className="input-field" value={age} onChange={e => setAge(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Gender</label>
          <select className="input-field" value={gender} onChange={e => setGender(e.target.value)}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Weight (kg)</label>
          <input type="number" className="input-field" value={weight} onChange={e => setWeight(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Height (cm)</label>
          <input type="number" className="input-field" value={height} onChange={e => setHeight(e.target.value)} />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Activity Level</label>
        <select className="input-field" value={activity} onChange={e => setActivity(e.target.value)}>
          <option value="1.2">Sedentary (little exercise)</option>
          <option value="1.375">Light (1-3 days/week)</option>
          <option value="1.55">Moderate (3-5 days/week)</option>
          <option value="1.725">Active (6-7 days/week)</option>
          <option value="1.9">Very Active (athlete)</option>
        </select>
      </div>
      <div className="rounded-lg bg-gray-50 dark:bg-gray-800 p-4 space-y-2 text-sm">
        <p className="text-gray-700 dark:text-gray-300">BMR: <strong>{Math.round(bmr)} cal/day</strong></p>
        <p className="text-gray-700 dark:text-gray-300">Maintenance: <strong className="text-lg">{Math.round(tdee)} cal/day</strong></p>
        <p className="text-gray-700 dark:text-gray-300">Weight loss: <strong>{Math.round(tdee - 500)} cal/day</strong> (500 deficit)</p>
        <p className="text-gray-700 dark:text-gray-300">Weight gain: <strong>{Math.round(tdee + 500)} cal/day</strong> (500 surplus)</p>
      </div>
    </div>
  );
}
`);

// ─── DATE-CALCULATOR ───
add("date-calculator", `"use client";
import { useState } from "react";

export function DateCalculatorTool() {
  const today = new Date().toISOString().split("T")[0];
  const [date1, setDate1] = useState(today);
  const [date2, setDate2] = useState(today);
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffMs = Math.abs(d2.getTime() - d1.getTime());
  const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(days / 7);
  const months = Math.abs((d2.getFullYear() - d1.getFullYear()) * 12 + d2.getMonth() - d1.getMonth());

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Date</label>
          <input type="date" className="input-field" value={date1} onChange={e => setDate1(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">End Date</label>
          <input type="date" className="input-field" value={date2} onChange={e => setDate2(e.target.value)} />
        </div>
      </div>
      <div className="rounded-lg bg-gray-50 dark:bg-gray-800 p-4 grid gap-2 sm:grid-cols-3 text-sm">
        <p className="text-gray-700 dark:text-gray-300">Days: <strong className="text-lg">{days}</strong></p>
        <p className="text-gray-700 dark:text-gray-300">Weeks: <strong>{weeks}</strong></p>
        <p className="text-gray-700 dark:text-gray-300">Months: <strong>{months}</strong></p>
      </div>
    </div>
  );
}
`);

// ─── PASSWORD-STRENGTH-CHECKER ───
add("password-strength-checker", `"use client";
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
              <li key={i} className={c.pass ? "text-green-600 dark:text-green-400" : "text-gray-400"}>{c.pass ? "\u2713" : "\u2717"} {c.label}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
`);

// ─── CHMOD-CALCULATOR ───
add("chmod-calculator", `"use client";
import { useState } from "react";

export function ChmodCalculatorTool() {
  const [perms, setPerms] = useState([true,true,true,true,false,true,true,false,true]);
  const toggle = (i: number) => setPerms(perms.map((p,j) => j===i ? !p : p));
  const labels = ["Owner Read","Owner Write","Owner Execute","Group Read","Group Write","Group Execute","Others Read","Others Write","Others Execute"];
  const owner = (perms[0]?4:0)+(perms[1]?2:0)+(perms[2]?1:0);
  const group = (perms[3]?4:0)+(perms[4]?2:0)+(perms[5]?1:0);
  const others = (perms[6]?4:0)+(perms[7]?2:0)+(perms[8]?1:0);
  const numeric = "" + owner + group + others;
  const symbolic = (perms[0]?"r":"-")+(perms[1]?"w":"-")+(perms[2]?"x":"-")+(perms[3]?"r":"-")+(perms[4]?"w":"-")+(perms[5]?"x":"-")+(perms[6]?"r":"-")+(perms[7]?"w":"-")+(perms[8]?"x":"-");

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2 text-sm">
        {["Owner","Group","Others"].map((role,ri) => (
          <div key={role}>
            <p className="font-medium text-gray-700 dark:text-gray-300 mb-1">{role}</p>
            {["Read","Write","Execute"].map((perm,pi) => {const idx=ri*3+pi; return (
              <label key={perm} className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={perms[idx]} onChange={() => toggle(idx)} className="rounded text-brand-600" />
                <span className="text-gray-600 dark:text-gray-400">{perm}</span>
              </label>
            );})}
          </div>
        ))}
      </div>
      <div className="rounded-lg bg-gray-50 dark:bg-gray-800 p-4 font-mono text-sm space-y-1">
        <p className="text-gray-700 dark:text-gray-300">Numeric: <strong className="text-lg">{numeric}</strong></p>
        <p className="text-gray-700 dark:text-gray-300">Symbolic: <strong>{symbolic}</strong></p>
        <p className="text-gray-700 dark:text-gray-300">Command: <strong>chmod {numeric} filename</strong></p>
      </div>
    </div>
  );
}
`);

// ─── YAML-VALIDATOR ───
add("yaml-validator", `"use client";
import { useState } from "react";
import yaml from "js-yaml";

export function YamlValidatorTool() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<{valid:boolean;error?:string;json?:string}|null>(null);

  const validate = () => {
    try {
      const parsed = yaml.load(input);
      setResult({ valid: true, json: JSON.stringify(parsed, null, 2) });
    } catch (e: unknown) {
      setResult({ valid: false, error: e instanceof Error ? e.message : "Invalid YAML" });
    }
  };

  return (
    <div className="space-y-4">
      <textarea className="input-field min-h-[200px] font-mono" placeholder="Paste your YAML here..." value={input} onChange={e => { setInput(e.target.value); setResult(null); }} />
      <button onClick={validate} className="btn-primary text-sm">Validate YAML</button>
      {result && (
        <div className={"rounded-lg p-4 text-sm " + (result.valid ? "bg-green-50 text-green-700 border border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-800" : "bg-red-50 text-red-700 border border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-800")}>
          {result.valid ? (
            <>
              <p className="font-medium">\u2713 Valid YAML</p>
              <pre className="mt-2 text-xs overflow-x-auto">{result.json}</pre>
            </>
          ) : (
            <p>\u2717 {result.error}</p>
          )}
        </div>
      )}
    </div>
  );
}
`);

// ─── JSON-TO-XML ───
add("json-to-xml", `"use client";
import { useState } from "react";

function toXml(obj: unknown, root?: string): string {
  if (obj === null || obj === undefined) return "";
  if (typeof obj !== "object") return String(obj);
  if (Array.isArray(obj)) return obj.map(item => "<item>" + toXml(item) + "</item>").join("\\n");
  const lines: string[] = [];
  for (const [key, val] of Object.entries(obj as Record<string,unknown>)) {
    const tag = key.replace(/[^a-zA-Z0-9_]/g, "_");
    if (Array.isArray(val)) {
      val.forEach(item => lines.push("<" + tag + ">" + toXml(item) + "</" + tag + ">"));
    } else if (typeof val === "object" && val !== null) {
      lines.push("<" + tag + ">\\n" + toXml(val) + "\\n</" + tag + ">");
    } else {
      lines.push("<" + tag + ">" + String(val) + "</" + tag + ">");
    }
  }
  if (root) return "<" + root + ">\\n" + lines.join("\\n") + "\\n</" + root + ">";
  return lines.join("\\n");
}

export function JsonToXmlTool() {
  const [input, setInput] = useState('{"name":"John","age":30,"items":[1,2,3]}');
  const [output, setOutput] = useState("");

  const convert = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput('<?xml version="1.0" encoding="UTF-8"?>\\n' + toXml(parsed, "root"));
    } catch {
      setOutput("Error: Invalid JSON input");
    }
  };

  return (
    <div className="space-y-4">
      <textarea className="input-field min-h-[150px] font-mono" placeholder="Paste JSON here..." value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={convert} className="btn-primary text-sm">Convert to XML</button>
      <textarea className="input-field min-h-[150px] font-mono bg-gray-50 dark:bg-gray-800" readOnly value={output} />
      {output && <button onClick={() => navigator.clipboard.writeText(output)} className="btn-secondary text-sm">Copy XML</button>}
    </div>
  );
}
`);

// ─── JSON-TO-GRAPHQL ───
add("json-to-graphql", `"use client";
import { useState } from "react";

function inferType(val: unknown): string {
  if (val === null || val === undefined) return "String";
  if (typeof val === "boolean") return "Boolean";
  if (typeof val === "number") return Number.isInteger(val) ? "Int" : "Float";
  if (typeof val === "string") return "String";
  if (Array.isArray(val)) return "[" + (val.length > 0 ? inferType(val[0]) : "String") + "]";
  return "Object";
}

function jsonToGraphql(obj: unknown, name?: string): string {
  if (typeof obj !== "object" || obj === null || Array.isArray(obj)) return "";
  const typeName = name || "Root";
  const fields: string[] = [];
  const nested: string[] = [];
  for (const [key, val] of Object.entries(obj as Record<string,unknown>)) {
    if (typeof val === "object" && val !== null && !Array.isArray(val)) {
      const childType = key.charAt(0).toUpperCase() + key.slice(1);
      fields.push("  " + key + ": " + childType);
      nested.push(jsonToGraphql(val, childType));
    } else if (Array.isArray(val) && val.length > 0 && typeof val[0] === "object") {
      const childType = key.charAt(0).toUpperCase() + key.slice(1) + "Item";
      fields.push("  " + key + ": [" + childType + "]");
      nested.push(jsonToGraphql(val[0], childType));
    } else {
      fields.push("  " + key + ": " + inferType(val));
    }
  }
  return "type " + typeName + " {\\n" + fields.join("\\n") + "\\n}" + (nested.length ? "\\n\\n" + nested.join("\\n\\n") : "");
}

export function JsonToGraphqlTool() {
  const [input, setInput] = useState('{"user":{"name":"John","age":30},"posts":[{"title":"Hello","likes":5}]}');
  const [output, setOutput] = useState("");

  const convert = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(jsonToGraphql(parsed));
    } catch {
      setOutput("Error: Invalid JSON");
    }
  };

  return (
    <div className="space-y-4">
      <textarea className="input-field min-h-[150px] font-mono" placeholder="Paste JSON here..." value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={convert} className="btn-primary text-sm">Generate GraphQL Schema</button>
      <textarea className="input-field min-h-[150px] font-mono bg-gray-50 dark:bg-gray-800" readOnly value={output} />
      {output && <button onClick={() => navigator.clipboard.writeText(output)} className="btn-secondary text-sm">Copy</button>}
    </div>
  );
}
`);

// ─── HTML-FORMATTER ───
add("html-formatter", `"use client";
import { useState } from "react";

function beautifyHtml(html: string): string {
  const indent = "  ";
  let result = "";
  let level = 0;
  const tokens = html.replace(/>\\s*</g, ">\\n<").split("\\n");
  for (const token of tokens) {
    const t = token.trim();
    if (!t) continue;
    if (t.startsWith("</")) level = Math.max(0, level - 1);
    result += indent.repeat(level) + t + "\\n";
    if (t.startsWith("<") && !t.startsWith("</") && !t.startsWith("<!") && !t.endsWith("/>") && !t.includes("</")) level++;
  }
  return result.trim();
}

function minifyHtml(html: string): string {
  return html.replace(/\\n\\s*/g, "").replace(/>\\s+</g, "><").trim();
}

export function HtmlFormatterTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  return (
    <div className="space-y-4">
      <textarea className="input-field min-h-[200px] font-mono text-sm" placeholder="Paste HTML here..." value={input} onChange={e => setInput(e.target.value)} />
      <div className="flex gap-2">
        <button onClick={() => setOutput(beautifyHtml(input))} className="btn-primary text-sm">Beautify</button>
        <button onClick={() => setOutput(minifyHtml(input))} className="btn-secondary text-sm">Minify</button>
      </div>
      <textarea className="input-field min-h-[200px] font-mono text-sm bg-gray-50 dark:bg-gray-800" readOnly value={output} />
      {output && <button onClick={() => navigator.clipboard.writeText(output)} className="btn-secondary text-sm">Copy</button>}
    </div>
  );
}
`);

// ─── SVG-OPTIMIZER ───
add("svg-optimizer", `"use client";
import { useState } from "react";

function optimizeSvg(svg: string): string {
  let s = svg;
  s = s.replace(/<!--[\\s\\S]*?-->/g, "");
  s = s.replace(/\\s(xmlns:(?!svg)[a-z]+)="[^"]*"/gi, "");
  s = s.replace(/<metadata[\\s\\S]*?<\\/metadata>/gi, "");
  s = s.replace(/<desc[\\s\\S]*?<\\/desc>/gi, "");
  s = s.replace(/<title[\\s\\S]*?<\\/title>/gi, "");
  s = s.replace(/\\s{2,}/g, " ");
  s = s.replace(/>\\s+</g, "><");
  return s.trim();
}

export function SvgOptimizerTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const optimize = () => setOutput(optimizeSvg(input));
  const origSize = new Blob([input]).size;
  const optSize = new Blob([output]).size;
  const saved = origSize > 0 ? ((1 - optSize / origSize) * 100).toFixed(0) : "0";

  return (
    <div className="space-y-4">
      <textarea className="input-field min-h-[200px] font-mono text-sm" placeholder="Paste SVG markup here..." value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={optimize} className="btn-primary text-sm">Optimize SVG</button>
      {output && (
        <p className="text-xs text-gray-500">{origSize} \u2192 {optSize} bytes ({saved}% saved)</p>
      )}
      <textarea className="input-field min-h-[200px] font-mono text-sm bg-gray-50 dark:bg-gray-800" readOnly value={output} />
      {output && <button onClick={() => navigator.clipboard.writeText(output)} className="btn-secondary text-sm">Copy</button>}
    </div>
  );
}
`);

// ─── CSV-TO-TABLE ───
add("csv-to-table", `"use client";
import { useState } from "react";

export function CsvToTableTool() {
  const [input, setInput] = useState("Name,Age,City\\nAlice,30,NYC\\nBob,25,LA");
  const [sep, setSep] = useState(",");
  const rows = input.trim().split("\\n").map(r => r.split(sep));
  const headers = rows[0] || [];
  const body = rows.slice(1);
  const html = "<table>\\n  <thead>\\n    <tr>" + headers.map(h => "<th>" + h.trim() + "</th>").join("") + "</tr>\\n  </thead>\\n  <tbody>\\n" + body.map(r => "    <tr>" + r.map(c => "<td>" + c.trim() + "</td>").join("") + "</tr>").join("\\n") + "\\n  </tbody>\\n</table>";

  return (
    <div className="space-y-4">
      <textarea className="input-field min-h-[150px] font-mono text-sm" placeholder="Paste CSV data..." value={input} onChange={e => setInput(e.target.value)} />
      <div className="flex items-center gap-2">
        <label className="text-sm text-gray-600 dark:text-gray-400">Separator:</label>
        <select className="input-field w-24" value={sep} onChange={e => setSep(e.target.value)}>
          <option value=",">Comma</option>
          <option value="\\t">Tab</option>
          <option value=";">Semicolon</option>
        </select>
      </div>
      {headers.length > 0 && (
        <div className="overflow-x-auto border rounded-lg dark:border-gray-700">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800"><tr>{headers.map((h,i) => <th key={i} className="px-3 py-2 text-left font-medium text-gray-700 dark:text-gray-300">{h.trim()}</th>)}</tr></thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">{body.map((r,i) => <tr key={i}>{r.map((c,j) => <td key={j} className="px-3 py-2 text-gray-600 dark:text-gray-400">{c.trim()}</td>)}</tr>)}</tbody>
          </table>
        </div>
      )}
      <textarea className="input-field min-h-[100px] font-mono text-xs bg-gray-50 dark:bg-gray-800" readOnly value={html} />
      <button onClick={() => navigator.clipboard.writeText(html)} className="btn-secondary text-sm">Copy HTML</button>
    </div>
  );
}
`);

// ─── JSON-TO-TABLE ───
add("json-to-table", `"use client";
import { useState } from "react";

export function JsonToTableTool() {
  const [input, setInput] = useState('[{"name":"Alice","age":30},{"name":"Bob","age":25}]');
  const [data, setData] = useState<Record<string,unknown>[]|null>(null);
  const [error, setError] = useState("");

  const parse = () => {
    try {
      const parsed = JSON.parse(input);
      const arr = Array.isArray(parsed) ? parsed : [parsed];
      setData(arr);
      setError("");
    } catch {
      setError("Invalid JSON");
      setData(null);
    }
  };

  const headers = data && data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <div className="space-y-4">
      <textarea className="input-field min-h-[150px] font-mono text-sm" placeholder="Paste JSON array..." value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={parse} className="btn-primary text-sm">View as Table</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {data && headers.length > 0 && (
        <div className="overflow-x-auto border rounded-lg dark:border-gray-700">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800"><tr>{headers.map(h => <th key={h} className="px-3 py-2 text-left font-medium text-gray-700 dark:text-gray-300">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">{data.map((row,i) => <tr key={i}>{headers.map(h => <td key={h} className="px-3 py-2 text-gray-600 dark:text-gray-400">{String(row[h] ?? "")}</td>)}</tr>)}</tbody>
          </table>
        </div>
      )}
    </div>
  );
}
`);

// ─── KEYWORD-DENSITY-CHECKER ───
add("keyword-density-checker", `"use client";
import { useState } from "react";

export function KeywordDensityCheckerTool() {
  const [input, setInput] = useState("");
  const words = input.toLowerCase().replace(/[^a-z0-9\\s]/g, "").split(/\\s+/).filter(Boolean);
  const total = words.length;
  const freq: Record<string,number> = {};
  words.forEach(w => { freq[w] = (freq[w]||0) + 1; });
  const sorted = Object.entries(freq).sort((a,b) => b[1]-a[1]).slice(0, 30);

  return (
    <div className="space-y-4">
      <textarea className="input-field min-h-[150px]" placeholder="Paste your content here to analyze keyword density..." value={input} onChange={e => setInput(e.target.value)} />
      {total > 0 && (
        <div className="rounded-lg bg-gray-50 dark:bg-gray-800 p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{total} words, {Object.keys(freq).length} unique</p>
          <table className="w-full text-sm">
            <thead><tr><th className="text-left py-1 text-gray-500">Keyword</th><th className="text-right py-1 text-gray-500">Count</th><th className="text-right py-1 text-gray-500">Density</th></tr></thead>
            <tbody>
              {sorted.map(([word, count]) => (
                <tr key={word} className="border-t border-gray-200 dark:border-gray-700">
                  <td className="py-1 font-mono text-gray-700 dark:text-gray-300">{word}</td>
                  <td className="py-1 text-right text-gray-600 dark:text-gray-400">{count}</td>
                  <td className="py-1 text-right text-gray-600 dark:text-gray-400">{(count/total*100).toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
`);

// ─── HEADING-ANALYZER ───
add("heading-analyzer", `"use client";
import { useState } from "react";

const POWER_WORDS = ["free","new","you","best","how","secret","proven","easy","amazing","instant","guaranteed","discover","exclusive","ultimate"];
const EMOTIONAL_WORDS = ["love","hate","fear","shocking","surprising","unbelievable","incredible","terrifying","brilliant","devastating"];

export function HeadingAnalyzerTool() {
  const [headline, setHeadline] = useState("");
  const words = headline.trim().split(/\\s+/).filter(Boolean);
  const wordCount = words.length;
  const charCount = headline.length;
  const power = words.filter(w => POWER_WORDS.includes(w.toLowerCase())).length;
  const emotional = words.filter(w => EMOTIONAL_WORDS.includes(w.toLowerCase())).length;
  const hasNumber = /\\d/.test(headline);
  let score = 0;
  if (wordCount >= 6 && wordCount <= 13) score += 25;
  else if (wordCount >= 4) score += 15;
  if (charCount <= 70) score += 20;
  if (power > 0) score += 20;
  if (emotional > 0) score += 15;
  if (hasNumber) score += 10;
  if (headline[0] === headline[0]?.toUpperCase()) score += 10;

  return (
    <div className="space-y-4">
      <input className="input-field text-lg" placeholder="Enter your headline..." value={headline} onChange={e => setHeadline(e.target.value)} />
      {headline && (
        <div className="rounded-lg bg-gray-50 dark:bg-gray-800 p-4 space-y-3 text-sm">
          <div className="flex items-center gap-3">
            <span className={"text-2xl font-bold " + (score >= 70 ? "text-green-600" : score >= 40 ? "text-yellow-600" : "text-red-600")}>{score}/100</span>
            <span className="text-gray-600 dark:text-gray-400">{score >= 70 ? "Great headline!" : score >= 40 ? "Good, but could improve" : "Needs work"}</span>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            <p className="text-gray-600 dark:text-gray-400">Words: <strong>{wordCount}</strong> {wordCount >= 6 && wordCount <= 13 ? "\u2713" : "(aim for 6\u201313)"}</p>
            <p className="text-gray-600 dark:text-gray-400">Characters: <strong>{charCount}</strong> {charCount <= 70 ? "\u2713" : "(keep under 70)"}</p>
            <p className="text-gray-600 dark:text-gray-400">Power words: <strong>{power}</strong></p>
            <p className="text-gray-600 dark:text-gray-400">Emotional words: <strong>{emotional}</strong></p>
            <p className="text-gray-600 dark:text-gray-400">Has number: <strong>{hasNumber ? "Yes \u2713" : "No"}</strong></p>
          </div>
        </div>
      )}
    </div>
  );
}
`);

// ─── READABILITY-SCORE ───
add("readability-score", `"use client";
import { useState } from "react";

function countSyllables(word: string): number {
  const w = word.toLowerCase().replace(/[^a-z]/g, "");
  if (w.length <= 3) return 1;
  let count = w.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "").match(/[aeiouy]{1,2}/g)?.length || 1;
  return Math.max(1, count);
}

export function ReadabilityScoreTool() {
  const [input, setInput] = useState("");
  const sentences = input.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const words = input.split(/\\s+/).filter(w => w.replace(/[^a-z]/gi, "").length > 0);
  const syllables = words.reduce((s, w) => s + countSyllables(w), 0);
  const sentenceCount = Math.max(1, sentences.length);
  const wordCount = Math.max(1, words.length);
  const flesch = 206.835 - 1.015 * (wordCount / sentenceCount) - 84.6 * (syllables / wordCount);
  const fk = 0.39 * (wordCount / sentenceCount) + 11.8 * (syllables / wordCount) - 15.59;
  const level = flesch >= 80 ? "Easy (6th grade)" : flesch >= 60 ? "Standard (8th-9th grade)" : flesch >= 40 ? "Difficult (college)" : "Very Difficult (graduate)";

  return (
    <div className="space-y-4">
      <textarea className="input-field min-h-[200px]" placeholder="Paste your text to analyze readability..." value={input} onChange={e => setInput(e.target.value)} />
      {words.length > 2 && (
        <div className="rounded-lg bg-gray-50 dark:bg-gray-800 p-4 space-y-2 text-sm">
          <p className="text-gray-700 dark:text-gray-300">Flesch Reading Ease: <strong className="text-lg">{flesch.toFixed(1)}</strong></p>
          <p className="text-gray-700 dark:text-gray-300">Flesch-Kincaid Grade: <strong>{fk.toFixed(1)}</strong></p>
          <p className="text-gray-700 dark:text-gray-300">Level: <strong>{level}</strong></p>
          <hr className="border-gray-200 dark:border-gray-700" />
          <div className="grid grid-cols-3 gap-2 text-gray-600 dark:text-gray-400">
            <p>Words: {wordCount}</p>
            <p>Sentences: {sentenceCount}</p>
            <p>Syllables: {syllables}</p>
          </div>
        </div>
      )}
    </div>
  );
}
`);

// ─── SERP-PREVIEW ───
add("serp-preview", `"use client";
import { useState } from "react";

export function SerpPreviewTool() {
  const [title, setTitle] = useState("Your Page Title - Brand Name");
  const [url, setUrl] = useState("https://example.com/page");
  const [desc, setDesc] = useState("This is the meta description that appears in search results. Keep it under 160 characters for best results.");

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title Tag <span className="text-gray-400">({title.length}/60)</span></label>
        <input className="input-field" value={title} onChange={e => setTitle(e.target.value)} />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">URL</label>
        <input className="input-field font-mono text-sm" value={url} onChange={e => setUrl(e.target.value)} />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Meta Description <span className="text-gray-400">({desc.length}/160)</span></label>
        <textarea className="input-field min-h-[80px]" value={desc} onChange={e => setDesc(e.target.value)} />
      </div>
      <div className="mt-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
        <p className="text-xs text-gray-500 mb-1">Google Search Preview</p>
        <div>
          <p className="text-[#1a0dab] text-lg leading-tight hover:underline cursor-pointer" style={{fontFamily:"arial,sans-serif"}}>{title.slice(0, 60) || "Page Title"}</p>
          <p className="text-sm text-[#006621] mt-0.5" style={{fontFamily:"arial,sans-serif"}}>{url}</p>
          <p className="text-sm text-[#545454] mt-0.5 line-clamp-2" style={{fontFamily:"arial,sans-serif"}}>{desc.slice(0, 160) || "Meta description..."}</p>
        </div>
      </div>
    </div>
  );
}
`);

// ─── CANONICAL-TAG-GENERATOR ───
add("canonical-tag-generator", `"use client";
import { useState } from "react";

export function CanonicalTagGeneratorTool() {
  const [url, setUrl] = useState("https://example.com/page");
  const tag = '<link rel="canonical" href="' + url + '" />';

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Canonical URL</label>
        <input className="input-field font-mono" value={url} onChange={e => setUrl(e.target.value)} placeholder="https://example.com/page" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Generated Tag</label>
        <textarea className="input-field font-mono text-sm bg-gray-50 dark:bg-gray-800 min-h-[60px]" readOnly value={tag} />
      </div>
      <button onClick={() => navigator.clipboard.writeText(tag)} className="btn-primary text-sm">Copy Tag</button>
    </div>
  );
}
`);

// ─── SCHEMA-MARKUP-GENERATOR ───
add("schema-markup-generator", `"use client";
import { useState } from "react";

const SCHEMAS = ["Article","FAQ","Product","LocalBusiness","Event"];

export function SchemaMarkupGeneratorTool() {
  const [type, setType] = useState("Article");
  const [fields, setFields] = useState<Record<string,string>>({ name: "My Article", description: "Article description", url: "https://example.com" });
  const update = (k: string, v: string) => setFields({...fields, [k]: v});

  const FIELD_MAP: Record<string,string[]> = {
    Article: ["name","description","url","author","datePublished"],
    FAQ: ["name","description"],
    Product: ["name","description","price","currency","brand"],
    LocalBusiness: ["name","description","address","telephone","url"],
    Event: ["name","description","startDate","location","url"],
  };

  const schema: Record<string,unknown> = { "@context": "https://schema.org", "@type": type };
  (FIELD_MAP[type]||[]).forEach(f => { if (fields[f]) schema[f] = fields[f]; });

  const output = JSON.stringify(schema, null, 2);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Schema Type</label>
        <select className="input-field" value={type} onChange={e => setType(e.target.value)}>
          {SCHEMAS.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      {(FIELD_MAP[type]||[]).map(f => (
        <div key={f}>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 capitalize">{f}</label>
          <input className="input-field" value={fields[f]||""} onChange={e => update(f, e.target.value)} />
        </div>
      ))}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">JSON-LD Output</label>
        <textarea className="input-field font-mono text-sm bg-gray-50 dark:bg-gray-800 min-h-[200px]" readOnly value={'<script type="application/ld+json">\\n' + output + '\\n</script>'} />
      </div>
      <button onClick={() => navigator.clipboard.writeText('<script type="application/ld+json">\\n' + output + '\\n</script>')} className="btn-primary text-sm">Copy</button>
    </div>
  );
}
`);

// ─── HTACCESS-GENERATOR ───
add("htaccess-generator", `"use client";
import { useState } from "react";

export function HtaccessGeneratorTool() {
  const [wwwRedirect, setWwwRedirect] = useState(true);
  const [httpsRedirect, setHttpsRedirect] = useState(true);
  const [gzip, setGzip] = useState(true);
  const [caching, setCaching] = useState(true);
  const [hotlink, setHotlink] = useState(false);
  const [domain, setDomain] = useState("example.com");

  let output = "# Generated .htaccess\\n";
  if (httpsRedirect) output += "\\nRewriteEngine On\\nRewriteCond %{HTTPS} off\\nRewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]\\n";
  if (wwwRedirect) output += "\\nRewriteCond %{HTTP_HOST} ^www\\\\." + domain.replace(/\\./g,"\\\\.") + " [NC]\\nRewriteRule ^(.*)$ https://" + domain + "/$1 [L,R=301]\\n";
  if (gzip) output += "\\n<IfModule mod_deflate.c>\\n  AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript application/json image/svg+xml\\n</IfModule>\\n";
  if (caching) output += "\\n<IfModule mod_expires.c>\\n  ExpiresActive On\\n  ExpiresByType text/css \\"access plus 1 month\\"\\n  ExpiresByType application/javascript \\"access plus 1 month\\"\\n  ExpiresByType image/png \\"access plus 1 year\\"\\n  ExpiresByType image/jpeg \\"access plus 1 year\\"\\n</IfModule>\\n";
  if (hotlink) output += "\\nRewriteCond %{HTTP_REFERER} !^$\\nRewriteCond %{HTTP_REFERER} !^https?://(www\\\\.)?" + domain.replace(/\\./g,"\\\\.") + " [NC]\\nRewriteRule \\\\.(jpg|jpeg|png|gif|svg)$ - [F,L]\\n";

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Domain</label>
        <input className="input-field" value={domain} onChange={e => setDomain(e.target.value)} />
      </div>
      <div className="space-y-2 text-sm">
        {[["HTTPS redirect",httpsRedirect,setHttpsRedirect],["Remove www",wwwRedirect,setWwwRedirect],["Enable GZIP",gzip,setGzip],["Browser caching",caching,setCaching],["Hotlink protection",hotlink,setHotlink]].map(([label,val,setter]) => (
          <label key={String(label)} className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={val as boolean} onChange={e => (setter as (v:boolean)=>void)(e.target.checked)} className="rounded text-brand-600" />
            <span className="text-gray-700 dark:text-gray-300">{label as string}</span>
          </label>
        ))}
      </div>
      <textarea className="input-field font-mono text-sm bg-gray-50 dark:bg-gray-800 min-h-[250px]" readOnly value={output} />
      <button onClick={() => navigator.clipboard.writeText(output)} className="btn-primary text-sm">Copy .htaccess</button>
    </div>
  );
}
`);

// ─── TEXT-ENCRYPTION ───
add("text-encryption", `"use client";
import { useState } from "react";

async function encrypt(text: string, password: string): Promise<string> {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, ["deriveKey"]);
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const key = await crypto.subtle.deriveKey({name:"PBKDF2",salt,iterations:100000,hash:"SHA-256"}, keyMaterial, {name:"AES-GCM",length:256}, false, ["encrypt"]);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encrypted = await crypto.subtle.encrypt({name:"AES-GCM",iv}, key, enc.encode(text));
  const result = new Uint8Array(salt.length + iv.length + encrypted.byteLength);
  result.set(salt, 0);
  result.set(iv, salt.length);
  result.set(new Uint8Array(encrypted), salt.length + iv.length);
  return btoa(String.fromCharCode(...result));
}

async function decrypt(data: string, password: string): Promise<string> {
  const enc = new TextEncoder();
  const raw = Uint8Array.from(atob(data), c => c.charCodeAt(0));
  const salt = raw.slice(0, 16);
  const iv = raw.slice(16, 28);
  const ciphertext = raw.slice(28);
  const keyMaterial = await crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, ["deriveKey"]);
  const key = await crypto.subtle.deriveKey({name:"PBKDF2",salt,iterations:100000,hash:"SHA-256"}, keyMaterial, {name:"AES-GCM",length:256}, false, ["decrypt"]);
  const decrypted = await crypto.subtle.decrypt({name:"AES-GCM",iv}, key, ciphertext);
  return new TextDecoder().decode(decrypted);
}

export function TextEncryptionTool() {
  const [input, setInput] = useState("");
  const [password, setPassword] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const doEncrypt = async () => { try { setError(""); setOutput(await encrypt(input, password)); } catch { setError("Encryption failed"); } };
  const doDecrypt = async () => { try { setError(""); setOutput(await decrypt(input, password)); } catch { setError("Decryption failed - wrong password?"); } };

  return (
    <div className="space-y-4">
      <textarea className="input-field min-h-[120px] font-mono" placeholder="Enter text to encrypt or ciphertext to decrypt..." value={input} onChange={e => setInput(e.target.value)} />
      <input type="password" className="input-field" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} autoComplete="off" />
      <div className="flex gap-2">
        <button onClick={doEncrypt} className="btn-primary text-sm" disabled={!password}>Encrypt (AES-256)</button>
        <button onClick={doDecrypt} className="btn-secondary text-sm" disabled={!password}>Decrypt</button>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <textarea className="input-field min-h-[120px] font-mono bg-gray-50 dark:bg-gray-800" readOnly value={output} />
      {output && <button onClick={() => navigator.clipboard.writeText(output)} className="btn-secondary text-sm">Copy</button>}
    </div>
  );
}
`);

// ─── TEXT-TO-SPEECH ───
add("text-to-speech", `"use client";
import { useState, useEffect } from "react";

export function TextToSpeechTool() {
  const [text, setText] = useState("");
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voiceIdx, setVoiceIdx] = useState(0);
  const [rate, setRate] = useState(1);
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    const load = () => setVoices(speechSynthesis.getVoices());
    load();
    speechSynthesis.onvoiceschanged = load;
  }, []);

  const speak = () => {
    speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    if (voices[voiceIdx]) utter.voice = voices[voiceIdx];
    utter.rate = rate;
    utter.onend = () => setSpeaking(false);
    setSpeaking(true);
    speechSynthesis.speak(utter);
  };

  const stop = () => { speechSynthesis.cancel(); setSpeaking(false); };

  return (
    <div className="space-y-4">
      <textarea className="input-field min-h-[150px]" placeholder="Enter text to speak..." value={text} onChange={e => setText(e.target.value)} />
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Voice</label>
          <select className="input-field text-sm" value={voiceIdx} onChange={e => setVoiceIdx(+e.target.value)}>
            {voices.map((v, i) => <option key={i} value={i}>{v.name} ({v.lang})</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Speed: {rate}x</label>
          <input type="range" min="0.5" max="2" step="0.1" value={rate} onChange={e => setRate(+e.target.value)} className="w-full" />
        </div>
      </div>
      <div className="flex gap-2">
        <button onClick={speak} className="btn-primary text-sm" disabled={!text || speaking}>Speak</button>
        <button onClick={stop} className="btn-secondary text-sm" disabled={!speaking}>Stop</button>
      </div>
    </div>
  );
}
`);

// ─── IMAGE-TO-BASE64 ───
add("image-to-base64", `"use client";
import { useState, useCallback } from "react";
import { FileDropZone } from "@/components/FileDropZone";

export function ImageToBase64Tool() {
  const [result, setResult] = useState("");

  const handleFile = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = () => setResult(reader.result as string);
    reader.readAsDataURL(file);
  }, []);

  return (
    <div className="space-y-4">
      <FileDropZone accept="image/*" onFile={handleFile} label="Drop an image to convert" maxSizeMB={10} />
      {result && (
        <>
          <textarea className="input-field font-mono text-xs min-h-[200px] bg-gray-50 dark:bg-gray-800" readOnly value={result} />
          <div className="flex gap-2">
            <button onClick={() => navigator.clipboard.writeText(result)} className="btn-primary text-sm">Copy Data URI</button>
            <button onClick={() => setResult("")} className="btn-secondary text-sm">Clear</button>
          </div>
        </>
      )}
    </div>
  );
}
`);

// ─── SVG-TO-PNG ───
add("svg-to-png", `"use client";
import { useState, useCallback } from "react";
import { FileDropZone } from "@/components/FileDropZone";
import { downloadBlob } from "@/lib/utils";

export function SvgToPngTool() {
  const [result, setResult] = useState<{blob:Blob;url:string}|null>(null);
  const [scale, setScale] = useState(2);

  const handleFile = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const svgText = reader.result as string;
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth * scale;
        canvas.height = img.naturalHeight * scale;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(blob => {
          if (blob) setResult({ blob, url: URL.createObjectURL(blob) });
        }, "image/png");
      };
      img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgText)));
    };
    reader.readAsText(file);
  }, [scale]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <label className="text-sm text-gray-600 dark:text-gray-400">Scale:</label>
        {[1,2,3,4].map(s => <button key={s} onClick={() => setScale(s)} className={s===scale ? "btn-primary text-xs" : "btn-secondary text-xs"}>{s}x</button>)}
      </div>
      <FileDropZone accept="image/svg+xml,.svg" onFile={handleFile} label="Drop an SVG file" maxSizeMB={10} />
      {result && (
        <div className="space-y-3">
          <img src={result.url} alt="Converted" className="max-h-64 rounded border border-gray-200 dark:border-gray-700" />
          <button onClick={() => downloadBlob(result.blob, "converted.png")} className="btn-primary text-sm">Download PNG</button>
        </div>
      )}
    </div>
  );
}
`);

// ─── WEBP-TO-PNG ───
add("webp-to-png", `"use client";
import { useState, useCallback } from "react";
import { FileDropZone } from "@/components/FileDropZone";
import { downloadBlob } from "@/lib/utils";

export function WebpToPngTool() {
  const [results, setResults] = useState<{name:string;blob:Blob;url:string;size:number}[]>([]);
  const [processing, setProcessing] = useState(false);

  const handleFiles = useCallback(async (files: File[]) => {
    setProcessing(true);
    const converted: typeof results = [];
    for (const file of files) {
      const img = new Image();
      const url = URL.createObjectURL(file);
      await new Promise<void>(res => { img.onload = () => res(); img.src = url; });
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth; canvas.height = img.naturalHeight;
      canvas.getContext("2d")!.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);
      const blob = await new Promise<Blob>((res, rej) => canvas.toBlob(b => b ? res(b) : rej(), "image/png"));
      converted.push({ name: file.name.replace(/\\.[^.]+$/, ".png"), blob, url: URL.createObjectURL(blob), size: blob.size });
    }
    setResults(prev => [...prev, ...converted]);
    setProcessing(false);
  }, []);

  return (
    <div className="space-y-4">
      <FileDropZone accept="image/webp,.webp" onFiles={handleFiles} multiple label="Drop WebP images" maxSizeMB={20} />
      {processing && <p className="text-sm text-gray-500">Converting...</p>}
      {results.map((r, i) => (
        <div key={i} className="flex items-center gap-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-3">
          <img src={r.url} alt="" className="h-12 w-12 rounded object-cover" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate text-gray-900 dark:text-gray-100">{r.name}</p>
            <p className="text-xs text-gray-500">{(r.size/1024).toFixed(1)} KB</p>
          </div>
          <button onClick={() => downloadBlob(r.blob, r.name)} className="btn-primary text-xs px-3 py-1.5">Download</button>
        </div>
      ))}
    </div>
  );
}
`);

// ─── PNG-TO-WEBP ───
add("png-to-webp", `"use client";
import { useState, useCallback } from "react";
import { FileDropZone } from "@/components/FileDropZone";
import { downloadBlob } from "@/lib/utils";

export function PngToWebpTool() {
  const [results, setResults] = useState<{name:string;blob:Blob;url:string;origSize:number;newSize:number}[]>([]);
  const [processing, setProcessing] = useState(false);

  const handleFiles = useCallback(async (files: File[]) => {
    setProcessing(true);
    const converted: typeof results = [];
    for (const file of files) {
      const img = new Image();
      const url = URL.createObjectURL(file);
      await new Promise<void>(res => { img.onload = () => res(); img.src = url; });
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth; canvas.height = img.naturalHeight;
      canvas.getContext("2d")!.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);
      const blob = await new Promise<Blob>((res, rej) => canvas.toBlob(b => b ? res(b) : rej(), "image/webp", 0.9));
      converted.push({ name: file.name.replace(/\\.[^.]+$/, ".webp"), blob, url: URL.createObjectURL(blob), origSize: file.size, newSize: blob.size });
    }
    setResults(prev => [...prev, ...converted]);
    setProcessing(false);
  }, []);

  return (
    <div className="space-y-4">
      <FileDropZone accept="image/png,image/jpeg,image/bmp" onFiles={handleFiles} multiple label="Drop images to convert to WebP" maxSizeMB={20} />
      {processing && <p className="text-sm text-gray-500">Converting...</p>}
      {results.map((r, i) => (
        <div key={i} className="flex items-center gap-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-3">
          <img src={r.url} alt="" className="h-12 w-12 rounded object-cover" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate text-gray-900 dark:text-gray-100">{r.name}</p>
            <p className="text-xs text-gray-500">{(r.origSize/1024).toFixed(0)}KB \u2192 {(r.newSize/1024).toFixed(0)}KB</p>
          </div>
          <button onClick={() => downloadBlob(r.blob, r.name)} className="btn-primary text-xs px-3 py-1.5">Download</button>
        </div>
      ))}
    </div>
  );
}
`);

// ─── IMAGE-COLOR-PICKER ───
add("image-color-picker", `"use client";
import { useState, useRef, useCallback } from "react";
import { FileDropZone } from "@/components/FileDropZone";

export function ImageColorPickerTool() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageUrl, setImageUrl] = useState<string|null>(null);
  const [color, setColor] = useState<{hex:string;r:number;g:number;b:number}|null>(null);

  const handleFile = useCallback((file: File) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current!;
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      canvas.getContext("2d")!.drawImage(img, 0, 0);
      setImageUrl(url);
    };
    img.src = url;
  }, []);

  const pickColor = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) * (canvas.width / rect.width));
    const y = Math.floor((e.clientY - rect.top) * (canvas.height / rect.height));
    const [r,g,b] = canvas.getContext("2d")!.getImageData(x, y, 1, 1).data;
    const hex = "#" + [r,g,b].map(v => v.toString(16).padStart(2,"0")).join("");
    setColor({hex,r,g,b});
  };

  return (
    <div className="space-y-4">
      {!imageUrl && <FileDropZone accept="image/*" onFile={handleFile} label="Drop an image to pick colors" maxSizeMB={20} />}
      <canvas ref={canvasRef} onClick={pickColor} className={"max-w-full rounded border border-gray-200 dark:border-gray-700 " + (imageUrl ? "cursor-crosshair" : "hidden")} />
      {color && (
        <div className="flex items-center gap-4 rounded-lg bg-gray-50 dark:bg-gray-800 p-4">
          <div className="h-12 w-12 rounded border border-gray-300 dark:border-gray-600" style={{backgroundColor:color.hex}} />
          <div className="text-sm font-mono space-y-0.5">
            <p className="text-gray-700 dark:text-gray-300">{color.hex.toUpperCase()}</p>
            <p className="text-gray-500">rgb({color.r}, {color.g}, {color.b})</p>
          </div>
          <button onClick={() => navigator.clipboard.writeText(color.hex)} className="btn-primary text-xs ml-auto">Copy HEX</button>
        </div>
      )}
      {imageUrl && <button onClick={() => { setImageUrl(null); setColor(null); }} className="btn-secondary text-sm">New Image</button>}
    </div>
  );
}
`);

// ─── IMAGE-CROPPER ───
add("image-cropper", `"use client";
import { useState, useRef, useCallback } from "react";
import { FileDropZone } from "@/components/FileDropZone";
import { downloadBlob } from "@/lib/utils";

export function ImageCropperTool() {
  const imgRef = useRef<HTMLImageElement>(null);
  const [imageUrl, setImageUrl] = useState<string|null>(null);
  const [crop, setCrop] = useState({x:0,y:0,w:200,h:200});
  const [imgSize, setImgSize] = useState({w:0,h:0});

  const handleFile = useCallback((file: File) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => { setImgSize({w:img.naturalWidth,h:img.naturalHeight}); setCrop({x:0,y:0,w:Math.min(200,img.naturalWidth),h:Math.min(200,img.naturalHeight)}); };
    img.src = url;
    setImageUrl(url);
  }, []);

  const doCrop = () => {
    if (!imageUrl) return;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = crop.w; canvas.height = crop.h;
      canvas.getContext("2d")!.drawImage(img, crop.x, crop.y, crop.w, crop.h, 0, 0, crop.w, crop.h);
      canvas.toBlob(blob => { if (blob) downloadBlob(blob, "cropped.png"); }, "image/png");
    };
    img.src = imageUrl;
  };

  return (
    <div className="space-y-4">
      {!imageUrl && <FileDropZone accept="image/*" onFile={handleFile} label="Drop an image to crop" maxSizeMB={20} />}
      {imageUrl && (
        <>
          <img ref={imgRef} src={imageUrl} alt="Preview" className="max-w-full max-h-64 rounded border border-gray-200 dark:border-gray-700" />
          <div className="grid gap-3 sm:grid-cols-4">
            <div><label className="text-xs text-gray-500">X</label><input type="number" className="input-field text-sm" value={crop.x} onChange={e => setCrop({...crop,x:+e.target.value})} min={0} max={imgSize.w} /></div>
            <div><label className="text-xs text-gray-500">Y</label><input type="number" className="input-field text-sm" value={crop.y} onChange={e => setCrop({...crop,y:+e.target.value})} min={0} max={imgSize.h} /></div>
            <div><label className="text-xs text-gray-500">Width</label><input type="number" className="input-field text-sm" value={crop.w} onChange={e => setCrop({...crop,w:+e.target.value})} min={1} /></div>
            <div><label className="text-xs text-gray-500">Height</label><input type="number" className="input-field text-sm" value={crop.h} onChange={e => setCrop({...crop,h:+e.target.value})} min={1} /></div>
          </div>
          <div className="flex gap-2">
            <button onClick={doCrop} className="btn-primary text-sm">Crop & Download</button>
            <button onClick={() => setImageUrl(null)} className="btn-secondary text-sm">New Image</button>
          </div>
        </>
      )}
    </div>
  );
}
`);

// ─── MARKDOWN-EDITOR ───
add("markdown-editor", `"use client";
import { useState, useMemo } from "react";

function markdownToHtml(md: string): string {
  let html = md;
  html = html.replace(/^### (.+)$/gm, "<h3>$1</h3>");
  html = html.replace(/^## (.+)$/gm, "<h2>$1</h2>");
  html = html.replace(/^# (.+)$/gm, "<h1>$1</h1>");
  html = html.replace(/\\*\\*(.+?)\\*\\*/g, "<strong>$1</strong>");
  html = html.replace(/\\*(.+?)\\*/g, "<em>$1</em>");
  html = html.replace(/\\\`(.+?)\\\`/g, "<code>$1</code>");
  html = html.replace(/^\\- (.+)$/gm, "<li>$1</li>");
  html = html.replace(/(<li>.*<\\/li>)/gs, "<ul>$1</ul>");
  html = html.replace(/\\[(.+?)\\]\\((.+?)\\)/g, '<a href="$2">$1</a>');
  html = html.replace(/^(?!<[hulo])(.*\\S.*)$/gm, "<p>$1</p>");
  return html;
}

export function MarkdownEditorTool() {
  const [md, setMd] = useState("# Hello World\\n\\nThis is **bold** and *italic* text.\\n\\n## Features\\n\\n- Item one\\n- Item two\\n\\nVisit [example](https://example.com)");
  const html = useMemo(() => markdownToHtml(md), [md]);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Markdown</label>
          <textarea className="input-field min-h-[300px] font-mono text-sm" value={md} onChange={e => setMd(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Preview</label>
          <div className="input-field min-h-[300px] prose prose-sm dark:prose-invert overflow-auto" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </div>
      <button onClick={() => navigator.clipboard.writeText(html)} className="btn-primary text-sm">Copy HTML</button>
    </div>
  );
}
`);

// ─── CSS-GRADIENT-GENERATOR ───
add("css-gradient-generator", `"use client";
import { useState } from "react";

export function CssGradientGeneratorTool() {
  const [type, setType] = useState("linear");
  const [angle, setAngle] = useState(135);
  const [color1, setColor1] = useState("#667eea");
  const [color2, setColor2] = useState("#764ba2");
  const gradient = type === "linear" ? "linear-gradient(" + angle + "deg, " + color1 + ", " + color2 + ")" : "radial-gradient(circle, " + color1 + ", " + color2 + ")";
  const css = "background: " + gradient + ";";

  return (
    <div className="space-y-4">
      <div className="h-40 rounded-lg border border-gray-200 dark:border-gray-700" style={{background: gradient}} />
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex gap-2 items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Color 1</label>
            <div className="flex gap-2"><input type="color" value={color1} onChange={e => setColor1(e.target.value)} className="h-10 w-10" /><input className="input-field font-mono text-sm flex-1" value={color1} onChange={e => setColor1(e.target.value)} /></div>
          </div>
        </div>
        <div className="flex gap-2 items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Color 2</label>
            <div className="flex gap-2"><input type="color" value={color2} onChange={e => setColor2(e.target.value)} className="h-10 w-10" /><input className="input-field font-mono text-sm flex-1" value={color2} onChange={e => setColor2(e.target.value)} /></div>
          </div>
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <select className="input-field w-32" value={type} onChange={e => setType(e.target.value)}>
          <option value="linear">Linear</option>
          <option value="radial">Radial</option>
        </select>
        {type === "linear" && (
          <div className="flex-1 flex items-center gap-2">
            <label className="text-sm text-gray-600 dark:text-gray-400">Angle:</label>
            <input type="range" min={0} max={360} value={angle} onChange={e => setAngle(+e.target.value)} className="flex-1" />
            <span className="text-sm text-gray-600 dark:text-gray-400 w-10">{angle}\u00b0</span>
          </div>
        )}
      </div>
      <textarea className="input-field font-mono text-sm bg-gray-50 dark:bg-gray-800 min-h-[60px]" readOnly value={css} />
      <button onClick={() => navigator.clipboard.writeText(css)} className="btn-primary text-sm">Copy CSS</button>
    </div>
  );
}
`);

// ─── LIVE-HTML-PREVIEW ───
add("live-html-preview", `"use client";
import { useState } from "react";

export function LiveHtmlPreviewTool() {
  const [html, setHtml] = useState('<h1 style="color:blue">Hello World</h1>\\n<p>Edit this HTML and see the preview below.</p>');

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">HTML / CSS / JS</label>
        <textarea className="input-field min-h-[200px] font-mono text-sm" value={html} onChange={e => setHtml(e.target.value)} />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Preview</label>
        <iframe srcDoc={html} sandbox="allow-scripts" className="w-full min-h-[200px] rounded-lg border border-gray-200 dark:border-gray-700 bg-white" title="Preview" />
      </div>
    </div>
  );
}
`);

// ─── HTTP-STATUS-CODES ───
add("http-status-codes", `"use client";
import { useState } from "react";

const CODES: [number,string,string][] = [
[100,"Continue","The server has received the request headers."],
[200,"OK","The request succeeded."],
[201,"Created","A new resource was created."],
[204,"No Content","No content to send."],
[301,"Moved Permanently","Resource has been permanently moved to a new URL."],
[302,"Found","Resource temporarily at a different URL."],
[304,"Not Modified","Resource has not been modified since last request."],
[400,"Bad Request","The server cannot process the request due to a client error."],
[401,"Unauthorized","Authentication is required."],
[403,"Forbidden","The server refuses to authorize the request."],
[404,"Not Found","The requested resource could not be found."],
[405,"Method Not Allowed","The request method is not allowed for this resource."],
[408,"Request Timeout","The server timed out waiting for the request."],
[409,"Conflict","The request conflicts with the current state."],
[410,"Gone","The resource is permanently gone."],
[418,"I'm a Teapot","The server refuses to brew coffee (RFC 2324)."],
[422,"Unprocessable Entity","The request is well-formed but has semantic errors."],
[429,"Too Many Requests","Rate limit exceeded."],
[500,"Internal Server Error","The server encountered an unexpected condition."],
[501,"Not Implemented","The server does not support the request method."],
[502,"Bad Gateway","Invalid response from an upstream server."],
[503,"Service Unavailable","The server is currently unable to handle the request."],
[504,"Gateway Timeout","The upstream server did not respond in time."],
];

export function HttpStatusCodesTool() {
  const [search, setSearch] = useState("");
  const filtered = CODES.filter(([code,name,desc]) => {
    const q = search.toLowerCase();
    return String(code).includes(q) || name.toLowerCase().includes(q) || desc.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-4">
      <input className="input-field" placeholder="Search by code, name, or description..." value={search} onChange={e => setSearch(e.target.value)} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700 border rounded-lg dark:border-gray-700 bg-white dark:bg-gray-900">
        {filtered.map(([code, name, desc]) => {
          const color = code < 200 ? "text-gray-600" : code < 300 ? "text-green-600" : code < 400 ? "text-blue-600" : code < 500 ? "text-yellow-600" : "text-red-600";
          return (
            <div key={code} className="flex items-start gap-3 px-4 py-3">
              <span className={"font-mono font-bold text-sm " + color}>{code}</span>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
`);

// ─── GIT-COMMAND-GENERATOR ───
add("git-command-generator", `"use client";
import { useState } from "react";

const COMMANDS: [string,string,string][] = [
["git init","Initialize a new repository","Creates a new .git directory in the current folder."],
["git clone <url>","Clone a repository","Download a remote repository to your local machine."],
["git add .","Stage all changes","Add all modified and new files to staging area."],
["git commit -m \\"message\\"","Commit changes","Save staged changes with a descriptive message."],
["git push","Push to remote","Upload local commits to the remote repository."],
["git pull","Pull from remote","Fetch and merge changes from the remote repository."],
["git status","Check status","Show the working tree status and staged changes."],
["git log --oneline","View commit history","Show compact commit log with one line per commit."],
["git branch","List branches","Show all local branches. Add -a for remote branches."],
["git branch <name>","Create branch","Create a new branch from the current HEAD."],
["git checkout <branch>","Switch branch","Switch to an existing branch."],
["git checkout -b <branch>","Create & switch","Create a new branch and switch to it immediately."],
["git merge <branch>","Merge branch","Merge another branch into the current branch."],
["git stash","Stash changes","Temporarily store modified tracked files."],
["git stash pop","Apply stash","Re-apply the most recently stashed changes."],
["git reset --hard HEAD","Reset to last commit","Discard all changes since the last commit."],
["git revert <commit>","Revert a commit","Create a new commit that undoes a previous commit."],
["git diff","View changes","Show unstaged changes in your working directory."],
["git remote -v","View remotes","Show remote repository URLs."],
["git tag <name>","Create tag","Create a lightweight tag at the current commit."],
["git cherry-pick <commit>","Cherry-pick","Apply a specific commit to the current branch."],
["git rebase <branch>","Rebase","Reapply commits on top of another branch."],
];

export function GitCommandGeneratorTool() {
  const [search, setSearch] = useState("");
  const filtered = COMMANDS.filter(([cmd,title,desc]) => {
    const q = search.toLowerCase();
    return cmd.toLowerCase().includes(q) || title.toLowerCase().includes(q) || desc.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-4">
      <input className="input-field" placeholder="Search git commands..." value={search} onChange={e => setSearch(e.target.value)} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700 border rounded-lg dark:border-gray-700">
        {filtered.map(([cmd, title, desc]) => (
          <div key={cmd} className="px-4 py-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{title}</p>
              <button onClick={() => navigator.clipboard.writeText(cmd)} className="text-xs text-brand-600 hover:underline">Copy</button>
            </div>
            <code className="text-sm font-mono text-brand-600 dark:text-brand-400">{cmd}</code>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
`);

// ─── UNICODE-LOOKUP ───
add("unicode-lookup", `"use client";
import { useState, useMemo } from "react";

const CHARS = [
  ["\u2713","Check Mark"],["✗","Ballot X"],["\u2764","Heart"],["★","Star"],["→","Right Arrow"],["←","Left Arrow"],["↑","Up Arrow"],["↓","Down Arrow"],
  ["©","Copyright"],["®","Registered"],["™","Trademark"],["°","Degree"],["•","Bullet"],["·","Middle Dot"],["±","Plus-Minus"],["÷","Division"],
  ["×","Multiplication"],["≤","Less Or Equal"],["≥","Greater Or Equal"],["≠","Not Equal"],["≈","Approximately"],["∞","Infinity"],["π","Pi"],["∑","Sum"],
  ["∆","Delta"],["€","Euro"],["£","Pound"],["¥","Yen"],["¢","Cent"],["§","Section"],["¶","Pilcrow"],["†","Dagger"],
  ["‡","Double Dagger"],["…","Ellipsis"],["—","Em Dash"],["–","En Dash"],["'","Left Quote"],["'","Right Quote"],[""","Left DblQuote"],[""","Right DblQuote"],
  ["♠","Spade"],["♣","Club"],["♥","Heart Suit"],["♦","Diamond"],["♪","Note"],["♫","Double Note"],["☀","Sun"],["☁","Cloud"],
  ["☂","Umbrella"],["☎","Phone"],["✉","Envelope"],["✂","Scissors"],["✈","Airplane"],["⚡","Lightning"],["⚠","Warning"],["⭐","Star2"],
  ["🔥","Fire"],["💧","Water"],["🎵","Music"],["🔒","Lock"],["🔓","Unlock"],["📌","Pin"],["📎","Paperclip"],["🔍","Search"],
];

export function UnicodeLookupTool() {
  const [search, setSearch] = useState("");
  const filtered = useMemo(() => CHARS.filter(([,name]) => name.toLowerCase().includes(search.toLowerCase())), [search]);

  return (
    <div className="space-y-4">
      <input className="input-field" placeholder="Search characters by name..." value={search} onChange={e => setSearch(e.target.value)} />
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
        {filtered.map(([char, name]) => (
          <button key={name} onClick={() => navigator.clipboard.writeText(char)} className="flex flex-col items-center rounded-lg border border-gray-200 dark:border-gray-700 p-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors" title={name + " — click to copy"}>
            <span className="text-2xl">{char}</span>
            <span className="text-[10px] text-gray-500 mt-1 truncate w-full text-center">{name}</span>
          </button>
        ))}
      </div>
      <p className="text-xs text-gray-400">Click any character to copy it to clipboard.</p>
    </div>
  );
}
`);

// ─── CSS-FLEXBOX-GENERATOR ───
add("css-flexbox-generator", `"use client";
import { useState } from "react";

export function CssFlexboxGeneratorTool() {
  const [dir, setDir] = useState("row");
  const [justify, setJustify] = useState("center");
  const [align, setAlign] = useState("center");
  const [wrap, setWrap] = useState("nowrap");
  const [gap, setGap] = useState("10");
  const css = "display: flex;\\nflex-direction: " + dir + ";\\njustify-content: " + justify + ";\\nalign-items: " + align + ";\\nflex-wrap: " + wrap + ";\\ngap: " + gap + "px;";

  return (
    <div className="space-y-4">
      <div className="h-40 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-2" style={{display:"flex",flexDirection:dir as any,justifyContent:justify,alignItems:align,flexWrap:wrap as any,gap:gap+"px"}}>
        {[1,2,3,4].map(i => <div key={i} className="bg-brand-500 text-white rounded px-3 py-2 text-sm font-mono">{i}</div>)}
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <div><label className="text-xs text-gray-500">Direction</label><select className="input-field text-sm" value={dir} onChange={e => setDir(e.target.value)}><option value="row">row</option><option value="row-reverse">row-reverse</option><option value="column">column</option><option value="column-reverse">column-reverse</option></select></div>
        <div><label className="text-xs text-gray-500">Justify Content</label><select className="input-field text-sm" value={justify} onChange={e => setJustify(e.target.value)}><option value="flex-start">flex-start</option><option value="center">center</option><option value="flex-end">flex-end</option><option value="space-between">space-between</option><option value="space-around">space-around</option><option value="space-evenly">space-evenly</option></select></div>
        <div><label className="text-xs text-gray-500">Align Items</label><select className="input-field text-sm" value={align} onChange={e => setAlign(e.target.value)}><option value="flex-start">flex-start</option><option value="center">center</option><option value="flex-end">flex-end</option><option value="stretch">stretch</option><option value="baseline">baseline</option></select></div>
        <div><label className="text-xs text-gray-500">Wrap</label><select className="input-field text-sm" value={wrap} onChange={e => setWrap(e.target.value)}><option value="nowrap">nowrap</option><option value="wrap">wrap</option><option value="wrap-reverse">wrap-reverse</option></select></div>
        <div><label className="text-xs text-gray-500">Gap (px)</label><input type="number" className="input-field text-sm" value={gap} onChange={e => setGap(e.target.value)} /></div>
      </div>
      <textarea className="input-field font-mono text-sm bg-gray-50 dark:bg-gray-800 min-h-[100px]" readOnly value={css} />
      <button onClick={() => navigator.clipboard.writeText(css)} className="btn-primary text-sm">Copy CSS</button>
    </div>
  );
}
`);

// ─── CSS-GRID-GENERATOR ───
add("css-grid-generator", `"use client";
import { useState } from "react";

export function CssGridGeneratorTool() {
  const [cols, setCols] = useState("3");
  const [rows, setRows] = useState("2");
  const [gap, setGap] = useState("10");
  const [colSize, setColSize] = useState("1fr");
  const [rowSize, setRowSize] = useState("auto");
  const totalCells = (+cols||1) * (+rows||1);
  const css = "display: grid;\\ngrid-template-columns: repeat(" + cols + ", " + colSize + ");\\ngrid-template-rows: repeat(" + rows + ", " + rowSize + ");\\ngap: " + gap + "px;";

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-2" style={{display:"grid",gridTemplateColumns:"repeat("+cols+", 1fr)",gridTemplateRows:"repeat("+rows+", 50px)",gap:gap+"px"}}>
        {Array.from({length:Math.min(totalCells,12)},(_,i)=> <div key={i} className="bg-brand-500 text-white rounded flex items-center justify-center text-sm font-mono">{i+1}</div>)}
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <div><label className="text-xs text-gray-500">Columns</label><input type="number" className="input-field text-sm" min={1} max={12} value={cols} onChange={e => setCols(e.target.value)} /></div>
        <div><label className="text-xs text-gray-500">Rows</label><input type="number" className="input-field text-sm" min={1} max={12} value={rows} onChange={e => setRows(e.target.value)} /></div>
        <div><label className="text-xs text-gray-500">Gap (px)</label><input type="number" className="input-field text-sm" value={gap} onChange={e => setGap(e.target.value)} /></div>
        <div><label className="text-xs text-gray-500">Column Size</label><input className="input-field text-sm" value={colSize} onChange={e => setColSize(e.target.value)} /></div>
        <div><label className="text-xs text-gray-500">Row Size</label><input className="input-field text-sm" value={rowSize} onChange={e => setRowSize(e.target.value)} /></div>
      </div>
      <textarea className="input-field font-mono text-sm bg-gray-50 dark:bg-gray-800 min-h-[80px]" readOnly value={css} />
      <button onClick={() => navigator.clipboard.writeText(css)} className="btn-primary text-sm">Copy CSS</button>
    </div>
  );
}
`);

// ─── TAILWIND-TO-CSS (simplified mapping) ───
add("tailwind-to-css", `"use client";
import { useState } from "react";

const MAP: Record<string,string> = {
  "flex": "display: flex;", "grid": "display: grid;", "block": "display: block;", "hidden": "display: none;", "inline": "display: inline;",
  "relative": "position: relative;", "absolute": "position: absolute;", "fixed": "position: fixed;", "sticky": "position: sticky;",
  "items-center": "align-items: center;", "items-start": "align-items: flex-start;", "items-end": "align-items: flex-end;",
  "justify-center": "justify-content: center;", "justify-between": "justify-content: space-between;", "justify-start": "justify-content: flex-start;",
  "text-center": "text-align: center;", "text-left": "text-align: left;", "text-right": "text-align: right;",
  "font-bold": "font-weight: 700;", "font-semibold": "font-weight: 600;", "font-medium": "font-weight: 500;", "font-normal": "font-weight: 400;",
  "text-sm": "font-size: 0.875rem;", "text-lg": "font-size: 1.125rem;", "text-xl": "font-size: 1.25rem;", "text-2xl": "font-size: 1.5rem;",
  "rounded": "border-radius: 0.25rem;", "rounded-lg": "border-radius: 0.5rem;", "rounded-full": "border-radius: 9999px;",
  "p-0": "padding: 0;", "p-1": "padding: 0.25rem;", "p-2": "padding: 0.5rem;", "p-4": "padding: 1rem;", "p-6": "padding: 1.5rem;", "p-8": "padding: 2rem;",
  "m-0": "margin: 0;", "m-1": "margin: 0.25rem;", "m-2": "margin: 0.5rem;", "m-4": "margin: 1rem;", "m-auto": "margin: auto;",
  "w-full": "width: 100%;", "h-full": "height: 100%;", "w-screen": "width: 100vw;", "h-screen": "height: 100vh;",
  "overflow-hidden": "overflow: hidden;", "overflow-auto": "overflow: auto;", "overflow-scroll": "overflow: scroll;",
  "border": "border-width: 1px;", "border-0": "border-width: 0;", "border-2": "border-width: 2px;",
  "opacity-50": "opacity: 0.5;", "opacity-75": "opacity: 0.75;", "opacity-100": "opacity: 1;",
  "cursor-pointer": "cursor: pointer;", "cursor-default": "cursor: default;",
  "gap-1": "gap: 0.25rem;", "gap-2": "gap: 0.5rem;", "gap-4": "gap: 1rem;", "gap-6": "gap: 1.5rem;",
};

export function TailwindToCssTool() {
  const [input, setInput] = useState("flex items-center justify-between p-4 rounded-lg font-bold text-lg");
  const classes = input.trim().split(/\\s+/);
  const output = classes.map(c => MAP[c] || ("/* unknown: " + c + " */")).join("\\n");

  return (
    <div className="space-y-4">
      <textarea className="input-field min-h-[100px] font-mono text-sm" placeholder="Paste Tailwind classes..." value={input} onChange={e => setInput(e.target.value)} />
      <textarea className="input-field min-h-[150px] font-mono text-sm bg-gray-50 dark:bg-gray-800" readOnly value={output} />
      <button onClick={() => navigator.clipboard.writeText(output)} className="btn-primary text-sm">Copy CSS</button>
    </div>
  );
}
`);

// ─── REGEX-GENERATOR (simplified helper) ───
add("regex-generator", `"use client";
import { useState } from "react";

const PATTERNS: [string,string,string][] = [
  ["Email","^[\\\\w.-]+@[\\\\w.-]+\\\\.[a-zA-Z]{2,}$","Match email addresses"],
  ["URL","https?:\\\\/\\\\/[\\\\w.-]+(?:\\\\.[a-zA-Z]{2,})(?:\\\\/[^\\\\s]*)?","Match URLs"],
  ["Phone (US)","\\\\(?\\\\d{3}\\\\)?[-.\\\\s]?\\\\d{3}[-.\\\\s]?\\\\d{4}","Match US phone numbers"],
  ["IP Address","\\\\b\\\\d{1,3}\\\\.\\\\d{1,3}\\\\.\\\\d{1,3}\\\\.\\\\d{1,3}\\\\b","Match IPv4 addresses"],
  ["Date (YYYY-MM-DD)","\\\\d{4}-\\\\d{2}-\\\\d{2}","Match ISO dates"],
  ["Time (HH:MM)","\\\\d{2}:\\\\d{2}","Match time format"],
  ["Hex Color","#[0-9a-fA-F]{3,8}","Match hex color codes"],
  ["HTML Tag","<[^>]+>","Match HTML tags"],
  ["Numbers Only","^\\\\d+$","Match only numbers"],
  ["Letters Only","^[a-zA-Z]+$","Match only letters"],
  ["Alphanumeric","^[a-zA-Z0-9]+$","Match letters and numbers"],
  ["Whitespace","\\\\s+","Match whitespace"],
  ["No Whitespace","^\\\\S+$","Match non-whitespace strings"],
  ["ZIP Code (US)","\\\\d{5}(-\\\\d{4})?","Match US ZIP codes"],
  ["SSN","\\\\d{3}-\\\\d{2}-\\\\d{4}","Match SSN format"],
  ["Credit Card","\\\\d{4}[- ]?\\\\d{4}[- ]?\\\\d{4}[- ]?\\\\d{4}","Match credit card numbers"],
];

export function RegexGeneratorTool() {
  const [search, setSearch] = useState("");
  const [test, setTest] = useState("");
  const [selected, setSelected] = useState(PATTERNS[0]);
  const filtered = PATTERNS.filter(([name,,desc]) => name.toLowerCase().includes(search.toLowerCase()) || desc.toLowerCase().includes(search.toLowerCase()));
  let matches: string[] = [];
  try { matches = test.match(new RegExp(selected[1], "g")) || []; } catch { /* invalid regex */ }

  return (
    <div className="space-y-4">
      <input className="input-field" placeholder="Search patterns..." value={search} onChange={e => setSearch(e.target.value)} />
      <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
        {filtered.map(([name, pattern, desc]) => (
          <button key={name} onClick={() => setSelected([name, pattern, desc])} className={"text-left rounded-lg border p-3 text-sm transition-colors " + (selected[0] === name ? "border-brand-500 bg-brand-50 dark:bg-brand-950 dark:border-brand-400" : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600")}>
            <p className="font-medium text-gray-900 dark:text-gray-100">{name}</p>
            <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
          </button>
        ))}
      </div>
      <div className="rounded-lg bg-gray-50 dark:bg-gray-800 p-4 font-mono text-sm">
        <p className="text-gray-500 text-xs mb-1">{selected[0]}:</p>
        <p className="text-gray-900 dark:text-gray-100 break-all">{selected[1]}</p>
      </div>
      <button onClick={() => navigator.clipboard.writeText(selected[1])} className="btn-primary text-sm">Copy Regex</button>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Test String</label>
        <textarea className="input-field min-h-[80px] font-mono text-sm" value={test} onChange={e => setTest(e.target.value)} placeholder="Enter text to test the regex..." />
        {test && <p className="text-sm mt-2 text-gray-700 dark:text-gray-300">{matches.length} match{matches.length!==1?"es":""}: {matches.map((m,i) => <span key={i} className="font-mono bg-yellow-100 dark:bg-yellow-900 px-1 rounded mr-1">{m}</span>)}</p>}
      </div>
    </div>
  );
}
`);

// ──────────────────────────────────────────────────
// GENERATE ALL FILES
// ──────────────────────────────────────────────────

let generated = 0;
for (const t of tools) {
  writePage(t.slug, t.componentName);
  writeTool(t.slug, t.componentName, t.code);
  generated++;
}
console.log("Generated " + generated + " tools (" + (generated * 2) + " files).");
