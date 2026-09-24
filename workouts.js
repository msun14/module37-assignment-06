// Server-only module: import from Server Components and Route Handlers only.
import { normalizeList, normalizeDetail } from './normalize.js';
import demoWorkouts from '../data/demo-workouts.json' with { type: 'json' };
export const DEMO_MODE = process.env.FITLOG_DEMO_MODE === 'true';
const baseUrl = (process.env.FITLOG_API_URL || 'https://api.abcz.workers.dev/api/fitlog').replace(/\/$/, '');

async function request(path = '') {
  const response = await fetch(`${baseUrl}${path}`, {
    cache: 'no-store', headers: { Accept: 'application/json' },
    signal: AbortSignal.timeout(12000),
  });
  if (response.status === 404 && path) return null;
  if (!response.ok) throw new Error(`Workout API returned HTTP ${response.status}.`);
  return response.json();
}
export async function getWorkouts() {
  return normalizeList(DEMO_MODE ? demoWorkouts : await request());
}
export async function getWorkout(id) {
  const payload = DEMO_MODE
    ? demoWorkouts.find(w => String(w.id) === String(id)) ?? null
    : await request(`/${encodeURIComponent(id)}`);
  const workout = normalizeDetail(payload);
  // Protect against APIs that return an unrelated record for an invalid ID.
  return workout?.id === String(id) ? workout : null;
}
