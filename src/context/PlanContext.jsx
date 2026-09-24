'use client';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { emptyPlan, restorePlan, STORAGE_KEY, transition } from '@/lib/plan';
const PlanContext = createContext(null);

export function PlanProvider({ children }) {
  const [state, setState] = useState(emptyPlan);
  const [ready, setReady] = useState(false);
  const current = useRef(emptyPlan());
  const storageWarningShown = useRef(false);

  useEffect(() => {
    let cancelled = false;
    function readStorage() {
      if (cancelled) return;
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        current.current = stored ? restorePlan(stored) : emptyPlan();
        setState(current.current);
      } catch {
        toast.error('Saved data could not be read. You can still create a new plan.');
      }
      setReady(true);
    }
    // Wait until after hydration; never read localStorage during server rendering.
    queueMicrotask(readStorage);
    const sync = event => {
      if (event.key === STORAGE_KEY || event.key === null) readStorage();
    };
    window.addEventListener('storage', sync);
    return () => { cancelled = true; window.removeEventListener('storage', sync); };
  }, []);

  function dispatch(action) {
    if (!ready) return;
    const result = transition(current.current, action);
    if (result.state !== current.current) {
      current.current = result.state;
      setState(result.state);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 1, ...result.state }));
      } catch {
        if (!storageWarningShown.current) {
          toast.warning('Changes work in this tab, but browser storage is unavailable.');
          storageWarningShown.current = true;
        }
      }
    }
    if (result.message) toast[result.kind || 'success'](result.message);
  }
  return <PlanContext.Provider value={{ ...state, ready, dispatch }}>{children}</PlanContext.Provider>;
}
export function usePlan() {
  const context = useContext(PlanContext);
  if (!context) throw new Error('usePlan must be used inside PlanProvider.');
  return context;
}
