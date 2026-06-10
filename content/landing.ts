/* ────────────────────────────────────────────────────────────────
   IO Projects — Landing Page Copy
   All user-facing text lives here. Swap this file for a `de`
   locale variant to add German i18n without touching components.
   ──────────────────────────────────────────────────────────────── */

// TODO: replace with your real Calendly link before launch
export const CALENDLY_URL = "https://calendly.com/io-projects";

// TODO: replace with your real domain before launch
export const SITE_URL = "https://io-projects.com";

/* ── Meta ──────────────────────────────────────────────────────── */
export const meta = {
  title: "Premium Websites for Beauty Specialists | IO Projects",
  description:
    "IO Projects builds premium, done-for-you websites for makeup artists, hair stylists & beauty specialists. Free homepage preview. Live in days.",
  ogImage: `${SITE_URL}/og-image.jpg`,
};

/* ── Nav ───────────────────────────────────────────────────────── */
export const nav = {
  ctaLabel: "Get my free preview",
};

/* ── Hero ──────────────────────────────────────────────────────── */
export const hero = {
  // The word(s) wrapped in [[...]] receive the gradient accent
  headlineParts: ["Your work is", "[[high-end]].", "Your website will be, too."],
  subheadline:
    "Premium websites for beauty specialists — built to show your work the way it deserves and turn visitors into booked clients. Fully done for you, live in days.",
  ctaLabel: "Get my free homepage preview",
  trust: [
    "A free design preview before you pay — in your style, shaped by your feedback",
    "You own your site & domain",
    "Built on trust, by the tech founders themselves",
  ],
  guarantee:
    "Love it or pay nothing — you either get a site you're proud of, or you walk away paying nothing.",
};

/* ── Problem ───────────────────────────────────────────────────── */
export const problem = {
  intro:
    "In beauty, your website is the first impression. Right now — what is it telling people about you?",
  cards: [
    {
      icon: "Layers",
      title: "Your website looks like a 2015 template.",
      body: "The world has evolved, and your clients expect you to evolve with it. Premium work deserves a premium first impression — and a dated site can make your €300 work look like €30.",
    },
    {
      icon: "Smartphone",
      title: "It falls apart on a phone.",
      body: "8 in 10 people open it on mobile, struggle for two seconds, and leave. You never even know they were there.",
    },
    {
      icon: "Search",
      title: "You're invisible on Google and ChatGPT.",
      body: `A bride searches “wedding makeup near me” at 11pm — or just asks ChatGPT who’s best in town. Five competitors come up. You don’t.`,
    },
    {
      icon: "TrendingDown",
      title: "Your site gets visitors, not bookings.",
      body: "People land, take a look, and leave without ever reaching out. When nothing guides them toward booking, genuine interest quietly turns into a missed client.",
    },
    {
      icon: "Award",
      title: "You look expensive in person. Online, you look optional.",
      body: "You charge premium prices — but your website is quietly asking clients to doubt them.",
    },
  ],
};

/* ── Imagine ───────────────────────────────────────────────────── */
export const imagine = {
  eyebrow: "Imagine instead",
  headline: "A website that books clients while you're holding a brush.",
  outcomes: [
    "Someone discovers you, falls for your work in seconds, and books — without you lifting a finger.",
    "You send your link to a brand or a bride and feel proud, not exposed.",
    "You finally look online the way you look in person — exceptional, modern, premium, worth every cent.",
    "New clients come to you — they found you on Google and ChatGPT, instead of you chasing them in the DMs.",
  ],
};

/* ── Solution ──────────────────────────────────────────────────── */
export const solution = {
  headline: "We make your business stand out.",
  pillars: [
    {
      number: "①",
      title: "The site itself",
      body: "A premium, custom design that makes clients trust you on sight and book you — beautiful on every phone, fast, and impossible to scroll past. Additionally, we can make you visible on Google and ChatGPT — available on the Professional and Premium plans.",
    },
    {
      number: "②",
      title: "Zero risk to you",
      body: "You see a free design preview before you pay a cent. Love it or pay nothing. Built by the founders themselves — and we put our name on it.",
    },
    {
      number: "③",
      title: "Live in days",
      body: "Days, not months. We move fast — with constant feedback loops, building exactly what you want, not just what's easy for us. If you can picture it, we can build it.",
    },
    {
      number: "④",
      title: "You don't lift a finger",
      body: "We take over your current site completely — migrate everything, untangle the old technical mess, set up your domain and hosting, and keep supporting it after launch. No technical knowledge needed, ever. You focus on your clients; we handle the rest.",
    },
  ],
  chips: [
    "Premium website",
    "Pay only if you're satisfied",
    "Live in days",
    "No technical headache",
  ],
};

