import Link from 'next/link';
import { Check, X } from 'lucide-react';
import WorkoutImage from './WorkoutImage';
import WorkoutStats from './WorkoutStats';
export default function PlanCard({ workout, saved, dispatch }) {
  return <article className={`plan-card ${!saved && workout.done ? 'is-done' : ''}`}>
    <WorkoutImage src={workout.image} alt={workout.name} />
    <div className="plan-card-info"><h2>{workout.name}{!saved && workout.done && <span className="done-label">Done</span>}</h2><p className="equipment">{workout.equipment}</p><WorkoutStats workout={workout} accent /></div>
    <div className="plan-card-actions"><Link className="btn btn-secondary btn-small" href={`/workouts/${encodeURIComponent(workout.id)}`}>View Details</Link>
      {!saved && <button className="btn btn-primary btn-small" disabled={workout.done} onClick={() => dispatch({ type: 'DONE', id: workout.id })}><Check size={15} aria-hidden="true" />{workout.done ? 'Completed' : 'Mark as Done'}</button>}
      <button className="remove-button" aria-label={`Remove ${workout.name} from ${saved ? 'saved' : 'plan'}`} onClick={() => dispatch({ type: saved ? 'REMOVE_SAVED' : 'REMOVE_PLAN', id: workout.id })}><X size={19} aria-hidden="true" /></button>
    </div>
  </article>;
}
