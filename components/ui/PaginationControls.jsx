// /src/components/ui/PaginationControls.jsx
import React from 'react';

const PaginationControls = ({ page, totalPages, onPageChange, isFetching }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center gap-4 mb-8">
      <button
        onClick={() => onPageChange(Math.max(page - 1, 1))}
        disabled={page === 1 || isFetching}
        className="px-4 py-2 bg-electric-blue text-soft-white rounded disabled:opacity-50 hover:bg-blue-700 transition-colors duration-300"
      >
        Previous
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
        <button
          key={num}
          onClick={() => onPageChange(num)}
          className={`px-3 py-1 rounded-md font-semibold transition-colors duration-300 ${
            page === num
              ? 'bg-electric-blue text-soft-white'
              : 'bg-white text-midnight-blue hover:bg-gray-100'
          }`}
          disabled={isFetching}
          aria-current={page === num ? 'page' : undefined}
        >
          {num}
        </button>
      ))}
      <button
        onClick={() => onPageChange(Math.min(page + 1, totalPages))}
        disabled={page === totalPages || isFetching}
        className="px-4 py-2 bg-electric-blue text-soft-white rounded disabled:opacity-50 hover:bg-blue-700 transition-colors duration-300"
      >
        Next
      </button>
    </div>
  );
};

export default PaginationControls;