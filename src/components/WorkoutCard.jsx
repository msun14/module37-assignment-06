import Link from 'next/link';
import WorkoutImage from './WorkoutImage';
import WorkoutStats from './WorkoutStats';
import Tags from './Tags';
export default function WorkoutCard({ workout }) {
  return <Link href={`/workouts/${encodeURIComponent(workout.id)}`} className="workout-card">
    <WorkoutImage src={workout.image} alt={workout.name} />
    <div className="card-content"><Tags categories={workout.categories} />
      <h3>{workout.name}</h3><p className="equipment">{workout.equipment}</p>
      <WorkoutStats workout={workout} />
    </div>
  </Link>;
}
