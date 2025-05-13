// src/components/Homepage/ServicesSection.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Section from '../Section/Section';
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
    <Section className="mb-section">
      <h2 className="mb-8 text-3xl font-bold text-center font-display text-soft-white dark:text-soft-white">Our Creative Services</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {prioritizedServices.map(service => (
          <div
            key={service.name}
            onClick={() => trackServiceClick(service.name)}
            className={serviceCardClasses(service.name)}
          >
            <div className="p-6">
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-electric-blue dark:bg-highlight-yellow text-soft-white dark:text-rich-black">
                {service.icon}
              </div>
              <h3 className="mb-2 text-xl font-semibold text-midnight-blue dark:text-soft-white">{service.name}</h3>
              <p className="text-gray-700 dark:text-gray-300">{service.description}</p>
              <Link
                to={ROUTES.SERVICES}
                className="inline-block mt-4 font-semibold text-gray-500 transition-colors duration-300 group-hover:text-electric-blue dark:group-hover:text-highlight-yellow dark:text-gray-400"
              >
                Learn More →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default ServicesSection;