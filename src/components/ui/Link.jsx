import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

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

export default Link;
