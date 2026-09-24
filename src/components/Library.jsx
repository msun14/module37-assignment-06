'use client';
import { useState } from 'react';
import { Search } from 'lucide-react';
import useWorkouts from '@/hooks/useWorkouts';
import { filterWorkouts } from '@/lib/plan';
import WorkoutCard from './WorkoutCard';
import LoadingState from './LoadingState';
import ErrorState from './ErrorState';
export default function Library() {
  const { workouts, loading, error, retry } = useWorkouts();
  const [query, setQuery] = useState('');
  const filtered = filterWorkouts(workouts, query);
  return <section id="library" className="library" aria-labelledby="library-title">
    <div className="section-heading"><div><h2 id="library-title">THE LIBRARY</h2><p>Twelve lifts covering every major muscle group.</p></div>
      <label className="search-field"><Search size={17} aria-hidden="true" /><span className="sr-only">Search workouts by name or tag</span><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search lifts or muscle groups" type="search" /></label>
    </div>
    {loading ? <LoadingState cards /> : error ? <ErrorState message={error} onRetry={retry} /> : filtered.length ?
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{filtered.map(workout => <WorkoutCard key={workout.id} workout={workout} />)}</div> :
      <div className="empty-state"><h3>{query ? 'NO MATCHING WORKOUTS' : 'NO WORKOUTS AVAILABLE'}</h3><p>{query ? 'Try another workout name or muscle group.' : 'Please check back soon.'}</p>{query && <button className="btn btn-secondary" onClick={() => setQuery('')}>Clear search</button>}</div>}
  </section>;
}
