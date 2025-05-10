// src/components/CallToAction/CallToAction.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const CallToAction = ({
  headline = "Ready to take your brand to the next level?",
  supportingText = "Let’s chat and make it happen.",
  buttonText = "Get Started Today",
  buttonPath = "/contact",
  aosDelay = 0
}) => (
  <section
    id="call-to-action"
    className="
      pt-section pb-section
      bg-gradient-to-r from-electric-blue to-indigo-500
      dark:from-midnight-blue dark:to-rich-black
      text-center text-soft-white dark:text-white
      overflow-hidden
    "
    aria-labelledby="cta-heading"
  >
    <div className="container mx-auto px-4" data-aos="fade-up" data-aos-delay={aosDelay}>
      <h2
        id="cta-heading"
        className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight"
      >
        {headline}
      </h2>
      <p className="max-w-2xl mx-auto text-lg md:text-xl mb-8 leading-relaxed"> {/* Adjusted leading */}
        {supportingText}
      </p>
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
          transition
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

export default CallToAction;