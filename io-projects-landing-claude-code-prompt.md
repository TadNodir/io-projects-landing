# Claude Code Build Prompt — IO Projects Landing Page

> Paste everything below the line into Claude Code. It assumes you start in an empty repo (or let it scaffold one). Adjust the asset filenames in the "Assets" block to match what you actually export.

---

## ROLE & GOAL

You are building a single-page, premium marketing landing page for **IO Projects** — a founder-led web studio (two founders) that builds premium websites for high-end beauty specialists (makeup artists, hair stylists, colorists, bridal/editorial artists, lash & brow artists, estheticians, nail artists, PMU artists, salon & studio owners). The page sells **done-for-you premium websites, free homepage preview before payment, live in days**.

This page is the studio's own proof of work ("the site you're on? we built it"), so design quality is the product. Aim for an aesthetic that is **premium, modern, ethereal, trustworthy** — not "salesy," not generic-AI-startup. The brand visual language is a **luminous blue / white "magical light" theme** (a glowing orb / energy that radiates light like a sun or Tesla coil, set against a dreamy blue gradient). Think Apple-grade restraint + a touch of enchantment.

Audience skews German (DACH) — keep it professional, respectful, and polished. Copy is in English in this brief but build the page so a `de` locale could be added later (no hardcoded text inside logic; all copy in a content layer).

---

## TECH STACK & SETUP

- **Next.js (App Router) + TypeScript + Tailwind CSS**
- **Framer Motion** for all entrance/scroll animations and motion design
- **Remotion** skill for any programmatic motion graphics if needed (the hero text reveal is done in Framer Motion, not Remotion, unless a Remotion-rendered asset is clearly better)
- **21st.dev** component registry for high-quality building-block components (hero, marquee, animated cards, accordions, pricing) — pull components from there and restyle to the brand, do not ship them stock
- **shadcn/ui** for accessible primitives (accordion for FAQ, dialog, button) styled to brand
- **next-themes** (`npm i next-themes`) for dark/light mode — wrap the app in `<ThemeProvider attribute="class" defaultTheme="system" enableSystem>` in the root layout so it respects system preference out of the box and persists choice to `localStorage`

### Dark mode toggle
Place a small, premium toggle button at the right end of the nav (between the logo and the CTA button). Use the **sun / moon** icon pair from `lucide-react` (`Sun`, `Moon`). On click, call `useTheme().setTheme(theme === "dark" ? "light" : "dark")`. The icon should crossfade/rotate with a short Framer Motion transition (~200ms). The button must be accessible (`aria-label="Toggle colour mode"`), styled with `text-foreground/70 hover:text-foreground` (no hardcoded colors), and sized to match the nav's visual weight — small icon, no border/background unless hovered. It must also be present in the mobile nav. Suppress the hydration flash with `suppressHydrationMismatch` on `<html>`.

Run these first to install the skills/plugins, then use them throughout:

```bash
npx skills add remotion-dev/skills
```
```
/plugin marketplace add nextlevelbuilder/ui-ux-pro-max-skill
/plugin install ui-ux-pro-max@ui-ux-pro-max-skill
```

Use the `ui-ux-pro-max` plugin for layout/spacing/visual-polish decisions and the remotion skill where motion-graphic rendering helps. Use 21st.dev components as starting points for: animated hero, bento/feature grid, marquee of trust chips, animated pricing cards, and the FAQ accordion.

Initialize cleanly (`create-next-app`, Tailwind, framer-motion, shadcn) before building sections. Deploy target is **Vercel**.

---

## ASSETS

Place these in `/public`. Wire them in; create tasteful fallbacks if a file is missing.

The hero uses **TWO videos** that share one anchor frame so the handoff is seamless:

- `hero-intro.webm` / `hero-intro.mp4` — plays **once on load** (~5s): a small light emerges and bursts (Tesla-coil discharge) into a radiant orb that **settles into the exact composition of `hero-anchor.jpg` on its final frame**. No baked-in text.
- `hero-loop.webm` / `hero-loop.mp4` — the **permanent loop** (~5s, seamless): the settled orb sits in the lower third radiating light like a sun/Tesla coil, animals/birds/butterflies move, mist drifts. **Its first and last frame both equal `hero-anchor.jpg`** so it loops with no jump. No baked-in text.
- `hero-anchor.jpg` — the shared still of the settled composition (orb lower-third, animals at bottom, open blue space top). Used as the `poster` for BOTH videos and as the reduced-motion fallback.
- `io-logo.svg` (and `io-logo-white.svg`) — the IO brand mark.

