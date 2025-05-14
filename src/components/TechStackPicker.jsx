import React, { useState } from 'react';

const techOptions = ['React', 'Vue', 'Angular', 'Node.js', 'Python', 'Ruby'];

export function TechStackPicker({ onSelect }) {
  const [selectedTech, setSelectedTech] = useState('');

  const handleSelect = (tech) => {
    setSelectedTech(tech);
    onSelect(tech);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-md">
      <h2 className="text-lg font-bold mb-4">Select a Tech Stack</h2>
      <div className="grid grid-cols-2 gap-2">
        {techOptions.map((tech) => (
          <button
            className={`p-2 border rounded-md ${
              selectedTech === tech ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
            } hover:bg-blue-100`}
            key={tech}
            onClick={() => handleSelect(tech)}
          >
            {tech}
          </button>
        ))}
      </div>
    </div>
  );
}
