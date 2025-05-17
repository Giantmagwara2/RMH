import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const CaseStudyPageComponent = ({ caseStudyData }) => {
  if (!caseStudyData) {
    return (
      <div className="flex items-center justify-center min-h-screen text-text-primary bg-bg">
        <p>Loading case study data or case study not found...</p>
      </div>
    );
  }

  const {
    title,
    heroImage,
    metrics = [],
    beforeAfter,
    contentSections = [],
  } = caseStudyData;

  return (
    <div className="space-y-space-4xl"> {/* Using design token for spacing */}
      {/* Hero Section */}
      <section
        className="relative w-full h-screen bg-center bg-cover"
        style={{ backgroundImage: `url(${heroImage || '/assets/placeholder-hero.jpg'})` }}
        aria-labelledby="case-study-title"
      >
        <div className="absolute inset-0 flex items-center justify-center bg-overlay">
          <h1 id="case-study-title" className="text-4xl font-bold text-center text-white md:text-6xl">
            {title || 'Case Study Title'}
          </h1>
        </div>
      </section>

      {/* Animated Metrics Section */}
      {metrics.length > 0 && (
        <section className="py-space-2xl px-space-md bg-bg-surface-accent">
          <div className="container grid grid-cols-1 gap-8 mx-auto text-center md:grid-cols-3">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="p-space-md"
              >
                <h2 className="text-3xl font-bold text-brand-primary md:text-4xl">{metric.value}</h2>
                <p className="mt-space-xs text-text-secondary">{metric.label}</p>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Content Sections */}
      {contentSections.map((section, index) => (
        <section key={section.id || index} className="container mx-auto py-space-xl px-space-md">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold text-center mb-space-lg text-text-primary md:text-4xl">{section.title}</h2>
            {section.image && section.imagePosition === 'left' && (
              <img src={section.image} alt={`${section.title} visual representation`} className="float-left object-cover w-full rounded-md shadow-lg mb-space-md md:w-1/2 md:mr-space-lg max-h-96" />
            )}
            {section.image && section.imagePosition === 'right' && (
              <img src={section.image} alt={`${section.title} visual representation`} className="float-right object-cover w-full rounded-md shadow-lg mb-space-md md:w-1/2 md:ml-space-lg max-h-96" />
            )}
            {typeof section.content === 'string' ? (
              <div className="clear-both prose max-w-none lg:prose-xl text-text-secondary" dangerouslySetInnerHTML={{ __html: section.content }} />
            ) : (
              <div className="clear-both text-text-secondary">{section.content}</div>
            )}
             {section.image && !section.imagePosition && ( // Default image position (e.g., full width below title)
              <img src={section.image} alt={`${section.title} visual representation`} className="object-cover w-full rounded-md shadow-lg mt-space-lg max-h-96" />
            )}
          </motion.div>
        </section>
      ))}

      {/* Before & After Slider Section */}
      {beforeAfter && (
        <section className="py-space-xl px-space-md">
          <h2 className="text-3xl font-bold text-center mb-space-lg text-text-primary md:text-4xl">Before & After</h2>
          <div className="container relative w-full mx-auto overflow-hidden rounded-md shadow-xl aspect-video md:h-96">
            <img
              src={beforeAfter.beforeImage || '/assets/placeholder-before.jpg'}
              alt={beforeAfter.beforeLabel || "Before state"}
              className="absolute inset-0 object-cover w-full h-full"
            />
            <motion.div
              className="absolute inset-0 overflow-hidden" // Container for the "after" image
              initial={{ width: '100%' }} // Start fully covering
              whileInView={{ width: '50%' }}  // Animate to reveal 50%
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            >
              <img
                src={beforeAfter.afterImage || '/assets/placeholder-after.jpg'}
                alt={beforeAfter.afterLabel || "After state"}
                className="absolute inset-0 object-cover w-full h-full"
                style={{ clipPath: 'inset(0 0 0 0)' }} // Ensures the image within the animated div is fully visible
              />
            </motion.div>
             {/* Optional: Add a draggable handle here for interactive slider */}
          </div>
        </section>
      )}
    </div>
  );
};

CaseStudyPageComponent.propTypes = {
  caseStudyData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    heroImage: PropTypes.string,
    metrics: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        value: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
      })
    ),
    beforeAfter: PropTypes.shape({
      beforeImage: PropTypes.string,
      afterImage: PropTypes.string,
      beforeLabel: PropTypes.string,
      afterLabel: PropTypes.string,
    }),
    contentSections: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        title: PropTypes.string.isRequired,
        content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
        image: PropTypes.string,
        imagePosition: PropTypes.oneOf(['left', 'right']), // Or undefined for default flow
      })
    ),
  }),
};

CaseStudyPageComponent.defaultProps = {
  caseStudyData: null,
};

const CaseStudyPage = React.memo(CaseStudyPageComponent);

export default CaseStudyPage;
