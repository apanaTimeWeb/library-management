import React from 'react';
import { PublicHeroSection } from './public_components/PublicHeroSection';
import { PublicFeaturesGrid } from './public_components/PublicFeaturesGrid';
import { PublicFAQAccordion } from './public_components/PublicFAQAccordion';
import { PublicFooter } from './public_components/PublicFooter';

export const metadata = {
  title: 'Smart Library 360 | The Ultimate Library Management Software',
  description: 'Automate fee collection, track seating dynamically, and send WhatsApp alerts instantly. Built for modern study spaces.',
};

export default function PublicLandingPage() {
  return (
    <div className="min-h-screen bg-bg-page flex flex-col font-sans">
      <main className="flex-grow">
        <PublicHeroSection />
        <PublicFeaturesGrid />
        <PublicFAQAccordion />
      </main>
      <PublicFooter />
    </div>
  );
}
