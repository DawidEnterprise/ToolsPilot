"use client";
import { useState } from "react";

export function ChmodCalculatorTool() {
  const [perms, setPerms] = useState([true,true,true,true,false,true,true,false,true]);
  const toggle = (i: number) => setPerms(perms.map((p,j) => j===i ? !p : p));
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
