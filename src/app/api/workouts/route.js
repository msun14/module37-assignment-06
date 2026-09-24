import { getWorkouts } from '@/lib/workouts';
export const dynamic = 'force-dynamic';
export async function GET() {
  try { return Response.json({ workouts: await getWorkouts() }); }
  catch (error) {
    console.error('Workout list fetch failed:', error.message);
    return Response.json({ error: 'Workouts could not be loaded. Please try again.' }, { status: 502 });
  }
}
