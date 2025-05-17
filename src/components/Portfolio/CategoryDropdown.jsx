// src/components/Portfolio/CategoryDropdown.jsx
import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const CategoryDropdown = ({ categories, selectedCategory, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const menuRef = useRef(null);
  const itemRefs = useRef([]);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  // Close dropdown on outside click or ESC
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const handleKeyDown = (event) => {
    if (!isOpen) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setFocusedIndex((prev) => {
        const nextIndex = prev + 1 < categories.length ? prev + 1 : 0;
        itemRefs.current[nextIndex]?.focus();
        return nextIndex;
      });
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setFocusedIndex((prev) => {
        const nextIndex = prev - 1 >= 0 ? prev - 1 : categories.length - 1;
        itemRefs.current[nextIndex]?.focus();
        return nextIndex;
      });
    }

    if (event.key === 'Enter' && focusedIndex >= 0) {
      onSelect(categories[focusedIndex]);
      setIsOpen(false);
    }

    if (event.key === 'Escape') {
      setIsOpen(false);
      setFocusedIndex(-1);
    }
  };

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      {/* Dropdown Button */}
      <button
        className="inline-flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-electric-blue dark:bg-zinc-800 dark:text-gray-300 dark:border-zinc-600 dark:hover:bg-zinc-700 dark:focus:ring-offset-zinc-900 dark:focus:ring-highlight-yellow"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label="Select project category"
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
      >
        {selectedCategory}
        <svg
          className={`w-5 h-5 transform transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute right-0 z-20 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-zinc-800 dark:ring-zinc-700"
          role="menu"
          aria-orientation="vertical"
          tabIndex={-1}
        >
          {categories.map((category, idx) => (
            <button
              key={category}
              ref={(el) => (itemRefs.current[idx] = el)}
              role="menuitem"
              tabIndex={0}
              onClick={() => {
                onSelect(category);
                setIsOpen(false);
              }}
              onKeyDown={handleKeyDown}
              className={`w-full text-left px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                selectedCategory === category
                  ? 'bg-electric-blue text-soft-white dark:bg-highlight-yellow dark:text-rich-black'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-zinc-700 dark:hover:text-white'
              }`}
              aria-selected={selectedCategory === category}
            >
              {category}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

CategoryDropdown.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedCategory: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default CategoryDropdown;