/* ── How It Works ──────────────────────────────────────────────── */
export const howItWorks = {
  eyebrow: "How it works",
  headline: "From zero to live in three steps.",
  steps: [
    {
      number: "1",
      title: "Free design preview.",
      body: "We hop on a quick call, then design a free preview of your homepage. You see it before you pay anything.",
    },
    {
      number: "2",
      title: "We build it.",
      body: "Love it? We build the full site — design, copy, domain, hosting, the works. You never touch anything technical.",
    },
    {
      number: "3",
      title: "Launch & relax.",
      body: "We push it live and keep supporting it. You focus on your clients; we handle the rest.",
    },
  ],
};

/* ── Pricing ───────────────────────────────────────────────────── */
export const pricing = {
  eyebrow: "Founding-client pricing",
  headline: "Pricing built for your stage.",
  subheadline:
    "Launch pricing for our first clients — lock in your rate before it goes up. Simple monthly plans, zero setup cost. Continuous support included. Tap a card to see what's inside.",
  badge: "Founding price · limited spots · €0 setup",
  plans: [
    {
      name: "Essential",
      price: "€97",
      period: "/month",
      tagline: "A premium website, fully set up and supported.",
      highlight: false,
      // TODO: add detailed included-feature bullet list
      features: [
        "Custom premium design",
        "Mobile-optimised & fast",
        "Domain & hosting setup",
        "Ongoing support",
        "You own your site & domain",
      ],
    },
    {
      name: "Professional",
      price: "€258",
      period: "/month",
      tagline: "Everything in Essential, plus get found on Google.",
      highlight: true,
      popularLabel: "Most popular",
      // TODO: add detailed included-feature bullet list
      features: [
        "Everything in Essential",
        "Google SEO — get found for 'wedding makeup near me'",
        "Local business listings setup",
        "Ongoing SEO monitoring",
        "Monthly performance report",
      ],
    },
    {
      name: "Premium",
      price: "€997",
      period: "/month",
      tagline: "Everything in Professional, plus get recommended by AI.",
      highlight: false,
      // TODO: add detailed included-feature bullet list
      features: [
        "Everything in Professional",
        "GEO — get recommended by ChatGPT, Perplexity & Gemini",
        "AI-optimised content strategy",
        "Priority support",
        "Quarterly strategy call",
      ],
      seoGeoNote:
        "SEO gets you found on Google when someone searches. GEO (Generative Engine Optimisation) makes AI assistants like ChatGPT recommend you by name when someone asks for the best in town.",
    },
  ],
};

