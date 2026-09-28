import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import {
  fetchCustomerById,
  fetchCustomerInvoices,
} from '@/app/lib/data';

import DeleteButton from '@/app/ui/customers/delete-button';

export default async function Page(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;

  const isValidUuid =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      params.id,
    );

  if (!isValidUuid) {
    notFound();
  }

  const customer = await fetchCustomerById(params.id);

  if (!customer) {
    notFound();
  }

  const invoices = await fetchCustomerInvoices(params.id);

  return (
    <main>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold md:text-2xl">
            Customer Details
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            View customer information
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            href={`/dashboard/customers/${customer.id}/edit`}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500"
          >
            Edit
          </Link>

          <DeleteButton id={customer.id} />

          <Link
            href="/dashboard/customers"
            className="rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50"
          >
            ← Back
          </Link>
        </div>
      </div>

      <div className="rounded-md bg-gray-50 p-2">
        <div className="rounded-md bg-white p-6">
          <div className="flex items-center gap-4 border-b pb-6">
            <Image
              src={customer.image_url}
              alt={`${customer.name}'s profile picture`}
              width={64}
              height={64}
              className="rounded-full"
            />

            <div>
              <h2 className="text-xl font-semibold">
                {customer.name}
              </h2>

              <p className="text-sm text-gray-500">
                {customer.email}
              </p>
            </div>
          </div>

          <div className="grid gap-6 py-6 md:grid-cols-3">
            <div>
              <p className="text-sm text-gray-500">
                Total Invoices
              </p>

              <p className="mt-1 text-xl font-semibold">
                {customer.total_invoices}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Total Pending
              </p>

              <p className="mt-1 text-xl font-semibold">
                {customer.total_pending}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Total Paid
              </p>

              <p className="mt-1 text-xl font-semibold">
                {customer.total_paid}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">
          Invoice History
        </h2>

        {invoices.length === 0 ? (
          <div className="rounded-md bg-gray-50 p-6 text-center">
            <p className="text-sm text-gray-500">
              No invoices found.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-md bg-gray-50 p-2">
            <table className="min-w-full text-sm">
              <thead className="text-left">
                <tr>
                  <th className="px-4 py-4 font-medium">
                    Date
                  </th>

                  <th className="px-4 py-4 font-medium">
                    Amount
                  </th>

                  <th className="px-4 py-4 font-medium">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {invoices.map((invoice) => (
                  <tr
                    key={invoice.id}
                    className="bg-white"
                  >
                    <td className="whitespace-nowrap px-4 py-4">
                      {invoice.date}
                    </td>

                    <td className="whitespace-nowrap px-4 py-4">
                      {invoice.amount}
                    </td>

                    <td className="whitespace-nowrap px-4 py-4">
                      {invoice.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}