"use client";
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
      <textarea className="textarea-field font-mono" placeholder="Paste your YAML here..." value={input} onChange={e => { setInput(e.target.value); setResult(null); }} />
      <button onClick={validate} className="btn-primary text-sm">Validate YAML</button>
      {result && (
        <div className={"rounded-lg p-4 text-sm " + (result.valid ? "bg-green-50 text-green-700 border border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-800" : "bg-red-50 text-red-700 border border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-800")}>
          {result.valid ? (
            <>
              <p className="font-medium">✓ Valid YAML</p>
              <pre className="mt-2 text-xs overflow-x-auto">{result.json}</pre>
            </>
          ) : (
            <p>✗ {result.error}</p>
          )}
        </div>
      )}
    </div>
  );
}
