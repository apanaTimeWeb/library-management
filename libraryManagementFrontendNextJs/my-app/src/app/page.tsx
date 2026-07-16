import React from 'react';
import Link from 'next/link';

export default function Page() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4 text-gray-900 dark:text-white">
          SeatFlow Pro
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          The ultimate smart library and seating management system.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/auth/login" className="px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition">
            Login
          </Link>
          <Link href="/auth/register" className="px-6 py-3 bg-gray-200 text-gray-900 rounded-md font-medium hover:bg-gray-300 transition">
            Register
          </Link>
        </div>
      </div>
    </main>
  );
}
