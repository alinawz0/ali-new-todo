// Seeding through a public HTTP route is disabled.
// Use a reviewed, local-only database setup workflow on an isolated Neon branch.
// Never expose database seeding through an application GET endpoint.
export async function GET() {
  return Response.json({ error: 'Not found' }, { status: 404 });
}
