/* ── GA4 custom event helpers ── */

/**
 * Fire a GA4 custom event. Safe to call server-side (no-ops).
 */
export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>,
) {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  if (!gtag) return;
  gtag("event", eventName, params);
}

/* ── Pre-defined events (based on GA4 analytics data) ── */

/** User opened / started using a tool */
export function trackToolUsed(toolSlug: string, toolName: string) {
  trackEvent("tool_used", {
    tool_slug: toolSlug,
    tool_name: toolName,
    event_category: "engagement",
  });
}

/** User clicked "Calculate" / primary action inside a tool */
export function trackCalculation(toolSlug: string, toolName: string) {
  trackEvent("calculation_completed", {
    tool_slug: toolSlug,
    tool_name: toolName,
    event_category: "conversion",
  });
}

/** User copied a result to clipboard */
export function trackCopyResult(toolSlug: string) {
  trackEvent("copy_result", {
    tool_slug: toolSlug,
    event_category: "engagement",
  });
}

/** User downloaded a file (PDF, PNG, etc.) */
export function trackDownload(toolSlug: string, format: string) {
  trackEvent("file_download", {
    tool_slug: toolSlug,
    file_format: format,
    event_category: "conversion",
  });
}

/** User clicked a CTA (affiliate, InvoFlow, etc.) */
export function trackCTAClick(ctaName: string, destination: string) {
  trackEvent("cta_click", {
    cta_name: ctaName,
    cta_destination: destination,
    event_category: "conversion",
  });
}
