import { getWorkout } from '@/lib/workouts';
export const dynamic = 'force-dynamic';
export async function GET(_request, { params }) {
  try {
    const { id } = await params;
    const workout = await getWorkout(id);
    return workout ? Response.json({ workout }) : Response.json({ error: 'Workout not found.' }, { status: 404 });
  } catch (error) {
    console.error('Workout detail fetch failed:', error.message);
    return Response.json({ error: 'Workout could not be loaded. Please try again.' }, { status: 502 });
  }
}
