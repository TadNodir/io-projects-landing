"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { finalCta, CALENDLY_URL } from "@/content/landing";

export function FinalCtaSection() {
  const reduce = useReducedMotion();

  return (
    <section className="relative py-32 sm:py-40 px-4 sm:px-6 bg-background overflow-hidden text-center" aria-labelledby="final-cta-heading">
      {/* Radiating glow — echoes hero orb */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        <motion.div
          animate={reduce ? {} : {
            scale: [1, 1.3, 1],
            opacity: [0.18, 0.08, 0.18],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="h-[500px] w-[500px] rounded-full bg-gradient-to-br from-primary to-accent blur-[140px] opacity-15"
        />
        <motion.div
          animate={reduce ? {} : {
            scale: [1, 1.2, 1],
            opacity: [0.12, 0.05, 0.12],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute h-[240px] w-[240px] rounded-full bg-primary blur-[80px] opacity-20"
        />
      </div>

      <div className="relative mx-auto max-w-2xl">
        <motion.h2
          id="final-cta-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] as const }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-5"
        >
          {finalCta.headline}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-base sm:text-lg text-muted-foreground mb-10 leading-relaxed"
        >
          {finalCta.subheadline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="relative inline-block"
        >
          {/* Glow pulse */}
          <motion.div
            animate={reduce ? {} : {
              scale: [1, 1.25, 1],
              opacity: [0.5, 0.2, 0.5],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary to-accent blur-xl opacity-40 pointer-events-none"
          />
          <Link
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-primary to-accent px-8 py-4 text-base font-semibold text-primary-foreground shadow-lg transition-all duration-200 hover:opacity-90 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {finalCta.ctaLabel}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
