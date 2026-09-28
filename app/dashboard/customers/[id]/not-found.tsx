import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-[400px] flex-col items-center justify-center">
      <h2 className="text-xl font-semibold">
        Customer not found
      </h2>

      <p className="mt-2 text-sm text-gray-500">
        The customer you are looking for does not exist.
      </p>

      <Link
        href="/dashboard/customers"
        className="mt-6 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500"
      >
        ← Back to Customers
      </Link>
    </main>
  );
}