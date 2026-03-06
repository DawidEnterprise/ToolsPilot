"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

/**
 * Google AdSense ad slot with format-specific optimisations.
 *
 * Set NEXT_PUBLIC_ADSENSE_CLIENT_ID in .env to your publisher ID.
 * Optionally set per-position slot IDs (NEXT_PUBLIC_ADSENSE_SLOT_*) for
 * granular reporting — otherwise the generic responsive unit is used.
 *
 * Positions & recommended formats:
 *   tool-top       → leaderboard (728×90) above the tool
 *   tool-bottom    → large rectangle (336×280) below the tool
 *   sidebar        → sticky 300×250 on desktop, hidden on mobile
 *   in-content     → in-article native ad between content sections
 *   in-feed        → in-feed ad within tool/category grids
 *   multiplex      → content-recommendation grid (high CTR)
 *   anchor         → sticky bottom overlay (highest viewability)
 *   footer         → rectangle before the footer
 */

type AdPosition =
  | "tool-top"
  | "tool-bottom"
  | "sidebar"
  | "in-content"
  | "in-feed"
  | "multiplex"
  | "anchor"
  | "footer";

interface AdSlotProps {
  position: AdPosition;
  className?: string;
}

/* Maps position → env-var suffix for per-slot IDs */
const SLOT_ENV_MAP: Record<AdPosition, string> = {
  "tool-top": "TOOL_TOP",
  "tool-bottom": "TOOL_BOTTOM",
  sidebar: "SIDEBAR",
  "in-content": "IN_CONTENT",
  "in-feed": "IN_FEED",
  multiplex: "MULTIPLEX",
  anchor: "ANCHOR",
  footer: "FOOTER",
};

/* Per-position AdSense attributes for best CPM */
const FORMAT_CONFIG: Record<AdPosition, Record<string, string>> = {
  "tool-top": {
    "data-ad-format": "horizontal",
    "data-full-width-responsive": "true",
  },
  "tool-bottom": {
    "data-ad-format": "rectangle",
    "data-full-width-responsive": "true",
  },
  sidebar: {
    "data-ad-format": "rectangle",
    "data-full-width-responsive": "false",
  },
  "in-content": {
    "data-ad-format": "fluid",
    "data-ad-layout": "in-article",
    "data-full-width-responsive": "true",
  },
  "in-feed": {
    "data-ad-format": "fluid",
    "data-ad-layout-key": "-6t+ed+2i-1n-4w",
    "data-full-width-responsive": "true",
  },
  multiplex: {
    "data-ad-format": "autorelaxed",
    "data-full-width-responsive": "true",
  },
  anchor: {
    "data-ad-format": "auto",
    "data-full-width-responsive": "true",
  },
  footer: {
    "data-ad-format": "auto",
    "data-full-width-responsive": "true",
  },
};

export function AdSlot({ position, className = "" }: AdSlotProps) {
  const adRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);
  const adClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  // Try to read a per-slot ID, fall back to empty (AdSense auto mode)
  const slotEnvKey = `NEXT_PUBLIC_ADSENSE_SLOT_${SLOT_ENV_MAP[position]}`;
  const adSlotId =
    typeof window === "undefined"
      ? process.env[slotEnvKey] || ""
      : (process.env[slotEnvKey] as string) || "";

  useEffect(() => {
    if (!adClientId || pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      // AdSense not loaded yet — silent fail
    }
  }, [adClientId]);

  if (!adClientId) {
    // Dev placeholder — shows what will go where
    const labels: Record<AdPosition, string> = {
      "tool-top": "Leaderboard 728×90",
      "tool-bottom": "Rectangle 336×280",
      sidebar: "Sidebar 300×250",
      "in-content": "In-article native",
      "in-feed": "In-feed native",
      multiplex: "Multiplex grid",
      anchor: "Anchor overlay",
      footer: "Footer rectangle",
    };
    return (
      <div className={`ad-slot ${className}`} data-ad-position={position}>
        Ad — {labels[position]}
      </div>
    );
  }

  const formatAttrs = FORMAT_CONFIG[position];

  return (
    <div className={className} data-ad-position={position}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={adClientId}
        {...(adSlotId ? { "data-ad-slot": adSlotId } : {})}
        {...formatAttrs}
      />
    </div>
  );
}
