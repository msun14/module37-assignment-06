// API field mapping lives here. Edit this file if the provider changes its schema.
function number(value) {
  if (value == null || value === '') return null;
  const parsed = typeof value === 'number' ? value : Number.parseFloat(String(value));
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : null;
}
function list(value) {
  if (Array.isArray(value)) return value.map(String).map(s => s.trim()).filter(Boolean);
  return typeof value === 'string' ? value.split(/[,|]/).map(s => s.trim()).filter(Boolean) : [];
}
function safeImage(value) {
  if (typeof value !== 'string') return '/images/workout-placeholder.svg';
  if (value.startsWith('/') && !value.startsWith('//')) return value;
  try {
    const url = new URL(value);
    if (url.protocol === 'https:' || url.protocol === 'http:') return value;
  } catch { /* Fall back for missing or invalid image URLs. */ }
  return '/images/workout-placeholder.svg';
}
export function normalizeWorkout(raw) {
  if (!raw || typeof raw !== 'object') throw new Error('Workout must be an object.');
  const id = raw.id ?? raw._id ?? raw.workoutId;
  const name = raw.name ?? raw.title ?? raw.workoutName;
  if (id == null || !String(id).trim() || typeof name !== 'string' || !name.trim()) {
    throw new Error('Workout needs a valid id and name. Update src/lib/normalize.js.');
  }
  const steps = raw.instructions ?? raw.steps ?? [];
  return {
    id: String(id), name: name.trim(),
    image: safeImage(raw.image ?? raw.imageUrl ?? raw.image_url ?? raw.thumbnail),
    categories: list(raw.categories ?? raw.category ?? raw.tags ?? raw.muscleGroups ?? raw.muscle_groups),
    equipment: list(raw.equipment).join(', ') || 'Not specified',
    description: typeof raw.description === 'string' ? raw.description : '',
    difficulty: String(raw.difficulty ?? 'Not specified'),
    sets: number(raw.sets), reps: raw.reps == null ? 'Not specified' : String(raw.reps),
    duration: number(raw.duration ?? raw.durationMinutes ?? raw.duration_minutes ?? raw.duration_min),
    calories: number(raw.calories ?? raw.caloriesBurned ?? raw.calories_burned),
    rating: number(raw.rating),
    instructions: Array.isArray(steps)
      ? steps.map(step => typeof step === 'string' ? step : step?.text ?? step?.instruction ?? '').filter(Boolean)
      : typeof steps === 'string' ? steps.split(/\n+/).map(s => s.trim()).filter(Boolean) : [],
  };
}
export function unwrapList(payload) {
  if (Array.isArray(payload)) return payload;
  for (const key of ['data', 'workouts', 'exercises', 'results']) {
    if (payload?.[key] != null) {
      try { return unwrapList(payload[key]); } catch { /* Try another supported wrapper. */ }
    }
  }
  throw new Error('API list format is not recognized. Update src/lib/normalize.js.');
}
export function normalizeList(payload) {
  const workouts = unwrapList(payload).map(normalizeWorkout);
  return [...new Map(workouts.map(w => [w.id, w])).values()];
}
export function normalizeDetail(payload) {
  if (payload == null) return null;
  for (const key of ['data', 'workout', 'exercise']) {
    if (Object.hasOwn(payload, key)) return normalizeDetail(payload[key]);
  }
  if (Array.isArray(payload)) return payload.length ? normalizeWorkout(payload[0]) : null;
  return normalizeWorkout(payload);
}
