/* ────────────────────────────────────────────────────────────────
   Shared dictionary shape — every locale (en/de/ru) must satisfy this.
   Defining explicit interfaces (instead of `typeof en`) guarantees all
   three locales stay structurally in sync and surfaces missing keys.
   ──────────────────────────────────────────────────────────────── */

export interface ProblemCard {
  icon: string;
  title: string;
  body: string;
}

export interface Pillar {
  number: string;
  title: string;
  body: string;
}

export interface Step {
  number: string;
  title: string;
  body: string;
}

export interface Plan {
  name: string;
  price: string;
  period: string;
  tagline: string;
  highlight: boolean;
  popularLabel?: string;
  features: string[];
  seoGeoNote?: string;
}

export interface QA {
  q: string;
  a: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface Dictionary {
  /* Page <title> / meta description (visible title is also synced client-side) */
  meta: {
    title: string;
    description: string;
  };

  /* Nav + global UI chrome strings */
  ui: {
    navPricing: string;
    navFaq: string;
    navCta: string;
    navHomeAria: string;
    navPrimaryAria: string;
    navMobileAria: string;
    menuOpen: string;
    menuClose: string;
    languageAria: string;

    heroAria: string;
    heroOrbAlt: string;
    heroTrustAria: string;

    problemAria: string;
    problemReality: string;
    scroll: string;

    solutionSubhead: string;

    howItWorksSubhead: string;
    stepOf: string; // "Step {n} of {total}"

    pricingGetStarted: string;
    pricingWhatsIncluded: string;

    faqMoreAnswers: string;
    faqAdditionalAria: string;

    footerAboutHeading: string;
    footerRights: string;
  };

  hero: {
    headlineParts: string[];
    subheadline: string;
    ctaLabel: string;
    trust: string[];
    guarantee: string;
  };

  problem: {
    intro: string;
    cards: ProblemCard[];
  };

  imagine: {
    eyebrow: string;
    headline: string;
    outcomes: string[];
  };

  solution: {
    headline: string;
    pillars: Pillar[];
    chips: string[];
  };

  howItWorks: {
    eyebrow: string;
    headline: string;
    steps: Step[];
  };

  pricing: {
    eyebrow: string;
    headline: string;
    subheadline: string;
    badge: string;
    plans: Plan[];
  };

  faq: {
    headline: string;
    items: QA[];
  };

  geoQA: QA[];

  finalCta: {
    headline: string;
    subheadline: string;
    ctaLabel: string;
  };

  footer: {
    tagline: string;
    aboutHeading: string;
    about: string;
    links: FooterLink[];
  };
}
