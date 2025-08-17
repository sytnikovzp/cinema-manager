import { useCallback, useEffect, useState } from 'react';

import api from '@/src/api';

const usePagination = (url, itemsPerPage, currentPage) => {
  const [data, setData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(url, {
        params: {
          limit: itemsPerPage,
          page: currentPage,
        },
        headers: {
          'Cache-Control': 'no-cache',
        },
      });

      setData(response.data);
      setTotalItems(parseInt(response.headers['x-total-count']));
    } catch (error) {
      setError(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [url, itemsPerPage, currentPage]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, totalItems, loading, error, refetch: fetchData };
};

export default usePagination;
