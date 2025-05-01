// src/components/Homepage/ServicesSection.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import HomepageSection from '../../HomepageSection';
import { ROUTES } from '../../constants';

const cardBaseStyles = "bg-white dark:bg-midnight-blue rounded-lg shadow-card p-6 transition transform hover:-translate-y-1 cursor-pointer group";

const ServicesSection = ({ prioritizedServices, trackServiceClick, mostClickedService, pageViews }) => {
  const serviceCardClasses = (name) => {
    const base = cardBaseStyles;
    return mostClickedService === name && pageViews > 1
      ? `${base} border-4 border-electric-blue dark:border-highlight-yellow`
      : base;
  };

  return (
    <HomepageSection className="mb-section">
      <h2 className="font-display text-3xl font-bold text-soft-white dark:text-soft-white text-center mb-8">Our Creative Services</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {prioritizedServices.map(service => (
          <div
            key={service.name}
            onClick={() => trackServiceClick(service.name)}
            className={serviceCardClasses(service.name)}
          >
            <div className="p-6">
              <div className="w-12 h-12 mb-4 flex items-center justify-center bg-electric-blue dark:bg-highlight-yellow text-soft-white dark:text-rich-black rounded-full">
                {service.icon}
              </div>
              <h3 className="font-semibold text-xl text-midnight-blue dark:text-soft-white mb-2">{service.name}</h3>
              <p className="text-gray-700 dark:text-gray-300">{service.description}</p>
              <Link
                to={ROUTES.SERVICES}
                className="group-hover:text-electric-blue dark:group-hover:text-highlight-yellow text-gray-500 dark:text-gray-400 font-semibold mt-4 inline-block transition-colors duration-300"
              >
                Learn More →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </HomepageSection>
  );
};

export default ServicesSection;