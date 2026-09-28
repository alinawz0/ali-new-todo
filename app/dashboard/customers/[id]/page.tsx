import Image from 'next/image';
import Link from 'next/link';
import { fetchCustomerById } from '@/app/lib/data';
import DeleteButton from '@/app/ui/customers/delete-button';

export default async function Page(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const customer = await fetchCustomerById(params.id);

  if (!customer) {
    return (
      <main>
        <h1 className="mb-8 text-xl font-semibold md:text-2xl">
          Customer not found
        </h1>

        <Link
          href="/dashboard/customers"
          className="text-sm text-blue-600 hover:underline"
        >
          ← Back to Customers
        </Link>
      </main>
    );
  }

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
    </main>
  );
}