import React from 'react';
import PropTypes from 'prop-types';

const PaginationControls = ({ page, totalPages, onPageChange, isFetching }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-4 mt-8">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(Math.max(page - 1, 1))}
        disabled={page === 1 || isFetching}
        className="px-4 py-2 transition-colors duration-300 rounded-md shadow-md bg-electric-blue text-soft-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700"
        aria-label="Go to previous page"
      >
        Previous
      </button>

      {/* Page Numbers */}
      <div className="flex gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => onPageChange(num)}
            className={`px-3 py-1 rounded-md font-semibold shadow-sm transition-colors duration-300 ${
              page === num
                ? 'bg-electric-blue text-soft-white'
                : 'bg-white text-midnight-blue hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
            disabled={isFetching}
            aria-current={page === num ? 'page' : undefined}
            aria-label={`Go to page ${num}`}
          >
            {num}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(Math.min(page + 1, totalPages))}
        disabled={page === totalPages || isFetching}
        className="px-4 py-2 transition-colors duration-300 rounded-md shadow-md bg-electric-blue text-soft-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700"
        aria-label="Go to next page"
      >
        Next
      </button>
    </div>
  );
};

PaginationControls.propTypes = {
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
};

PaginationControls.defaultProps = {
  isFetching: false,
};

export default PaginationControls;
