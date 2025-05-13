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
  ...props
}) => {
  // Base classes for the section, including responsive vertical padding.
  // The original `mb-section` is replaced by self-contained padding.
  // If a bottom margin is still needed for inter-section spacing,
  // it can be added via the `className` prop (e.g., className="mb-16").
  const sectionBaseClasses = 'py-12 md:py-16 lg:py-20';
  const sectionComputedClassName = `${sectionBaseClasses} ${className}`.trim();

  const TitleComponent = titleAs;
  const titleId = title && id ? `${id}-title` : undefined;

  const content = (
    <>
      {(title || subtitle) && (
        <div className="mb-8 md:mb-12 text-center">
          {title && (
            <TitleComponent
              id={titleId}
              className="text-3xl md:text-4xl font-heading font-bold text-neutral-textPrimary dark:text-neutral-100 mb-3 md:mb-4"
            >
              {title}
            </TitleComponent>
          )}
          {subtitle && (
            <p className="text-lg md:text-xl text-neutral-textSecondary dark:text-neutral-300 max-w-2xl lg:max-w-3xl mx-auto">
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
};

export default Section;