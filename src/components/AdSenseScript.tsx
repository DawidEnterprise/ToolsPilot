/**
 * Google AdSense script loader — placed in <head> via layout.tsx.
 * Enables Auto Ads for smart additional placements (vignette, anchor, etc.).
 */
export function AdSenseScript() {
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  if (!clientId) return null;

  return (
    <>
      <script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`}
        crossOrigin="anonymous"
      />
      {/* Enable AdSense Auto Ads — Google auto-inserts high-CPM placements */}
      <meta name="google-adsense-account" content={clientId} />
    </>
  );
}
