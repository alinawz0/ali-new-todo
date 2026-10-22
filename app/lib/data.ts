
export async function fetchInvoiceById(id: string) {
  try {
    const data = await sql<InvoiceForm[]>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `;

    if (data.length === 0) {
      return undefined;
    }

    const invoice = data[0];

    return {
      ...invoice,
      amount: invoice.amount / 100,
    };
  } catch (error: unknown) {
    console.error(
      'fetchInvoiceById original error:',
      error,
    );

    throw error;
  }
}