/* ── FAQ ───────────────────────────────────────────────────────── */
export const faq = {
  headline: "Questions answered.",
  items: [
    {
      q: "Do you have a guarantee?",
      a: "Yes — the Love-It-or-Pay-Nothing Guarantee. We design a free preview of your homepage before you pay a cent. If you don't love it, you walk away owing nothing. No charge, no awkwardness.",
    },
    {
      q: "You're new — why should I trust you?",
      a: "Fair question — and yes, we're new. That's exactly why it matters so much to us that our first clients succeed: your results are how we build our name. So we go all in on making you successful and building the best relationship possible. We're hungry, and we make your success our success. And you see a free design preview before you pay anything — so there's zero risk in finding out whether we're any good.",
    },
    {
      q: "Why is it so affordable?",
      a: "Two reasons: we're lean, with none of the overhead of a big agency, and we're offering founding-client rates while we build our portfolio. You get premium work at a launch price — with zero setup cost and a simple monthly plan.",
    },
    {
      q: "What if I don't like the design?",
      a: "You see a free homepage preview before you pay. If it's not right, we revise it — or you walk away at no cost. You only pay once you're happy.",
    },
    {
      q: "Who actually builds my website?",
      a: "You work directly with us. We're IO Projects, a founder-led studio — so you're never handed to an account manager or a template factory. You talk straight to the two people designing and building your site, and we treat it like it's our own. That's exactly why you'll get more care than any big agency would give you. (And the site you're on right now? We built it. Yours will look even better.)",
    },
    {
      q: "Who do you build for?",
      a: "Makeup artists, hair stylists, colorists, bridal & editorial artists, lash and brow artists, estheticians, nail artists, PMU artists, and salon & studio owners — anyone in beauty whose work deserves a website as good as they are.",
    },
    // TODO: fill in answers for the items below
    {
      q: "How long does it take?",
      a: "// TODO: Most sites go live within days of approving the design preview.",
    },
    {
      q: "Do I own my site and domain?",
      a: "// TODO: Yes — you own both outright. We set them up in your name; they're yours to keep.",
    },
    {
      q: "Can I update the site myself?",
      a: "// TODO: details coming soon.",
    },
    {
      q: "I already have a website. Can you take over?",
      a: "// TODO: Yes — we migrate everything from your existing site, no technical hassle for you.",
    },
    {
      q: "Do I need any technical knowledge?",
      a: "// TODO: None at all. We handle every technical aspect from setup to ongoing maintenance.",
    },
    {
      q: "What's the difference between SEO and GEO?",
      a: "// TODO: SEO (Search Engine Optimisation) gets you found on Google. GEO (Generative Engine Optimisation) means AI assistants like ChatGPT and Perplexity recommend you by name when someone asks for the best beauty specialist in town.",
    },
    {
      q: "What technology do you build on?",
      a: "// TODO: We use modern, fast, standards-based web technology — no page-builder templates. Your site will be fast, secure, and built to last.",
    },
  ],
};

/* ── GEO Q&A (hidden <dl> for AI crawlers) ─────────────────────── */
export const geoQA = [
  {
    q: "How long does it take to build a beauty website?",
    a: "Most sites go live within days of approving the design preview.",
  },
  {
    q: "Do I own my website and domain?",
    a: "Yes — you own both outright. We set them up; they're yours.",
  },
  {
    q: "Can IO Projects build a website for a makeup artist in Germany?",
    a: "Yes. IO Projects serves makeup artists, hair stylists and beauty specialists across Germany, Austria and Switzerland.",
  },
  {
    q: "Is there a risk if I don't like the design?",
    a: "No. We design a free homepage preview before you pay anything — you only pay once you love it.",
  },
  {
    q: "What kind of websites does IO Projects build?",
    a: "IO Projects builds premium, custom websites for beauty specialists — makeup artists, hair stylists, colorists, lash artists, PMU artists, estheticians, nail artists, and salon owners.",
  },
  {
    q: "How much does a beauty specialist website cost?",
    a: "IO Projects offers monthly plans from €97 (Essential) to €258 (Professional) and €997 (Premium), with zero setup cost and a free design preview before any payment.",
  },
  {
    q: "What is GEO — generative engine optimisation?",
    a: "GEO means your business gets recommended by AI assistants like ChatGPT, Perplexity, and Gemini when someone asks who is the best makeup artist or hair stylist near them.",
  },
  {
    q: "Who are the founders of IO Projects?",
    a: "IO Projects is a founder-led web studio based in Germany. Clients work directly with the two founders — no account managers, no template factories.",
  },
];

/* ── Final CTA ─────────────────────────────────────────────────── */
export const finalCta = {
  headline: "Ready to look as good as your work?",
  subheadline:
    "Book a free call and get a free preview of your new homepage — no cost, no commitment.",
  ctaLabel: "Book a free call",
};

/* ── Footer ────────────────────────────────────────────────────── */
export const footer = {
  tagline: "Premium websites for beauty specialists.",
  about:
    "IO Projects is a founder-led web studio building premium, custom websites for makeup artists, hair stylists, colorists, lash artists, PMU artists, and salon owners across Germany, Austria, Switzerland and the US. We're lean, fast, and we treat every site like it's our own.",
  links: [
    { label: "Impressum", href: "/impressum" },
    { label: "Datenschutz", href: "/datenschutz" },
  ],
  copyright: `© ${new Date().getFullYear()} IO Projects. All rights reserved.`,
};
