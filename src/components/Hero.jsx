import { ArrowDown } from 'lucide-react';
export default function Hero() {
  return <section className="hero" aria-labelledby="hero-title">
    <div className="hero-copy">
      <p className="eyebrow">WORKOUT LIBRARY</p>
      <h1 id="hero-title">TRAIN WITH INTENT. LOG EVERY SET.</h1>
      <p className="hero-subtitle">FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.</p>
      <a href="#library" className="btn btn-primary"><ArrowDown size={17} aria-hidden="true" />BROWSE WORKOUTS</a>
    </div>
    <div className="hero-art"><img src="/images/banner.png" alt="Anatomical illustration of a seated arm curl" width="333" height="333" fetchPriority="high" /></div>
  </section>;
}
