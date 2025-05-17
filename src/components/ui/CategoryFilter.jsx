import React, { useState, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

const CategoryFilter = ({ categories, onCategoryChange, isFetching }) => {
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All'); // Initialize activeCategory here
  const mobileFilterButtonRef = useRef(null);
  const categoryButtonRefs = useRef([]);

  const handleCategoryChange = useCallback(
    (category) => {
      setActiveCategory(category); // Update local activeCategory
      onCategoryChange(category); // Inform parent component of the change
      setIsFilterDropdownOpen(false); // Close dropdown on mobile
    },
    [onCategoryChange]
  );

  const handleCategoryKeyDown = useCallback(
    (e, index) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIndex = (index + 1) % categories.length;
        categoryButtonRefs.current[nextIndex]?.focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prevIndex = (index - 1 + categories.length) % categories.length;
        categoryButtonRefs.current[prevIndex]?.focus();
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleCategoryChange(categories[index]);
      }
    },
    [categories, handleCategoryChange]
  );

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isFilterDropdownOpen &&
        !e.target.closest('.category-dropdown-container')
      ) {
        setIsFilterDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isFilterDropdownOpen]);

  return (
    <div className="container px-4 mx-auto">
      {/* Mobile Dropdown */}
      <div className="relative block md:hidden category-dropdown-container" aria-live="polite">
        <button
          ref={mobileFilterButtonRef}
          onClick={() => setIsFilterDropdownOpen((prev) => !prev)}
          className="flex items-center justify-between w-full px-4 py-2 bg-white rounded-md shadow-md text-midnight-blue"
          aria-haspopup="listbox"
          aria-expanded={isFilterDropdownOpen}
        >
          {activeCategory} {/* Use local activeCategory */}
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isFilterDropdownOpen && (
          <div className="absolute left-0 right-0 z-10 bg-white rounded-md shadow-md top-full">
            {categories.map((cat, idx) => (
              <button
                key={cat}
                ref={(el) => (categoryButtonRefs.current[idx] = el)}
                onClick={() => handleCategoryChange(cat)} // Use local handler
                onKeyDown={(e) => handleCategoryKeyDown(e, idx)}
                className={`block w-full px-4 py-2 text-left font-medium transition-colors duration-300 ${
                  activeCategory === cat
                    ? 'bg-electric-blue text-soft-white'
                    : 'hover:bg-gray-100'
                }`}
                aria-selected={activeCategory === cat}
                role="option"
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Desktop Pills */}
      <div className="flex-wrap justify-center hidden gap-3 mb-8 md:flex">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)} // Use local handler
            className={`px-4 py-2 rounded-full font-medium transition-colors duration-300 ${
              activeCategory === cat
                ? 'bg-electric-blue text-soft-white shadow-md'
                : 'bg-white text-midnight-blue hover:bg-gray-100'
            }`}
            aria-pressed={activeCategory === cat}
            disabled={isFetching}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};

CategoryFilter.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  onCategoryChange: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
};

export default CategoryFilter;