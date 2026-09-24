'use client';
import { useState } from 'react';
export default function WorkoutImage({ src, alt, className = '', priority = false }) {
  const [failedSrc, setFailedSrc] = useState(null);
  return <img src={failedSrc === src ? '/images/workout-placeholder.svg' : src}
    alt={alt} className={className} width="640" height="400"
    loading={priority ? 'eager' : 'lazy'} decoding="async"
    onError={() => { if (failedSrc !== src) setFailedSrc(src); }} />;
}
