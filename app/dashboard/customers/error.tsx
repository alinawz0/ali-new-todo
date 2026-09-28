'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-[400px] flex-col items-center justify-center">
      <h2 className="text-center text-xl font-semibold">
        Something went wrong!
      </h2>

      <button
        className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500"
        onClick={() => reset()}
      >
        Try again
      </button>
    </main>
  );
}