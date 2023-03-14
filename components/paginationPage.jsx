import Pagination from "./pagination";

function PaginationPage({children, meta, link}) {
  return (
    <>
      <Pagination
        totalPages={meta.pagination.pageCount}
        currentPage={meta.pagination.page}
        renderPageLink={(page) => `/${link}/${page}`}
      />
      {children}
      <Pagination
        totalPages={meta.pagination.pageCount}
        currentPage={meta.pagination.page}
        renderPageLink={(page) => `/${link}/${page}`}
      />
    </>     
  )
}

export default PaginationPage;