// src/components/PortfolioTeaser/PortfolioTeaser.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const PortfolioTeaser = ({ projects }) => {
  if (!projects || projects.length === 0) return null;

  return (
    <section
      id="portfolio-teaser"
      className="
        pt-section pb-section
        bg-soft-white dark:bg-rich-black
        overflow-hidden
      "
      aria-labelledby="portfolio-teaser-heading"
    >
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <h2
          id="portfolio-teaser-heading"
          className="font-display text-3xl md:text-4xl text-midnight-blue dark:text-soft-white text-center mb-10"
          data-aos="fade-up"
        >
          Featured Projects
        </h2>

        {/* Projects Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((proj, idx) => (
            <div
              key={proj.title}
              className="
                group
                bg-white dark:bg-midnight-blue
                rounded-xl
                shadow-card
                overflow-hidden
                transition-transform
                hover:-translate-y-1 hover:shadow-lg
              "
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              <div className="relative overflow-hidden rounded-t-xl">
                <img
                  src={proj.image}
                  alt={proj.alt || proj.title}
                  className="w-full h-48 object-cover transition-opacity duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-midnight-blue/20 dark:bg-rich-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              </div>
              <div className="p-6 flex flex-col">
                <h3 className="text-xl font-semibold mb-2 text-midnight-blue dark:text-soft-white">
                  {proj.title}
                </h3>
                <p className="flex-grow text-gray-700 dark:text-gray-300 mb-4">
                  {proj.description}
                </p>
                <Link
                  to={proj.path}
                  className={`
                    inline-block mt-auto
                    text-electric-blue dark:text-highlight-yellow
                    font-medium
                    hover:underline
                    focus:outline-none focus:ring-2 focus:ring-electric-blue/50
                    transition
                    group-hover:text-blue-700 dark:group-hover:text-yellow-500
                  `}
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
            to="/portfolio"
            className="
              inline-block
              bg-electric-blue dark:bg-highlight-yellow
              text-white dark:text-rich-black
              font-semibold
              py-3 px-8
              rounded-md
              shadow-md
              hover:bg-blue-700 dark:hover:bg-yellow-500
              focus:outline-none focus:ring-4 focus:ring-electric-blue/50
              transition
            "
            aria-label="View the full portfolio"
          >
            View Full Portfolio
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PortfolioTeaser;