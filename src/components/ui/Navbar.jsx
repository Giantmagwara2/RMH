import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Menu, X } from 'lucide-react'; // Using lucide-react for icons

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Services', to: '/services' },
  { label: 'Contact', to: '/contact' },
];

const Navbar = ({ logo, className = '', activePath }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileMenuId = 'mobile-menu';

  return (
    <nav
      className={`bg-neutrals-surface shadow-navbar fixed w-full z-50 ${className}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container flex items-center justify-between mx-auto py-space-sm px-space-md">
        <div className="flex items-center">
          {logo && <div className="mr-space-lg">{logo}</div>}
          <ul
            id={mobileMenuId}
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
                  `.trim()}
                  aria-current={activePath === item.to ? 'page' : undefined}
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
          aria-expanded={mobileOpen}
          aria-controls={mobileMenuId}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  logo: PropTypes.node,
  className: PropTypes.string,
  activePath: PropTypes.string,
};

Navbar.defaultProps = {
  className: '',
  activePath: '',
};

Navbar.displayName = 'Navbar';

export default Navbar;
