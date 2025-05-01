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
      <div className="block md:hidden relative category-dropdown-container">
        <button
          ref={mobileFilterButtonRef}
          onClick={() => setIsFilterDropdownOpen((o) => !o)}
          className="w-full px-4 py-2 rounded-md bg-white text-midnight-blue shadow-md flex justify-between items-center"
          aria-haspopup="listbox"
          aria-expanded={isFilterDropdownOpen}
        >
          {activeCategory}
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isFilterDropdownOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-md rounded-md z-10" role="listbox">
            {categories.map((cat, idx) => (
              <button
                key={cat}
                ref={(el) => (categoryButtonRefs.current[idx] = el)}
                onClick={() => onCategoryChange(cat)}
                onKeyDown={(e) => handleCategoryKeyDown(e, idx)}
                className={`block w-full px-4 py-2 text-left font-medium transition-colors duration-300 ${
                  activeCategory === cat
                    ? 'bg-electric-blue text-soft-white'
                    : 'hover:bg-gray-100'
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
      <div className="hidden md:flex flex-wrap justify-center gap-3 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
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
    </>
  );
};

export default CategoryFilter;
