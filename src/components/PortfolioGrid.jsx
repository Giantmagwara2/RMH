import React from 'react';
import { useFilter } from './FilterSidebar';
import { Card } from './Card';

const mockData = [
  { id: 1, title: 'Project A', category: 'design', excerpt: 'A design project.', image: '/assets/project-a.jpg', link: '#' },
  { id: 2, title: 'Project B', category: 'development', excerpt: 'A development project.', image: '/assets/project-b.jpg', link: '#' },
  { id: 3, title: 'Project C', category: 'marketing', excerpt: 'A marketing project.', image: '/assets/project-c.jpg', link: '#' },
  { id: 4, title: 'Project D', category: 'design', excerpt: 'Another design project.', image: '/assets/project-d.jpg', link: '#' },
];

export function PortfolioGrid() {
  const { filters } = useFilter();

  const filteredData = mockData.filter((item) => {
    if (filters.category && item.category !== filters.category) {
      return false;
    }
    return true;
  });

  return (
    <div
      className="grid gap-6 p-4"
      style={{
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      }}
    >
      {filteredData.map((item) => (
        <Card
          excerpt={item.excerpt}
          image={item.image}
          key={item.id}
          link={item.link}
          title={item.title}
        />
      ))}
    </div>
  );
}
