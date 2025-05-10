import React from 'react';
import { Link } from 'react-router-dom';
import { allServices } from '../../constants/allServices';
import { serviceIcons } from '../../constants'; // To access the SVG icons

const ServicesSection = () => (
  <section
    id="services"
    className="
      pt-section pb-section
      bg-soft-white dark:bg-rich-black
      overflow-hidden
    "
    aria-labelledby="services-heading"
  >
    <div className="container mx-auto px-4">
      {/* Section Heading */}
      <h2
        id="services-heading"
        className="font-display text-3xl md:text-4xl text-midnight-blue dark:text-soft-white text-center mb-12"
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
              className="
                group
                bg-white dark:bg-midnight-blue
                rounded-xl
                shadow-card
                hover:shadow-lg
                transform hover:-translate-y-1
                transition
                duration-300
                flex flex-col
                p-6
                hover:border hover:border-electric-blue dark:hover:border-highlight-yellow
              "
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              {/* Icon */}
              <div
                className={`
                  mb-4
                  inline-flex items-center justify-center
                  p-3
                  bg-electric-blue dark:bg-highlight-yellow
                  rounded-md
                  text-white dark:text-rich-black
                  transition-colors duration-300
                  group-hover:bg-blue-700 dark:group-hover:bg-yellow-500
                `}
              >
                {IconComponent && (
                  <IconComponent
                    className={`w-8 h-8 group-hover:text-white dark:group-hover:text-rich-black`}
                  />
                )}
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold mb-2 text-midnight-blue dark:text-soft-white group-hover:text-electric-blue dark:group-hover:text-highlight-yellow transition-colors duration-300">
                {svc.name}
              </h3>

              {/* Description */}
              <p className="flex-grow text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                {svc.description}
              </p>

              {/* Learn More */}
              <Link
                to={`/services/${svc.slug}`} // Use the slug from allServices
                className="
                  inline-flex items-center
                  text-electric-blue dark:text-highlight-yellow
                  font-medium
                  hover:underline
                  focus:outline-none focus:ring-2 focus:ring-electric-blue/50
                  transition-colors duration-300
                "
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

export default ServicesSection;