"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { solution } from "@/content/landing";
import {
  Visual1Premium,
  Visual2ZeroRisk,
  Visual3LiveInDays,
  Visual4NoEffort,
} from "./visuals/SolutionVisuals";

const EASE = [0.22, 1, 0.36, 1] as const;

const TOTAL_SLIDES = 1 + solution.pillars.length;
const SECTION_HEIGHT = `${TOTAL_SLIDES * 100}vh`;

const VISUALS = [Visual1Premium, Visual2ZeroRisk, Visual3LiveInDays, Visual4NoEffort];

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

export function SolutionSection() {
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

  const pillarIndex = current - 1;
  const pillar = pillarIndex >= 0 ? solution.pillars[pillarIndex] : null;
  const Visual = pillarIndex >= 0 ? VISUALS[pillarIndex] : null;

  return (
    <section
      ref={containerRef}
      style={{ height: SECTION_HEIGHT }}
      className="relative"
      aria-labelledby="solution-heading"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-background flex flex-col items-center justify-center">

        {/* Orb accent */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <motion.div
            animate={{
              x: pillarIndex >= 0 ? `${-20 + pillarIndex * 14}%` : "0%",
              y: pillarIndex >= 0 ? `${10 + pillarIndex * 6}%` : "0%",
              scale: current === 0 ? 0.7 : 0.5,
              opacity: 0.1,
            }}
            transition={{ duration: 1.1, ease: EASE }}
            className="absolute right-0 top-0 w-[600px] h-[600px] rounded-full
                       bg-gradient-to-bl from-accent to-primary blur-[140px]"
          />
        </div>

        {/* Progress bar */}
        <div className="absolute top-0 left-0 right-0 h-0.5 overflow-hidden" aria-hidden="true">
          <motion.div
            animate={{ scaleX: current === 0 ? 0 : current / (TOTAL_SLIDES - 1) }}
            transition={{ duration: 0.7, ease: EASE }}
            className="h-full w-full origin-left bg-gradient-to-r from-primary to-accent"
          />
        </div>

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
                  id="solution-heading"
                  className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.1]"
                  style={{ perspective: 900 }}
                  aria-label={solution.headline}
                >
                  {solution.headline.split(" ").map((word, i) => (
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
                  className="mt-4 text-muted-foreground text-base"
                >
                  Four reasons your clients will trust you on sight.
                </motion.p>
              </motion.div>
            ) : (
              <motion.div
                key={`pillar-${current}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-16 items-center"
              >
                {/* Left: kinetic text */}
                <article>
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                    className="mb-4 lg:mb-8"
                  >
                    <span className="inline-flex h-12 w-12 lg:h-14 lg:w-14 items-center justify-center rounded-full border-2 border-primary text-xl lg:text-2xl font-bold gradient-text">
                      {pillar!.number}
                    </span>
                  </motion.div>

                  <KineticTitle
                    text={pillar!.title}
                    className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold text-foreground mb-3 lg:mb-5 leading-tight tracking-tight"
                  />

                  <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.4, duration: 0.45, ease: EASE }}
                    className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed"
                  >
                    {pillar!.body}
                  </motion.p>
                </article>

                {/* Visual — shown on all screens */}
                <div className="flex items-center justify-center w-full overflow-hidden
                                h-[280px] sm:h-[330px] lg:h-auto lg:min-h-[320px]">
                  <div className="scale-[0.70] sm:scale-[0.86] lg:scale-100 origin-center">
                    {Visual && <Visual />}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Chips row — last pillar */}
        <AnimatePresence>
          {current === TOTAL_SLIDES - 1 && (
            <motion.div
              key="chips"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="absolute bottom-16 flex flex-wrap gap-2 justify-center px-6"
              aria-label="Key benefits"
            >
              {solution.chips.map((chip) => (
                <span key={chip} className="chip">{chip}</span>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

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
