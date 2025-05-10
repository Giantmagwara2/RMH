import React from 'react';
// Assuming you are now importing testimonialsData from the new file
import { testimonialsData } from '../../constants/testimonialsData';

const TestimonialsSection = ({ testimonials = testimonialsData }) => {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section
      id="testimonials"
      className="
        pt-section pb-section
        bg-electric-blue/5 dark:bg-soft-white/10
        overflow-hidden
      "
      aria-labelledby="testimonials-heading"
    >
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <h2
          id="testimonials-heading"
          className="font-display text-3xl md:text-4xl text-midnight-blue dark:text-soft-white text-center mb-12"
          data-aos="fade-up"
        >
          What Our Clients Say
        </h2>

        {/* Testimonial Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, idx) => (
            <blockquote
              key={t.id || idx} // Use t.id if available, otherwise fallback to index
              className="
                bg-white dark:bg-midnight-blue
                rounded-xl
                shadow-card
                p-6
                flex flex-col
                transition-transform
                hover:scale-105 hover:shadow-md
              "
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              <p className="relative flex-grow text-gray-700 dark:text-gray-300 italic leading-relaxed mb-4">
                <span className="absolute top-0 left-0 text-gray-400 dark:text-gray-600 text-2xl opacity-50">&ldquo;</span>
                {t.text}
                <span className="absolute bottom-0 right-0 text-gray-400 dark:text-gray-600 text-2xl opacity-50">&rdquo;</span>
              </p>
              <footer className="mt-2 text-sm">
                <span className="text-electric-blue dark:text-highlight-yellow font-semibold">— {t.author}</span>
                {t.role && <span className="text-gray-500 dark:text-gray-400 ml-1">, {t.role}</span>}
                {t.company && <span className="text-gray-500 dark:text-gray-400 ml-1">({t.company})</span>}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;