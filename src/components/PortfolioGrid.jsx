import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useFilter } from './FilterSidebar';
import Card from './ui/Card'; // Updated import to use the default export

export function PortfolioGrid({ items }) {
  // Access filter state from the context
  const { filters } = useFilter();

  const filteredData = useMemo(() => {
    if (!items) return [];
    return items.filter((item) => {
      const categoryMatch = !filters.category || item.category === filters.category;
      const searchTermMatch = !filters.searchTerm ||
        item.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        (item.excerpt && item.excerpt.toLowerCase().includes(filters.searchTerm.toLowerCase()));

      return categoryMatch && searchTermMatch;
    });
  }, [items, filters]);

  if (!items || items.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        <p>No portfolio items available at the moment.</p>
      </div>
    );
  }

  if (filteredData.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        <p>No projects match your current filters. Try adjusting your search or category.</p>
      </div>
    );
  }

  return (
    <div
      className="grid gap-6 p-4"
      style={{
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))', // Ensures cards don't overflow on very small screens
      }}
    >
      {filteredData.map((item) => (
        <Card
          key={item.id} // Key should be on the outermost element in the map
          excerpt={item.excerpt}
          image={item.image}
          link={item.link}
          title={item.title}
          altText={item.title} // Use project title as alt text
        />
      ))}
    </div>
  );
}

PortfolioGrid.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    excerpt: PropTypes.string,
    image: PropTypes.string,
    link: PropTypes.string,
  })),
};

PortfolioGrid.defaultProps = {
  items: [], // Default to an empty array if no items are provided
  // Consider adding default filters here if applicable
};
