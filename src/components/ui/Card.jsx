// /src/components/ui/Card.jsx
import React from 'react';
import Button from './Button'; // Import the Button component
import PropTypes from 'prop-types';

const Card = ({
  title,
  content,
  image,
  actions,
  className = '',
  altText = 'Card image', // For image accessibility
  ...props
}) => {
  const baseClasses = 'bg-neutrals-surface rounded-md shadow-card overflow-hidden transition-transform duration-300 hover:shadow-lg hover:scale-105';
  const combinedClasses = `${baseClasses} ${className}`;

  return (
    <div className={combinedClasses} {...props} aria-label={title || 'Card'}>
      {image && (
        <img src={image} alt={altText} className="w-full h-auto" />
      )}
      <div className="p-space-md">
        {title && (
          <h3 className="text-lg font-semibold mb-space-sm text-neutrals-primary dark:text-neutrals-light">
            {title}
          </h3>
        )}
        {content && (
          <p className="text-sm leading-relaxed text-neutrals-secondary dark:text-neutrals-light/80">
            {content}
          </p>
        )}
        {actions && (
          <div className="flex justify-end mt-space-md space-x-space-sm">
            {actions.map((action, index) => (
              <Button key={index} {...action} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}; // Added a comment here

Card.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  image: PropTypes.string,
  actions: PropTypes.arrayOf(PropTypes.object),
  className: PropTypes.string,
  altText: PropTypes.string,
}; // Prop types added here


export default Card;
