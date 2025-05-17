// src/components/HeroSection/HeroSection.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants'; // Assuming ROUTES are defined in your constants

const HeroSection = () => {
  return (
    <section
      className="relative overflow-hidden  pt-header pb-section bg-gradient-to-br from-brand-primary via-blue-500 to-brand-secondary dark:from-midnight-blue dark:to-rich-black"
      aria-label="Hero section introducing RocVille Media House"
    >
      {/* Decorative SVG Circles */}
      <div className="absolute top-0 left-0 rounded-full w-72 h-72 bg-electric-blue opacity-20 blur-3xl animate-fadeIn"></div>
      <div className="absolute bottom-0 right-0 rounded-full w-96 h-96 bg-highlight-yellow opacity-10 blur-2xl animate-fadeIn animation-delay-200"></div>

      <div className="container flex flex-col-reverse items-center justify-between px-4 mx-auto md:flex-row">
        {/* Text Column */}
        <div
          className="mt-12 text-center md:mt-0 md:w-1/2 lg:w-5/12 md:text-left"
          data-aos="fade-down"
        >
          <h1 className="mb-4 text-3xl font-bold leading-tight font-display md:text-4xl lg:text-5xl text-soft-white dark:text-white">
            Crafting Digital Experiences That{' '}
            <span className="text-electric-blue dark:text-highlight-yellow">
              Inspire
            </span>{' '}
            and Convert.
          </h1>
          <p className="mb-6 text-lg leading-relaxed text-gray-100 md:text-xl dark:text-gray-300">
            We’re a full-stack digital agency specializing in beautiful web design, impactful branding, and results-driven marketing. Let’s bring your vision to life.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row md:justify-start">
            <Link
              to={ROUTES.CONTACT} // Use constant for path
              aria-label="Get in touch with RocVille Media House"
              className="inline-block px-6 py-3 font-semibold text-white transition rounded-md  bg-electric-blue dark:bg-highlight-yellow dark:text-rich-black shadow-card hover:bg-blue-700 dark:hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-electric-blue/50"
            >
              Get in Touch
            </Link>
            <Link
              to={ROUTES.PORTFOLIO} // Use constant for path
              aria-label="View our portfolio"
              className="inline-block px-6 py-3 font-semibold text-white transition border border-white rounded-md  dark:border-soft-white dark:text-soft-white hover:bg-white hover:text-electric-blue dark:hover:bg-gray-800 dark:hover:text-highlight-yellow focus:outline-none focus:ring-4 focus:ring-electric-blue/50"
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
            {/* 
              Future Enhancements for <picture> element:
              - Replace placeholder with actual hero image.
              - Add <source> elements for different image formats (e.g., WebP for better compression).
                <source srcSet="path/to/hero-image.webp" type="image/webp" />
              - Add <source> elements for different image sizes or art-directed crops for various screen sizes.
                <source media="(min-width: 768px)" srcSet="path/to/hero-image-large.jpg" /> 
            */}
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
