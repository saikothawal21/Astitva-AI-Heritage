import { useState, useCallback } from 'react';

export function useAIGenerate() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generate = useCallback(async (serviceFn, params) => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await serviceFn(params);
      setResult(data);
      return data;
    } catch (err) {
      setError(err.message || 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
    setLoading(false);
  }, []);

  return { result, loading, error, generate, reset };
}
