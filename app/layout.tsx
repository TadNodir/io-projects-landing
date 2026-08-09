import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { enDict, SITE_URL } from "@/content/landing";
import { GoogleAnalyticsGate } from "@/components/GoogleAnalyticsGate";
import { CookieConsent } from "@/components/CookieConsent";

const meta = {
  title: enDict.meta.title,
  description: enDict.meta.description,
  ogImage: "/io-logo-white.png",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: meta.title,
  description: meta.description,
  authors: [{ name: "IO Projects" }],
  creator: "IO Projects",
  publisher: "IO Projects",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: SITE_URL,
  },
  verification: { google: 'xTohApE7D6CWv2fwyQOlFn095fWBV5qjawIfs6QhcwU' },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: SITE_URL,
    title: meta.title,
    description: meta.description,
    siteName: "IO Projects",
    images: [
      {
        url: meta.ogImage,
        width: 1200,
        height: 630,
        alt: "IO Projects — Premium Websites for Beauty Specialists",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: meta.title,
    description: meta.description,
    images: [meta.ogImage],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* JSON-LD: Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "IO Projects",
              url: SITE_URL,
              logo: `${SITE_URL}/io-logo-white.png`,
              sameAs: [],
            }),
          }}
        />
        {/* JSON-LD: ProfessionalService */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "IO Projects",
              description:
                "Premium websites for beauty specialists — done for you, live in days.",
              areaServed: ["DE", "AT", "CH", "US"],
              priceRange: "€€",
              offers: {
                "@type": "AggregateOffer",
                lowPrice: "97",
                highPrice: "997",
                priceCurrency: "EUR",
              },
            }),
          }}
        />
      </head>
      {/* suppressHydrationWarning: next-themes injects a <script> to prevent
          theme flash; React 19 warns about scripts in components but this
          script runs before hydration and is intentional/safe. */}
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
        <CookieConsent />
      </body>
      <GoogleAnalyticsGate />
    </html>
  );
}
