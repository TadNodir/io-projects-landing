"use client";

import { useCallback, useEffect, useState } from "react";

/* ────────────────────────────────────────────────────────────────
   Cookie-consent state — read/write localStorage["io-consent"] and
   broadcast changes so every consumer (the banner, the GA gate, the
   footer re-open link) stays in sync without a page reload.
   ──────────────────────────────────────────────────────────────── */

export type ConsentValue = "accepted" | "rejected";

export interface ConsentRecord {
  value: ConsentValue;
  timestamp: number;
}

const STORAGE_KEY = "io-consent";
const CHANGE_EVENT = "io-consent-change";
const REOPEN_EVENT = "io-consent-reopen";

function readConsent(): ConsentRecord | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed?.value === "accepted" || parsed?.value === "rejected") {
      return parsed as ConsentRecord;
    }
    return null;
  } catch {
    return null;
  }
}

function writeConsent(value: ConsentValue) {
  const record: ConsentRecord = { value, timestamp: Date.now() };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
  } catch {
    /* localStorage unavailable (private mode) — choice won't persist, but
       the in-memory state below still updates for this page view. */
  }
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: record }));
}

/** Tell any mounted CookieConsent banner to re-open (used by the footer link). */
export function reopenConsentBanner() {
  window.dispatchEvent(new Event(REOPEN_EVENT));
}

export const CONSENT_REOPEN_EVENT = REOPEN_EVENT;

/**
 * Reactive access to the stored cookie-consent choice.
 * - `hydrated` is false until we've checked localStorage on the client
 *   (always false during SSR — avoids hydration mismatches).
 * - `consent` is the stored record, or null if no choice has been made yet.
 * - `value` is a shorthand for `consent?.value ?? null`.
 * Updates propagate within the tab (custom event) and across tabs (`storage`).
 */
export function useConsent() {
  const [consent, setConsentState] = useState<ConsentRecord | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setConsentState(readConsent());
    setHydrated(true);

    const onChange = () => setConsentState(readConsent());
    window.addEventListener(CHANGE_EVENT, onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener(CHANGE_EVENT, onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  const accept = useCallback(() => writeConsent("accepted"), []);
  const reject = useCallback(() => writeConsent("rejected"), []);

  return {
    consent,
    hydrated,
    value: consent?.value ?? null,
    accept,
    reject,
  };
}
