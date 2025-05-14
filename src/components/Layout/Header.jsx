// src/components/Layout/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import logoSrc from '../../assets/logo.webp'; // Assuming logo.webp is in src/assets/

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-neutral-surface dark:bg-neutral-surface-dark shadow-md">
      <nav className="container flex items-center justify-between px-4 py-3 mx-auto">
        <Link to="/" aria-label="Homepage">
          <img
            src={logoSrc}
            alt="RocVille Media House Logo"
            // Adjust h-10 (height: 2.5rem / 40px) or h-12 (3rem / 48px) as needed for optimal size.
            // w-auto maintains aspect ratio.
            className="h-10 w-auto transition-opacity duration-300 ease-in-out hover:opacity-80"
          />
        </Link>

        {/* Placeholder for your navigation links */}
        <div className="flex items-center space-x-4">
          {/* Example:
          <Link to="/services" className="text-neutral-textSecondary dark:text-neutral-textSecondary-dark hover:text-brand-primary dark:hover:text-brand-primary-dark">
            Services
          </Link>
          <Link to="/about" className="text-neutral-textSecondary dark:text-neutral-textSecondary-dark hover:text-brand-primary dark:hover:text-brand-primary-dark">
            About Us
          </Link>
          */}
        </div>
      </nav>
    </header>
  );
};

export default Header;