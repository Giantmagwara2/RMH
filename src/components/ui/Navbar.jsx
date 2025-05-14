import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Services', to: '/services' },
  { label: 'Contact', to: '/contact' },
];

const Navbar = ({ logo, className = '', activePath }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      className={`bg-neutrals-surface shadow-navbar fixed w-full z-50 ${className}`}
      role="navigation"
    >
      <div className="container flex items-center justify-between mx-auto py-space-sm px-space-md">
        <div className="flex items-center">
          {logo && <div className="mr-space-lg">{logo}</div>}
          <ul
            className={`
              ${mobileOpen ? 'block' : 'hidden'}
              md:flex md:items-center md:space-x-space-md
              text-sm font-medium text-neutrals-primary dark:text-neutrals-light
              transition-all duration-300 ease-in-out
            `}
          >
            {navItems.map((item) => (
              <li key={item.to}>
                <RouterLink
                  to={item.to}
                  className={`
                    px-space-sm py-space-xs rounded-md
                    hover:bg-brand-primary hover:text-soft-white
                    focus:outline-none focus:ring-2 focus:ring-brand-primary
                    ${activePath === item.to ? 'bg-brand-primary text-soft-white' : ''}
                  `}
                >
                  {item.label}
                </RouterLink>
              </li>
            ))}
          </ul>
        </div>
        <button
          className="md:hidden text-neutrals-primary dark:text-neutrals-light focus:outline-none focus:ring-2 focus:ring-brand-primary"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
        >
          <span className="material-icons">menu</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
