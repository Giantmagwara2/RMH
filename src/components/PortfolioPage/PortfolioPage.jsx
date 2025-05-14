// /src/pages/PortfolioPage.jsx
import React, { useState } from 'react';
import CategoryFilter from '../ui/CategoryFilter.jsx';
import Section from '../Section/Section.jsx';
import ProjectCard from '../ui/ProjectCard.jsx';
import useFetchProjects from '../../hooks/useFetchProjects.js';
import useDebouncedCallback from '../../hooks/useDebouncedCallback';

const PortfolioPage = () => {
  const [category, setCategory] = useState('All');

  const handleCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  const debouncedCategory = useDebouncedCallback(handleCategoryChange, 500);

  const { projects, isFetching, error } = useFetchProjects(category);
  const categories = ['All', 'Branding', 'Signage', 'Design', 'Tinting'];

  return (
    <div>
      {/* Filter Section */}
      <Section className="pb-0 pt-section bg-gray-50 dark:bg-gray-900">
        <h2 className="mb-6 text-3xl font-bold text-center text-midnight-blue dark:text-white">
          Explore Our Portfolio
        </h2>
        <p className="mb-8 text-center text-gray-700 dark:text-gray-400">
          Browse through our projects and see how we bring ideas to life.
        </p>
        <CategoryFilter
          categories={categories}
          onCategoryChange={debouncedCategory}
          isFetching={isFetching}
        />
      </Section>

      {/* Projects Section */}
      <Section className="pt-0 bg-white dark:bg-gray-800">
        <div className="container px-4 mx-auto">
          {isFetching && (
            <p
              className="text-center text-gray-700 dark:text-gray-300 animate-pulse"
              data-aos="fade-up"
              data-aos-duration="600"
            >
              Loading projects...
            </p>
          )}
          {error && (
            <p
              className="text-center text-red-600 dark:text-red-400"
              data-aos="fade-up"
              data-aos-duration="600"
            >
              Error loading projects: {error.message}
            </p>
          )}
          {!isFetching && !error && projects.length === 0 && (
            <p
              className="text-center text-gray-700 dark:text-gray-300"
              data-aos="fade-up"
              data-aos-duration="600"
            >
              No projects found for the selected category.
            </p>
          )}
          {!isFetching && !error && projects.length > 0 && (
            <div
              className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
              data-aos="fade-up"
              data-aos-duration="600"
            >
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>
      </Section>

      {/* Call-to-Action Section */}
      <Section className="py-12 mt-12 text-center rounded-lg shadow-lg bg-gradient-to-br from-electric-blue to-indigo-500 dark:from-midnight-blue dark:to-rich-black dark:shadow-none">
        <h3 className="mb-4 text-2xl font-bold text-soft-white">
          Have a project in mind?
        </h3>
        <p className="mb-6 text-lg text-gray-200">
          Let’s collaborate and bring your ideas to life.
        </p>
        <a
          href="/contact"
          className="px-6 py-3 text-lg font-semibold transition-transform duration-300 rounded-md shadow-md text-electric-blue bg-soft-white dark:bg-highlight-yellow dark:text-rich-black hover:bg-gray-100 dark:hover:bg-yellow-400 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-electric-blue/50 dark:focus:ring-highlight-yellow/50"
        >
          Contact Us
        </a>
      </Section>
    </div>
  );
};

export default PortfolioPage;