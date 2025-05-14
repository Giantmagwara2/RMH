import React from 'react';
import { Link } from 'react-router-dom';

const ProjectCard = ({ project }) => (
  <div
    className="overflow-hidden transition-shadow duration-300 bg-white rounded-lg dark:bg-gray-800 shadow-card group hover:shadow-lg"
    data-aos="fade-up"
    data-aos-duration="600"
  >
    <Link to={project.link} aria-label={`View ${project.title}`}>
      {/* Image Section */}
      <div className="relative">
        <img
          src={project.image}
          alt={project.title}
          className="object-cover w-full h-48 transition-transform duration-300 group-hover:scale-105"
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
        <h3 className="mb-1 text-lg font-semibold text-midnight-blue dark:text-soft-white">
          {project.title}
        </h3>
        <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
          {project.description}
        </p>
        <p className="text-xs font-medium text-electric-blue dark:text-highlight-yellow">
          {project.category}
        </p>
      </div>
    </Link>
  </div>
);

export default ProjectCard;
