// src/components/Homepage/ProjectsTeaser.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants';
import Section from '../Section/Section'; // Use the Section component for consistent styling

const cardBaseStyles = "bg-white dark:bg-rich-black rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300";

const ProjectsTeaser = ({ PROJECTS, trackPortfolioHover }) => {
  return (
    <Section className="mb-section">
      {/* Header */}
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold text-midnight-blue dark:text-soft-white">
          Featured Projects
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          A taste of what we’ve built with passion and purpose.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
        {PROJECTS.map((project) => (
          <div
            key={project.id}
            className={`${cardBaseStyles} group`}
            onMouseEnter={() => trackPortfolioHover(project.id)}
            data-aos="fade-up"
            data-aos-duration="600"
          >
            <Link to={project.link}>
              {/* Image */}
              <div className="relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="object-cover w-full h-48 transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/60 to-transparent group-hover:opacity-100"></div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="mb-1 text-xl font-semibold text-midnight-blue dark:text-soft-white">
                  {project.title}
                </h3>
                <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
                  {project.description}
                </p>
                <span className="text-sm font-medium text-electric-blue dark:text-highlight-yellow">
                  View Case Study →
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* See All Projects Button */}
      <div className="mt-12 text-center">
        <Link
          to={ROUTES.PORTFOLIO}
          className="inline-block px-6 py-3 text-white transition-transform duration-300 rounded-md shadow-md bg-electric-blue dark:bg-highlight-yellow dark:text-rich-black hover:bg-blue-700 dark:hover:bg-yellow-500 hover:scale-105"
        >
          See All Projects
        </Link>
      </div>
    </Section>
  );
};

export default ProjectsTeaser;