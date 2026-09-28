'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

export default function Pagination({
  totalPages,
}: {
  totalPages: number;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const currentPage = Number(searchParams.get('page')) || 1;

  function createPageURL(pageNumber: number | string) {
    const params = new URLSearchParams(searchParams);

    params.set('page', pageNumber.toString());

    return `${pathname}?${params.toString()}`;
  }

  function handlePageChange(pageNumber: number) {
    replace(createPageURL(pageNumber));
  }

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex justify-center">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="flex h-10 w-10 items-center justify-center rounded-l-md border border-gray-200 bg-white disabled:pointer-events-none disabled:opacity-50"
      >
        <ArrowLeftIcon className="w-5" />
      </button>

      {Array.from({ length: totalPages }, (_, index) => {
        const page = index + 1;

        return (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`h-10 w-10 border-t border-b border-gray-200 text-sm ${
              currentPage === page
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600'
            }`}
          >
            {page}
          </button>
        );
      })}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="flex h-10 w-10 items-center justify-center rounded-r-md border border-gray-200 bg-white disabled:pointer-events-none disabled:opacity-50"
      >
        <ArrowRightIcon className="w-5" />
      </button>
    </div>
  );
}