// src/components/Homepage/ProjectsTeaser.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Section from '../Section/Section';
import { ROUTES } from '../../constants'; // Assuming ROUTES are defined

const ProjectsTeaser = ({ PROJECTS, trackPortfolioHover }) => {
  return (
    <Section className="mb-section">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold md:text-4xl font-display text-midnight-blue dark:text-soft-white">
          Featured Projects
        </h2>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
          A taste of what we’ve built with passion and purpose.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((project, index) => (
          <Link
            key={index}
            to={project.link || ROUTES.PORTFOLIO} // Link to project-specific page or main portfolio
            className="block overflow-hidden transition-all duration-300 bg-white rounded-lg shadow-md dark:bg-rich-black group hover:shadow-xl hover:scale-[1.02]"
            onMouseEnter={() => trackPortfolioHover(project.name)}
            aria-label={`View details for project: ${project.name}`}
            data-aos="fade-up"
            data-aos-delay={index * 100} // Stagger animation
          >
            <div className="relative w-full h-48 overflow-hidden">
              <img 
                src={project.image} 
                alt={`Screenshot of ${project.name}`} 
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110" 
                loading="lazy"
              />
            </div>
            <div className="p-4">
              <h3 className="mb-1 text-xl font-bold text-midnight-blue dark:text-soft-white group-hover:text-electric-blue dark:group-hover:text-highlight-yellow">
                {project.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                {project.description}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link
          to={ROUTES.PORTFOLIO}
          className="inline-block px-8 py-3 font-semibold transition-colors duration-300 rounded-md shadow-md bg-electric-blue dark:bg-highlight-yellow text-soft-white dark:text-rich-black hover:bg-blue-700 dark:hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-electric-blue dark:focus:ring-highlight-yellow focus:ring-offset-2"
          aria-label="View all our projects"
        >
          View All Projects
        </Link>
      </div>
    </Section>
  );
};

ProjectsTeaser.propTypes = {
  PROJECTS: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    link: PropTypes.string, // Optional: direct link to the project's detail page
  })).isRequired,
  trackPortfolioHover: PropTypes.func.isRequired,
};

export default ProjectsTeaser;