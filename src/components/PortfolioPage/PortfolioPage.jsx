// /src/pages/PortfolioPage.jsx
import React, { useState } from 'react';
import CategoryFilter from '../components/ui/CategoryFilter';
import { HomepageSection } from '../components/ui/Sections';
import { ProjectCard } from '../components/ui/ProjectCard';
import { useFetchProjects } from '../hooks/useFetchProjects';
import useDebouncedCallback from '../hooks/useDebouncedCallback';

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
      <HomepageSection className="pt-section pb-0">
        <CategoryFilter
          categories={categories}
          onCategoryChange={debouncedCategory}
          isFetching={isFetching}
        />
      </HomepageSection>

      {/* Projects Section */}
      <div className="container mx-auto px-4">
        {isFetching && <p className="text-center text-gray-600">Loading projects...</p>}
        {error && <p className="text-center text-red-500">Error loading projects: {error.message}</p>}
        {!isFetching && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioPage;