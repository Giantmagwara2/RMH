import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

const Breadcrumb = ({ items, separator = '›', className = '' }) => {
  const location = useLocation();

  const renderItems = () => {
    if (!items || items.length === 0) {
      return null;
    }

    return items.map((item, index) => {
      const isCurrent = item.link === location.pathname || index === items.length - 1;
      return (
        <li key={index} className="inline-block">
          {item.link ? (
            <Link
              to={item.link}
              className={`text-blue-500 hover:text-blue-700 ${isCurrent ? 'font-bold' : ''}`}
              aria-current={isCurrent ? 'page' : undefined}
            >
              {item.label}
            </Link>
          ) : (
            <span className="font-bold" aria-current="page">{item.label}</span>
          )}
          {!isCurrent && index < items.length - 1 && (
            <span className="mx-2 text-gray-400">{separator}</span>
          )}
        </li>
      );
    });
  };

  return (
    <nav aria-label="Breadcrumb" className={`text-sm text-gray-500 ${className}`}>
      <ol>
        {renderItems()}
      </ol>
    </nav>
  );
};

Breadcrumb.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      link: PropTypes.string, // Optional link
    })
  ),
  separator: PropTypes.string,
  className: PropTypes.string,
};

Breadcrumb.defaultProps = {
  separator: '›',
};

export default Breadcrumb;
