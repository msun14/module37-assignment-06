'use client';
import ErrorState from '@/components/ErrorState';
export default function ErrorPage({ reset }) {
  return <main id="main-content" className="container loading-page"><ErrorState message="We couldn't reach the workout service. Check your connection and try again." onRetry={reset} /></main>;
}
