import { useState, useCallback } from 'react';

/**
 * Custom hook to manage pagination state.
 *
 * @param {number} [initialPage=1] - The initial page number.
 * @returns {{
 *   page: number;
 *   setPage: React.Dispatch<React.SetStateAction<number>>;
 *   goToPage: (newPage: number, totalPages?: number) => void;
 *   nextPage: (totalPages?: number) => void;
 *   prevPage: () => void;
 *   canGoNext: (totalPages: number) => boolean;
 *   canGoPrev: () => boolean;
 * }} An object containing the current page, and functions to control pagination.
 */
export default function usePagination(initialPage = 1) {
  const [page, setPage] = useState(initialPage);

  const goToPage = useCallback((newPage, totalPages) => {
    let targetPage = newPage;
    if (targetPage < 1) {
      console.warn('usePagination: Attempted to go to a page less than 1. Setting to page 1.');
      targetPage = 1;
    } else if (totalPages !== undefined && totalPages !== null && targetPage > totalPages) {
      console.warn(`usePagination: Attempted to go to page ${targetPage} which is greater than total pages (${totalPages}). Setting to page ${totalPages}.`);
      targetPage = totalPages;
    }
    setPage(targetPage);
  }, []);

  const nextPage = useCallback((totalPages) => {
    goToPage(page + 1, totalPages);
  }, [page, goToPage]);

  const prevPage = useCallback(() => {
    // No need for totalPages here as goToPage handles the lower bound (page 1)
    goToPage(page - 1);
  }, [page, goToPage]);

  const canGoNext = useCallback((totalPages) => {
    return totalPages === undefined || totalPages === null || page < totalPages;
  }, [page]);

  const canGoPrev = useCallback(() => {
    return page > 1;
  }, [page]);

  return {
    page,
    setPage, // Exposing setPage for direct manipulation if needed
    goToPage,
    nextPage,
    prevPage,
    canGoNext,
    canGoPrev,
  };
}
