// src/components/CallToAction/CallToAction.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const CallToAction = ({
  headline = "Ready to take your brand to the next level?",
  supportingText = "Let’s chat and make it happen.",
  buttonText = "Get Started Today",
  buttonPath = "/contact",
  aosDelay = 0,
  gradientFrom = "from-electric-blue",
  gradientTo = "to-indigo-500",
  darkGradientFrom = "dark:from-midnight-blue",
  darkGradientTo = "dark:to-rich-black",
}) => (
  <section
    id="call-to-action"
    className={`
      pt-section pb-section
      bg-gradient-to-r ${gradientFrom} ${gradientTo}
      ${darkGradientFrom} ${darkGradientTo}
      text-center text-soft-white dark:text-white
      overflow-hidden
    `}
    aria-labelledby="cta-heading"
  >
    <div className="container px-4 mx-auto" data-aos="fade-up" data-aos-delay={aosDelay}>
      {/* Headline */}
      <h2
        id="cta-heading"
        className="mb-4 text-3xl font-bold leading-tight font-display md:text-4xl lg:text-5xl"
      >
        {headline}
      </h2>

      {/* Supporting Text */}
      <p className="max-w-2xl mx-auto mb-8 text-lg leading-relaxed md:text-xl">
        {supportingText}
      </p>

      {/* Call-to-Action Button */}
      <Link
        to={buttonPath}
        className={`
          inline-block
          bg-soft-white dark:bg-highlight-yellow
          text-electric-blue dark:text-rich-black
          font-semibold
          py-4 px-8
          rounded-md
          shadow-lg
          hover:bg-white dark:hover:bg-yellow-400
          focus:outline-none focus:ring-4 focus:ring-electric-blue/50 dark:focus:ring-highlight-yellow/50
          transition-transform duration-300
          hover:scale-105 hover:shadow-xl
        `}
        aria-label={buttonText}
        data-aos="zoom-in"
        data-aos-delay={aosDelay + 100}
      >
        {buttonText}
      </Link>
    </div>
  </section>
);

CallToAction.propTypes = {
  headline: PropTypes.string,
  supportingText: PropTypes.string,
  buttonText: PropTypes.string,
  buttonPath: PropTypes.string,
  aosDelay: PropTypes.number,
  gradientFrom: PropTypes.string,
  gradientTo: PropTypes.string,
  darkGradientFrom: PropTypes.string,
  darkGradientTo: PropTypes.string,
};

export default CallToAction;