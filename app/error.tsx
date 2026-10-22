
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
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h2 className="text-2xl font-semibold">
        Something went wrong!
      </h2>

      <p className="mt-3 text-gray-600">
        Sorry, an unexpected error occurred.
      </p>

      <button
        onClick={() => reset()}
        className="mt-6 rounded-md bg-blue-600 px-5 py-3 text-white hover:bg-blue-500"
      >
        Try again
      </button>
    </main>
  );
}
