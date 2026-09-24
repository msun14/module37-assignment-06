'use client';
import { useCallback, useEffect, useState } from 'react';
export default function useWorkouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [attempt, setAttempt] = useState(0);
  const retry = useCallback(() => setAttempt(n => n + 1), []);
  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      setLoading(true); setError('');
      try {
        const response = await fetch('/api/workouts', {
          signal: AbortSignal.any([controller.signal, AbortSignal.timeout(16000)]),
        });
        const body = await response.json();
        if (!response.ok) throw new Error(body.error || 'Could not load workouts.');
        setWorkouts(body.workouts);
      } catch (error) {
        if (!controller.signal.aborted) setError(error.message || 'Unable to connect. Please try again.');
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    load();
    return () => controller.abort();
  }, [attempt]);
  return { workouts, loading, error, retry };
}
