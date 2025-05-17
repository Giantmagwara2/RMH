import React, { useState, useContext, createContext } from 'react';
import PropTypes from 'prop-types';

// Create a context for managing filter state
const FilterContext = createContext();

const DEFAULT_INITIAL_FILTERS = {
  category: '',
  searchTerm: '',
  // Add other default filter keys here
};

export function FilterProvider({ children, initialFilters = {} }) {
  const [filters, setFilters] = useState({ ...DEFAULT_INITIAL_FILTERS, ...initialFilters });

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({ ...DEFAULT_INITIAL_FILTERS, ...initialFilters }); // Reset to initial or default
  };

  const clearAllFilters = () => {
    setFilters(DEFAULT_INITIAL_FILTERS); // Reset to absolute defaults
  };

  return (
    <FilterContext.Provider value={{ filters, updateFilter, clearFilters, clearAllFilters }}>
      {children}
    </FilterContext.Provider>
  );
}

FilterProvider.propTypes = {
  children: PropTypes.node.isRequired,
  initialFilters: PropTypes.object,
};

export function useFilter() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
}

export function FilterSidebar() {
  const { filters, updateFilter, clearAllFilters } = useFilter();

  return (
    <aside className="w-64 p-4 bg-gray-100">
      <h2 className="mb-4 text-lg font-bold">Filters</h2>
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">Category</label>
        <select
          onChange={(e) => updateFilter('category', e.target.value)}
          value={filters.category || ''}
          className="w-full p-2 border rounded-md"
        >
          <option value="">All</option>
          <option value="design">Design</option>
          <option value="development">Development</option>
          <option value="marketing">Marketing</option>
          {/* Add more categories as needed */}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="searchTerm" className="block mb-1 text-sm font-medium">Search Term</label>
        <input
          type="text"
          id="searchTerm"
          placeholder="e.g., React, Logo"
          value={filters.searchTerm}
          onChange={(e) => updateFilter('searchTerm', e.target.value)}
          className="w-full p-2 border rounded-md"
        />
      </div>
      {/* Add more filter sections here */}
      <button
        onClick={clearAllFilters}
        className="w-full px-4 py-2 mt-4 text-sm text-white bg-red-500 rounded-md hover:bg-red-600"
      >
        Clear All Filters
      </button>
    </aside>
  );
}