### Hero video architecture (two-video intro → loop)
Build a `HeroVideo` client component that stacks both videos absolutely (`object-fit: cover`) and crossfades at the handoff:
- The **loop** sits underneath at `opacity-0`, `preload="auto"`, muted/loop/playsInline.
- The **intro** sits on top, `autoPlay` muted playsInline, plays once.
- On the intro's `onEnded`: start the loop from `currentTime = 0`, fade the intro to `opacity-0 pointer-events-none` (~300ms) while fading the loop to `opacity-100` (~500ms). Because both ends share `hero-anchor.jpg`, the crossfade is invisible.
- `onEnded` also fires an `onEmerged` callback the hero uses to **trigger the headline reveal** — so the text appears exactly when the orb finishes emerging, not on a fixed timer.
- **Reduced motion** (`useReducedMotion`): skip the intro entirely — play only the loop (or, for strict compliance, render just the `hero-anchor.jpg` poster, no playback). Honor this throughout.
- **Play intro once per visit:** gate the intro behind a `sessionStorage` flag (`io_intro_seen`) set in `onEnded`, so returning visitors in the same session go straight to the loop. (`localStorage` if "once ever per device" is preferred.)
- All hero text is **real HTML overlaid on the top portion** (white on blue) — never rely on the video for text.
- Add a top-down gradient scrim (`from-[#0A1A3F]/70 via-transparent to-transparent`) so white text stays legible over any frame.
- Performance: `hero-anchor.jpg` poster paints instantly (don't let video block LCP); keep the **loop file small and well-compressed** since it runs forever; intro can be slightly richer since it plays once. Serve `webm` + `mp4` for both.

Reference component (adapt to the design system):
```tsx
"use client";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

export function HeroVideo({ onEmerged }: { onEmerged?: () => void }) {
  const reduce = useReducedMotion();
  const loopRef = useRef<HTMLVideoElement>(null);
  const [introDone, setIntroDone] = useState(false);
  const skipIntro = reduce; // optionally: || !!sessionStorage.getItem("io_intro_seen")

  useEffect(() => {
    if (skipIntro) { loopRef.current?.play().catch(() => {}); setIntroDone(true); onEmerged?.(); }
  }, [skipIntro, onEmerged]);

  const handleIntroEnd = () => {
    const loop = loopRef.current;
    if (loop) { loop.currentTime = 0; loop.play().catch(() => {}); }
    // sessionStorage.setItem("io_intro_seen", "1");
    setIntroDone(true);
    onEmerged?.();
  };

  return (
    <div className="absolute inset-0 overflow-hidden">
      <video ref={loopRef}
        className={`absolute inset-0 h-full w-full object-cover [object-position:50%_40%] md:[object-position:center] transition-opacity duration-500 ${introDone ? "opacity-100" : "opacity-0"}`}
        poster="/hero-anchor.jpg" muted loop playsInline preload="auto">
        <source src="/hero-loop.webm" type="video/webm" />
        <source src="/hero-loop.mp4" type="video/mp4" />
      </video>
      {!skipIntro && (
        <video
          className={`absolute inset-0 h-full w-full object-cover [object-position:50%_40%] md:[object-position:center] transition-opacity duration-300 ${introDone ? "opacity-0 pointer-events-none" : "opacity-100"}`}
          poster="/hero-anchor.jpg" autoPlay muted playsInline preload="auto" onEnded={handleIntroEnd}>
          <source src="/hero-intro.webm" type="video/webm" />
          <source src="/hero-intro.mp4" type="video/mp4" />
        </video>
      )}
      {/* scrim tinted toward the background token (purple in dark mode) so it blends with the palette */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 dark:from-background/80 via-transparent to-transparent" />
    </div>
  );
}
```
The hero gates its headline on the callback: `const [emerged, setEmerged] = useState(false)` → `<HeroVideo onEmerged={() => setEmerged(true)} />` → headline `<motion.h1>` animates when `emerged` is true.

---

## DESIGN SYSTEM

Define these as CSS variables / Tailwind theme tokens.

**Color — use these EXACT HSL tokens. No hardcoded hex/rgb/cyan/teal anywhere in the codebase.**

Define as CSS variables in shadcn format (`H S% L%`, space-separated, **no commas, no `hsl()` wrapper**), then reference them through Tailwind/shadcn (`bg-primary`, `text-foreground`, `border-border`, etc.). Every section — nav, buttons, chips, pricing cards, FAQ, footer, glows, borders, surfaces — must reference tokens, never literal colors. Support a `.dark` class for the deep-purple dark mode.

```css
:root {
  /* LIGHT MODE (default) */
  --background: 0 0% 100%;
  --foreground: 222 47% 11%;
  --primary: 221 83% 53%;            /* #2563EB bright blue */
  --primary-foreground: 0 0% 100%;
  --accent: 263 70% 50%;             /* #7C3AED violet */
  --accent-foreground: 0 0% 100%;
  --muted: 210 40% 96%;
  --muted-foreground: 222 20% 40%;
  --card: 0 0% 100%;
  --card-foreground: 222 47% 11%;
  --border: 214 32% 91%;
  --input: 214 32% 91%;
  --ring: 221 83% 53%;
}

.dark {
  /* DARK PURPLE MODE */
  --background: 260 45% 6%;          /* deep purple-black */
  --foreground: 270 20% 95%;
  --primary: 270 80% 60%;            /* #A855F7 vivid purple */
  --primary-foreground: 270 20% 98%;
  --accent: 280 90% 65%;             /* magenta-purple */
  --accent-foreground: 270 20% 98%;
  --muted: 265 30% 14%;
  --muted-foreground: 270 15% 70%;
  --card: 265 40% 10%;
  --card-foreground: 270 20% 95%;
  --border: 270 30% 18%;
  --input: 270 30% 18%;
  --ring: 270 80% 60%;
}
```

Application rules (apply consistently — this replaces all previous cyan/blue references):
- **No cyan/teal anywhere.** Replace every old cyan/teal/`#xxxxxx` value across nav, buttons, chips, pricing cards, FAQ, footer, and glows with these tokens.
- **Headline gradient accent:** the emphasis phrase in the hero headline gets a `bg-gradient-to-r from-primary to-accent` text gradient (`bg-clip-text text-transparent`) — blue→violet in light mode, purple→magenta in dark. (NOTE: keep the locked copy; gradient the existing emphasis phrase, do **not** introduce the word "pros.")
- **CTA buttons:** base `bg-primary text-primary-foreground`; hover/active uses a `from-primary to-accent` gradient as the end state (subtle gradient sweep on hover).
- **Glows / radiating light / focus rings:** use `primary` and `accent` at low opacity (e.g. `bg-primary/15`, `shadow-[0_0_80px_hsl(var(--accent)/0.25)]`) instead of cyan. The hero/CTA radiating-glow pulse uses primary→accent.
- **Borders & card surfaces:** `border-border`, `bg-card`; tints and dividers use `primary`/`accent` at low opacity, never cyan.
- **Hero video scrim:** keep the video and its dark top-down scrim, but tint the scrim toward the **background token** so it blends (light: `from-background/70`; dark: deep purple `from-background/80`). Use `hsl(var(--background)/0.7)` rather than a hardcoded navy.
- Text: `text-foreground` for body/headings, `text-muted-foreground` for secondary, `text-primary-foreground` on filled buttons. On the video hero, text stays white/`foreground` over the tinted scrim.

**Type**
- Display/headings: a refined geometric or high-contrast serif/sans (e.g., a clean grotesk like "General Sans" or "Satoshi", or a tasteful editorial serif for accents). Headings large, tight tracking, confident.
- Body: a highly legible sans (e.g., Inter). Comfortable line length (~60–72ch), generous line-height.

**Motion principles (Framer Motion)**
- Premium = restrained. Use `easeOut` / custom cubic-bezier, durations 0.5–0.9s, small offsets (16–40px), opacity + slight translate/scale. No bounce, no spammy stagger.
- Section content reveals on scroll via `whileInView` with `viewport={{ once: true, margin: "-15%" }}`, staggered children ~0.08s.
- Hero headline does a **delayed reveal** (~after 1.8–2.2s, synced to when the video orb has "emerged"): words/lines clip-mask up + fade, then subheadline, then CTA. Use a `useReducedMotion` guard.
- Add a soft radiating-glow pulse behind the CTA/orb area (CSS or Framer) echoing the "light spreading" idea.

**Layout**
- Max content width ~1200px, generous vertical rhythm (sections ~96–140px padding), strong whitespace.
- Mobile-first; everything must look premium at 375px. **Hero video on mobile: keep `object-cover` so it crops inward from the left and right (the sides shrink in) while the centered orb/sphere stays fully visible and centered — never crop or cut off the sphere.** Tune `object-position` (start at `center`; nudge the vertical, e.g. `object-position: 50% 40%`, so the lower-third orb sits centered in the taller mobile frame). Do not letterbox. Text stacks; pricing cards become a swipeable/stacked layout; problem cards single-column.
- Accessibility: semantic landmarks, focus states, AA contrast, accordion keyboard nav, `alt` text, prefers-reduced-motion honored everywhere.

---

## PAGE STRUCTURE & COPY (build in this exact order)

Put all copy in a typed content file (e.g. `content/landing.ts`) so it's editable in one place. The CTA buttons link to a Calendly URL placeholder constant `CALENDLY_URL` (define at top, leave a `# TODO` value).

### 1) HERO (video background, text overlay top)
- Background: `hero.mp4` cover + top scrim.
- IO logo (`io-logo-white.svg`) small, top-left in a minimal sticky/transparent nav — to the right of the logo sits the **dark/light mode toggle** (sun/moon icon, Framer crossfade), then the single CTA button at the far right.
- Headline: **Your work is high-end. Your website will be, too.** — render the emphasis phrase **"high-end"** with the `from-primary to-accent` text gradient (`bg-clip-text text-transparent`), blue→violet (light) / purple→magenta (dark). Keep the locked wording; do not introduce "pros."
- Subheadline: *Premium websites for beauty specialists — built to show your work the way it deserves and turn visitors into booked clients. Fully done for you, live in days.*
- Primary CTA button label: **Get my free homepage preview** → `CALENDLY_URL`
- Trust strip (small, under button, with check icons):
  - A free design preview before you pay — in your style, shaped by your feedback
  - You own your site & domain
  - Built on trust, by the tech founders themselves
- Guarantee line (bold, directly under trust strip): **Love it or pay nothing — you either get a site you're proud of, or you walk away paying nothing.**
- Hero text sits in the top portion (white on blue), animates in after the orb "emerges."

### 2) THE PROBLEM
- Intro line: *In beauty, your website is the first impression. Right now — what is it telling people about you?*
- 5 cards (icon + bold title + body). Reveal staggered on scroll.
  1. **Your website looks like a 2015 template.** The world has evolved, and your clients expect you to evolve with it. Premium work deserves a premium first impression — and a dated site can make your €300 work look like €30.
  2. **It falls apart on a phone.** 8 in 10 people open it on mobile, struggle for two seconds, and leave. You never even know they were there.
  3. **You're invisible on Google and ChatGPT.** A bride searches "wedding makeup near me" at 11pm — or just asks ChatGPT who's best in town. Five competitors come up. You don't.
  4. **Your site gets visitors, not bookings.** People land, take a look, and leave without ever reaching out. When nothing guides them toward booking, genuine interest quietly turns into a missed client.
  5. **You look expensive in person. Online, you look optional.** You charge premium prices — but your website is quietly asking clients to doubt them.

### 3) IMAGINE INSTEAD (dream outcome)
- Eyebrow: **Imagine instead**
- Headline: **A website that books clients while you're holding a brush.**
- Outcome lines (animated list, each fades up):
  - Someone discovers you, falls for your work in seconds, and books — without you lifting a finger.
  - You send your link to a brand or a bride and feel proud, not exposed.
  - You finally look online the way you look in person — exceptional, modern, premium, worth every cent.
  - New clients come to you — they found you on Google and ChatGPT, instead of you chasing them in the DMs.
- Consider a soft glowing-orb motif here echoing the hero light.

### 4) THE SOLUTION (value stack — 4 pillars)
- Headline: **We make your business stand out.**
- 4 pillars (bento/feature grid, each with a number ① ② ③ ④, title, body):
  - **① The site itself** — A premium, custom design that makes clients trust you on sight and book you — beautiful on every phone, fast, and impossible to scroll past. Additionally, we can make you visible on Google and ChatGPT — available on the Professional and Premium plans.
  - **② Zero risk to you** — You see a free design preview before you pay a cent. Love it or pay nothing. Built by the founders themselves — and we put our name on it.
  - **③ Live in days** — Days, not months. We move fast — with constant feedback loops, building exactly what you want, not just what's easy for us. If you can picture it, we can build it.
  - **④ You don't lift a finger** — We take over your current site completely — migrate everything, untangle the old technical mess, set up your domain and hosting, and keep supporting it after launch. No technical knowledge needed, ever. You focus on your clients; we handle the rest.
- Chips row (pill badges): Premium website · Pay only if you're satisfied · Live in days · No technical headache

### 5) HOW IT WORKS (3 steps)
- Eyebrow: **How it works**
- Headline: **From zero to live in three steps.**
- 3 numbered steps (horizontal on desktop, vertical timeline on mobile, animated connecting line):
  1. **Free design preview.** We hop on a quick call, then design a free preview of your homepage. You see it before you pay anything.
  2. **We build it.** Love it? We build the full site — design, copy, domain, hosting, the works. You never touch anything technical.
  3. **Launch & relax.** We push it live and keep supporting it. You focus on your clients; we handle the rest.

### 6) PRICING (founding-client, monthly, €0 setup)
- Eyebrow: **Founding-client pricing**
- Headline: **Pricing built for your stage.**
- Subheadline: *Launch pricing for our first clients — lock in your rate before it goes up. Simple monthly plans, zero setup cost. Continuous support included. Tap a card to see what's inside.*
- Badge on cards: **Founding price · limited spots · €0 setup**
- 3 expandable pricing cards (click to expand included-features list; middle card visually highlighted as "Most popular" with a stronger glow):
  - **Essential — €97/month.** A premium website, fully set up and supported.
  - **Professional — €258/month** *(Most popular)*. Everything in Essential, plus get found on Google.
  - **Premium — €997/month.** Everything in Professional, plus get recommended by AI.
- Inside Premium (and where relevant), include short SEO vs GEO ("get found on Google" / "get recommended by AI") explainer text. Leave clear `// TODO: detailed included-feature bullet lists` placeholders the user will fill.

### 7) FAQ (accordion — objection-killers first)
Use an accessible accordion. Order:
- **Do you have a guarantee?** Yes — the Love-It-or-Pay-Nothing Guarantee. We design a free preview of your homepage before you pay a cent. If you don't love it, you walk away owing nothing. No charge, no awkwardness.
- **You're new — why should I trust you?** Fair question — and yes, we're new. That's exactly why it matters so much to us that our first clients succeed: your results are how we build our name. So we go all in on making you successful and building the best relationship possible. We're hungry, and we make your success our success. And you see a free design preview before you pay anything — so there's zero risk in finding out whether we're any good.
- **Why is it so affordable?** Two reasons: we're lean, with none of the overhead of a big agency, and we're offering founding-client rates while we build our portfolio. You get premium work at a launch price — with zero setup cost and a simple monthly plan.
- **What if I don't like the design?** You see a free homepage preview before you pay. If it's not right, we revise it — or you walk away at no cost. You only pay once you're happy.
- **Who actually builds my website?** You work directly with us. We're IO Projects, a founder-led studio — so you're never handed to an account manager or a template factory. You talk straight to the two people designing and building your site, and we treat it like it's our own. That's exactly why you'll get more care than any big agency would give you. (And the site you're on right now? We built it. Yours will look even better.)
- **Who do you build for?** Makeup artists, hair stylists, colorists, bridal & editorial artists, lash and brow artists, estheticians, nail artists, PMU artists, and salon & studio owners — anyone in beauty whose work deserves a website as good as they are.
- Add placeholder accordion items (with `// TODO` bodies) for: how long does it take · do I own my site & domain · can I update it myself · I already have a website · do I need any tech knowledge · SEO vs GEO · what tech do you build on.

