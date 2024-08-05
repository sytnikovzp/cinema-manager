import { useState, useEffect, useCallback } from 'react';
import api from '../api';

const usePaginatedData = (url, itemsPerPage, currentPage) => {
  const [data, setData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get(url, {
        params: {
          _limit: itemsPerPage,
          _page: currentPage,
        },
        headers: {
          'Cache-Control': 'no-cache',
        },
      });

      setData(response.data);
      setTotalItems(parseInt(response.headers['x-total-count'], 10));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  }, [url, itemsPerPage, currentPage]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, totalItems, loading, refetch: fetchData };
};

export default usePaginatedData;
