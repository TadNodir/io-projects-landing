import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Impressum | IO Projects",
  robots: { index: false },
};

export default function ImpressumPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-24 sm:px-6">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        ← Back
      </Link>
      <h1 className="text-3xl font-bold tracking-tight text-foreground mb-8">
        Impressum
      </h1>

      <div className="flex flex-col gap-8 text-sm leading-relaxed text-muted-foreground">
        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">
            Angaben gemäß § 5 TMG
          </h2>
          <p>IO Projects GbR</p>
          <p>
            Vertretungsberechtigte Gesellschafter: Danylo Bodnar, Nodirjon
            Tadjiev
          </p>
        </section>

        <section>
          <p>Danylo Bodnar</p>
          <p>Baierbrunner Str. 50</p>
          <p>81379 München</p>
          <p>Deutschland</p>
        </section>

        <section>
          <p>Nodirjon Tadjiev</p>
          <p>Zamenhofstr. 4</p>
          <p>76131 Karlsruhe</p>
          <p>Deutschland</p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">
            E-Mail
          </h2>
          <p>
            <a
              href="mailto:danny@ioprojects.ai"
              className="hover:text-foreground transition-colors"
            >
              danny@ioprojects.ai
            </a>
          </p>
          <p>
            <a
              href="mailto:nodir@ioprojects.ai"
              className="hover:text-foreground transition-colors"
            >
              nodir@ioprojects.ai
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">
            Umsatzsteuer-ID
          </h2>
          <p>
            Eine Umsatzsteuer-Identifikationsnummer nach § 27 a
            Umsatzsteuergesetz wird nach der Gewerbeanmeldung beim
            zuständigen Finanzamt beantragt.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">
            Haftungsausschluss
          </h2>
          <p>
            Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt.
            Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte
            können wir jedoch keine Gewähr übernehmen.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">
            Affiliate- &amp; Werbehinweis
          </h2>
          <p>
            Diese Website erwähnt externe Tools und Produkte zu rein
            informativen Zwecken. Es bestehen keinerlei
            Affiliate-Partnerschaften, Kooperationen oder wirtschaftliche
            Verbindungen zu den genannten Anbietern. Alle Erwähnungen sind
            unabhängig und unbezahlt.
          </p>
        </section>
      </div>
    </main>
  );
}
