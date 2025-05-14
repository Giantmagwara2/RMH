// src/components/Footer/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="py-4 text-center bg-gray-100 dark:bg-gray-800">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        © {new Date().getFullYear()} RocVille Media House. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;