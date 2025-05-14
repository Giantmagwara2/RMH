import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumb = ({ items, separator = '/' }) => (
  <nav aria-label="breadcrumb">
    <ol className="flex space-x-space-md text-text-secondary">
      {items.map((item, index) => (
        <li key={index} className="flex items-center">
          {item.link ? (
            <Link
              to={item.link}
              className="text-brand-primary hover:text-brand-secondary"
              aria-current={index === items.length - 1 ? 'page' : undefined}
            >
              {item.label}
            </Link>
          ) : (
            <span aria-current="page">{item.label}</span>
          )}
          {index < items.length - 1 && (
            <span className="mx-space-sm" aria-hidden="true">{separator}</span>
          )}
        </li>
      ))}
    </ol>
  </nav>
);

export default Breadcrumb;
