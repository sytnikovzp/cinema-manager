import { useState, useEffect } from 'react';
import api from '../api';

const usePaginatedData = (url, itemsPerPage, currentPage) => {
  const [data, setData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await api.get(url, {
          params: {
            _limit: itemsPerPage,
            _page: currentPage,
          },
        });
        setData(response.data);
        setTotalItems(parseInt(response.headers['x-total-count'], 10));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setLoading(false);
    };

    fetchData();
  }, [url, itemsPerPage, currentPage]);

  return { data, totalItems, loading };
};

export default usePaginatedData;
