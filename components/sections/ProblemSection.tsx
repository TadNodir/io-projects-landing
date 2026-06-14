"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { Layers, Smartphone, Search, TrendingDown, Award } from "lucide-react";
import { useTranslations } from "@/components/providers/LanguageProvider";
import {
  Visual1Outdated,
  Visual2Mobile,
  Visual3Invisible,
  Visual4NoBookings,
  Visual5Price,
} from "./visuals/ProblemVisuals";

const EASE = [0.22, 1, 0.36, 1] as const;

const ICON_MAP = { Layers, Smartphone, Search, TrendingDown, Award } as const;

// intro slide + 5 problem cards (card count is identical across locales)
const TOTAL_SLIDES = 6;
const SECTION_HEIGHT = `${TOTAL_SLIDES * 100}vh`;
const PAD_NUMS = ["01", "02", "03", "04", "05"];

const VISUALS = [Visual1Outdated, Visual2Mobile, Visual3Invisible, Visual4NoBookings, Visual5Price];

/** Word-by-word kinetic title */
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
          transition={{
            delay: 0.04 + i * 0.055,
            duration: 0.52,
            ease: EASE,
          }}
          className="inline-block mr-[0.28em] last:mr-0"
          style={{ transformOrigin: "bottom center" }}
        >
          {word}
        </motion.span>
      ))}
    </h3>
  );
}

export function ProblemSection() {
  const t = useTranslations();
  const problem = t.problem;
  const containerRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = Math.min(Math.floor(v * TOTAL_SLIDES + 0.05), TOTAL_SLIDES - 1);
    setStep(next);
  });

  const cardIndex = step - 1;
  const card = cardIndex >= 0 ? problem.cards[cardIndex] : null;
  const IconComponent = card ? ICON_MAP[card.icon as keyof typeof ICON_MAP] : null;
  const Visual = cardIndex >= 0 ? VISUALS[cardIndex] : null;

  return (
    <section
      ref={containerRef}
      style={{ height: SECTION_HEIGHT }}
      className="relative"
      aria-label={t.ui.problemAria}
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-background flex flex-col items-center justify-center select-none [touch-action:pan-y]">

        {/* Ambient orb */}
        <div className="absolute pointer-events-none inset-0 overflow-hidden" aria-hidden="true">
          <motion.div
            animate={{
              scale: step === 0 ? 1 : 0.55,
              x: step === 0 ? "0%" : "35%",
              y: step === 0 ? "-10%" : "-35%",
              opacity: step === 0 ? 0.22 : 0.1,
            }}
            transition={{ duration: 0.9, ease: EASE }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                       w-[700px] h-[700px] rounded-full
                       bg-gradient-to-br from-primary via-accent to-primary blur-[140px]"
          />
        </div>

        {/* Watermark number */}
        <AnimatePresence>
          {card && (
            <motion.span
              key={`num-${step}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.45, ease: EASE }}
              aria-hidden="true"
              className="absolute select-none font-bold text-foreground/[0.04]
                         text-[clamp(8rem,22vw,18rem)] leading-none tracking-tighter
                         pointer-events-none bottom-4 right-6 sm:right-12"
            >
              {PAD_NUMS[cardIndex]}
            </motion.span>
          )}
        </AnimatePresence>

        {/* Main content */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-8">
          <AnimatePresence mode="wait">
            {step === 0 ? (
              /* Intro slide — centered kinetic headline */
              <motion.div
                key="intro"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="text-center max-w-3xl mx-auto"
              >
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="text-xs font-semibold uppercase tracking-widest text-primary mb-6"
                >
                  {t.ui.problemReality}
                </motion.p>
                <h2
                  className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-[1.1] tracking-tight"
                  style={{ perspective: 900 }}
                  aria-label={problem.intro}
                >
                  {problem.intro.split(" ").map((word, i) => (
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
              </motion.div>
            ) : (
              /* Problem card — split: left text + right visual */
              <motion.div
                key={`card-${step}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-16 items-center"
              >
                {/* Left: kinetic text */}
                <article>
                  {IconComponent && (
                    <motion.div
                      initial={{ scale: 0, rotate: -15 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.45, type: "spring", stiffness: 260, damping: 18 }}
                      className="mb-4 lg:mb-7 inline-flex h-12 w-12 lg:h-14 lg:w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary"
                    >
                      <IconComponent size={22} strokeWidth={1.5} />
                    </motion.div>
                  )}

                  <KineticTitle
                    text={card!.title}
                    className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3 lg:mb-5 leading-tight tracking-tight"
                  />

                  <motion.p
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.38, duration: 0.45, ease: EASE }}
                    className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed"
                  >
                    {card!.body}
                  </motion.p>
                </article>

                {/* Visual — shown on all screens, scaled to fit on mobile */}
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
              animate={{ width: i === step ? 24 : 6, opacity: i === step ? 1 : 0.3 }}
              transition={{ duration: 0.3 }}
              className="h-1.5 rounded-full bg-primary"
            />
          ))}
        </div>

        {/* Scroll hint */}
        <motion.div
          animate={{ opacity: step === 0 ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className="absolute bottom-8 right-6 sm:right-10 flex flex-col items-center gap-1.5 pointer-events-none"
          aria-hidden="true"
        >
          <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">{t.ui.scroll}</span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-6 bg-gradient-to-b from-muted-foreground/60 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}
