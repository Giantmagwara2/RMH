// src/components/Homepage/FinalCTA.jsx
import React from 'react';
import Section from '../Section/Section';

const FinalCTA = ({ ctaHeadline, ctaSupportingText, ctaButtonText, trackCtaClick }) => {
  return (
    <HomepageSection className="text-center bg-white dark:bg-midnight-blue bg-opacity-80 dark:bg-opacity-80 rounded-lg p-12 shadow-lg dark:shadow-none">
      <h2 className="font-display text-3xl font-bold text-electric-blue dark:text-highlight-yellow mb-6">{ctaHeadline}</h2>
      <p className="mb-6 text-midnight-blue dark:text-soft-white text-lg">{ctaSupportingText}</p>
      <button
        aria-label={ctaButtonText}
        onClick={trackCtaClick}
        className="bg-electric-blue dark:bg-highlight-yellow text-soft-white dark:text-rich-black py-3 px-8 rounded-md hover:bg-blue-700 dark:hover:bg-yellow-500 transition-colors duration-300 shadow-md dark:shadow-none hover:scale-105 hover:shadow-xl dark:hover:shadow-none"
      >
        {ctaButtonText}
      </button>
    </HomepageSection>
  );
};

export default FinalCTA;