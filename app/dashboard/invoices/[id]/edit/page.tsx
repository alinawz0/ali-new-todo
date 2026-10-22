
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import {
  fetchCustomers,
  fetchInvoiceById,
} from '@/app/lib/data';

export const metadata: Metadata = {
  title: 'Edit Invoice',
};

export default async function Page(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;

  // Pehle invoice fetch karo
  const invoice = await fetchInvoiceById(id);

  // Invoice nahi mila to 404 page dikhao
  if (!invoice) {
    notFound();
  }

  // Invoice milne ke baad customers fetch karo
  const customers = await fetchCustomers();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          {
            label: 'Invoices',
            href: '/dashboard/invoices',
          },
          {
            label: 'Edit Invoice',
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />

      <Form
        invoice={invoice}
        customers={customers}
      />
    </main>
  );
}
