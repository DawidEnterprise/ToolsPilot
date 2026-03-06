"use client";

import { useState, useMemo } from "react";
import { calculateBmi, lbsToKg, ftInToCm } from "./logic";

type Unit = "metric" | "imperial";

export function BmiCalculatorTool() {
  const [unit, setUnit] = useState<Unit>("metric");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [feet, setFeet] = useState("");
  const [inches, setInches] = useState("");

  const result = useMemo(() => {
    const w = parseFloat(weight);
    if (isNaN(w) || w <= 0) return null;

    let weightKg: number;
    let heightCm: number;

    if (unit === "metric") {
      const h = parseFloat(height);
      if (isNaN(h) || h <= 0) return null;
      weightKg = w;
      heightCm = h;
    } else {
      const ft = parseInt(feet) || 0;
      const inc = parseInt(inches) || 0;
      if (ft <= 0 && inc <= 0) return null;
      weightKg = lbsToKg(w);
      heightCm = ftInToCm(ft, inc);
    }

    if (heightCm <= 0) return null;
    return calculateBmi(weightKg, heightCm);
  }, [unit, weight, height, feet, inches]);

  return (
    <div className="space-y-5">
      <div className="flex gap-2">
        {(["metric", "imperial"] as Unit[]).map((u) => (
          <button
            key={u}
            onClick={() => setUnit(u)}
            className={`rounded-lg px-4 py-1.5 text-sm font-medium transition-colors ${
              unit === u
                ? "bg-brand-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            }`}
          >
            {u === "metric" ? "Metric (kg/cm)" : "Imperial (lbs/ft)"}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
            Weight ({unit === "metric" ? "kg" : "lbs"})
          </label>
          <input
            type="number"
            className="input-field text-lg"
            placeholder={unit === "metric" ? "70" : "154"}
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            min="0"
            autoFocus
          />
        </div>
        {unit === "metric" ? (
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
              Height (cm)
            </label>
            <input
              type="number"
              className="input-field text-lg"
              placeholder="175"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              min="0"
            />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                Feet
              </label>
              <input
                type="number"
                className="input-field text-lg"
                placeholder="5"
                value={feet}
                onChange={(e) => setFeet(e.target.value)}
                min="0"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                Inches
              </label>
              <input
                type="number"
                className="input-field text-lg"
                placeholder="9"
                value={inches}
                onChange={(e) => setInches(e.target.value)}
                min="0"
                max="11"
              />
            </div>
          </div>
        )}
      </div>

      {result && (
        <div className="space-y-4">
          <div className="rounded-lg border border-gray-200 bg-gray-50 px-5 py-4 dark:border-gray-700 dark:bg-gray-800">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">Your BMI</span>
            <p className={`mt-1 text-4xl font-bold ${result.color}`}>{result.bmi.toFixed(1)}</p>
            <p className={`mt-1 text-lg font-semibold ${result.color}`}>{result.category}</p>
          </div>

          <div className="text-sm text-gray-600 dark:text-gray-400">
            <p className="font-medium mb-1">BMI Categories:</p>
            <ul className="space-y-0.5">
              <li>Underweight: &lt; 18.5</li>
              <li>Normal weight: 18.5 – 24.9</li>
              <li>Overweight: 25 – 29.9</li>
              <li>Obese: ≥ 30</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
