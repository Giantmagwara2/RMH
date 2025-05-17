// /src/components/ui/FieldSet.jsx
import React from 'react';
import PropTypes from 'prop-types';

const FieldSet = ({
  legend,
  description,
  children,
  className,
  borderColor = 'border-neutrals-border',
  backgroundColor = 'bg-white',
  ...rest
}) => {
  return (
    <div className={`rounded-md border ${borderColor} ${backgroundColor} ${className}`} {...rest}>
      <fieldset className="p-4 space-y-2">
        {legend && (
          <legend className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {legend}
          </legend>
        )}
        {description && (
          <p
            className="mt-1 text-sm text-gray-500 dark:text-gray-400"
            // If this paragraph describes the fieldset, the fieldset should have aria-describedby pointing to an id on this p.
            // For now, removing as its current usage is not standard for a p tag.
          >
            {description}
          </p>
      )}
      {children}
    </fieldset>
    </div>
  );
};

FieldSet.propTypes = {
  legend: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  borderColor: PropTypes.string,
  backgroundColor: PropTypes.string,
};

export default FieldSet;
