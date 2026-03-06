"use client";

import { useState, useCallback } from "react";
import { copyToClipboard } from "@/lib/utils";

interface CopyButtonProps {
  text: string;
  className?: string;
  label?: string;
}

export function CopyButton({ text, className = "", label = "Copy" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [text]);

  return (
    <button onClick={handleCopy} className={`btn-secondary text-xs ${className}`}>
      {copied ? "✓ Copied!" : label}
    </button>
  );
}
