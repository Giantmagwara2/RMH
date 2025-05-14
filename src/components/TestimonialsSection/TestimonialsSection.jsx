import React from 'react';
import { testimonialsData } from '../../constants/testimonialsData';

const TestimonialsSection = ({ testimonials = testimonialsData }) => {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section
      id="testimonials"
      className="overflow-hidden pt-section pb-section bg-electric-blue/5 dark:bg-soft-white/10"
      aria-labelledby="testimonials-heading"
    >
      <div className="container px-4 mx-auto">
        {/* Section Title */}
        <h2
          id="testimonials-heading"
          className="mb-12 text-3xl text-center font-display md:text-4xl text-midnight-blue dark:text-soft-white"
          data-aos="fade-up"
        >
          What Our Clients Say
        </h2>

        {/* Testimonial Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, idx) => (
            <blockquote
              key={t.id || idx} // Use t.id if available, otherwise fallback to index
              className="flex flex-col p-6 transition-transform duration-300 bg-white dark:bg-midnight-blue rounded-xl shadow-card hover:scale-105 hover:shadow-lg"
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              {/* Testimonial Text */}
              <p className="relative flex-grow mb-4 italic leading-relaxed text-gray-700 dark:text-gray-300">
                <span className="absolute top-0 left-0 text-2xl text-gray-400 opacity-50 dark:text-gray-600">&ldquo;</span>
                {t.text}
                <span className="absolute bottom-0 right-0 text-2xl text-gray-400 opacity-50 dark:text-gray-600">&rdquo;</span>
              </p>

              {/* Author Details */}
              <footer className="mt-2 text-sm">
                <span className="font-semibold text-electric-blue dark:text-highlight-yellow">— {t.author}</span>
                {t.role && <span className="ml-1 text-gray-500 dark:text-gray-400">, {t.role}</span>}
                {t.company && <span className="ml-1 text-gray-500 dark:text-gray-400">({t.company})</span>}
              </footer>
            </blockquote>
          ))}
        </div>

        {/* Call-to-Action */}
        <div className="mt-12 text-center" data-aos="fade-up" data-aos-delay={testimonials.length * 100}>
          <a
            href="/contact"
            className="inline-block px-8 py-3 font-semibold text-white transition-colors duration-300 rounded-md shadow-md bg-electric-blue dark:bg-highlight-yellow dark:text-rich-black hover:bg-blue-700 dark:hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-electric-blue/50 dark:focus:ring-highlight-yellow/50"
            aria-label="Contact us to share your experience"
          >
            Share Your Experience
          </a>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;