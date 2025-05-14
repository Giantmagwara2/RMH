// /src/components/ui/ProjectCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ProjectCard = ({ project }) => (
  <div
    className="overflow-hidden transition-shadow duration-300 bg-white rounded-lg shadow-card group hover:shadow-lg sm:max-w-sm md:max-w-md lg:max-w-lg"
    data-aos="fade-up"
    role="region"
    aria-labelledby={`project-title-${project.id}`}
    aria-describedby={`project-description-${project.id}`}
  >
    <Link to={project.link} aria-label={`View ${project.title}`} tabIndex={0}>
      <div className="relative">
        <img
          src={project.image}
          alt={project.title}
          className="object-cover w-full h-48 transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 bg-opacity-0 bg-midnight-blue group-hover:bg-opacity-70">
          <span className="text-lg font-semibold opacity-0 text-soft-white group-hover:opacity-100">
            View Project
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3
          id={`project-title-${project.id}`}
          className="mb-1 text-lg font-semibold text-midnight-blue"
        >
          {project.title}
        </h3>
        <p
          id={`project-description-${project.id}`}
          className="mb-1 text-sm text-gray-600"
        >
          {project.description}
        </p>
        <p className="text-xs text-electric-blue">{project.category}</p>
      </div>
    </Link>
  </div>
);

export default ProjectCard;