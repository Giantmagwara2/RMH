import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom'; // Assuming you're using React Router

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Services', to: '/services' },
  { label: 'Contact', to: '/contact' },
];

const Navbar = ({ logo, className = '' }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      className={`bg-neutrals-surface shadow-navbar fixed w-full z-50 ${className}`}
      role="navigation"
    >
      <div className="container flex items-center justify-between mx-auto py-space-sm px-space-md">
        <div className="flex items-center">
          {logo && <div className="mr-space-lg">{logo}</div>}
          <div className="hidden md:flex space-x-space-lg">
            {navItems.map(item => (
              <RouterLink
                key={item.to}
                to={item.to}
                className="transition-colors text-text-primary hover:text-brand-primary duration-default"
              >
                {item.label}
              </RouterLink>
            ))}
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-space-sm"
          aria-label="Toggle menu"
          onClick={() => setMobileOpen(o => !o)}
        >
          <svg
            className="w-6 h-6 text-text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={mobileOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="absolute left-0 right-0 shadow-md md:hidden top-full bg-neutrals-surface">
            <div className="px-space-md py-space-sm space-y-space-sm">
              {navItems.map(item => (
                <RouterLink
                  key={item.to}
                  to={item.to}
                  className="block transition-colors text-text-primary hover:bg-neutrals-border"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </RouterLink>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
