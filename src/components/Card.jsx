import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

export function Card({ image, title, excerpt, link, className = '', altText = 'Card image' }) {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className={`p-4 border rounded-md shadow-sm transition-shadow ${className}`.trim()}
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.05, boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)' }}
    >
      {image && (
        <img
          alt={title || 'Card image'}
          className="object-cover w-full h-48 rounded-t-md" // Assuming a desired height
          loading="lazy"
          src={image}
        />
      )}
      <div className="p-4">
        <h3 className="mb-2 text-lg font-bold">{title}</h3>
        <p className="mb-4 text-sm text-gray-500">{excerpt}</p>
        {link && typeof link === 'string' && (
          <a
            className="text-sm font-medium text-blue-500 hover:underline"
            href={link}
          >
            Read More
          </a>
        )}
      </div>
    </motion.div>
  );
}

Card.propTypes = {
  excerpt: PropTypes.string,
  image: PropTypes.string,
  link: PropTypes.string,
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  altText: PropTypes.string,
};
