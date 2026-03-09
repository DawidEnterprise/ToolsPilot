"use client";

import { useEffect, useRef } from "react";
import { trackToolUsed } from "@/lib/analytics";

/**
 * Track a single "tool_used" event per page session.
 * Drop into any tool page / client component.
 */
export function useTrackToolView(slug: string, name: string) {
  const firedRef = useRef(false);
  useEffect(() => {
    if (firedRef.current) return;
    firedRef.current = true;
    trackToolUsed(slug, name);
  }, [slug, name]);
}
