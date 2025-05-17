// src/components/Layout/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="py-8 mt-auto text-center bg-surface text-text-secondary">
      <div className="container mx-auto">
        <p>&copy; {new Date().getFullYear()} RocVille Media House. All rights reserved.</p>
        {/* Add more footer content here, like social links, navigation, etc. */}
      </div>
    </footer>
  );
};

export default Footer;