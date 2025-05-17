// src/components/Header/Header.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PATHS } from '../../constants/paths';
import logo from '../../assets/logo.webp';
import { useDarkMode } from '../../hooks/useDarkMode';

const navLinks = [
  { to: PATHS.HOME, label: 'Home' },
  { to: PATHS.SERVICES, label: 'Services' },
  { to: PATHS.PORTFOLIO, label: 'Portfolio' },
  { to: PATHS.ABOUT, label: 'About' },
  { to: PATHS.CONTACT, label: 'Contact' },
  { to: PATHS.BLOG, label: 'Blog' },
];

// Icon Components
const SunIcon = () => (
  <svg className="w-5 h-5 text-neutral-700 dark:text-neutral-300" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
  </svg>
);

const MoonIcon = () => (
  <svg className="w-5 h-5 text-neutral-700 dark:text-neutral-300" fill="currentColor" viewBox="0 0 20 20">
    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
  </svg>
);

const MenuIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const Header = () => {
  const [darkMode, setDarkMode] = useDarkMode();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 transition-colors duration-300 bg-neutral-surface dark:bg-neutral-800 shadow-navbar">
      <nav className="container flex items-center justify-between py-4 mx-auto">
        {/* Logo */}
        <Link to={PATHS.HOME} className="flex items-center" aria-label="RocVille Media House Homepage">
          <img src={logo} alt="RocVille Media House" className="w-auto h-10 mr-2" />
          <span className="text-2xl font-bold text-brand-primary dark:text-brand-primary-dark">
            RocVille
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="items-center hidden space-x-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 
                ${location.pathname === link.to 
                  ? 'text-brand-primary dark:text-brand-accent bg-neutral-100 dark:bg-neutral-700' 
                  : 'text-neutral-textSecondary dark:text-neutral-300 hover:text-brand-primary dark:hover:text-brand-accent hover:bg-neutral-100 dark:hover:bg-neutral-700'
                }`}
              aria-current={location.pathname === link.to ? 'page' : undefined}
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 ml-2 transition-colors rounded-lg bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 focus:outline-none focus:ring-2 focus:ring-brand-primary"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-3 md:hidden">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 transition-colors rounded-lg bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 focus:outline-none focus:ring-2 focus:ring-brand-primary"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <SunIcon /> : <MoonIcon />}
          </button>
          <button
            onClick={toggleMobileMenu}
            className="p-2 rounded-lg text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-primary"
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="absolute left-0 right-0 z-30 py-2 shadow-lg md:hidden top-full bg-neutral-surface dark:bg-neutral-800 ring-1 ring-black ring-opacity-5">
          <div className="container flex flex-col px-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={`mobile-${link.label}`}
                to={link.to}
                className={`block px-3 py-2 text-base font-medium rounded-md transition-colors duration-200
                  ${location.pathname === link.to 
                    ? 'text-brand-primary dark:text-brand-accent bg-neutral-100 dark:bg-neutral-700' 
                    : 'text-neutral-textPrimary dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 hover:text-brand-primary dark:hover:text-brand-accent'
                  }`}
                aria-current={location.pathname === link.to ? 'page' : undefined}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;