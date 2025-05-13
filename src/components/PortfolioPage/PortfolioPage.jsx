// /src/pages/PortfolioPage.jsx
import React, { useState } from 'react';
import CategoryFilter from '../ui/CategoryFilter.jsx';
import Section from '../Section/Section.jsx'; // Corrected import to Section
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
      <Section className="pb-0 pt-section">
        <h2 className="mb-6 text-3xl font-bold text-center text-midnight-blue dark:text-soft-white">
          Explore Our Portfolio
        </h2>
        <p className="mb-8 text-center text-gray-600 dark:text-gray-300">
          Browse through our projects and see how we bring ideas to life.
        </p>
        <CategoryFilter
          categories={categories}
          onCategoryChange={debouncedCategory}
          isFetching={isFetching}
        />
      </Section>

      {/* Projects Section */}
      <Section className="pt-0">
        <div className="container px-4 mx-auto">
          {isFetching && (
            <p className="text-center text-gray-600">Loading projects...</p>
          )}
          {error && (
            <p className="text-center text-red-500">
              Error loading projects: {error.message}
            </p>
          )}
          {!isFetching && !error && (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>
      </Section>
    </div>
  );
};

export default PortfolioPage;