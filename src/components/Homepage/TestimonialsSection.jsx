// src/components/Homepage/TestimonialsSection.jsx
import React from 'react';
import Section from '../Section/Section.jsx';

const testimonialBaseStyles = "p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md transition-transform duration-300 transform hover:-translate-y-2 hover:shadow-lg";

const TestimonialsSection = ({ personalizedTestimonials }) => {
  if (!personalizedTestimonials || personalizedTestimonials.length === 0) {
    return (
      <Section className="p-8 bg-white rounded-lg shadow-lg mb-section dark:bg-midnight-blue bg-opacity-80 dark:bg-opacity-80 dark:shadow-none">
        <h2 className="mb-6 text-3xl font-bold text-center font-display text-electric-blue dark:text-highlight-yellow">
          What Our Clients Say
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400">
          No testimonials available at the moment. Check back later!
        </p>
      </Section>
    );
  }

  return (
    <Section className="p-8 bg-white rounded-lg shadow-lg mb-section dark:bg-midnight-blue bg-opacity-80 dark:bg-opacity-80 dark:shadow-none">
      <h2 className="mb-6 text-3xl font-bold text-center font-display text-electric-blue dark:text-highlight-yellow">
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
            <p className="text-lg leading-relaxed text-midnight-blue dark:text-soft-white">
              “{testimonial.text}”
            </p>
            <footer className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              — {testimonial.author}
            </footer>
          </blockquote>
        ))}
      </div>
    </Section>
  );
};

export default TestimonialsSection;