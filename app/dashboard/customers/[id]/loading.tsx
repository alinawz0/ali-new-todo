import { UserCircleIcon } from '@heroicons/react/24/outline';

export default function Loading() {
  return (
    <main>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <div className="h-7 w-48 animate-pulse rounded-md bg-gray-200" />
          <div className="mt-2 h-4 w-40 animate-pulse rounded-md bg-gray-200" />
        </div>

        <div className="h-10 w-24 animate-pulse rounded-md bg-gray-200" />
      </div>

      <div className="rounded-md bg-gray-50 p-2">
        <div className="rounded-md bg-white p-6">
          <div className="flex items-center gap-4 border-b pb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-200">
              <UserCircleIcon className="h-8 w-8 text-gray-400" />
            </div>

            <div>
              <div className="h-6 w-40 animate-pulse rounded-md bg-gray-200" />
              <div className="mt-2 h-4 w-52 animate-pulse rounded-md bg-gray-200" />
            </div>
          </div>

          <div className="grid gap-6 py-6 md:grid-cols-3">
            <div>
              <div className="h-4 w-28 animate-pulse rounded-md bg-gray-200" />
              <div className="mt-2 h-6 w-12 animate-pulse rounded-md bg-gray-200" />
            </div>

            <div>
              <div className="h-4 w-28 animate-pulse rounded-md bg-gray-200" />
              <div className="mt-2 h-6 w-16 animate-pulse rounded-md bg-gray-200" />
            </div>

            <div>
              <div className="h-4 w-28 animate-pulse rounded-md bg-gray-200" />
              <div className="mt-2 h-6 w-16 animate-pulse rounded-md bg-gray-200" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}