### 8) FINAL CTA
- Headline: **Ready to look as good as your work?**
- Subheadline: *Book a free call and get a free preview of your new homepage — no cost, no commitment.*
- Button: **Book a free call →** → `CALENDLY_URL`
- Echo the hero glow here (radiating light behind the CTA) to bookend the page.

### Footer
- IO logo, short tagline, © IO Projects, minimal links (Imprint/Impressum placeholder, Privacy/Datenschutz placeholder — important for the German market, leave `// TODO` routes).

---

## VOICE RULES (apply to any micro-copy you generate)
- Premium, confident, never "salesy." Never use the word "pros." Umbrella phrase is **"beauty specialists."**
- Speak to the reader as "you." Specific beats vague. Lead with the outcome.
- Professional and respectful (this sells in Germany) — aspirational and encouraging, never rude, accusatory, or condescending.

---

## PERFORMANCE & QUALITY BAR
- Hero video: compressed (target < 3–4 MB total for both clips), `webm` + `mp4`, poster-first, reduced-motion fallback. Don't block LCP — poster + headline must paint before video decodes.
- Lighthouse targets: Performance ≥ 90 mobile, Accessibility 100, Best Practices ≥ 95, SEO 100.
- **Color: every color references the HSL tokens via Tailwind/shadcn — zero hardcoded hex/rgb/cyan/teal anywhere.** Both light and `.dark` modes work across all sections.
- Single accent system, consistent spacing scale, zero layout shift (CLS = 0).
- All copy in `content/landing.ts`; structure ready for a future `de` locale.

