'use client';
import { Bookmark, CalendarPlus, Check } from 'lucide-react';
import { usePlan } from '@/context/PlanContext';
import { PLAN_LIMIT } from '@/lib/plan';
export default function DetailActions({ workout }) {
  const { plan, saved, ready, dispatch } = usePlan();
  const inPlan = plan.some(w => w.id === workout.id);
  const isSaved = saved.some(w => w.id === workout.id);
  const full = plan.filter(w => !w.done).length >= PLAN_LIMIT;
  return <div className="detail-action-area"><div className="detail-actions">
    <button className="btn btn-primary" disabled={!ready || inPlan || full} onClick={() => dispatch({ type: 'ADD_PLAN', workout })}>
      {inPlan ? <Check size={17} aria-hidden="true" /> : <CalendarPlus size={17} aria-hidden="true" />}
      {inPlan ? 'Added to today\'s plan' : full ? 'Plan is full (5/5)' : 'Add to today\'s plan'}
    </button>
    <button className="btn btn-secondary" disabled={!ready || isSaved} onClick={() => dispatch({ type: 'SAVE', workout })}>
      <Bookmark size={17} aria-hidden="true" />{isSaved ? 'Saved for later' : 'Save for later'}
    </button>
  </div>{full && !inPlan && <p className="helper-text">Finish or remove a lift in My Plan to make room.</p>}</div>;
}
