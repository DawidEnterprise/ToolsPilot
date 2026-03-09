"use client";

import { useTrackToolView } from "@/hooks/useTrackToolView";

export function ToolViewTracker({ slug, name }: { slug: string; name: string }) {
  useTrackToolView(slug, name);
  return null;
}
