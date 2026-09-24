import { LoaderCircle } from 'lucide-react';
export default function LoadingState({ cards = false }) {
  return <div role="status" aria-live="polite" className="loading-state">
    <p><LoaderCircle className="spin" size={19} aria-hidden="true" />Loading workouts…</p>
    {cards && <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-hidden="true">{Array.from({ length: 6 }, (_, i) => <div key={i} className="skeleton-card"><div /><span /><span /></div>)}</div>}
  </div>;
}
