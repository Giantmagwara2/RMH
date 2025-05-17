import React from 'react';
import PropTypes from 'prop-types';

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
  const LoadingSpinner = () => (
    <svg
      className="inline w-4 h-4 ml-2 text-white animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12" cy="12" r="10"
        stroke="currentColor" strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );

  return (
    <>
      {/* Mobile Dropdown */}
      <div className="relative block md:hidden category-dropdown-container">
        <button
          ref={mobileFilterButtonRef}
          onClick={() => setIsFilterDropdownOpen((o) => !o)}
          className="flex items-center justify-between w-full px-4 py-2 transition-colors duration-300 bg-white rounded-md shadow-md text-midnight-blue hover:bg-gray-100 dark:bg-zinc-800 dark:text-gray-300 dark:hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-electric-blue dark:focus:ring-highlight-yellow"
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
            className="absolute left-0 right-0 z-20 mt-1 overflow-hidden bg-white rounded-md shadow-lg top-full dark:bg-zinc-800 ring-1 ring-black ring-opacity-5"
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
                    ? 'bg-electric-blue text-soft-white dark:bg-highlight-yellow dark:text-rich-black'
                    : 'hover:bg-gray-100 dark:hover:bg-zinc-700 text-midnight-blue dark:text-gray-300'
                }`}
                role="option"
                aria-selected={activeCategory === cat}
                disabled={isFetching}
              >
                {cat}
                {isFetching && activeCategory === cat && <LoadingSpinner />}
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
                ? 'bg-electric-blue text-soft-white shadow-md focus:ring-electric-blue dark:bg-highlight-yellow dark:text-rich-black dark:focus:ring-highlight-yellow'
                : 'bg-white text-midnight-blue hover:bg-gray-100 dark:bg-zinc-800 dark:text-gray-300 dark:hover:bg-zinc-700 focus:ring-electric-blue dark:focus:ring-highlight-yellow'
            }`}
            aria-pressed={activeCategory === cat}
            disabled={isFetching}
          >
            {cat}
            {isFetching && activeCategory === cat && <LoadingSpinner />}
          </button>
        ))}
      </div>
    </>
  );
};

CategoryFilter.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeCategory: PropTypes.string.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
  isFilterDropdownOpen: PropTypes.bool.isRequired,
  setIsFilterDropdownOpen: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  categoryButtonRefs: PropTypes.shape({
    current: PropTypes.arrayOf(PropTypes.instanceOf(Element)),
  }).isRequired,
  mobileFilterButtonRef: PropTypes.shape({
    current: PropTypes.instanceOf(Element),
  }).isRequired,
  handleCategoryKeyDown: PropTypes.func.isRequired,
};

export default CategoryFilter;
