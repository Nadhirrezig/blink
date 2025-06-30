// app/ui/pagination.tsx

'use client';

import Link from 'next/link';

export default function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const previousPage = currentPage > 1 ? currentPage - 1 : 1;
  const nextPage = currentPage < totalPages ? currentPage + 1 : totalPages;

  return (
    <nav className="mt-4 flex justify-center items-center gap-4 text-sm">
      <Link
        href={`?page=${previousPage}`}
        className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-700"
      >
        Previous
      </Link>
      <span className="text-gray-700">
        Page {currentPage} of {totalPages}
      </span>
      <Link
        href={`?page=${nextPage}`}
        className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-700"
      >
        Next
      </Link>
    </nav>
  );
}
