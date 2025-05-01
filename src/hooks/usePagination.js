import { useState } from 'react';

export default function usePagination(initialPage = 1) {
  const [page, setPage] = useState(initialPage);

  const goToPage = (newPage) => setPage(newPage);
  const nextPage = (totalPages) => setPage((p) => Math.min(p + 1, totalPages));
  const prevPage = () => setPage((p) => Math.max(p - 1, 1));

  return { page, goToPage, nextPage, prevPage };
}
