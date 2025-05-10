import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumb = ({ items }) => (
  <nav aria-label="breadcrumb">
    <ol className="flex space-x-space-md text-text-secondary">
      {items.map((item, index) => (
        <li key={index} className="flex items-center">
          {item.link ? (
            <Link
              to={item.link}
              className="text-brand-primary hover:text-brand-secondary"
            >
              {item.label}
            </Link>
          ) : (
            <span>{item.label}</span>
          )}
          {index < items.length - 1 && (
            <span className="mx-space-sm">/</span>
          )}
        </li>
      ))}
    </ol>
  </nav>
);

export default Breadcrumb;
