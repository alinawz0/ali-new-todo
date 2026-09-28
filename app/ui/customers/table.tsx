import Image from 'next/image';
import Link from 'next/link';
import { FormattedCustomersTable } from '@/app/lib/definitions';
import DeleteButton from '@/app/ui/customers/delete-button';

import {
  PencilIcon,
} from '@heroicons/react/24/outline';

export default function CustomersTable({
  customers,
}: {
  customers: FormattedCustomersTable[];
}) {
  if (customers.length === 0) {
    return (
      <div className="rounded-md bg-gray-50 p-6 text-center">
        <p className="text-sm text-gray-500">
          No customers found.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">

              {/* Mobile */}
              <div className="md:hidden">
                {customers.map((customer) => (
                  <div
                    key={customer.id}
                    className="mb-2 w-full rounded-md bg-white p-4"
                  >
                    <div className="flex items-center justify-between border-b pb-4">
                      <div>
                        <div className="mb-2 flex items-center">
                          <div className="flex items-center gap-3">
                            <Image
                              src={customer.image_url}
                              className="rounded-full"
                              alt={`${customer.name}'s profile picture`}
                              width={28}
                              height={28}
                            />

                            <Link
                              href={`/dashboard/customers/${customer.id}`}
                              className="hover:underline"
                            >
                              <p>{customer.name}</p>
                            </Link>
                          </div>
                        </div>

                        <p className="text-sm text-gray-500">
                          {customer.email}
                        </p>
                      </div>
                    </div>

                    <div className="flex w-full items-center justify-between border-b py-5">
                      <div className="flex w-1/2 flex-col">
                        <p className="text-xs">Pending</p>
                        <p className="font-medium">
                          {customer.total_pending}
                        </p>
                      </div>

                      <div className="flex w-1/2 flex-col">
                        <p className="text-xs">Paid</p>
                        <p className="font-medium">
                          {customer.total_paid}
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 text-sm">
                      <p>{customer.total_invoices} invoices</p>
                    </div>

                    <div className="mt-4 flex items-center gap-2">
                      <Link
                        href={`/dashboard/customers/${customer.id}/edit`}
                        className="rounded-md border border-black bg-white p-2 text-black hover:bg-gray-100"
                        title="Edit customer"
                        aria-label="Edit customer"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </Link>

                      <DeleteButton id={customer.id} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop */}
              <table className="hidden min-w-full rounded-md text-gray-900 md:table">
                <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                  <tr>
                    <th
                      scope="col"
                      className="px-4 py-5 font-medium sm:pl-6"
                    >
                      Name
                    </th>

                    <th
                      scope="col"
                      className="px-3 py-5 font-medium"
                    >
                      Email
                    </th>

                    <th
                      scope="col"
                      className="px-3 py-5 font-medium"
                    >
                      Total Invoices
                    </th>

                    <th
                      scope="col"
                      className="px-3 py-5 font-medium"
                    >
                      Total Pending
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-5 font-medium"
                    >
                      Total Paid
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-5 font-medium"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 text-gray-900">
                  {customers.map((customer) => (
                    <tr key={customer.id} className="group">
                      <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black sm:pl-6">
                        <div className="flex items-center gap-3">
                          <Image
                            src={customer.image_url}
                            className="rounded-full"
                            alt={`${customer.name}'s profile picture`}
                            width={28}
                            height={28}
                          />

                          <Link
                            href={`/dashboard/customers/${customer.id}`}
                            className="hover:underline"
                          >
                            <p>{customer.name}</p>
                          </Link>
                        </div>
                      </td>

                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {customer.email}
                      </td>

                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {customer.total_invoices}
                      </td>

                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {customer.total_pending}
                      </td>

                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {customer.total_paid}
                      </td>

                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        <div className="flex items-center gap-2">

                          <Link
                            href={`/dashboard/customers/${customer.id}/edit`}
                            className="rounded-md border border-black bg-white p-2 text-black hover:bg-gray-100"
                            title="Edit customer"
                            aria-label="Edit customer"
                          >
                            <PencilIcon className="h-5 w-5" />
                          </Link>

                          <DeleteButton id={customer.id} />

                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

