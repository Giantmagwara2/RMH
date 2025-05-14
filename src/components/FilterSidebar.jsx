import React, { useState, useContext, createContext } from 'react';

// Create a context for managing filter state
const FilterContext = createContext();

export function FilterProvider({ children }) {
  const [filters, setFilters] = useState({});

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <FilterContext.Provider value={{ filters, updateFilter }}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  return useContext(FilterContext);
}

export function FilterSidebar() {
  const { updateFilter } = useFilter();

  return (
    <aside className="p-4 bg-gray-100 w-64">
      <h2 className="text-lg font-bold mb-4">Filters</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Category</label>
        <select
          onChange={(e) => updateFilter('category', e.target.value)}
          className="w-full p-2 border rounded-md"
        >
          <option value="">All</option>
          <option value="design">Design</option>
          <option value="development">Development</option>
          <option value="marketing">Marketing</option>
        </select>
      </div>
      {/* Add more filters as needed */}
    </aside>
  );
}
