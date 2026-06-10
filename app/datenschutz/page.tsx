import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Datenschutz | IO Projects",
  robots: { index: false },
};

export default function DatenschutzPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-24 sm:px-6">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        ← Back
      </Link>
      <h1 className="text-3xl font-bold tracking-tight text-foreground mb-8">
        Datenschutzerklärung
      </h1>
      {/* TODO: add full Datenschutzerklärung as required by DSGVO/GDPR */}
      <p className="text-muted-foreground">
        Datenschutzerklärung gemäß DSGVO — coming soon.
      </p>
    </main>
  );
}
