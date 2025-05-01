// src/components/HeroSection/HeroSection.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section
      className="
        relative pt-header pb-section
        bg-gradient-to-br from-indigo-600 to-electric-blue
        dark:from-midnight-blue dark:to-rich-black
        overflow-hidden
      "
      aria-label="Hero section introducing RocVille Media House"
    >
      {/* Decorative SVG Circles */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-electric-blue rounded-full opacity-20 blur-3xl animate-fadeIn"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-highlight-yellow rounded-full opacity-10 blur-2xl animate-fadeIn animation-delay-200"></div>

      <div
        className="container mx-auto px-4 flex flex-col-reverse md:flex-row items-center justify-between"
      >
        {/* Text Column */}
        <div
          className="mt-12 md:mt-0 md:w-1/2 lg:w-5/12 text-center md:text-left"
          data-aos="fade-down"
        >
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-soft-white dark:text-white mb-4">
            Crafting Digital Experiences That{' '}
            <span className="text-electric-blue dark:text-highlight-yellow">
              Inspire
            </span>{' '}
            and Convert.
          </h1>
          <p className="text-lg md:text-xl leading-relaxed text-gray-100 dark:text-gray-300 mb-6">
            We’re a full-stack digital agency specializing in beautiful web design, impactful branding, and results-driven marketing. Let’s bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link
              to="/contact"
              aria-label="Get in touch with RocVille Media House"
              className="
                inline-block
                bg-electric-blue dark:bg-highlight-yellow
                text-white dark:text-rich-black
                font-semibold
                py-3 px-6
                rounded-md
                shadow-card
                hover:bg-blue-700 dark:hover:bg-yellow-500
                focus:outline-none focus:ring-4 focus:ring-electric-blue/50
                transition
              "
            >
              Get in Touch
            </Link>
            <Link
              to="/portfolio"
              aria-label="View our portfolio"
              className="
                inline-block
                border border-white dark:border-soft-white
                text-white dark:text-soft-white
                font-semibold
                py-3 px-6
                rounded-md
                hover:bg-white hover:text-electric-blue
                dark:hover:bg-gray-800 dark:hover:text-highlight-yellow
                focus:outline-none focus:ring-4 focus:ring-electric-blue/50
                transition
              "
            >
              Our Portfolio
            </Link>
          </div>
        </div>

        {/* Image Column */}
        <div
          className="md:w-1/2 lg:w-5/12"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <picture>
            {/* Future: add <source> elements for WebP or art-directed crops */}
            <img
              src="https://via.placeholder.com/600x400/ffffff/007bff?Text=Hero+Image"
              alt="Illustration of digital creativity and collaboration"
              loading="lazy"
              className="w-full rounded-lg shadow-lg animate-slideDown"
            />
          </picture>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
