import { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';

import {
  fetchFilteredCustomers,
  fetchCustomersPages,
} from '@/app/lib/data';
import CustomersTable from '@/app/ui/customers/table';
import Search from '@/app/ui/search';
import { CustomersTableSkeleton } from '@/app/ui/skeletons';
import { lusitana } from '@/app/ui/fonts';
import Pagination from '@/app/ui/customers/pagination';
import { PlusIcon } from '@heroicons/react/24/outline';

export const metadata: Metadata = {
  title: 'Customers',
};

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;

  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchCustomersPages(query);

  return (
    <main>
      <h1
        className={`${lusitana.className} mb-8 text-xl md:text-2xl`}
      >
        Customers
      </h1>

      <div className="mb-6 flex items-center gap-4">
        <div className="flex-1">
          <Search placeholder="Search customers..." />
        </div>

        <Link
          href="/dashboard/customers/create"
          className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white hover:bg-blue-500"
        >
          <span className="hidden md:block">
            Create Customer
          </span>

          <PlusIcon className="h-5 md:ml-4" />
        </Link>
      </div>

      <Suspense
        key={query + currentPage}
        fallback={<CustomersTableSkeleton />}
      >
        <CustomersTableWrapper
          query={query}
          currentPage={currentPage}
        />
      </Suspense>

      <Pagination totalPages={totalPages} />
    </main>
  );
}

async function CustomersTableWrapper({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const customers = await fetchFilteredCustomers(
    query,
    currentPage,
  );

  return <CustomersTable customers={customers} />;
}