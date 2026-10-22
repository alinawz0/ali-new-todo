
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h1 className="text-4xl font-bold">404</h1>

      <h2 className="mt-4 text-2xl font-semibold">
        Page Not Found
      </h2>

      <p className="mt-3 text-gray-600">
        Sorry, the page you are looking for does not exist.
      </p>

      <Link
        href="/"
        className="mt-6 rounded-md bg-blue-600 px-5 py-3 text-white hover:bg-blue-500"
      >
        Go back home
      </Link>
    </main>
  );
}
