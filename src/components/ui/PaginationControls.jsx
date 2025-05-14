// /src/components/ui/PaginationControls.jsx
import React from 'react';

const PaginationControls = ({ page, totalPages, onPageChange, isFetching, maxVisiblePages = 5 }) => {
  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const pages = [];
    const half = Math.floor(maxVisiblePages / 2);

    let start = Math.max(1, page - half);
    let end = Math.min(totalPages, page + half);

    if (start === 1) {
      end = Math.min(totalPages, maxVisiblePages);
    } else if (end === totalPages) {
      start = Math.max(1, totalPages - maxVisiblePages + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex justify-center gap-4 mb-8" aria-label="Pagination Navigation">
      <button
        onClick={() => onPageChange(Math.max(page - 1, 1))}
        disabled={page === 1 || isFetching}
        className="px-4 py-2 transition-colors duration-300 rounded bg-electric-blue text-soft-white disabled:opacity-50 hover:bg-blue-700"
        aria-label="Previous Page"
      >
        Previous
      </button>
      {visiblePages[0] > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="px-3 py-1 font-semibold transition-colors duration-300 bg-white rounded-md text-midnight-blue hover:bg-gray-100"
            disabled={isFetching}
            aria-label="Page 1"
          >
            1
          </button>
          {visiblePages[0] > 2 && <span className="px-3 py-1">...</span>}
        </>
      )}
      {visiblePages.map((num) => (
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
          aria-label={`Page ${num}`}
        >
          {num}
        </button>
      ))}
      {visiblePages[visiblePages.length - 1] < totalPages && (
        <>
          {visiblePages[visiblePages.length - 1] < totalPages - 1 && <span className="px-3 py-1">...</span>}
          <button
            onClick={() => onPageChange(totalPages)}
            className="px-3 py-1 font-semibold transition-colors duration-300 bg-white rounded-md text-midnight-blue hover:bg-gray-100"
            disabled={isFetching}
            aria-label={`Page ${totalPages}`}
          >
            {totalPages}
          </button>
        </>
      )}
      <button
        onClick={() => onPageChange(Math.min(page + 1, totalPages))}
        disabled={page === totalPages || isFetching}
        className="px-4 py-2 transition-colors duration-300 rounded bg-electric-blue text-soft-white disabled:opacity-50 hover:bg-blue-700"
        aria-label="Next Page"
      >
        Next
      </button>
    </div>
  );
};

export default PaginationControls;