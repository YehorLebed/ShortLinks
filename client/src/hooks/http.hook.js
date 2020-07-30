import { useState, useCallback } from 'react';

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
    try {
      setLoading(true);

      if (body && typeof body === 'object') {
        body = JSON.stringify(body);
        headers['Content-Type'] = 'application/json';
      }

      const response = await fetch(url, { method, headers, body });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Что-то пошло не так');
      }

      setLoading(false);

      return data;
    } catch (error) {
      setLoading(false);
      setError(error.message);
      throw error;
    }
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return { loading, request, error, clearError };
}