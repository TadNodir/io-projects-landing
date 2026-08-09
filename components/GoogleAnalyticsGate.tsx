"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import { useConsent } from "@/lib/useConsent";

const GA_ID = "G-BQ13S999KX";

/**
 * Mounts the GA4 script only after the visitor has actively clicked
 * "Akzeptieren" in the CookieConsent banner. Before that, this renders
 * nothing — no <script> tag is ever injected, so gtag.js is never
 * requested and can't set any cookie ahead of consent (GDPR/TTDSG).
 */
export function GoogleAnalyticsGate() {
  const { value } = useConsent();
  if (value !== "accepted") return null;
  return <GoogleAnalytics gaId={GA_ID} />;
}
