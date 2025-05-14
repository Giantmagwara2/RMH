import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

export function Card({ image, title, excerpt, link }) {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="p-4 border rounded-md shadow-sm transition-shadow"
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.05, boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)' }}
    >
      {image && (
        <img
          alt={title || 'Card image'}
          className="w-full h-48 object-cover rounded-t-md"
          loading="lazy"
          src={image}
        />
      )}
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-sm text-gray-500 mb-4">{excerpt}</p>
        {link && typeof link === 'string' && (
          <a
            className="text-blue-500 hover:underline text-sm font-medium"
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
  title: PropTypes.string.isRequired,
};
