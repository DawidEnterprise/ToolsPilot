"use client";

import { useState, useMemo } from "react";
import { markdownToHtml } from "./logic";
import { CopyButton } from "@/components/CopyButton";

type Tab = "preview" | "html";

export function MarkdownToHtmlTool() {
  const [input, setInput] = useState("");
  const [tab, setTab] = useState<Tab>("preview");
  const html = useMemo(() => markdownToHtml(input), [input]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex rounded-lg border border-gray-200 p-0.5 dark:border-gray-700">
          {(["preview", "html"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-md px-4 py-1.5 text-sm font-medium capitalize transition-colors ${
                tab === t
                  ? "bg-brand-600 text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
              }`}
            >
              {t === "html" ? "HTML Code" : "Preview"}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          {html && <CopyButton text={html} label="Copy HTML" />}
          {input && <button onClick={() => setInput("")} className="btn-secondary text-xs">Clear</button>}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
            Markdown
          </label>
          <textarea
            className="textarea-field tool-panel"
            placeholder={"# Hello World\n\nType your **markdown** here…"}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            spellCheck={false}
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
            {tab === "preview" ? "Preview" : "HTML Output"}
          </label>
          {tab === "preview" ? (
            <div
              className="tool-panel overflow-y-auto rounded-lg border border-gray-300 bg-white p-4 prose prose-sm max-w-none dark:border-gray-600 dark:bg-gray-800 dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: html || '<span class="text-gray-400">Preview will appear here…</span>' }}
            />
          ) : (
            <textarea
              className="textarea-field tool-panel bg-gray-50 dark:bg-gray-800"
              value={html}
              readOnly
              placeholder="HTML output appears here…"
              spellCheck={false}
            />
          )}
        </div>
      </div>
    </div>
  );
}
