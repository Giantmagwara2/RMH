// /src/components/ui/Card.jsx
import React from 'react';
import Button from './Button'; // Import the Button component

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
          <h3 className="text-lg font-semibold text-neutrals-primary dark:text-neutrals-light mb-space-sm">
            {title}
          </h3>
        )}
        {content && (
          <p className="text-sm text-neutrals-secondary dark:text-neutrals-light/80 leading-relaxed">
            {content}
          </p>
        )}
        {actions && (
          <div className="mt-space-md flex justify-end space-x-space-sm">
            {actions.map((action, index) => (
              <Button key={index} {...action} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;