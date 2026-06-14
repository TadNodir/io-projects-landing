"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import {
  dictionaries,
  DEFAULT_LOCALE,
  isLocale,
  type Locale,
  type Dictionary,
} from "@/content/i18n";

const STORAGE_KEY = "io_locale";

interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Dictionary;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Always start from the default on the server AND first client render so
  // hydration matches; the stored preference is applied in useEffect.
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (isLocale(stored)) {
      setLocaleState(stored);
      return;
    }
    // Fall back to the browser language on first visit (de-* / ru-* only).
    const browser = navigator.language.slice(0, 2).toLowerCase();
    if (isLocale(browser) && browser !== DEFAULT_LOCALE) {
      setLocaleState(browser);
    }
  }, []);

  // Keep <html lang> and document.title in sync with the active locale.
  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = dictionaries[locale].meta.title;
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* localStorage unavailable (private mode) — ignore */
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t: dictionaries[locale] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}

/** Convenience hook returning just the active dictionary. */
export function useTranslations(): Dictionary {
  return useLanguage().t;
}
