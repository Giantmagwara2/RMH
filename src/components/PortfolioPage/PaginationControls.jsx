import React from 'react';
import PropTypes from 'prop-types';

const getPaginationItems = (currentPage, totalPages, pageRangeDisplayed = 1) => {
  const items = [];
  // Calculate the number of page numbers to display around the current page
  // e.g., if pageRangeDisplayed = 1, we show [current-1, current, current+1]
  const totalNumbersInMiddle = pageRangeDisplayed * 2 + 1;

  // If total pages are few enough to show all numbers without needing ellipsis,
  // or just one more than what fits without ellipsis (e.g., 1,2,3,4,5,6 when 1...3,4,5...N would be 7 items)
  // The +2 accounts for the first and last page always being potentially shown.
  if (totalPages <= totalNumbersInMiddle + 2) {
    for (let i = 1; i <= totalPages; i++) {
      items.push(i);
    }
    return items;
  }

  // Always add first page
  items.push(1);

  // Left ellipsis
  // Show if current page is far enough from the start to warrant an ellipsis after page 1
  if (currentPage > pageRangeDisplayed + 2) { // e.g. current > 1+2=3
    items.push('...');
  }

  // Pages around current page
  const startPage = Math.max(2, currentPage - pageRangeDisplayed);
  const endPage = Math.min(totalPages - 1, currentPage + pageRangeDisplayed);

  for (let i = startPage; i <= endPage; i++) {
    if (!items.includes(i)) { // Avoid adding page 1 again if it's in this range
      items.push(i);
    }
  }

  // Right ellipsis
  // Show if current page is far enough from the end to warrant an ellipsis before the last page
  if (currentPage < totalPages - pageRangeDisplayed - 1) { // e.g. current < N-(1+1) = N-2
    items.push('...');
  }

  // Always add last page (if it's not already included)
  if (!items.includes(totalPages)) {
    items.push(totalPages);
  }

  return items;
};

const PaginationControls = ({ page, totalPages, onPageChange, isFetching, pageRangeDisplayed = 1 }) => {
  if (totalPages <= 1) return null;

  const pageItems = getPaginationItems(page, totalPages, pageRangeDisplayed);

  return (
    <div className="flex items-center justify-center gap-2 mt-8 md:gap-3" data-aos="fade-up">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(Math.max(page - 1, 1))}
        disabled={page === 1 || isFetching}
        className="px-4 py-2 font-medium transition-colors duration-150 ease-in-out rounded-md shadow-sm bg-electric-blue text-soft-white dark:bg-highlight-yellow dark:text-rich-black hover:bg-blue-700 dark:hover:bg-yellow-500 disabled:bg-gray-300 dark:disabled:bg-zinc-700 disabled:text-gray-500 dark:disabled:text-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-electric-blue dark:focus:ring-highlight-yellow focus:ring-offset-2 dark:focus:ring-offset-gray-900"
        aria-label="Go to previous page"
      >
        Previous
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1 md:gap-2">
        {pageItems.map((item, index) =>
          typeof item === 'number' ? (
            <button
              key={item}
              onClick={() => onPageChange(item)}
              className={`px-3 py-1.5 rounded-md font-semibold shadow-sm transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-1 dark:focus:ring-offset-gray-900 ${
                page === item
                  ? 'bg-electric-blue text-soft-white dark:bg-highlight-yellow dark:text-rich-black focus:ring-electric-blue dark:focus:ring-highlight-yellow'
                  : 'bg-white text-midnight-blue hover:bg-gray-100 dark:bg-zinc-800 dark:text-gray-300 dark:hover:bg-zinc-700 focus:ring-electric-blue dark:focus:ring-highlight-yellow'
              } ${isFetching ? 'disabled:bg-gray-200 dark:disabled:bg-zinc-600 disabled:text-gray-400 dark:disabled:text-gray-500 disabled:cursor-not-allowed' : ''}`}
              disabled={isFetching}
              aria-current={page === item ? 'page' : undefined}
              aria-label={`Go to page ${item}`}
            >
              {item}
            </button>
          ) : (
            <span key={`ellipsis-${index}`} className="px-2 py-1.5 text-gray-700 dark:text-gray-400">
              {item}
            </span>
          )
        )}
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(Math.min(page + 1, totalPages))}
        disabled={page === totalPages || isFetching}
        className="px-4 py-2 font-medium transition-colors duration-150 ease-in-out rounded-md shadow-sm bg-electric-blue text-soft-white dark:bg-highlight-yellow dark:text-rich-black hover:bg-blue-700 dark:hover:bg-yellow-500 disabled:bg-gray-300 dark:disabled:bg-zinc-700 disabled:text-gray-500 dark:disabled:text-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-electric-blue dark:focus:ring-highlight-yellow focus:ring-offset-2 dark:focus:ring-offset-gray-900"
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
  pageRangeDisplayed: PropTypes.number,
};

PaginationControls.defaultProps = {
  isFetching: false,
  pageRangeDisplayed: 1, // Show 1 page on each side of current page by default
};

export default PaginationControls;
