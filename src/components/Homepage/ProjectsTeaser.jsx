// src/components/Homepage/ProjectsTeaser.jsx
import React from 'react';
import Section from '../Section/Section';

const ProjectsTeaser = ({ PROJECTS, trackPortfolioHover }) => {
  return (
    <Section className="mb-section">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold text-midnight-blue dark:text-soft-white">
          Featured Projects
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          A taste of what we’ve built with passion and purpose.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((project, index) => (
          <div
            key={index}
            className="bg-white dark:bg-rich-black rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
            onMouseEnter={() => trackPortfolioHover(project.name)}
          >
            <img src={project.image} alt={project.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-bold text-midnight-blue dark:text-soft-white">
                {project.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {project.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default ProjectsTeaser;