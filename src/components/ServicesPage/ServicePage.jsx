// src/components/ServicesPage/ServicesPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import PageWrapper from '../Layout/PageWrapper';
import Section from '../Section/Section'; // Renamed import to Section
import { useQuery } from '@tanstack/react-query';
import { fetchServices } from '../../api';
import { ROUTES } from '../../constants';

const cardBaseStyles = "bg-white dark:bg-dark-bg rounded-lg shadow-card dark:shadow-none p-6 transition-transform transform hover:-translate-y-1 group";

const ServicesPage = () => {
  const { data: services, isLoading, isError, error } = useQuery({
    queryKey: ['services'],
    queryFn: fetchServices,
  });

  if (isLoading) {
    return (
      <PageWrapper>
        <div className="pt-header pb-section bg-gradient-to-br from-electric-blue to-indigo-500 dark:from-midnight-blue dark:to-rich-black">
          <div className="container mx-auto px-4">
            <Section className="text-center mb-section">
              <h1 className="font-display text-4xl lg:text-5xl font-bold text-soft-white mb-4">
                Our Expert Services
              </h1>
              <p className="text-lg text-soft-white leading-relaxed max-w-2xl mx-auto">
                From stunning web experiences to strategic marketing campaigns, our full suite of creative services is designed to help your brand thrive.
              </p>
            </Section>
          </div>
        </div>
        <Section className="pt-section pb-section">
          <div className="container mx-auto px-4">
            <p className="text-center mt-10">Loading services…</p>
          </div>
        </Section>
      </PageWrapper>
    );
  }

  if (isError) {
    return (
      <PageWrapper>
        <div className="pt-header pb-section bg-gradient-to-br from-electric-blue to-indigo-500 dark:from-midnight-blue dark:to-rich-black">
          <div className="container mx-auto px-4">
            <Section className="text-center mb-section">
              <h1 className="font-display text-4xl lg:text-5xl font-bold text-soft-white mb-4">
                Our Expert Services
              </h1>
              <p className="text-lg text-soft-white leading-relaxed max-w-2xl mx-auto">
                From stunning web experiences to strategic marketing campaigns, our full suite of creative services is designed to help your brand thrive.
              </p>
            </Section>
          </div>
        </div>
        <Section className="pt-section pb-section">
          <div className="container mx-auto px-4">
            <p className="text-center text-red-500 mt-10">
              Error loading services: {error?.message || 'Failed to load services'}
            </p>
          </div>
        </Section>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      {/* Hero Section */}
      <div className="pt-header pb-section bg-gradient-to-br from-electric-blue to-indigo-500 dark:from-midnight-blue dark:to-rich-black">
        <div className="container mx-auto px-4">
          <Section
            className="text-center mb-section"
            data-aos="fade-down"
            data-aos-duration="800"
          >
            <h1 className="font-display text-4xl lg:text-5xl font-bold text-soft-white mb-4">
              Our Expert Services
            </h1>
            <p className="text-lg text-soft-white leading-relaxed max-w-2xl mx-auto">
              From stunning web experiences to strategic marketing campaigns, our full suite of creative services is designed to help your brand thrive.
            </p>
          </Section>
        </div>
      </div>

      {/* Services Grid */}
      <Section className="pt-section pb-section">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services?.map((service) => (
              <div
                key={service.name}
                className={`${cardBaseStyles} hover:shadow-lg`}
                data-aos="fade-up"
                data-aos-duration="600"
              >
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-electric-blue dark:bg-highlight-yellow text-soft-white dark:text-rich-black mb-4">
                  {service.icon}
                </div>
                <h2 className="font-semibold text-xl text-midnight-blue dark:text-secondary mb-2">
                  {service.name}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {service.description}
                </p>
                <Link
                  to={`${ROUTES.SERVICES}/${service.slug}`}
                  className="inline-flex items-center font-semibold text-electric-blue dark:text-highlight-yellow hover:underline focus:outline-none focus:ring-2 focus:ring-electric-blue dark:focus:ring-highlight-yellow focus:ring-offset-2"
                  aria-label={`Learn more about ${service.name}`}
                >
                  Learn More
                  <svg
                    className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1"
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
        </div>
      </Section>

      {/* Call to Action */}
      <Section
        className="text-center bg-electric-blue dark:bg-indigo-700 py-12 mt-section rounded-lg mx-4 sm:mx-8 lg:mx-32"
        data-aos="fade-up"
        data-aos-duration="800"
      >
        <p className="text-soft-white italic text-lg mb-6">
          Ready to take your project to the next level?
        </p>
        <Link
          to={ROUTES.CONTACT}
          className="inline-block bg-soft-white dark:bg-white text-electric-blue dark:text-rich-black font-semibold py-3 px-8 rounded-md shadow-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-electric-blue dark:focus:ring-highlight-yellow focus:ring-offset-2"
          aria-label="Contact us to discuss your project"
        >
          Contact Us
        </Link>
      </Section>
    </PageWrapper>
  );
};

export default ServicesPage;