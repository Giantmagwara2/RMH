import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { allServices } from '../../constants/allServices';
import { serviceIcons } from '../../constants'; // To access the SVG icons

const ServicesSection = () => (
  <section
    id="services"
    className="overflow-hidden pt-section pb-section bg-soft-white dark:bg-rich-black"
    aria-labelledby="services-heading"
  >
    <div className="container px-4 mx-auto">
      {/* Section Heading */}
      <h2
        id="services-heading"
        className="mb-12 text-3xl text-center font-display md:text-4xl text-midnight-blue dark:text-soft-white"
        data-aos="fade-up"
      >
        Our Creative Services
      </h2>

      {/* Services Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {allServices.map((svc, idx) => {
          const IconComponent = serviceIcons[svc.iconKey]; // Get the SVG icon component
          return (
            <div
              key={svc.id}
              className="flex flex-col p-6 transition duration-300 transform bg-white group dark:bg-midnight-blue rounded-xl shadow-card hover:shadow-lg hover:-translate-y-1 hover:border hover:border-electric-blue dark:hover:border-highlight-yellow"
              // Consider adding focus-within styles for keyboard navigation if the whole card isn't a link
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              {/* Icon */}
              <div
                className="inline-flex items-center self-start justify-center p-3 mb-4 text-white transition-colors duration-300 rounded-md bg-electric-blue dark:bg-highlight-yellow dark:text-rich-black group-hover:bg-blue-700 dark:group-hover:bg-yellow-500"
              >
                {IconComponent ? (
                  <IconComponent className="w-8 h-8 group-hover:text-white dark:group-hover:text-rich-black" />
                ) : <div className="w-8 h-8" /> /* Placeholder if icon is missing */ }
              </div>

              {/* Title */}
              <h3 className="mb-2 text-xl font-semibold transition-colors duration-300 text-midnight-blue dark:text-soft-white group-hover:text-electric-blue dark:group-hover:text-highlight-yellow">
                {svc.name}
              </h3>

              {/* Description */}
              <p className="flex-grow mb-6 leading-relaxed text-gray-700 dark:text-gray-300">
                {svc.description}
              </p>

              {/* Learn More */}
              <Link
                to={`/services/${svc.slug}`} // Use the slug from allServices
                className="inline-flex items-center mt-auto font-medium transition-colors duration-300 text-electric-blue dark:text-highlight-yellow hover:underline focus:outline-none focus:ring-2 focus:ring-electric-blue/50 dark:focus:ring-highlight-yellow/50"
                aria-label={`Learn more about ${svc.name}`}
              >
                Learn More&nbsp;&rarr;
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

// Although this component currently sources its data from imported constants,
// defining PropTypes is a good practice for documentation and future flexibility.
// If `allServices` or `serviceIcons` were to be passed as props, these would be defined here.
ServicesSection.propTypes = {
  // Example: If `allServices` were a prop
  // allServices: PropTypes.arrayOf(PropTypes.shape({
  //   id: PropTypes.string.isRequired,
  //   name: PropTypes.string.isRequired,
  //   description: PropTypes.string.isRequired,
  //   slug: PropTypes.string.isRequired,
  //   iconKey: PropTypes.string.isRequired,
  // })).isRequired,
};
export default ServicesSection;