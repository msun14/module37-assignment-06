import { Clock3, Flame, Star } from 'lucide-react';
export default function WorkoutStats({ workout, accent = false }) {
  return <div className={`workout-stats ${accent ? 'stats-accent' : ''}`}>
    <span><Clock3 aria-hidden="true" /><span>{workout.duration ?? '—'} min</span></span>
    <span><Flame aria-hidden="true" /><span>{workout.calories ?? '—'} kcal</span></span>
    <span><Star aria-hidden="true" /><span aria-label={`Rating ${workout.rating ?? 'unavailable'}`}>{workout.rating ?? '—'}</span></span>
  </div>;
}
