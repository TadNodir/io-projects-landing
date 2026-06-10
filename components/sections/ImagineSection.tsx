"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { Sparkles } from "lucide-react";
import { imagine } from "@/content/landing";

const EASE = [0.22, 1, 0.36, 1] as const;

// Slides: headline (0) + 4 outcomes (1-4)
const TOTAL_SLIDES = 1 + imagine.outcomes.length; // 5
const SECTION_HEIGHT = `${TOTAL_SLIDES * 100}vh`;

export function ImagineSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = Math.min(Math.floor(v * TOTAL_SLIDES + 0.05), TOTAL_SLIDES - 1);
    setCurrent(next);
  });

  const outcomeIndex = current - 1;

  return (
    <section
      ref={containerRef}
      style={{ height: SECTION_HEIGHT }}
      className="relative"
      aria-labelledby="imagine-heading"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden flex flex-col items-center justify-center">

        {/* Full-bleed gradient background — shifts as you progress */}
        <motion.div
          animate={{
            background:
              current === 0
                ? "radial-gradient(ellipse at 50% 60%, oklch(0.538 0.222 264.4 / 0.12) 0%, transparent 70%)"
                : `radial-gradient(ellipse at ${30 + outcomeIndex * 12}% 50%, oklch(0.491 0.263 293.6 / 0.1) 0%, transparent 60%)`,
          }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-muted/50"
          aria-hidden="true"
        />

        {/* Floating orb accent */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <motion.div
            animate={{
              x: `${-10 + current * 8}%`,
              y: `${-5 + current * 4}%`,
              scale: current === 0 ? 1 : 0.7,
              opacity: 0.12,
            }}
            transition={{ duration: 1.2, ease: EASE }}
            className="absolute left-1/2 top-1/2 w-[500px] h-[500px] rounded-full
                       bg-gradient-to-br from-primary to-accent blur-[120px]"
          />
        </div>

        {/* Eyebrow badge — always visible */}
        <div className="absolute top-10 flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-primary" aria-hidden="true">
          <Sparkles size={12} />
          {imagine.eyebrow}
        </div>

        {/* Main content */}
        <div className="relative z-10 w-full max-w-3xl mx-auto px-5 sm:px-8 text-center">
          <AnimatePresence mode="wait">
            {current === 0 ? (
              <motion.div
                key="headline"
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.55, ease: EASE }}
              >
                <h2
                  id="imagine-heading"
                  className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.1]"
                >
                  {imagine.headline}
                </h2>
              </motion.div>
            ) : (
              <motion.div
                key={`outcome-${current}`}
                initial={{ opacity: 0, y: 44 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                {/* Glowing dot accent */}
                <div className="mb-6 flex justify-center">
                  <div className="h-3 w-3 rounded-full bg-gradient-to-br from-primary to-accent shadow-[0_0_16px_4px] shadow-primary/40" />
                </div>
                <p className="text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground leading-snug tracking-tight">
                  {imagine.outcomes[outcomeIndex]}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Progress dots */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2"
          aria-hidden="true"
        >
          {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
            <motion.div
              key={i}
              animate={{ width: i === current ? 24 : 6, opacity: i === current ? 1 : 0.25 }}
              transition={{ duration: 0.3 }}
              className="h-1.5 rounded-full bg-primary"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
