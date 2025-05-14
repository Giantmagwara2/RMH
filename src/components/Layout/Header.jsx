// src/components/Layout/Header.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logoSrc from '../../assets/logo.webp'; // Assuming logo.webp is in src/assets/

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-neutral-surface dark:bg-neutral-surface-dark shadow-md">
      <nav className="container flex items-center justify-between px-4 py-3 mx-auto">
        <Link to="/" aria-label="Homepage">
          <img
            src={logoSrc}
            alt="RocVille Media House Logo"
            className="h-12 w-auto transition-opacity duration-300 ease-in-out hover:opacity-80"
          />
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/services" className="text-text-primary hover:text-brand-primary">Services</Link>
          <Link to="/portfolio" className="text-text-primary hover:text-brand-primary">Portfolio</Link>
          <Link to="/contact" className="text-text-primary hover:text-brand-primary">Contact</Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-text-primary hover:text-brand-primary"
          aria-label="Toggle navigation menu"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-neutral-surface dark:bg-neutral-surface-dark shadow-md">
            <div className="flex flex-col items-start px-4 py-3 space-y-2">
              <Link to="/services" className="text-text-primary hover:text-brand-primary">Services</Link>
              <Link to="/portfolio" className="text-text-primary hover:text-brand-primary">Portfolio</Link>
              <Link to="/contact" className="text-text-primary hover:text-brand-primary">Contact</Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;