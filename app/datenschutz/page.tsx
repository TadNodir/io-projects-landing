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
      <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">
        Datenschutzerklärung
      </h1>
      <p className="text-sm text-muted-foreground mb-8">
        Stand: 11. Januar 2026
      </p>

      <div className="flex flex-col gap-8 text-sm leading-relaxed text-muted-foreground">
        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">
            Verantwortliche
          </h2>
          <p>Danylo Bodnar</p>
          <p>Baierbrunner Str. 50</p>
          <p>81379 München</p>
          <p className="mt-3">Nodirjon Tadjiev</p>
          <p>Zamenhofstr. 4</p>
          <p>76131 Karlsruhe</p>
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
            Erhebung und Verarbeitung personenbezogener Daten
          </h2>
          <p>
            Beim Besuch dieser Website werden automatisch Informationen durch
            den Server erfasst.
          </p>
          <p className="mt-2">
            Diese Daten umfassen u. a.: IP-Adresse, Browsertyp,
            Betriebssystem, Referrer-URL, Uhrzeit des Zugriffs.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">
            Hosting &amp; Content Delivery
          </h2>
          <p>Diese Website wird bei Vercel Inc. gehostet.</p>
          <p className="mt-2">
            Als CDN und Sicherheitsdienstleister nutzen wir Cloudflare, Inc.
          </p>
          <p className="mt-2">
            Vercel und Cloudflare verarbeiten Daten gemäß Art. 28 DSGVO auf
            Grundlage jeweiliger Auftragsverarbeitungsverträge.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">
            Zweck der Verarbeitung
          </h2>
          <p>
            Bereitstellung der Website, Systemsicherheit, Fehleranalyse.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">
            Rechtsgrundlage
          </h2>
          <p>
            Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer
            sicheren und stabilen Website)
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">
            Cookies
          </h2>
          <p>
            Derzeit werden keine Cookies zu Tracking- oder Analysezwecken
            eingesetzt.
          </p>
          <p className="mt-2">
            Technisch notwendige Cookies können durch den Hostinganbieter
            gesetzt werden.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">
            Betroffenenrechte
          </h2>
          <p>
            Sie haben das Recht auf Auskunft, Berichtigung, Löschung,
            Einschränkung der Verarbeitung, Widerspruch und
            Datenübertragbarkeit.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">
            Beschwerderecht
          </h2>
          <p>
            Zuständige Aufsichtsbehörde ist der Landesdatenschutzbeauftragte
            Ihres Bundeslandes.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">
            Datenübermittlung in Drittländer
          </h2>
          <p>
            Eine Übermittlung in Drittländer (z. B. USA) kann durch Vercel
            und Cloudflare erfolgen.
          </p>
          <p className="mt-2">
            Beide Anbieter verwenden Standardvertragsklauseln gemäß Art. 46
            DSGVO.
          </p>
        </section>
      </div>
    </main>
  );
}
