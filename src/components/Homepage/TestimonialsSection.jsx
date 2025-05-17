// src/components/Homepage/TestimonialsSection.jsx
import React from 'react';
import PropTypes from 'prop-types';
import Section from '../Section/Section.jsx';
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/solid'; // Example icon

const testimonialBaseStyles = "relative p-6 bg-gray-100 dark:bg-zinc-800 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-[1.03] hover:shadow-xl";

const TestimonialsSection = ({ personalizedTestimonials }) => {
  if (!personalizedTestimonials || personalizedTestimonials.length === 0) {
    return (
      <Section className="p-8 mb-section bg-white rounded-lg shadow-lg dark:bg-midnight-blue bg-opacity-80 dark:bg-opacity-80 dark:shadow-none">
        <h2 className="mb-4 text-3xl font-bold text-center md:text-4xl font-display text-electric-blue dark:text-highlight-yellow">
          What Our Clients Say
        </h2>
        <p className="text-lg text-center text-gray-600 dark:text-gray-400">
          No testimonials available at the moment. Check back later!
        </p>
      </Section>
    );
  }

  return (
    <Section className="p-8 mb-section bg-white rounded-lg shadow-lg dark:bg-midnight-blue bg-opacity-80 dark:bg-opacity-80 dark:shadow-none">
      <h2 className="mb-8 text-3xl font-bold text-center md:text-4xl font-display text-electric-blue dark:text-highlight-yellow">
        What Our Clients Say
      </h2>
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {personalizedTestimonials.map((testimonial, index) => (
          <blockquote
            key={index}
            className={`${testimonialBaseStyles}`}
            data-aos="fade-up"
            data-aos-duration="600"
          >
            <ChatBubbleLeftRightIcon className="absolute w-12 h-12 text-electric-blue opacity-10 dark:text-highlight-yellow top-4 left-4 transform -translate-x-2 -translate-y-2" />
            <p className="relative z-10 text-lg italic leading-relaxed text-midnight-blue dark:text-soft-white">
              “{testimonial.text}”
            </p>
            <footer className="relative z-10 mt-4 text-sm text-gray-600 dark:text-gray-400">
              <span className="font-semibold text-electric-blue dark:text-highlight-yellow">{testimonial.author}</span>
              {testimonial.company && (
                <span className="block text-xs text-gray-500 dark:text-gray-500">{testimonial.company}</span>
              )}
            </footer>
          </blockquote>
        ))}
      </div>
    </Section>
  );
};

TestimonialsSection.propTypes = {
  personalizedTestimonials: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    company: PropTypes.string, // Optional: client's company or role
    service: PropTypes.string, // Already used for personalization logic in Homepage
  })),
};

export default TestimonialsSection;