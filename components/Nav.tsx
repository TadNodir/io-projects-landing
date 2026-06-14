"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { CALENDLY_URL } from "@/content/landing";
import { useTranslations } from "@/components/providers/LanguageProvider";

export function Nav() {
  const t = useTranslations();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/80 backdrop-blur-md border-b border-border/50 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0" aria-label={t.ui.navHomeAria}>
            <Image
              src="/io-logo-white.png"
              alt="IO Projects"
              width={80}
              height={32}
              className="h-8 w-auto object-contain brightness-0 dark:brightness-100"
              priority
            />
          </Link>

          {/* Desktop nav actions */}
          <div className="hidden sm:flex items-center gap-3">
            <nav aria-label={t.ui.navPrimaryAria}>
              <ul className="flex items-center gap-6 text-sm text-foreground/70">
                <li><a href="#pricing" className="hover:text-foreground transition-colors">{t.ui.navPricing}</a></li>
                <li><a href="#faq" className="hover:text-foreground transition-colors">{t.ui.navFaq}</a></li>
              </ul>
            </nav>
            <LanguageSwitcher />
            <ThemeToggle />
            <Link
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {t.ui.navCta}
            </Link>
          </div>

          {/* Mobile row */}
          <div className="flex sm:hidden items-center gap-1">
            <LanguageSwitcher />
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? t.ui.menuClose : t.ui.menuOpen}
              className="flex h-8 w-8 items-center justify-center text-foreground/70 hover:text-foreground transition-colors"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="fixed inset-0 z-40 flex flex-col bg-background pt-20 px-6"
        >
          <nav aria-label={t.ui.navMobileAria}>
            <ul className="flex flex-col gap-6 text-lg font-medium">
              <li>
                <a href="#pricing" onClick={() => setMobileOpen(false)} className="block py-2 text-foreground/80 hover:text-foreground transition-colors">
                  {t.ui.navPricing}
                </a>
              </li>
              <li>
                <a href="#faq" onClick={() => setMobileOpen(false)} className="block py-2 text-foreground/80 hover:text-foreground transition-colors">
                  {t.ui.navFaq}
                </a>
              </li>
            </ul>
          </nav>
          <div className="mt-8">
            <Link
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="block w-full rounded-xl bg-primary px-6 py-4 text-center text-base font-semibold text-primary-foreground"
            >
              {t.ui.navCta}
            </Link>
          </div>
        </motion.div>
      )}
    </>
  );
}
