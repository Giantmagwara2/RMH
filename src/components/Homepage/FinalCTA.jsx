// src/components/Homepage/FinalCTA.jsx
import React from 'react';
import HomepageSection from '../Section/Section';

const FinalCTA = ({ ctaHeadline, ctaSupportingText, ctaButtonText, trackCtaClick }) => {
  return (
    <HomepageSection
      className="p-12 text-center rounded-lg shadow-lg bg-gradient-to-br from-electric-blue to-indigo-500 dark:from-midnight-blue dark:to-rich-black dark:shadow-none"
      data-aos="fade-up"
      data-aos-duration="800"
    >
      {/* Headline */}
      <h2 className="mb-6 text-3xl font-bold md:text-4xl font-display text-soft-white">
        {ctaHeadline}
      </h2>

      {/* Supporting Text */}
      <p className="max-w-2xl mx-auto mb-6 text-lg leading-relaxed text-gray-200 md:text-xl">
        {ctaSupportingText}
      </p>

      {/* CTA Button */}
      <button
        aria-label={ctaButtonText}
        onClick={trackCtaClick}
        className="px-8 py-3 text-lg font-semibold transition-transform duration-300 rounded-md shadow-md bg-soft-white dark:bg-highlight-yellow text-electric-blue dark:text-rich-black hover:bg-gray-100 dark:hover:bg-yellow-400 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-electric-blue/50 dark:focus:ring-highlight-yellow/50"
      >
        {ctaButtonText}
      </button>
    </HomepageSection>
  );
};

export default FinalCTA;