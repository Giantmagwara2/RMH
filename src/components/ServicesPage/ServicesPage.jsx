// src/components/ServicesPage/ServicesPage.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PageWrapper from '../Layout/PageWrapper';
import Section from '../Section/Section'; // Renamed import to Section
import { useQuery } from '@tanstack/react-query';
import { fetchServices } from '../../api';
import { ROUTES } from '../../constants/index'; // Correct import path for ROUTES

const cardBaseStyles = "bg-white dark:bg-dark-bg rounded-lg shadow-card dark:shadow-none p-6 transition-transform transform hover:-translate-y-1 group";

const ServicesPage = () => {
  const { data: services, isLoading, isError, error } = useQuery({
    queryKey: ['services'],
    queryFn: fetchServices,
  });

  return (
    <PageWrapper>
      {/* Hero Section */}
      <div className="pt-header pb-section bg-gradient-to-br from-electric-blue to-indigo-500 dark:from-midnight-blue dark:to-rich-black">
        <div className="container px-4 mx-auto">
          <Section
            className="text-center mb-section"
            data-aos="fade-down"
            data-aos-duration="800"
          >
            <h1 className="mb-4 text-4xl font-bold font-display lg:text-5xl text-soft-white">
              Our Expert Services
            </h1>
            <p className="max-w-2xl mx-auto text-lg leading-relaxed text-soft-white">
              From stunning web experiences to strategic marketing campaigns, our full suite of creative services is designed to help your brand thrive.
            </p>
          </Section>
        </div>
      </div>

      {/* Services Grid */}
      <Section className="pt-section pb-section">
        <div className="container px-4 mx-auto">
          {isLoading && (
            <p className="py-10 text-xl text-center text-gray-700 animate-pulse dark:text-gray-300">
              Loading services…
            </p>
          )}
          {isError && (
            <p className="py-10 text-xl text-center text-red-500 dark:text-red-400">
              Error: {error?.message || 'Failed to load services.'} Please try again later.
            </p>
          )}
          {!isLoading && !isError && services && services.length === 0 && (
            <p className="py-10 text-xl text-center text-gray-700 dark:text-gray-300">
              No services available at the moment. Please check back soon!
            </p>
          )}
          {!isLoading && !isError && services && services.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <div
                  key={service.name} // Assuming service.name is unique, otherwise service.id
                  className={`${cardBaseStyles} hover:shadow-lg flex flex-col`} // Added flex flex-col
                  data-aos="fade-up"
                  data-aos-duration="600"
                >
                  <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-md bg-electric-blue dark:bg-highlight-yellow text-soft-white dark:text-rich-black group-hover:scale-110 transition-transform">
                    {/* Ensure service.icon is a valid React node (e.g., an SVG component) */}
                    {typeof service.icon === 'function' ? React.createElement(service.icon) : service.icon}
                  </div>
                  <h2 className="mb-2 text-xl font-semibold text-midnight-blue dark:text-secondary">
                    {service.name}
                  </h2>
                  <p className="flex-grow mb-4 text-gray-700 dark:text-gray-300 line-clamp-4"> {/* Added flex-grow and line-clamp */}
                    {service.description}
                  </p>
                  <Link
                    to={service.slug ? `${ROUTES.SERVICES}/${service.slug}` : ROUTES.SERVICES} // Link to specific service if slug exists
                    className="inline-flex items-center mt-auto font-semibold text-electric-blue dark:text-highlight-yellow hover:underline focus:outline-none focus:ring-2 focus:ring-electric-blue dark:focus:ring-highlight-yellow focus:ring-offset-2 dark:focus:ring-offset-dark-bg" // Added dark focus offset
                    aria-label={`Learn more about our ${service.name} services`}
                  >
                    Learn More
                    <svg
                      className="w-5 h-5 ml-1 transition-transform group-hover:translate-x-1" // Ensure consistent icon size
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </Section>

      {/* Call to Action */}
      <Section
        className="py-12 mx-4 text-center rounded-lg bg-electric-blue dark:bg-indigo-700 mt-section sm:mx-8 lg:mx-32"
        data-aos="fade-up"
        data-aos-duration="800"
      >
        <p className="mb-6 text-lg italic text-soft-white">
          Ready to take your project to the next level?
        </p>
        <Link
          to={ROUTES.CONTACT}
          className="inline-block px-8 py-3 font-semibold transition-colors duration-300 rounded-md shadow-md bg-soft-white dark:bg-white text-electric-blue dark:text-rich-black hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-electric-blue dark:focus:ring-highlight-yellow focus:ring-offset-2"
          aria-label="Contact us to discuss your project"
        >
          Contact Us
        </Link>
      </Section>
    </PageWrapper>
  );
};

// Even if no props are currently passed, it's good practice for future scalability
ServicesPage.propTypes = {
  // Example: If you were to pass initialCategory as a prop
  // initialCategory: PropTypes.string,
};
export default ServicesPage;