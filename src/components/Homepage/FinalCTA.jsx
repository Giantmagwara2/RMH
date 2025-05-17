// src/components/Homepage/FinalCTA.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import HomepageSection from '../Section/Section';
import { ROUTES } from '../../constants'; // Assuming ROUTES are defined

const FinalCTA = ({
  ctaHeadline,
  ctaSupportingText,
  ctaButtonText,
  trackCtaClick,
  buttonPath = ROUTES.CONTACT, // Default to contact page
  isExternal = false,
}) => {
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
      {isExternal ? (
        <a
          href={buttonPath}
          target="_blank"
          rel="noopener noreferrer"
          onClick={trackCtaClick} // Track click even for external links
          className="inline-block px-8 py-4 text-lg font-semibold transition-transform duration-300 rounded-md shadow-lg bg-soft-white dark:bg-highlight-yellow text-electric-blue dark:text-rich-black hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-electric-blue/50 dark:focus:ring-highlight-yellow/50"
          aria-label={ctaButtonText || "Call to action"}
        >
          {ctaButtonText}
        </a>
      ) : (
        <Link
          to={buttonPath}
          onClick={trackCtaClick} // Track click for internal links
          className="inline-block px-8 py-4 text-lg font-semibold transition-transform duration-300 rounded-md shadow-lg bg-soft-white dark:bg-highlight-yellow text-electric-blue dark:text-rich-black hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-electric-blue/50 dark:focus:ring-highlight-yellow/50"
          aria-label={ctaButtonText || "Call to action"}
        >
          {ctaButtonText}
        </Link>
      )}
    </HomepageSection>
  );
};

FinalCTA.propTypes = {
  ctaHeadline: PropTypes.string.isRequired,
  ctaSupportingText: PropTypes.string.isRequired,
  ctaButtonText: PropTypes.string.isRequired,
  trackCtaClick: PropTypes.func.isRequired,
  buttonPath: PropTypes.string,
  isExternal: PropTypes.bool,
};

export default FinalCTA;