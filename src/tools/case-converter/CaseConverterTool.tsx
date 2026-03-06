"use client";

import { useState, useMemo } from "react";
import { convertCase, type CaseType } from "./logic";
import { CopyButton } from "@/components/CopyButton";

const CASES: { id: CaseType; label: string; example: string }[] = [
  { id: "uppercase", label: "UPPERCASE", example: "HELLO WORLD" },
  { id: "lowercase", label: "lowercase", example: "hello world" },
  { id: "titlecase", label: "Title Case", example: "Hello World" },
  { id: "sentencecase", label: "Sentence case", example: "Hello world" },
  { id: "camelcase", label: "camelCase", example: "helloWorld" },
  { id: "pascalcase", label: "PascalCase", example: "HelloWorld" },
  { id: "snakecase", label: "snake_case", example: "hello_world" },
  { id: "kebabcase", label: "kebab-case", example: "hello-world" },
  { id: "dotcase", label: "dot.case", example: "hello.world" },
];

export function CaseConverterTool() {
  const [input, setInput] = useState("");

  const results = useMemo(
    () => CASES.map((c) => ({ ...c, output: input ? convertCase(input, c.id) : c.example })),
    [input]
  );

  return (
    <div className="space-y-5">
      <textarea
        className="textarea-field h-36"
        placeholder="Type or paste text to convert…"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        autoFocus
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((c) => (
          <div
            key={c.id}
            className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">{c.label}</span>
              {input && <CopyButton text={c.output} />}
            </div>
            <p className={`text-sm font-mono break-all ${input ? "text-gray-900 dark:text-gray-100" : "text-gray-400 dark:text-gray-600"}`}>
              {c.output}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
