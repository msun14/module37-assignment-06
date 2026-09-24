import { normalizeWorkout } from './normalize.js';
export const PLAN_LIMIT = 5;
export const STORAGE_KEY = 'fitlog:plan:v1';
export function emptyPlan() { return { plan: [], saved: [] }; }

// Pure transitions keep counters, duplicates and the limit consistent everywhere.
export function transition(state, action) {
  const { type, workout, id } = action;
  if (type === 'ADD_PLAN') {
    if (state.plan.some(w => w.id === workout.id)) return { state, message: 'Already in today\'s plan.', kind: 'info' };
    if (state.plan.filter(w => !w.done).length >= PLAN_LIMIT) {
      return { state, message: 'Five active lifts maximum. Finish or remove one first.', kind: 'error' };
    }
    return { state: { ...state, plan: [...state.plan, { ...workout, done: false }] }, message: 'Added to today\'s plan.', kind: 'success' };
  }
  if (type === 'SAVE') {
    if (state.saved.some(w => w.id === workout.id)) return { state, message: 'Already saved for later.', kind: 'info' };
    return { state: { ...state, saved: [...state.saved, workout] }, message: 'Saved for later.', kind: 'success' };
  }
  if (type === 'DONE') {
    if (!state.plan.some(w => w.id === id && !w.done)) return { state };
    return { state: { ...state, plan: state.plan.map(w => w.id === id ? { ...w, done: true } : w) }, message: 'Workout marked as done. Nice work!', kind: 'success' };
  }
  if (type === 'REMOVE_PLAN' || type === 'REMOVE_SAVED') {
    const key = type === 'REMOVE_PLAN' ? 'plan' : 'saved';
    if (!state[key].some(w => w.id === id)) return { state };
    return { state: { ...state, [key]: state[key].filter(w => w.id !== id) }, message: key === 'plan' ? 'Removed from today\'s plan.' : 'Removed from saved.', kind: 'success' };
  }
  return { state };
}
export function restorePlan(serialized) {
  const raw = JSON.parse(serialized);
  if (!raw || raw.version !== 1 || !Array.isArray(raw.plan) || !Array.isArray(raw.saved)) {
    throw new Error('Unsupported saved plan.');
  }
  const clean = items => {
    const seen = new Set();
    return items.flatMap(item => {
      try {
        const workout = normalizeWorkout(item);
        if (seen.has(workout.id)) return [];
        seen.add(workout.id);
        return [{ ...workout, done: item.done === true }];
      } catch { return []; }
    });
  };
  let active = 0;
  return {
    plan: clean(raw.plan).filter(w => w.done || ++active <= PLAN_LIMIT),
    saved: clean(raw.saved),
  };
}
export function summarize(plan) {
  // Completed rows stay visible; metrics describe every row in Today's Plan.
  return plan.reduce((a, w) => ({ exercises: a.exercises + 1,
    minutes: a.minutes + (w.duration ?? 0), calories: a.calories + (w.calories ?? 0),
  }), { exercises: 0, minutes: 0, calories: 0 });
}
export function filterWorkouts(items, query) {
  const term = query.trim().toLowerCase();
  return items.filter(w => [w.name, ...w.categories].join(' ').toLowerCase().includes(term));
}
export function sortWorkouts(items, by = 'duration') {
  const key = ['duration', 'calories', 'rating'].includes(by) ? by : 'duration';
  return [...items].sort((a, b) => {
    if (a[key] == null) return b[key] == null ? a.name.localeCompare(b.name) : 1;
    if (b[key] == null) return -1;
    return (key === 'duration' ? a[key] - b[key] : b[key] - a[key]) || a.name.localeCompare(b.name);
  });
}
