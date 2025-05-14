import React from 'react';

const CategoryFilter = ({
  categories,
  activeCategory,
  onCategoryChange,
  isFilterDropdownOpen,
  setIsFilterDropdownOpen,
  isFetching,
  categoryButtonRefs,
  mobileFilterButtonRef,
  handleCategoryKeyDown,
}) => {
  return (
    <>
      {/* Mobile Dropdown */}
      <div className="relative block md:hidden category-dropdown-container">
        <button
          ref={mobileFilterButtonRef}
          onClick={() => setIsFilterDropdownOpen((o) => !o)}
          className="flex items-center justify-between w-full px-4 py-2 transition-colors duration-300 bg-white rounded-md shadow-md text-midnight-blue hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          aria-haspopup="listbox"
          aria-expanded={isFilterDropdownOpen}
        >
          {activeCategory}
          <svg
            className="w-5 h-5"
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

        {isFilterDropdownOpen && (
          <div
            className="absolute left-0 right-0 z-10 bg-white rounded-md shadow-md top-full dark:bg-gray-800"
            role="listbox"
          >
            {categories.map((cat, idx) => (
              <button
                key={cat}
                ref={(el) => (categoryButtonRefs.current[idx] = el)}
                onClick={() => onCategoryChange(cat)}
                onKeyDown={(e) => handleCategoryKeyDown(e, idx)}
                className={`block w-full px-4 py-2 text-left font-medium transition-colors duration-300 ${
                  activeCategory === cat
                    ? 'bg-electric-blue text-soft-white'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300'
                }`}
                role="option"
                aria-selected={activeCategory === cat}
                disabled={isFetching}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Desktop Buttons */}
      <div className="flex-wrap justify-center hidden gap-3 mb-8 md:flex">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`px-4 py-2 rounded-full font-medium transition-colors duration-300 ${
              activeCategory === cat
                ? 'bg-electric-blue text-soft-white shadow-md'
                : 'bg-white text-midnight-blue hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
            aria-pressed={activeCategory === cat}
            disabled={isFetching}
          >
            {cat}
          </button>
        ))}
      </div>
    </>
  );
};

export default CategoryFilter;
