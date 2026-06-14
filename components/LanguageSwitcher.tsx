"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Globe } from "lucide-react";
import { LOCALES } from "@/content/i18n";
import { useLanguage } from "@/components/providers/LanguageProvider";

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { locale, setLocale, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const active = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

  // Close on outside click + Escape
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t.ui.languageAria}
        className="flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-foreground/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <Globe size={16} />
        <span>{active.short}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 mt-2 w-40 origin-top-right overflow-hidden rounded-xl border border-border bg-card shadow-lg z-50 p-1"
          >
            {LOCALES.map((l) => {
              const selected = l.code === locale;
              return (
                <li key={l.code} role="option" aria-selected={selected}>
                  <button
                    type="button"
                    onClick={() => {
                      setLocale(l.code);
                      setOpen(false);
                    }}
                    className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                      selected
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-foreground/80 hover:bg-foreground/5"
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="text-xs font-semibold tabular-nums opacity-60 w-6">
                        {l.short}
                      </span>
                      {l.label}
                    </span>
                    {selected && <Check size={15} className="shrink-0" />}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