---

## SEO — TRADITIONAL (Google / Bing)

Goal: rank for terms like "premium website beauty specialist," "website für Make-up Artist," "wedding makeup website" in DACH and secondarily in English markets.

### Meta & document
- `<html lang="en">` (add `de` variant later via i18n routing).
- Per-page `<title>` pattern: `{Page topic} | IO Projects — Premium Websites for Beauty Specialists`.
- `<meta name="description">` ≤ 155 chars, action-oriented, includes the primary keyword.
- Canonical `<link rel="canonical">` on every route.
- `robots.txt` allowing all, `sitemap.xml` auto-generated (use `next-sitemap`), submitted to GSC at launch.
- Open Graph: `og:title`, `og:description`, `og:image` (1200×630 static render of the hero anchor composition), `og:type: website`, `og:locale`.
- Twitter Card: `summary_large_image`.
- Favicon set: 16×16, 32×32, 180×180 apple-touch-icon, `site.webmanifest` with theme color matching `--primary`.

### Structured data (JSON-LD, injected via Next.js `<Script>` or inline in `<head>`)
Emit **all three** of the following on the landing page:

```jsonc
// 1. Organization
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "IO Projects",
  "url": "https://io-projects.com",       // TODO: real domain
  "logo": "https://io-projects.com/io-logo.svg",
  "sameAs": []                             // TODO: social profiles
}

// 2. LocalBusiness (DACH primary market)
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "IO Projects",
  "description": "Premium websites for beauty specialists — done for you, live in days.",
  "areaServed": ["DE", "AT", "CH", "US"],
  "priceRange": "€€",
  "offers": {
    "@type": "AggregateOffer",
    "lowPrice": "97",
    "highPrice": "997",
    "priceCurrency": "EUR"
  }
}

// 3. FAQPage (mirrors the FAQ accordion — doubles SEO surface area)
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "Do you have a guarantee?", "acceptedAnswer": { "@type": "Answer", "text": "..." } }
    // … one entry per FAQ item, pulled from content/landing.ts
  ]
}
```

