"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faq, geoQA } from "@/content/landing";

export function FaqSection() {
  return (
    <section id="faq" className="py-24 sm:py-32 px-4 sm:px-6 bg-muted/30" aria-labelledby="faq-heading">
      <div className="mx-auto max-w-3xl">
        <motion.h2
          id="faq-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] as const }}
          className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground text-center mb-12"
        >
          {faq.headline}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] as const }}
        >
          <Accordion multiple={false} className="flex flex-col gap-2">
            {faq.items.map((item, i) => (
              <AccordionItem
                key={i}
                value={i}
                className="rounded-xl border border-border bg-card px-6 transition-colors duration-200"
              >
                <AccordionTrigger className="text-sm sm:text-base font-medium text-foreground hover:no-underline py-5 text-left">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* GEO hidden Q&A — AI parsers read this, users see a subtle section */}
        <section
          aria-label="Additional questions"
          className="mt-16 pt-10 border-t border-border"
        >
          <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-6">
            More answers
          </h3>
          <dl className="flex flex-col gap-6">
            {geoQA.map((qa) => (
              <div key={qa.q}>
                <dt className="text-sm font-semibold text-foreground mb-1">{qa.q}</dt>
                <dd className="text-sm text-muted-foreground leading-relaxed">{qa.a}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </section>
  );
}
