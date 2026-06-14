"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { useTranslations } from "@/components/providers/LanguageProvider";
import { VisualPreview, VisualBuild, VisualLaunch } from "./visuals/HowItWorksVisuals";

const EASE = [0.22, 1, 0.36, 1] as const;

// headline slide + 3 steps (step count is identical across locales)
const TOTAL_SLIDES = 4;
const SECTION_HEIGHT = `${TOTAL_SLIDES * 100}vh`;

const VISUALS = [VisualPreview, VisualBuild, VisualLaunch];

function KineticTitle({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <h3 className={className} aria-label={text} style={{ perspective: 900 }}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          initial={{ opacity: 0, y: 52, rotateX: -22, filter: "blur(7px)" }}
          animate={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -32, filter: "blur(5px)" }}
          transition={{ delay: 0.04 + i * 0.055, duration: 0.52, ease: EASE }}
          className="inline-block mr-[0.28em] last:mr-0"
          style={{ transformOrigin: "bottom center" }}
        >
          {word}
        </motion.span>
      ))}
    </h3>
  );
}

export function HowItWorksSection() {
  const t = useTranslations();
  const howItWorks = t.howItWorks;
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

  const isStep = current >= 1;
  const stepIndex = current - 1;
  const Visual = stepIndex >= 0 ? VISUALS[stepIndex] : null;

  return (
    <section
      ref={containerRef}
      style={{ height: SECTION_HEIGHT }}
      className="relative"
      aria-label={howItWorks.eyebrow}
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-muted/40 flex flex-col items-center justify-center select-none [touch-action:pan-y]">

        {/* Progress line */}
        <div className="absolute top-0 left-0 right-0 h-px overflow-hidden" aria-hidden="true">
          <motion.div
            animate={{ scaleX: isStep ? (stepIndex + 1) / 3 : 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="h-full w-full origin-left bg-gradient-to-r from-primary to-accent"
          />
        </div>

        {/* Eyebrow */}
        <motion.p
          animate={{ opacity: current === 0 ? 0.6 : 0.4 }}
          className="absolute top-10 text-xs font-semibold uppercase tracking-widest text-primary"
          aria-hidden="true"
        >
          {howItWorks.eyebrow}
        </motion.p>

        {/* Watermark step number */}
        <AnimatePresence>
          {isStep && (
            <motion.span
              key={`num-${current}`}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              aria-hidden="true"
              className="absolute select-none pointer-events-none font-bold
                         text-foreground/[0.04] leading-none tracking-tighter
                         text-[clamp(10rem,30vw,22rem)] bottom-0 right-4 sm:right-10"
            >
              {current}
            </motion.span>
          )}
        </AnimatePresence>

        {/* Main content */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-8">
          <AnimatePresence mode="wait">
            {current === 0 ? (
              <motion.div
                key="headline"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="text-center max-w-3xl mx-auto"
              >
                <h2
                  id="how-heading"
                  className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.1]"
                  style={{ perspective: 900 }}
                  aria-label={howItWorks.headline}
                >
                  {howItWorks.headline.split(" ").map((word, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -28, filter: "blur(5px)" }}
                      transition={{ delay: 0.05 + i * 0.05, duration: 0.5, ease: EASE }}
                      className="inline-block mr-[0.25em] last:mr-0"
                    >
                      {word}
                    </motion.span>
                  ))}
                </h2>
                <motion.p
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                  className="mt-4 text-base text-muted-foreground"
                >
                  {t.ui.howItWorksSubhead}
                </motion.p>
              </motion.div>
            ) : (
              <motion.div
                key={`step-${current}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-16 items-center"
              >
                {/* Left: kinetic text */}
                <article>
                  <motion.div
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="mb-4 lg:mb-8 inline-flex items-center gap-3"
                  >
                    <span className="inline-flex h-9 w-9 lg:h-10 lg:w-10 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                      {howItWorks.steps[stepIndex].number}
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      {t.ui.stepOf
                        .replace("{n}", howItWorks.steps[stepIndex].number)
                        .replace("{total}", String(howItWorks.steps.length))}
                    </span>
                  </motion.div>

                  <KineticTitle
                    text={howItWorks.steps[stepIndex].title}
                    className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold text-foreground mb-3 lg:mb-5 leading-tight tracking-tight"
                  />

                  <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.4, duration: 0.45, ease: EASE }}
                    className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed"
                  >
                    {howItWorks.steps[stepIndex].body}
                  </motion.p>
                </article>

                {/* Visual — shown on all screens */}
                <div className="flex items-center justify-center w-full overflow-hidden
                                h-[220px] sm:h-[330px] lg:h-auto lg:min-h-[320px]">
                  <div className="scale-[0.58] sm:scale-[0.86] lg:scale-100 origin-center">
                    {Visual && <Visual />}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Progress dots */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 pointer-events-none"
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

        {/* Scroll hint */}
        <motion.div
          animate={{ opacity: current < TOTAL_SLIDES - 1 ? 0.5 : 0 }}
          className="absolute bottom-8 right-6 sm:right-10 pointer-events-none"
          aria-hidden="true"
        >
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-5 mx-auto bg-gradient-to-b from-muted-foreground to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}
