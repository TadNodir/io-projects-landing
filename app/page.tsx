import { Nav } from "@/components/Nav";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { ImagineSection } from "@/components/sections/ImagineSection";
import { SolutionSection } from "@/components/sections/SolutionSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { Footer } from "@/components/Footer";
import { enDict } from "@/content/landing";

export default function Home() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: enDict.faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <Nav />

      <main id="main-content">
        <HeroSection />
        <ProblemSection />
        <ImagineSection />
        <SolutionSection />
        <HowItWorksSection />
        <PricingSection />
        <FaqSection />
        <FinalCtaSection />
      </main>

      <Footer />
    </>
  );
}
