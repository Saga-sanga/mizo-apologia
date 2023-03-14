import Link from 'next/link'
import React from 'react'
import usePagination from '../hooks/usePagination'

export const dotts = '...'

const Pagination = ({
  totalPages,
  currentPage,
  renderPageLink,
}) => {
  const pages = usePagination(totalPages, currentPage);

  return (
    <div className="flex items-center justify-center my-8">
      {pages.map((pageNumber, i) =>
        pageNumber === dotts ? (
          <span
            key={i}
            className="px-4 py-2 rounded-full text-sm font-semibold text-black"
          >
            {pageNumber}
          </span>
        ) : (
          <Link
            key={i}
            href={renderPageLink(pageNumber)}
            className={`${
              pageNumber === currentPage ? 'text-blue-600' : 'text-black'
            } px-4 py-2 mx-1 rounded-full text-sm font-semibold no-underline`}
          >
            {pageNumber}
          </Link>
        )
      )}
    </div>
  )
}

export default Pagination;
