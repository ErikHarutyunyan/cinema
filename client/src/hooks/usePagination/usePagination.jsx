import { useCallback, useMemo, useState } from 'react';

function usePagination(data, itemsPerPage) {
  const [currentPage, setCurrentPage] = useState(0);
  const maxPage = useMemo(() => Math.ceil(data.length / itemsPerPage), [data.length, itemsPerPage]);

  const currentData = useMemo(() => {
    const start = currentPage * itemsPerPage;
    const end = start + itemsPerPage;
    return data.slice(start, end);
  }, [currentPage, itemsPerPage, data]);

  const next = useCallback(() => {
    setCurrentPage((prevCurrentPage) => Math.min(prevCurrentPage + 1, maxPage - 1));
  }, [maxPage]);

  const prev = useCallback(() => {
    setCurrentPage((prevCurrentPage) => Math.max(prevCurrentPage - 1, 0));
  }, []);

  const jump = useCallback(
    (page) => {
      const pageNumber = Math.max(0, page);
      setCurrentPage(Math.min(pageNumber, maxPage - 1));
    },
    [maxPage]
  );

  return { next, prev, jump, currentData, currentPage, maxPage };
}

export default usePagination;
