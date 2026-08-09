"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useConsent, CONSENT_REOPEN_EVENT } from "@/lib/useConsent";

export function CookieConsent() {
  const { consent, hydrated, accept, reject } = useConsent();
  const [open, setOpen] = useState(false);

  // First visit: once we've actually checked localStorage (client-only —
  // avoids a hydration mismatch) and found no stored choice, show the banner.
  useEffect(() => {
    if (hydrated && !consent) setOpen(true);
  }, [hydrated, consent]);

  // Let the "Cookie-Einstellungen" footer link reopen the banner at any time.
  useEffect(() => {
    const onReopen = () => setOpen(true);
    window.addEventListener(CONSENT_REOPEN_EVENT, onReopen);
    return () => window.removeEventListener(CONSENT_REOPEN_EVENT, onReopen);
  }, []);

  const handleAccept = () => {
    accept();
    setOpen(false);
  };

  const handleReject = () => {
    reject();
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="cookie-consent"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          role="dialog"
          aria-label="Cookie-Einwilligung"
          className="fixed inset-x-0 bottom-0 z-[100] px-4 pb-4 sm:px-6 sm:pb-6"
        >
          <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card/95 backdrop-blur-md p-5 sm:p-6 shadow-2xl shadow-black/20">
            <p className="text-sm text-foreground/90 leading-relaxed">
              Wir nutzen Google Analytics, um anonymisierte Besucherstatistiken
              zu erheben und diese Website zu verbessern. Ihre Einwilligung ist
              freiwillig und kann jederzeit über den Link „Cookie-Einstellungen“
              im Footer widerrufen werden. Mehr dazu in unserer{" "}
              <Link
                href="/datenschutz"
                className="underline underline-offset-2 text-foreground hover:text-primary transition-colors"
              >
                Datenschutzerklärung
              </Link>
              .
            </p>

            <div className="mt-5 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleReject}
                className="flex-1 rounded-xl border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
              >
                Ablehnen
              </button>
              <button
                type="button"
                onClick={handleAccept}
                className="flex-1 rounded-xl border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
              >
                Akzeptieren
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
