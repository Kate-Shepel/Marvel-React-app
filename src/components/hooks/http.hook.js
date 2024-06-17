import { useState, useCallback } from 'react';

export const useHttp = () => {
  const [loading, setLoadng] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {

    setLoadng(true);

    try {
      const response = await fetch(url, {method, body, headers});

      if (!response.ok) {
        throw new Error(`Could not fetch ${url}, status: ${response.status}`);
    }

      const data = await response.json();

      setLoadng(false);
      return data;
      
    } catch(e) {
      setLoadng(false);
      setError(e.message);
      throw e;
    }

  }, [])

  const clearError = useCallback(() => setError(null), []);

  return {loading, request, error, clearError}
}