import { usePagination } from "src/hooks/use-pagination";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid"

export const Pagination = ({ currentPage, itemsPerPage, totalCount, setCurrentPage }) => {
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalCount);
  const paginationRange = usePagination({
    totalCount: totalCount,
    itemsPerPage: itemsPerPage,
    siblingCount: 1,
    currentPage: currentPage
  });

  const handleClick = (page) => {
    if(typeof page === 'string')
      return;
    const pageNumber = new Number(page).valueOf();
    setCurrentPage(pageNumber);
  }

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-4">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{isNaN(startIndex) ? 0 : startIndex}</span> to <span className="font-medium">{isNaN(endIndex) ? 0 : endIndex}</span> of{' '}
            <span className="font-medium">{totalCount}</span> results
          </p>
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            { 
              currentPage > 1 && 
              <a
                href="#"
                onClick={() => handleClick(currentPage - 1)}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </a>
            }
            {paginationRange?.map((pagination, index) => {
              if (pagination == currentPage.toString())
                return (
                  <a
                    key={index}
                    href="#"
                    aria-current="page"
                    className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    {pagination}
                  </a>
                )
              return (
                <a
                  key={index}
                  href="#"
                  onClick={() => handleClick(pagination)}
                  className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  {pagination}
                </a>
              )
            })}
            {
              currentPage < totalCount &&
              <a
                href="#"
                onClick={() => handleClick(currentPage + 1)}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </a>
            }
          </nav>
        </div>
      </div>
    </div>
  )
}