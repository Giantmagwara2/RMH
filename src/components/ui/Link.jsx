import React from 'react';
import { Link as RouterLink } from 'react-router-dom'; // Assuming React Router

const Link = ({ to, children, className = '', ...props }) => (
  <RouterLink
    to={to}
    className={`text-brand-primary hover:text-brand-secondary focus:outline-none focus:ring focus:ring-brand-primary transition-colors duration-default ${className}`}
    {...props}
  >
    {children}
  </RouterLink>
);

export default Link;
