"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronDown, Sparkles } from "lucide-react";
import Link from "next/link";
import { CALENDLY_URL } from "@/content/landing";
import { useTranslations } from "@/components/providers/LanguageProvider";
import type { Plan } from "@/content/i18n/types";

export function PricingSection() {
  const t = useTranslations();
  const pricing = t.pricing;
  return (
    <section id="pricing" className="py-24 sm:py-32 px-4 sm:px-6 bg-background" aria-labelledby="pricing-heading">
      <div className="mx-auto max-w-6xl">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.5 }}
          className="text-center text-xs font-semibold uppercase tracking-widest text-primary mb-3"
        >
          {pricing.eyebrow}
        </motion.p>

        <motion.h2
          id="pricing-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] as const }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground text-center mb-4"
        >
          {pricing.headline}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.6, delay: 0.14 }}
          className="text-center text-base text-muted-foreground max-w-2xl mx-auto mb-12"
        >
          {pricing.subheadline}
        </motion.p>

        {/* Founding badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.5, delay: 0.18 }}
          className="flex justify-center mb-10"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/8 px-4 py-1.5 text-xs font-medium text-primary">
            <Sparkles size={12} />
            {pricing.badge}
          </span>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid gap-5 md:grid-cols-3 items-stretch">
          {pricing.plans.map((plan, i) => (
            <PricingCard key={plan.name} plan={plan} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingCard({
  plan,
  index,
}: {
  plan: Plan;
  index: number;
}) {
  const t = useTranslations();
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] as const }}
      className={`relative flex flex-col rounded-2xl border transition-all duration-300 overflow-hidden ${
        plan.highlight
          ? "border-primary shadow-xl shadow-primary/15 bg-card scale-[1.02]"
          : "border-border bg-card hover:border-primary/40 hover:shadow-lg"
      }`}
    >
      {/* Highlight gradient top bar */}
      {plan.highlight && (
        <div className="h-1 w-full bg-gradient-to-r from-primary to-accent" />
      )}

      {/* Popular badge */}
      {plan.popularLabel && (
        <div className="absolute top-4 right-4">
          <span className="rounded-full bg-gradient-to-r from-primary to-accent px-3 py-1 text-xs font-semibold text-primary-foreground">
            {plan.popularLabel}
          </span>
        </div>
      )}

      <div className="p-7 flex flex-col flex-1">
        {/* Plan name */}
        <h3 className="text-lg font-bold text-foreground mb-1">{plan.name}</h3>
        <p className="text-sm text-muted-foreground mb-6">{plan.tagline}</p>

        {/* Price */}
        <div className="mb-6">
          <span className="text-4xl font-bold text-foreground tracking-tight">
            {plan.price}
          </span>
          <span className="text-sm text-muted-foreground">{plan.period}</span>
        </div>

        {/* CTA */}
        <Link
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`mb-6 w-full rounded-xl px-6 py-3 text-center text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
            plan.highlight
              ? "bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 shadow-md"
              : "bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground"
          }`}
        >
          {t.ui.pricingGetStarted}
        </Link>

        {/* Expandable features */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={`features-${plan.name}`}
          className="flex w-full items-center justify-between text-sm font-medium text-foreground/70 hover:text-foreground transition-colors py-2 border-t border-border"
        >
          <span>{t.ui.pricingWhatsIncluded}</span>
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown size={16} />
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id={`features-${plan.name}`}
              key="features"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
              className="overflow-hidden"
            >
              <ul className="mt-4 flex flex-col gap-2.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-foreground/80">
                    <Check size={14} className="mt-0.5 shrink-0 text-primary" />
                    {f}
                  </li>
                ))}
              </ul>
              {"seoGeoNote" in plan && plan.seoGeoNote && (
                <p className="mt-4 text-xs text-muted-foreground leading-relaxed border-t border-border pt-3">
                  {plan.seoGeoNote}
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {plan.highlight && (
        <div className="absolute inset-0 pointer-events-none rounded-2xl ring-1 ring-primary/30" />
      )}
    </motion.div>
  );
}
