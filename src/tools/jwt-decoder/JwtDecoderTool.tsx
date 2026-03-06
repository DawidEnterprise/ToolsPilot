"use client";

import { useState, useEffect } from "react";
import { decodeJwt, type JwtParts } from "./logic";
import { CopyButton } from "@/components/CopyButton";

export function JwtDecoderTool() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<JwtParts | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!input.trim()) {
      setResult(null);
      setError(null);
      return;
    }
    try {
      setResult(decodeJwt(input));
      setError(null);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Invalid JWT");
      setResult(null);
    }
  }, [input]);

  return (
    <div className="space-y-5">
      <div>
        <label className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
          Paste your JWT token
        </label>
        <textarea
          className="textarea-field h-28"
          placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoFocus
          spellCheck={false}
        />
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400">
          {error}
        </div>
      )}

      {result && (
        <div className="space-y-4">
          {result.isExpired && (
            <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-2.5 text-sm text-amber-700 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-400">
              ⚠ This token is expired
              {result.expiresAt && ` (expired ${result.expiresAt.toLocaleString()})`}
            </div>
          )}

          <Section title="Header" data={result.header} />
          <Section title="Payload" data={result.payload} />

          <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-800">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">Signature</span>
            </div>
            <code className="block text-sm text-gray-900 break-all font-mono dark:text-gray-100">
              {result.signature}
            </code>
          </div>

          {(result.issuedAt || result.expiresAt) && (
            <div className="flex flex-wrap gap-4 text-xs text-gray-500 dark:text-gray-400">
              {result.issuedAt && <span>Issued: {result.issuedAt.toLocaleString()}</span>}
              {result.expiresAt && <span>Expires: {result.expiresAt.toLocaleString()}</span>}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Section({ title, data }: { title: string; data: Record<string, unknown> }) {
  const json = JSON.stringify(data, null, 2);
  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">{title}</span>
        <CopyButton text={json} />
      </div>
      <pre className="text-sm text-gray-900 font-mono overflow-x-auto dark:text-gray-100">{json}</pre>
    </div>
  );
}
