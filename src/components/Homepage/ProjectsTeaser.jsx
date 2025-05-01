// src/components/Homepage/ProjectsTeaser.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants';

const cardBaseStyles = "bg-white dark:bg-rich-black rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300";

const ProjectsTeaser = ({ PROJECTS, trackPortfolioHover }) => {
  return (
    <section className="mb-section">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-midnight-blue dark:text-soft-white">Featured Projects</h2>
        <p className="text-gray-600 dark:text-gray-300">A taste of what we’ve built with passion and purpose.</p>
      </div>
      <div className="grid gap-8 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
        {PROJECTS.map((project) => (
          <div
            key={project.id}
            className={cardBaseStyles}
            onMouseEnter={() => trackPortfolioHover(project.id)}
          >
            <Link to={project.link}>
              <div className="relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-midnight-blue dark:text-soft-white mb-1">{project.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{project.description}</p>
                <span className="text-sm text-electric-blue dark:text-highlight-yellow font-medium">View Case Study →</span>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link
          to={ROUTES.PORTFOLIO}
          className="inline-block bg-electric-blue dark:bg-highlight-yellow text-white dark:text-rich-black px-6 py-3 rounded-md hover:bg-blue-700 dark:hover:bg-yellow-500 transition-colors shadow"
        >
          See All Projects
        </Link>
      </div>
    </section>
  );
};

export default ProjectsTeaser;