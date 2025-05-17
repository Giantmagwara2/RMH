// src/components/Homepage/ServicesSection.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Section from '../Section/Section';
import { ROUTES } from '../../constants';

const cardBaseStyles = "bg-white dark:bg-midnight-blue rounded-lg shadow-card p-6 transition-transform duration-300 transform hover:-translate-y-2 hover:shadow-lg cursor-pointer group";

const ServicesSection = React.forwardRef(({ prioritizedServices, trackServiceClick, mostClickedService, pageViews }, ref) => {
  const serviceCardClasses = (name) => {
    const base = cardBaseStyles;
    return mostClickedService === name && pageViews > 1
      ? `${base} border-2 md:border-4 border-electric-blue dark:border-highlight-yellow ring-2 ring-electric-blue/50 dark:ring-highlight-yellow/50`
      : base;
  };
  
  return (
    <Section className="mb-section">
      {/* Section Header */}
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold md:text-4xl font-display text-midnight-blue dark:text-soft-white">
          Our Creative Services
        </h2>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
          Explore the services we offer to help your brand thrive.
        </p>
      </div>

      {/* Services Grid */}
      <div ref={ref} className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {prioritizedServices.map((service) => (
          <Link
            key={service.name}
            // Example for specific service page: to={service.slug ? `${ROUTES.SERVICES}/${service.slug}` : ROUTES.SERVICES}
            to={ROUTES.SERVICES} 
            onClick={() => trackServiceClick(service.name)}
            className={serviceCardClasses(service.name)}
            aria-label={`Learn more about ${service.name}`}
            data-aos="fade-up"
            data-aos-duration="600"
          >
            <div className="flex flex-col items-center p-6 text-center md:items-start md:text-left">
              {/* Icon */}
              <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-electric-blue dark:bg-highlight-yellow text-soft-white dark:text-rich-black group-hover:scale-110 transition-transform">
                {service.icon}
              </div>

              {/* Service Name */}
              <h3 className="mb-2 text-xl font-semibold text-midnight-blue dark:text-soft-white">
                {service.name}
              </h3>

              {/* Service Description */}
              <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300 line-clamp-3">
                {service.description}
              </p>

              {/* "Learn More" text - visual cue, whole card is link */}
              <span className="mt-auto font-semibold transition-colors duration-300 text-electric-blue dark:text-highlight-yellow group-hover:underline">
                Learn More →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
});

ServicesSection.propTypes = {
  prioritizedServices: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
    slug: PropTypes.string, // Optional: for linking to specific service pages
  })).isRequired,
  trackServiceClick: PropTypes.func.isRequired,
  mostClickedService: PropTypes.string,
  pageViews: PropTypes.number,
};

ServicesSection.displayName = 'ServicesSection';

export default ServicesSection;