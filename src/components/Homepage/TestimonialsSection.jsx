// src/components/Homepage/TestimonialsSection.jsx
import React from 'react';
import Section from '../Section/Section.jsx';

const testimonialBaseStyles = "p-6 bg-gray-100 dark:bg-gray-800 rounded-md italic";

const TestimonialsSection = ({ personalizedTestimonials }) => {
  if (!personalizedTestimonials || personalizedTestimonials.length === 0) {
    return null; // Or a message indicating no relevant testimonials
  }

  return (
    <Section className="mb-section bg-white dark:bg-midnight-blue bg-opacity-80 dark:bg-opacity-80 rounded-lg p-8 shadow-lg dark:shadow-none">
      <h2 className="font-display text-3xl font-bold text-electric-blue dark:text-highlight-yellow text-center mb-6">What Our Clients Say</h2>
      <div className="space-y-6">
        {personalizedTestimonials.map((t, i) => (
          <blockquote key={i} className={testimonialBaseStyles}>
            <p className="text-lg text-midnight-blue dark:text-soft-white">“{t.text}”</p>
            <footer className="mt-3 text-sm text-gray-600 dark:text-gray-400">— {t.author}</footer>
          </blockquote>
        ))}
      </div>
    </Section>
  );
};

export default TestimonialsSection;