'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { usePlan } from '@/context/PlanContext';
import Brand from './Brand';
export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();
  const isPlan = pathname === '/my-plan';
  const isWorkout = pathname === '/' || pathname.startsWith('/workouts/');
  return <header className="site-header">
    <div className="container header-inner">
      <Brand />
      <nav className="main-nav" aria-label="Main navigation">
        <Link href="/" className={isWorkout ? 'active' : ''} aria-current={isWorkout ? 'page' : undefined}>Workout</Link>
        <Link href="/my-plan" className={isPlan ? 'active' : ''} aria-current={isPlan ? 'page' : undefined}>My Plan</Link>
      </nav>
      <div className="nav-counters">
        <Link href="/my-plan?tab=plan" className="counter counter-plan" aria-label={`Plan: ${plan.length} workouts`}>Plan <span>{plan.length}</span></Link>
        <Link href="/my-plan?tab=saved" className="counter counter-saved" aria-label={`Saved: ${saved.length} workouts`}>Saved <span>{saved.length}</span></Link>
      </div>
    </div>
  </header>;
}
