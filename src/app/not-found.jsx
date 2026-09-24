import Link from 'next/link';
export default function NotFound() {
  return <main id="main-content" className="container not-found"><p className="eyebrow">404 · OFF THE PLAN</p><h1>THIS LIFT IS MISSING.</h1><p>The page or workout you requested could not be found.</p><Link href="/" className="btn btn-primary">Go to workouts</Link></main>;
}
