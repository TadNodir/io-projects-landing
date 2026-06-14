import type { Dictionary } from "./types";
import { en } from "./en";
import { de } from "./de";
import { ru } from "./ru";

export const dictionaries = { en, de, ru } as const;

export type Locale = keyof typeof dictionaries;

export const DEFAULT_LOCALE: Locale = "en";

/** Ordered list used to render the language dropdown. */
export const LOCALES: { code: Locale; label: string; short: string }[] = [
  { code: "en", label: "English", short: "EN" },
  { code: "de", label: "Deutsch", short: "DE" },
  { code: "ru", label: "Русский", short: "RU" },
];

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export function isLocale(value: string | null | undefined): value is Locale {
  return value === "en" || value === "de" || value === "ru";
}

export type { Dictionary };
