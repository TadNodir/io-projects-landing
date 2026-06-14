/* ────────────────────────────────────────────────────────────────
   IO Projects — non-translatable constants + server-side defaults.

   All user-facing copy now lives in locale dictionaries under
   `content/i18n/` (en / de / ru). Client components read the active
   locale via `useTranslations()`. Server components (metadata,
   JSON-LD) use the English dictionary re-exported below.
   ──────────────────────────────────────────────────────────────── */

import { de } from "./i18n/de";

// TODO: replace with your real Calendly link before launch
export const CALENDLY_URL = "https://calendly.com/io-projects";

// TODO: replace with your real domain before launch
export const SITE_URL = "https://io-projects.com";

/** Default (German) dictionary for server components & structured data. */
export const enDict = de;