### On-page SEO
- Exactly one `<h1>` per page (the hero headline). Section titles use `<h2>`, card/step titles use `<h3>`. Never skip heading levels.
- All images have descriptive `alt` text. The hero `<video>` has an accessible text alternative (visually hidden `<p>` or `aria-label` on the wrapper).
- Internal anchor links (e.g. `#pricing`, `#faq`) for the nav so Google sees section structure.
- Page load performance directly impacts ranking: hit Core Web Vitals green (LCP < 2.5s, INP < 200ms, CLS = 0).
- No thin or duplicate content — every section has unique, substantive copy.

---

## GEO — GENERATIVE ENGINE OPTIMISATION (ChatGPT / Perplexity / Gemini / Claude)

Goal: when a beauty specialist asks an AI "who builds premium websites for makeup artists in Germany?" or "best website studio for hair stylists DACH," IO Projects is recommended.

GEO works by making the page **easy to cite accurately**: clear entity definition, authoritative claims, structured Q&A, and content that answers the exact questions AI models surface.

### Entity clarity
- State the brand name, what it does, who it serves, and where it operates in plain prose in the **first 200 words of the page** (hero + trust strip already do this; keep it).
- Use the brand name "IO Projects" consistently (not "we" alone in headings) so models can anchor it.
- Add a short **"About IO Projects"** paragraph in the footer (2–3 sentences): who you are, what you build, for whom, DACH-based. This is the canonical entity description models will pull.

