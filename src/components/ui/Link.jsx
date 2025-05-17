import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const Link = ({ to, children, className = '', isActive = false, ...props }) => (
  <RouterLink
    to={to}
    className={`
      text-brand-primary hover:text-brand-secondary focus:outline-none focus:ring focus:ring-brand-primary
      transition-colors duration-default ${className} ${isActive ? 'font-bold underline' : ''}
    `}
    aria-current={isActive ? 'page' : undefined}
    {...props}
  >
    {children}
  </RouterLink>
);

Link.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  isActive: PropTypes.bool,
};

Link.displayName = 'Link'; // For better debugging in React DevTools

export default Link;
