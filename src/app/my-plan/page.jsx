import { Suspense } from 'react';
import PlanView from '@/components/PlanView';
import LoadingState from '@/components/LoadingState';
export const metadata = { title: 'My Plan' };
export default function MyPlanPage() {
  return <main id="main-content" className="container plan-page">
    <div className="page-heading"><h1>MY PLAN</h1><p>Cap of five lifts for today. Finish them, then load more.</p></div>
    <Suspense fallback={<LoadingState />}><PlanView /></Suspense>
  </main>;
}
