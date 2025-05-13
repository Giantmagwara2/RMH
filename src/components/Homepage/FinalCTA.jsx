// src/components/Homepage/FinalCTA.jsx
import React from 'react';
import HomepageSection from '../Section/Section';

const FinalCTA = ({ ctaHeadline, ctaSupportingText, ctaButtonText, trackCtaClick }) => {
  return (
    <HomepageSection className="p-12 text-center bg-white rounded-lg shadow-lg dark:bg-midnight-blue bg-opacity-80 dark:bg-opacity-80 dark:shadow-none">
      <h2 className="mb-6 text-3xl font-bold font-display text-electric-blue dark:text-highlight-yellow">{ctaHeadline}</h2>
      <p className="mb-6 text-lg text-midnight-blue dark:text-soft-white">{ctaSupportingText}</p>
      <button
        aria-label={ctaButtonText}
        onClick={trackCtaClick}
        className="px-8 py-3 transition-colors duration-300 rounded-md shadow-md bg-electric-blue dark:bg-highlight-yellow text-soft-white dark:text-rich-black hover:bg-blue-700 dark:hover:bg-yellow-500 dark:shadow-none hover:scale-105 hover:shadow-xl dark:hover:shadow-none"
      >
        {ctaButtonText}
      </button>
    </HomepageSection>
  );
};

export default FinalCTA;