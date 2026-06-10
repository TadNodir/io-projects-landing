"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, ShieldCheck } from "lucide-react";
import { HeroVideo } from "@/components/HeroVideo";
import { hero, CALENDLY_URL } from "@/content/landing";

function HeadlineWord({ word, index }: { word: string; index: number }) {
  const isAccent = word.startsWith("[[") && word.endsWith("]].");
  const isAccentNoPeriod = word.startsWith("[[") && word.endsWith("]]");
  if (isAccent) {
    return (
      <span className="gradient-text">{word.slice(2, -3)}</span>
    );
  }
  if (isAccentNoPeriod) {
    return <span className="gradient-text">{word.slice(2, -2)}</span>;
  }
  return <span>{word}</span>;
}

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE, delay: i * 0.12 },
  }),
};

export function HeroSection() {
  const [emerged, setEmerged] = useState(false);
  const reduce = useReducedMotion();

  // If reduced motion, show content immediately without waiting for video
  const show = emerged || !!reduce;

  return (
    <section className="relative min-h-[100svh] flex flex-col" aria-label="Hero">
      {/* Video background — aria-hidden, decorative */}
      <p className="sr-only">
        A luminous blue orb radiates light against a dreamy blue gradient sky.
      </p>
      <HeroVideo onEmerged={() => setEmerged(true)} />

      {/* Text layer — top portion of the hero */}
      <div className="relative z-10 flex flex-1 flex-col justify-center px-4 sm:px-6 pt-28 pb-16 mx-auto w-full max-w-5xl">
        <motion.div
          initial="hidden"
          animate={show ? "visible" : "hidden"}
          className="max-w-3xl"
        >
          {/* Headline */}
          <motion.h1
            custom={0}
            variants={fadeUp}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight text-foreground mb-6"
          >
            {hero.headlineParts.map((part, i) => (
              <span key={i}>
                {part.split(" ").map((word, j) => (
                  <span key={j} className="inline-block mr-[0.25em]">
                    <HeadlineWord word={word} index={j} />
                  </span>
                ))}
                {i < hero.headlineParts.length - 1 && <br className="hidden sm:block" />}
              </span>
            ))}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            custom={1}
            variants={fadeUp}
            className="text-lg sm:text-xl text-foreground/80 leading-relaxed mb-8 max-w-2xl"
          >
            {hero.subheadline}
          </motion.p>

          {/* CTA button with radiating glow */}
          <motion.div custom={2} variants={fadeUp} className="mb-8">
            <div className="relative inline-block">
              {/* Glow pulse */}
              <motion.div
                animate={show ? { scale: [1, 1.2, 1], opacity: [0.4, 0.15, 0.4] } : {}}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary to-accent blur-xl opacity-40 pointer-events-none"
              />
              <Link
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center justify-center rounded-xl bg-primary px-7 py-4 text-base font-semibold text-primary-foreground shadow-lg transition-all duration-200 hover:opacity-90 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {hero.ctaLabel}
              </Link>
            </div>
          </motion.div>

          {/* Trust strip */}
          <motion.ul
            custom={3}
            variants={fadeUp}
            className="flex flex-col gap-2 mb-6"
            aria-label="Trust signals"
          >
            {hero.trust.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-foreground/70">
                <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-primary" />
                <span>{item}</span>
              </li>
            ))}
          </motion.ul>

          {/* Guarantee */}
          <motion.p
            custom={4}
            variants={fadeUp}
            className="flex items-start gap-2 text-sm font-semibold text-foreground/90"
          >
            <ShieldCheck size={16} className="mt-0.5 shrink-0 text-primary" />
            {hero.guarantee}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
