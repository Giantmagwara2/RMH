// /src/components/ui/ProjectCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ProjectCard = ({ project }) => (
  <div
    className="bg-white rounded-lg shadow-card overflow-hidden group hover:shadow-lg transition-shadow duration-300"
    data-aos="fade-up"
  >
    <Link to={project.link} aria-label={`View ${project.title}`}>
      <div className="relative">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-midnight-blue bg-opacity-0 group-hover:bg-opacity-70 transition-opacity duration-300 flex items-center justify-center">
          <span className="text-soft-white font-semibold text-lg opacity-0 group-hover:opacity-100">
            View Project
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg text-midnight-blue mb-1">
          {project.title}
        </h3>
        <p className="text-gray-600 text-sm mb-1">{project.description}</p>
        <p className="text-electric-blue text-xs">{project.category}</p>
      </div>
    </Link>
  </div>
);

export default ProjectCard;