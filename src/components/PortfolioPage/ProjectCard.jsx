import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProjectCard = ({ project }) => (
  <div
    className="overflow-hidden transition-shadow duration-300 bg-white rounded-lg dark:bg-gray-800 shadow-card group hover:shadow-lg"
    data-aos="fade-up"
    data-aos-duration="600"
  >
    <Link to={project.link || `/portfolio/${project.slug || project.id}`} aria-label={`View details for ${project.title}`}>
      {/* Image Section */}
      <div className="relative">
        <img
          src={project.image}
          alt={`Screenshot or cover image for ${project.title}`}
          className="object-cover w-full h-48 transition-transform duration-300 md:h-56 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 bg-opacity-0 bg-midnight-blue group-hover:bg-opacity-70">
          <span className="text-lg font-semibold transition-opacity duration-300 opacity-0 text-soft-white group-hover:opacity-100">
            View Project
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        <h3 className="mb-1 text-xl font-semibold text-midnight-blue dark:text-soft-white group-hover:text-electric-blue dark:group-hover:text-highlight-yellow">
          {project.title}
        </h3>
        <p className="mb-3 text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
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
    slug: PropTypes.string, // Optional, can be used for cleaner URLs
    link: PropTypes.string, // Optional, direct link if available
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string,
  }).isRequired,
};

export default ProjectCard;
