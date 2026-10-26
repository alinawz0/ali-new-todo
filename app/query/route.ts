import postgres from 'postgres';
import { createClient } from '@/app/lib/server';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function listInvoices() {
  return await sql`
    SELECT invoices.amount, customers.name
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
  `;
}

export async function GET() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    return Response.json(await listInvoices());
  } catch {
    return Response.json({ error: 'Failed to fetch invoices' }, { status: 500 });
  }
}
