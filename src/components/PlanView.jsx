'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { usePlan } from '@/context/PlanContext';
import useWorkouts from '@/hooks/useWorkouts';
import { sortWorkouts, summarize } from '@/lib/plan';
import PlanCard from './PlanCard';
import LoadingState from './LoadingState';
export default function PlanView() {
  const { plan, saved, ready, dispatch } = usePlan();
  const params = useSearchParams();
  const tab = params.get('tab') === 'saved' ? 'saved' : 'plan';
  const [sort, setSort] = useState('duration');
  const { workouts, loading, error, retry } = useWorkouts();
  // Refresh metadata from the API, retaining saved snapshots during an outage.
  const latest = new Map(workouts.map(w => [w.id, w]));
  const enrich = w => ({ ...w, ...(latest.get(w.id) || {}), done: w.done });
  const currentPlan = plan.map(enrich);
  const metrics = summarize(currentPlan);
  const entries = sortWorkouts(tab === 'saved' ? saved.map(enrich) : currentPlan, sort);
  return <>
    <section className="metrics" aria-label="Today's plan summary">
      <div><span>Exercises</span><strong>{metrics.exercises}</strong></div>
      <div><span>Minutes</span><strong>{metrics.minutes}</strong></div>
      <div><span>Calories</span><strong>{metrics.calories}</strong></div>
    </section>
    <div className="plan-toolbar">
      <nav className="plan-tabs" aria-label="Plan lists">
        <Link href="/my-plan?tab=plan" scroll={false} className={tab === 'plan' ? 'selected' : ''} aria-current={tab === 'plan' ? 'page' : undefined}>Today&apos;s Plan</Link>
        <Link href="/my-plan?tab=saved" scroll={false} className={tab === 'saved' ? 'selected' : ''} aria-current={tab === 'saved' ? 'page' : undefined}>Saved</Link>
      </nav>
      <label className="sort-label">Sort By <span className="select-wrap"><select value={sort} onChange={e => setSort(e.target.value)}><option value="duration">Duration</option><option value="calories">Calories</option><option value="rating">Rating</option></select><ChevronDown size={15} aria-hidden="true" /></span></label>
    </div>
    {!ready || loading ? <LoadingState /> : <>
      {error && <div className="inline-notice" role="status">Live workouts are unavailable. Your stored plan is still usable. <button onClick={retry}>Retry</button></div>}
      {entries.length ? <div className="plan-list">{entries.map(w => <PlanCard key={w.id} workout={w} saved={tab === 'saved'} dispatch={dispatch} />)}</div> :
        <div className="empty-state"><h2>NOTHING HERE YET</h2><p>Browse the library and add a lift to get today moving.</p><Link href="/" className="btn btn-primary rounded-button">Go to workouts</Link></div>}
    </>}
  </>;
}
