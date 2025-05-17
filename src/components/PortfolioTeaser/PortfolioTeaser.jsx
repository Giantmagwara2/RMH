// src/components/PortfolioTeaser/PortfolioTeaser.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ROUTES } from '../../constants'; // Assuming ROUTES are defined

const PortfolioTeaser = ({ projects }) => {
  if (!projects || projects.length === 0) return null;

  return (
    <section
      id="portfolio-teaser"
      className="overflow-hidden pt-section pb-section bg-soft-white dark:bg-rich-black"
      aria-labelledby="portfolio-teaser-heading"
    >
      <div className="container px-4 mx-auto">
        {/* Section Title */}
        <h2
          id="portfolio-teaser-heading"
          className="mb-10 text-3xl text-center font-display md:text-4xl text-midnight-blue dark:text-soft-white"
          data-aos="fade-up"
        >
          Featured Projects
        </h2>

        {/* Projects Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((proj, idx) => (
            <div
              key={proj.title}
              className="overflow-hidden transition-transform duration-300 bg-white group dark:bg-midnight-blue rounded-xl shadow-card hover:-translate-y-2 hover:shadow-lg"
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              {/* Image Section */}
              <div className="relative overflow-hidden rounded-t-xl">
                <img
                  src={proj.image}
                  alt={proj.alt || proj.title}
                  className="object-cover w-full h-48 transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-midnight-blue/20 dark:bg-rich-black/40 group-hover:opacity-100"></div>
              </div>

              {/* Content Section */}
              <div className="flex flex-col p-6">
                <h3 className="mb-2 text-xl font-semibold text-midnight-blue dark:text-soft-white">
                  {proj.title}
                </h3>
                <p className="flex-grow mb-4 text-gray-700 dark:text-gray-300">
                  {proj.description}
                </p>
                <Link
                  to={proj.path}
                  className="inline-block mt-auto font-medium transition text-electric-blue dark:text-highlight-yellow hover:underline focus:outline-none focus:ring-2 focus:ring-electric-blue/50 group-hover:text-blue-700 dark:group-hover:text-yellow-500"
                  aria-label={`View case study for ${proj.title}`}
                >
                  View Case Study →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Call-to-Action */}
        <div className="mt-12 text-center" data-aos="fade-up" data-aos-delay={projects.length * 100}>
          <Link
            to={ROUTES.PORTFOLIO} // Use constant for path
            className="inline-block px-8 py-3 font-semibold text-white transition rounded-md shadow-md bg-electric-blue dark:bg-highlight-yellow dark:text-rich-black hover:bg-blue-700 dark:hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-electric-blue/50"
            aria-label="View the full portfolio"
          >
            View Full Portfolio
          </Link>
        </div>
      </div>
    </section>
  );
};

PortfolioTeaser.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    alt: PropTypes.string,
    description: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired, // Path for "View Case Study" link
  })).isRequired,
};

export default PortfolioTeaser;