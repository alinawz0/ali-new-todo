import { Metadata } from 'next';
import Link from 'next/link';

import { lusitana } from '@/app/ui/fonts';
import Form from '@/app/ui/customers/create-form';

export const metadata: Metadata = {
  title: 'Create Customer',
};

export default function Page() {
  return (
    <main>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1
            className={`${lusitana.className} text-xl md:text-2xl`}
          >
            Create Customer
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Add a new customer
          </p>
        </div>

        <Link
          href="/dashboard/customers"
          className="rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50"
        >
          ← Back
        </Link>
      </div>

      <Form />
    </main>
  );
}