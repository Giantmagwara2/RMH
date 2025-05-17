// src/components/Section/Section.jsx
import React from 'react';
import PropTypes from 'prop-types';

const Section = ({
  children,
  className = '',
  containerClassName = '',
  id,
  title,
  visuallyHiddenTitle,
  ariaLabel,
  justifyContent,
  subtitle,
  titleAs = 'h2',
  fullWidth = false,
  background = '', // New prop for background color or gradient
  ...props
}) => {
  // Base classes for the section, including responsive vertical padding.
  const sectionBaseClasses = 'py-12 md:py-16 lg:py-20';
  const sectionComputedClassName = `${sectionBaseClasses} ${background} ${className}`.trim();

  const TitleComponent = titleAs;
  const titleId = title && id ? `${id}-title` : undefined;

  const content = (
    <> {/* Use React Fragment shorthand */}
      {(title || subtitle) && (
        <div className="mb-8 text-center md:mb-12">
          {visuallyHiddenTitle && (
            <h2 className="sr-only">{visuallyHiddenTitle}</h2>
          )}
          {title && (
            <TitleComponent
              id={titleId} // id to be referenced by aria-labelledby
              className="mb-3 text-3xl font-bold md:text-4xl font-heading text-midnight-blue dark:text-soft-white md:mb-4"
            >
              {title}
            </TitleComponent>
          )}
          {subtitle && (
            <p className="max-w-2xl mx-auto text-lg text-gray-700 md:text-xl dark:text-gray-300 lg:max-w-3xl">
              {subtitle}
            </p>
          )}
        </div>
      )}
      {children} {/* Everything between the <Section> tags */}
    </>
  );

  return (
    <section
      id={id}
      className={sectionComputedClassName}
      aria-labelledby={titleId}
      aria-label={ariaLabel} // Descriptive label for the section
      {...props}
    >
      {fullWidth ? (
        content
      ) : (
        <div className={`container mx-auto px-4 ${containerClassName} ${justifyContent}`.trim()}>
          {content}
        </div>
      )}
    </section>
  );
};

Section.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  containerClassName: PropTypes.string,
  // Unique identifier for the section
  id: PropTypes.string,
  // Descriptive heading for the section
  title: PropTypes.string,
  // Title to be read by screen readers
  visuallyHiddenTitle: PropTypes.string,
  // String to be read by screen readers
  ariaLabel: PropTypes.string,
  // Modifies the justification of the container
  justifyContent: PropTypes.string,
  // Descriptive subheading for the section
  subtitle: PropTypes.string,
  titleAs: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
  fullWidth: PropTypes.bool,
};

export default Section;