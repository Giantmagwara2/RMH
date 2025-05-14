import { useState } from 'react';

export default function usePagination(initialPage = 1) {
  const [page, setPage] = useState(initialPage);

  const goToPage = (newPage, totalPages) => {
    if (newPage < 1 || (totalPages && newPage > totalPages)) {
      console.warn('Invalid page number');
      return;
    }
    setPage(newPage);
  };

  return { page, goToPage, nextPage: (totalPages) => goToPage(page + 1, totalPages), prevPage: () => goToPage(page - 1) };
}
