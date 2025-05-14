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
  const baseClasses = 'bg-neutrals-surface rounded-md shadow-card overflow-hidden';
  const combinedClasses = `${baseClasses} ${className}`;

  return (
    <div className={combinedClasses} {...props} aria-label={title || 'Card'}>
      {title && (
        <div className="border-b p-space-md border-neutrals-border">
          <h3 className="font-semibold text-text-primary">{title}</h3>
        </div>
      )}
      {image && (
        <div className="relative">
          <img src={image} alt={altText} className="object-cover w-full h-auto" />
        </div>
      )}
      {content && (
        <div className="p-space-md text-text-secondary">
          {typeof content === 'string' ? <p>{content}</p> : content}
        </div>
      )}
      {actions && (
        <div className="flex justify-end gap-2 border-t p-space-md border-neutrals-border">
          {actions}
        </div>
      )}
    </div>
  );
};

export default Card;