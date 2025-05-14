// src/components/Homepage/ServicesSection.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Section from '../Section/Section';
import { ROUTES } from '../../constants';

const cardBaseStyles = "bg-white dark:bg-midnight-blue rounded-lg shadow-card p-6 transition-transform duration-300 transform hover:-translate-y-2 hover:shadow-lg cursor-pointer group";

const ServicesSection = React.forwardRef(({ prioritizedServices, trackServiceClick, mostClickedService, pageViews }, ref) => {
  const serviceCardClasses = (name) => {
    const base = cardBaseStyles;
    return mostClickedService === name && pageViews > 1
      ? `${base} border-4 border-electric-blue dark:border-highlight-yellow`
      : base;
  };
  
  return (
    <Section className="mb-section">
      {/* Section Header */}
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold font-display text-midnight-blue dark:text-soft-white">
          Our Creative Services
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Explore the services we offer to help your brand thrive.
        </p>
      </div>

      {/* Services Grid */}
      <div ref={ref} className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {prioritizedServices.map((service) => (
          <div
            key={service.name}
            onClick={() => trackServiceClick(service.name)}
            className={serviceCardClasses(service.name)}
            data-aos="fade-up"
            data-aos-duration="600"
          >
            <div className="p-6">
              {/* Icon */}
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-electric-blue dark:bg-highlight-yellow text-soft-white dark:text-rich-black">
                {service.icon}
              </div>

              {/* Service Name */}
              <h3 className="mb-2 text-xl font-semibold text-midnight-blue dark:text-soft-white">
                {service.name}
              </h3>

              {/* Service Description */}
              <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                {service.description}
              </p>

              {/* Learn More Link */}
              <Link
                to={ROUTES.SERVICES}
                className="inline-block mt-4 font-semibold transition-colors duration-300 text-electric-blue dark:text-highlight-yellow hover:underline"
                aria-label={`Learn more about ${service.name}`}
              >
                Learn More →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
});

ServicesSection.displayName = 'ServicesSection';

export default ServicesSection;