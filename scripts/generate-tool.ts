#!/usr/bin/env ts-node
/**
 * Tool Generator Script
 * Usage: npx ts-node scripts/generate-tool.ts <slug> <name> <category>
 *
 * Example: npx ts-node scripts/generate-tool.ts "csv-to-json" "CSV to JSON Converter" "developer"
 *
 * This creates:
 *   /src/tools/<slug>/logic.ts
 *   /src/tools/<slug>/<PascalName>Tool.tsx
 *   /src/app/tools/<slug>/page.tsx
 * And prints instructions to add the registry entry.
 */

import * as fs from "fs";
import * as path from "path";

const [slug, name, category] = process.argv.slice(2);

if (!slug || !name || !category) {
  console.error("Usage: ts-node scripts/generate-tool.ts <slug> <name> <category>");
  console.error('Example: ts-node scripts/generate-tool.ts "csv-to-json" "CSV to JSON Converter" "developer"');
  process.exit(1);
}

const pascal = slug
  .split("-")
  .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
  .join("");

const toolDir = path.resolve(__dirname, "..", "src", "tools", slug);
const pageDir = path.resolve(__dirname, "..", "src", "app", "tools", slug);

fs.mkdirSync(toolDir, { recursive: true });
fs.mkdirSync(pageDir, { recursive: true });

// logic.ts
fs.writeFileSync(
  path.join(toolDir, "logic.ts"),
  `/**
 * ${name} — pure logic (no React).
 */

export interface ${pascal}Result {
  success: boolean;
  output: string;
  error?: string;
}

export function process${pascal}(input: string): ${pascal}Result {
  if (!input.trim()) {
    return { success: false, output: "", error: "Input is empty" };
  }

  // TODO: implement tool logic
  return { success: true, output: input };
}
`
);

// <PascalName>Tool.tsx
fs.writeFileSync(
  path.join(toolDir, `${pascal}Tool.tsx`),
  `"use client";

import { useState, useCallback } from "react";
import { process${pascal} } from "./logic";
import { CopyButton } from "@/components/CopyButton";

export function ${pascal}Tool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleProcess = useCallback(() => {
    const result = process${pascal}(input);
    setOutput(result.output);
    setError(result.error || null);
  }, [input]);

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <button onClick={handleProcess} className="btn-primary">Process</button>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wider">Input</label>
          <textarea
            className="textarea-field h-56"
            placeholder="Paste input here…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div>
          <div className="mb-1 flex items-center justify-between">
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Output</label>
            {output && <CopyButton text={output} />}
          </div>
          <textarea className="textarea-field h-56 bg-gray-50" value={output} readOnly />
        </div>
      </div>
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          ⚠️ {error}
        </div>
      )}
    </div>
  );
}
`
);

// page.tsx
fs.writeFileSync(
  path.join(pageDir, "page.tsx"),
  `import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { ${pascal}Tool } from "@/tools/${slug}/${pascal}Tool";

const tool = getToolBySlug("${slug}")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function ${pascal}Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <${pascal}Tool />
      </ToolPageLayout>
    </>
  );
}
`
);

console.log(`\n✅ Generated tool: ${name} (${slug})\n`);
console.log("Files created:");
console.log(`  src/tools/${slug}/logic.ts`);
console.log(`  src/tools/${slug}/${pascal}Tool.tsx`);
console.log(`  src/app/tools/${slug}/page.tsx`);
console.log(`\n📝 Next step: Add this entry to src/lib/registry.ts:\n`);
console.log(`  {
    slug: "${slug}",
    name: "${name}",
    description: "TODO: write a description",
    category: "${category}",
    icon: "code",
    keywords: [${slug.split("-").map((w: string) => `"${w}"`).join(", ")}],
  },`);
console.log("\nThen remove comingSoon: true if present. Done! 🎉\n");
