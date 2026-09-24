'use client';
import { RefreshCw } from 'lucide-react';
export default function ErrorState({ message, onRetry }) {
  return <div className="error-state" role="alert"><h2>COULD NOT LOAD WORKOUTS</h2><p>{message}</p>
    {onRetry && <button onClick={onRetry} className="btn btn-secondary"><RefreshCw size={16} aria-hidden="true" />Try again</button>}
  </div>;
}
