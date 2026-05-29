import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  BeforeAfterComparison,
  BuiltForSection,
  FeatureGrid,
  FinalCTA,
  Footer,
  HeroSection,
  LandingNavbar,
  FAQSection,
  PricingSection,
  ProductDemo,
  TestimonialsCarousel,
} from '../components/landing/LandingSections';

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { staggerChildren: 0.08, delayChildren: 0.06 } },
};

function useLandingSeo() {
  useEffect(() => {
    const previousTitle = document.title;
    const previousDescription = document.head.querySelector('meta[name="description"]')?.getAttribute('content');

    const metaUpdates = [
      ['meta[name="description"]', 'name', 'description', 'content', 'ResumeAI analyzes your resume, finds the exact reasons it gets rejected, and uses AI to improve it in minutes.'],
      ['meta[property="og:title"]', 'property', 'og:title', 'content', 'ResumeAI | Build an ATS-friendly resume that wins interviews'],
      ['meta[property="og:description"]', 'property', 'og:description', 'content', 'Analyze ATS compatibility, fix weak points, and generate job-winning resumes powered by AI.'],
      ['meta[name="twitter:title"]', 'name', 'twitter:title', 'content', 'ResumeAI | Build an ATS-friendly resume that wins interviews'],
      ['meta[name="twitter:description"]', 'name', 'twitter:description', 'content', 'Analyze ATS compatibility, fix weak points, and generate job-winning resumes powered by AI.'],
    ];

    document.title = 'ResumeAI | Analyze, improve, and get interviews';

    const cleanup = metaUpdates.map(([, keyType, keyValue, attribute, value]) => {
      let element = document.head.querySelector(`${keyType === 'property' ? 'meta[property="' + keyValue + '"]' : 'meta[name="' + keyValue + '"]'}`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(keyType, keyValue);
        document.head.appendChild(element);
      }

      const previousValue = element.getAttribute(attribute);
      element.setAttribute(attribute, value);

      return () => {
        if (previousValue === null) {
          element.removeAttribute(attribute);
        } else {
          element.setAttribute(attribute, previousValue);
        }
      };
    });

    return () => {
      document.title = previousTitle;
      const descriptionTag = document.head.querySelector('meta[name="description"]');
      if (descriptionTag && previousDescription !== null) {
        descriptionTag.setAttribute('content', previousDescription);
      }
      cleanup.forEach((dispose) => dispose());
    };
  }, []);
}

export default function LandingPage() {
  useLandingSeo();

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[var(--surface)] text-[var(--text-primary)] transition-colors duration-300">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="tech-grid absolute inset-0" />
        <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-amber-500/20 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-cyan-500/15 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />
      </div>

      <LandingNavbar />

      <motion.main className="relative z-10 pt-28" initial="initial" animate="animate" variants={pageVariants}>
        <HeroSection />
        <BuiltForSection />
        <ProductDemo />
        <FeatureGrid />
        <BeforeAfterComparison />
        <TestimonialsCarousel />
        <PricingSection />
        <FAQSection />
        <FinalCTA />
        <Footer />
      </motion.main>
    </div>
  );
}