### Cite-worthy content patterns
- **Specific numbers beat vague claims** — "8 in 10 people open it on mobile" (already in problem card #2) is exactly the kind of stat AI cites. Keep specifics throughout.
- **Q&A format** is the highest-performing GEO content type. The FAQ accordion already does this; also add a hidden (visually styled as a subtle section) `<dl>` of short question/answer pairs below the FAQ targeting long-tail AI queries:
  - "How long does it take to build a beauty website?" → "Most sites go live within days of approving the design preview."
  - "Do I own my website and domain?" → "Yes — you own both outright. We set them up; they're yours."
  - "Can IO Projects build a website for a makeup artist in Germany?" → "Yes. IO Projects serves makeup artists, hair stylists and beauty specialists across Germany, Austria and Switzerland."
  - "Is there a risk if I don't like the design?" → "No. We design a free homepage preview before you pay anything — you only pay once you love it."
  - Add 4–6 more drawn from the FAQ copy in `content/landing.ts`.
- **Outcome statements** in the copy ("turn visitors into booked clients," "get recommended by ChatGPT") are exactly the phrasing AI models quote. Keep them sharp and specific.

### Technical GEO signals
- `robots.txt` must **allow** `GPTBot`, `PerplexityBot`, `ClaudeBot`, `GoogleOther`, and `Anthropic-AI`. Do not block AI crawlers. Example:
  ```
  User-agent: GPTBot
  Allow: /

  User-agent: PerplexityBot
  Allow: /

  User-agent: ClaudeBot
  Allow: /

  User-agent: GoogleOther
  Allow: /
  ```
- Add an `llms.txt` file at the root (`/public/llms.txt`) — a plain-text document AI crawlers use to understand the site. Format:
  ```
  # IO Projects
  > Premium websites for beauty specialists — done for you, live in days.

  IO Projects is a founder-led web studio based in Germany building premium, custom websites for makeup artists, hair stylists, colorists, lash artists, PMU artists, and salon owners across DACH (Germany, Austria, Switzerland) and the US.

  ## Services
  - Essential: €97/month — premium website, fully set up and supported
  - Professional: €258/month — Essential + Google SEO
  - Premium: €997/month — Professional + AI recommendation (GEO)

  ## Guarantee
  Love it or pay nothing. Free homepage design preview before any payment.

  ## Contact
  [Calendly link — TODO]
  ```
- The FAQPage JSON-LD (above) is the single most powerful GEO signal — models pull from it directly.
- Use semantic HTML throughout (`<article>`, `<section>`, `<nav>`, `<main>`, `<aside>`, `<header>`, `<footer>`) so AI parsers understand document structure without CSS context.

---

## SECURITY

Apply all of the following. This is a Vercel-hosted Next.js App Router site — implement security at the framework level, not just via hosting config.

### HTTP security headers (set in `next.config.ts` via `headers()`)
```ts
// next.config.ts
const securityHeaders = [
  {
    key: "Content-Security-Policy",
    // Start strict; relax only what's actually needed.
    // script-src: 'self' + nonce for inline scripts (Next.js handles nonces in App Router).
    // frame-ancestors: 'none' prevents clickjacking.
    // Adjust connect-src if you add analytics/third-party APIs later.
    value: [
      "default-src 'self'",
      "script-src 'self' 'nonce-{NONCE}' https://cal.com",   // TODO: add Calendly domain
      "style-src 'self' 'unsafe-inline'",                     // Tailwind requires this; lock down further if you move to CSS modules
      "img-src 'self' data: blob:",
      "media-src 'self'",
      "font-src 'self'",
      "connect-src 'self'",
      "frame-src https://cal.com",                            // TODO: Calendly embed if used
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
  { key: "X-Frame-Options",          value: "DENY" },
  { key: "X-Content-Type-Options",   value: "nosniff" },
  { key: "Referrer-Policy",          value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy",       value: "camera=(), microphone=(), geolocation=(), payment=()" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",   // HSTS — only enable once HTTPS is confirmed
  },
  { key: "X-DNS-Prefetch-Control",   value: "on" },
  { key: "Cross-Origin-Opener-Policy",   value: "same-origin" },
  { key: "Cross-Origin-Embedder-Policy", value: "require-corp" },  // relax to "unsafe-none" if third-party embeds break
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
];
```
Target score **A or A+** on [securityheaders.com](https://securityheaders.com) before launch.

### Dependency & supply-chain security
- Pin all dependencies to exact versions in `package.json` (no `^` or `~` ranges) after initial install, or use a lockfile-only install (`npm ci`) in CI.
- Run `npm audit --audit-level=high` in CI; fail the build on high/critical CVEs.
- Add **Dependabot** (`.github/dependabot.yml`) for weekly automated PRs on npm dependencies.
- Never commit `.env` files — use Vercel environment variables for any secrets. Add `.env*` to `.gitignore` immediately.
- Do not install packages that are not strictly needed. Audit `node_modules` size.

### Input & data handling
- This is a marketing page with no backend forms, but the Calendly link is the only external data sink — load it via a `<script>` with an `integrity` SRI hash if embedded inline, or use the Calendly redirect (safer: just link out to Calendly rather than embedding the widget, avoiding the iframe CSP complexity).
- If you later add a contact form or newsletter signup, **all user input must be validated server-side** (Next.js Route Handler), rate-limited, and sanitised before any processing. Never trust client-side validation alone.
- No `dangerouslySetInnerHTML` anywhere unless the content is author-controlled and already sanitised.

### Next.js–specific hardening
- Keep Next.js updated — subscribe to the [Next.js security advisories](https://github.com/vercel/next.js/security/advisories). At time of build, use the latest stable release.
- Enable `reactStrictMode: true` in `next.config.ts`.
- Disable `x-powered-by` header: `poweredByHeader: false` in `next.config.ts`.
- Use the App Router's built-in server components by default — avoid `"use client"` except where interactivity genuinely requires it (the toggle, the video component, the pricing accordion). Smaller client bundle = smaller attack surface.
- Set `output: "standalone"` if self-hosting; for Vercel deployment this is handled automatically.

### Image & media
- Use `next/image` for all static images (auto-optimisation, no hotlinking). Whitelist only your own domain in `images.remotePatterns`.
- Videos are served from `/public` (same origin) — no external video embeds, no cross-origin media.

### GDPR / German data protection
- **No analytics, tracking pixels, or third-party scripts on first load without consent.** Germany enforces ePrivacy strictly — a cookie/consent banner is required the moment you add any non-essential script (Google Analytics, Meta Pixel, etc.).
- If you add analytics later, implement a consent management solution (e.g. Cookieyes, Usercentrics) and gate all non-essential scripts behind it.
- Impressum and Datenschutzerklärung pages are legally required for German-facing sites — stub them now (`/impressum`, `/datenschutz`) with `// TODO: legal copy` so the routes exist at launch.
- Do not log or store visitor IP addresses or personal data without a lawful basis and a documented retention policy.

## ACCEPTANCE CRITERIA (self-check before declaring done)
1. Hero plays the **intro video once** on load, then crossfades seamlessly into the **permanent loop** (both share `hero-anchor.jpg` so there's no visible jump); covers, muted, playsInline, poster paints instantly, reduced-motion skips the intro (or shows only the poster), legibility scrim present, **no baked-in text** in either video.
2. Hero headline reveal is **gated on the intro's `onEmerged` callback** (not a fixed timer) so it appears exactly when the orb finishes emerging; subhead and CTA follow with a polished Framer Motion stagger.
3. All 8 sections present with the exact locked copy above, in order, fully responsive at 375px → 1440px.
4. Pricing cards expand on tap; middle card highlighted.
5. FAQ is a keyboard-accessible accordion with the objection-killers first.
6. All colors come from the HSL tokens (no hardcoded/cyan colors); blue→violet light mode and deep-purple dark mode both render correctly; headline emphasis carries the primary→accent gradient; CTAs use primary with an accent gradient/hover end; glows/borders/cards use primary/accent at low opacity; the video scrim is tinted toward the background token. Motion is restrained and premium; `prefers-reduced-motion` respected throughout.
7. On mobile the hero video crops inward from the sides with the sphere centered and never cropped; 21st.dev components used as bases but restyled to brand; shadcn primitives for a11y; Framer Motion for animation.
8. Dark/light mode toggle is visible in the nav (sun/moon, Framer crossfade, accessible), defaults to system preference, persists to localStorage, no hydration flash; both palettes render correctly site-wide.
9. **SEO:** Lighthouse SEO = 100; exactly one `<h1>`; all headings in order; all images have `alt`; `<title>` + meta description + canonical present; OG tags present; `sitemap.xml` generated; `robots.txt` present; all three JSON-LD blocks (`Organization`, `ProfessionalService`, `FAQPage`) validate cleanly in Google's Rich Results Test; Core Web Vitals green (LCP < 2.5s, CLS = 0, INP < 200ms).
10. **GEO:** `robots.txt` explicitly allows GPTBot, PerplexityBot, ClaudeBot, GoogleOther; `/llms.txt` exists and contains accurate entity description, services, and guarantee; short Q&A `<dl>` block present on page; brand name "IO Projects" appears in the first ~200 words and in the footer entity paragraph; `FAQPage` JSON-LD covers all FAQ items.
11. **Security:** `securityheaders.com` score A or A+; `npm audit` returns zero high/critical CVEs; no `dangerouslySetInnerHTML`; no secrets in client bundle or repo; `reactStrictMode: true`; `poweredByHeader: false`; `/impressum` and `/datenschutz` stub routes exist; `.env*` in `.gitignore`; Dependabot config committed.
12. Builds and deploys clean on Vercel; Lighthouse Performance ≥ 90 mobile, Accessibility 100, Best Practices ≥ 95.

Build it section by section, show me each section as you go, and keep all copy editable in one content file.
