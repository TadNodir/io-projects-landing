"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "@/components/providers/LanguageProvider";
import { reopenConsentBanner } from "@/lib/useConsent";

export function Footer() {
  const t = useTranslations();
  const footer = t.footer;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background px-4 sm:px-6 py-12 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
          {/* Brand */}
          <div className="col-span-full md:col-span-1">
            <div className="mb-3">
              <Image
                src="/io-logo-white.png"
                alt="IO Projects"
                width={80}
                height={32}
                className="h-8 w-auto object-contain brightness-0 dark:brightness-100"
              />
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              {footer.tagline}
            </p>
          </div>

          {/* About — GEO entity description */}
          <div className="col-span-full md:col-span-2">
            <h2 className="text-sm font-semibold text-foreground mb-3">
              {footer.aboutHeading}
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {footer.about}
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-border pt-8">
          <p className="text-xs text-muted-foreground">
            © {year} IO Projects. {t.ui.footerRights}
          </p>
          <nav aria-label="Footer navigation">
            <ul className="flex gap-6">
              {footer.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={reopenConsentBanner}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Cookie-Einstellungen
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
