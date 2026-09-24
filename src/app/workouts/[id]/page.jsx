import { notFound } from 'next/navigation';
import { getWorkout } from '@/lib/workouts';
import WorkoutImage from '@/components/WorkoutImage';
import Tags from '@/components/Tags';
import DetailActions from '@/components/DetailActions';
export const dynamic = 'force-dynamic';
export default async function WorkoutDetailPage({ params }) {
  const { id } = await params;
  const workout = await getWorkout(id);
  if (!workout) notFound();
  const specs = [
    ['Equipment', workout.equipment], ['Difficulty', workout.difficulty],
    ['Sets', workout.sets ?? 'Not specified'], ['Reps', workout.reps],
    ['Duration', workout.duration == null ? 'Not specified' : `${workout.duration} min`],
    ['Calories', workout.calories == null ? 'Not specified' : `${workout.calories} kcal`],
    ['Rating', workout.rating ?? 'Not specified'],
  ];
  return <main id="main-content" className="container detail-page">
    <div className="detail-visual"><WorkoutImage src={workout.image} alt={workout.name} priority /></div>
    <article className="detail-content"><h1>{workout.name}</h1>
      {workout.description && <p className="detail-description">{workout.description}</p>}
      <Tags categories={workout.categories} />
      <dl className="specs">{specs.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
      <section className="instructions"><h2>INSTRUCTIONS</h2>
        {workout.instructions.length ? <ol>{workout.instructions.map((step, i) => <li key={`${i}-${step}`}>{step}</li>)}</ol> : <p>No instructions were supplied for this workout.</p>}
      </section><DetailActions workout={workout} />
    </article>
  </main>;
}
