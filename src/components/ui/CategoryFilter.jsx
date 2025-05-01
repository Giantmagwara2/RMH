import React, { useState, useRef, useEffect, useCallback } from 'react';

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
      switch (e.key) {
        case 'ArrowDown':
          categoryButtonRefs.current[index + 1]?.focus();
          break;
        case 'ArrowUp':
          if (index > 0) {
            categoryButtonRefs.current[index - 1]?.focus();
          } else {
            mobileFilterButtonRef.current?.focus();
          }
          break;
        case 'Enter':
          handleCategoryChange(categories[index]); // Use local handler
          break;
        case 'Escape':
          setIsFilterDropdownOpen(false);
          mobileFilterButtonRef.current?.focus();
          break;
        default:
          break;
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
    <div className="container mx-auto px-4">
      {/* Mobile Dropdown */}
      <div className="block md:hidden relative category-dropdown-container">
        <button
          ref={mobileFilterButtonRef}
          onClick={() => setIsFilterDropdownOpen((prev) => !prev)}
          className="w-full px-4 py-2 rounded-md bg-white text-midnight-blue shadow-md flex justify-between items-center"
          aria-haspopup="listbox"
          aria-expanded={isFilterDropdownOpen}
        >
          {activeCategory} {/* Use local activeCategory */}
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isFilterDropdownOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-md rounded-md z-10">
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
      <div className="hidden md:flex flex-wrap justify-center gap-3 mb-8">
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

export default CategoryFilter;