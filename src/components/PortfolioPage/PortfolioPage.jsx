// /src/pages/PortfolioPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import CategoryFilter from '../ui/CategoryFilter.jsx';
import Section from '../Section/Section.jsx';
import ProjectCard from '../ui/ProjectCard.jsx';
import useFetchProjects from '../../hooks/useFetchProjects.js';
import useDebouncedCallback from '../../hooks/useDebouncedCallback';
import PageWrapper from '../Layout/PageWrapper.jsx'; // Import PageWrapper
import { ROUTES } from '../../constants/index.js'; // Import ROUTES

const PortfolioPage = () => {
  const [category, setCategory] = useState('All');

  const handleCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  const debouncedCategory = useDebouncedCallback(handleCategoryChange, 500);

  const { projects, isFetching, error } = useFetchProjects(category);
  const categories = ['All', 'Branding', 'Signage', 'Design', 'Tinting'];

  const renderStatusMessage = (message, type = 'info') => (
    <div className="flex items-center justify-center py-12 text-center" data-aos="fade-up">
      <p className={`text-xl ${
        type === 'error' ? 'text-red-600 dark:text-red-400' : 
        type === 'loading' ? 'text-gray-700 dark:text-gray-300 animate-pulse' : 
        'text-gray-700 dark:text-gray-300'
      }`}>
        {message}
      </p>
    </div>
  );

  return (
    <PageWrapper>
      <div className="pt-header pb-section bg-gradient-to-br from-electric-blue to-indigo-500 dark:from-midnight-blue dark:to-rich-black">
        <div className="container px-4 mx-auto">
          {/* Page Header */}
          <Section className="text-center mb-section">
            <h1 className="mb-6 text-4xl font-bold font-display lg:text-5xl text-soft-white">
              Our Portfolio
            </h1>
            <p className="max-w-2xl mx-auto text-lg leading-relaxed text-soft-white">
              Browse through our diverse range of projects and see how we bring creative visions to life.
            </p>
          </Section>

          {/* Filter and Projects Section */}
          <Section className="p-8 bg-white rounded-lg dark:bg-dark-bg bg-opacity-90 dark:bg-opacity-90 shadow-card dark:shadow-none md:p-12">
            <CategoryFilter
              categories={categories}
              onCategoryChange={debouncedCategory}
              isFetching={isFetching}
              className="mb-8" // Add some bottom margin to the filter
            />

            {isFetching && renderStatusMessage('Loading projects...', 'loading')}
            {error && renderStatusMessage(`Error: ${error.message}`, 'error')}
            {!isFetching && !error && projects.length === 0 && renderStatusMessage('No projects found for this category.')}
            
            {!isFetching && !error && projects.length > 0 && (
              <div
                className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
                data-aos="fade-up"
                data-aos-delay="200" // Delay slightly after filter might change
              >
                {projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            )}
          </Section>
        </div>
      </div>

      {/* Call-to-Action Section - Reusing styling from other CTAs */}
      <div className="container px-4 mx-auto my-section">
        <Section className="py-12 text-center rounded-lg shadow-lg bg-gradient-to-br from-electric-blue to-indigo-500 dark:from-midnight-blue dark:to-rich-black dark:shadow-none">
          <h3 className="mb-4 text-3xl font-bold md:text-4xl font-display text-soft-white">
            Have a Project in Mind?
          </h3>
          <p className="max-w-2xl mx-auto mb-8 text-lg leading-relaxed text-gray-200 md:text-xl">
            Let’s collaborate and turn your vision into a stunning reality.
          </p>
          <Link
            to={ROUTES.CONTACT} // Use constant for path
            className="inline-block px-8 py-4 text-lg font-semibold transition-transform duration-300 rounded-md shadow-lg bg-soft-white dark:bg-highlight-yellow text-electric-blue dark:text-rich-black hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-electric-blue/50 dark:focus:ring-highlight-yellow/50"
            aria-label="Contact us to discuss your project"
          >
            Contact Us
          </Link>
        </Section>
      </div>
    </PageWrapper>
  );
};

// Even if no props are currently passed, it's good practice for future scalability
PortfolioPage.propTypes = {
  // Example: If you were to pass initialCategory as a prop
  // initialCategory: PropTypes.string,
};

export default PortfolioPage;