"use client";
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
          <button onClick={() => remove(i)} className="text-red-500 hover:text-red-700 text-sm pb-2">×</button>
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
