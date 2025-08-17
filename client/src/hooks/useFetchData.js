import { useCallback, useEffect, useState } from 'react';

import api from '@/src/api';

const useFetchData = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await api.get(`${url}?page=1&limit=500`);
      setData(response.data);
    } catch (error) {
      setError(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error };
};

export default useFetchData;
