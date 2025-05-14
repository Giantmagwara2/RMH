// src/components/Section/Section.jsx
import React from 'react';
import PropTypes from 'prop-types';

const Section = ({
  children,
  className = '',
  containerClassName = '',
  id,
  title,
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
    <>
      {(title || subtitle) && (
        <div className="mb-8 text-center md:mb-12">
          {title && (
            <TitleComponent
              id={titleId}
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
      {children}
    </>
  );

  return (
    <section
      id={id}
      className={sectionComputedClassName}
      aria-labelledby={titleId}
      {...props}
    >
      {fullWidth ? (
        content
      ) : (
        <div className={`container mx-auto px-4 ${containerClassName}`.trim()}>
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
  id: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  titleAs: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
  fullWidth: PropTypes.bool,
  background: PropTypes.string, // New prop for background color or gradient
};

export default Section;