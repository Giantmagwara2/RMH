// /src/components/ui/ProjectCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProjectCard = ({ project }) => (
  <div
    className="overflow-hidden transition-shadow duration-300 bg-white rounded-lg shadow-card group hover:shadow-lg dark:bg-gray-800"
    data-aos="fade-up"
    data-aos-duration="600" // Retaining AOS attribute from PortfolioPage version
    role="region"
    aria-labelledby={`project-title-${project.id}`}
    aria-describedby={`project-description-${project.id}`}
  >
    <Link to={project.link || `/portfolio/${project.slug || project.id}`} aria-label={`View details for ${project.title}`} tabIndex={0}>
      <div className="relative">
        <img
          src={project.image}
          alt={project.altText || `Screenshot or cover image for ${project.title}`}
          className="object-cover w-full h-48 transition-transform duration-300 md:h-56 group-hover:scale-105" // md:h-56 from PortfolioPage
          loading="lazy"
        />
        <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 bg-opacity-0 bg-midnight-blue group-hover:bg-opacity-70">
          <span className="text-lg font-semibold transition-opacity duration-300 opacity-0 text-soft-white group-hover:opacity-100">
            View Project
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3
          id={`project-title-${project.id}`}
          className="mb-1 text-xl font-semibold text-midnight-blue dark:text-soft-white group-hover:text-electric-blue dark:group-hover:text-highlight-yellow" // Enhanced styling from PortfolioPage
        >
          {project.title}
        </h3>
        <p
          id={`project-description-${project.id}`}
          className="mb-3 text-sm text-gray-600 dark:text-gray-400 line-clamp-3" // line-clamp from PortfolioPage
        >
          {project.description}
        </p>
        {project.category && (
          <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-electric-blue dark:bg-highlight-yellow bg-opacity-10 dark:bg-opacity-20 text-electric-blue dark:text-highlight-yellow">
            {project.category}
          </span>
        )}
      </div>
    </Link>
  </div>
);

ProjectCard.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    slug: PropTypes.string,
    link: PropTypes.string,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string,
    altText: PropTypes.string, // Added altText for image
  }).isRequired,
};

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;