import React, { useState, useContext, createContext, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';

// Create a context for managing the MegaMenu state
const MegaMenuContext = createContext();

export function MegaMenuProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  // Close menu on Escape key press
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        closeMenu();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <MegaMenuContext.Provider value={{ isOpen, toggleMenu, closeMenu, menuRef, buttonRef }}>
      {children}
    </MegaMenuContext.Provider>
  );
}

MegaMenuProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useMegaMenu() {
  const context = useContext(MegaMenuContext);
  if (context === undefined) {
    throw new Error('useMegaMenu must be used within a MegaMenuProvider');
  }
  return context;
}

export function MegaMenu() {
  const { isOpen, toggleMenu, menuRef, buttonRef } = useMegaMenu();
  const menuId = "mega-menu-content"; // Static ID for simplicity

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={toggleMenu}
        aria-expanded={isOpen}
        aria-controls={menuId}
      >
        Menu
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={menuId}
            ref={menuRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-md z-50" // Adjusted mt and w
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="mega-menu-button" // Static ID for the button
          >
            <ul className="p-2 space-y-1">
              {[
                { label: 'Web Design', href: '/services/web-design' },
                { label: 'Branding', href: '/services/branding' },
                { label: 'Digital Marketing', href: '/services/digital-marketing' },
                { label: 'Portfolio', href: '/portfolio' },
              ].map((item) => (
                <li key={item.label} role="none">
                  <a
                    href={item.href}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" // Adjusted padding
                    role="menuitem"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              {/* You can add more complex submenus or sections within the MegaMenu here */}
            </ul>
            {/* Additional content or sections can be added here */}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
