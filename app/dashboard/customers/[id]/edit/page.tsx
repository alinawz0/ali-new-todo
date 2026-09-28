import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { fetchCustomerById } from '@/app/lib/data';
import EditCustomerForm from '@/app/ui/customers/edit-form';

export const metadata: Metadata = {
  title: 'Edit Customer',
};

export default async function Page(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;

  const customer = await fetchCustomerById(params.id);

  if (!customer) {
    notFound();
  }

  return (
    <main>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold md:text-2xl">
            Edit Customer
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Update customer information
          </p>
        </div>

        <Link
          href={`/dashboard/customers/${customer.id}`}
          className="rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50"
        >
          ← Back
        </Link>
      </div>

      <EditCustomerForm customer={customer} />
    </main>
  );
}