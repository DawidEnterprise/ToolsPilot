"use client";
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
