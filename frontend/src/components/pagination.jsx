import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ pagination, onPageChange, limit, onLimitChange }) => {
  if (!pagination) return null;

  const { page, totalPages, hasNext, hasPrev } = pagination;
  const currPage = Number(page);

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const commonBtnClass =
    "flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-200 border";

  return (
    <div className="mt-12 flex flex-col items-center justify-between gap-4 md:flex-row">
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currPage - 1)}
          disabled={!hasPrev}
          className={`${commonBtnClass} ${
            !hasPrev
              ? "border-slate-100 bg-slate-50 text-slate-300 cursor-not-allowed"
              : "border-slate-200 bg-white text-slate-600 hover:border-indigo-500 hover:text-indigo-600 hover:shadow-md"
          }`}
          aria-label="Previous page"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="flex items-center gap-2">
          {getPageNumbers().map((num) => (
            <button
              key={num}
              onClick={() => onPageChange(num)}
              className={`${commonBtnClass} font-medium ${
                currPage === num
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-200"
                  : "border-slate-200 bg-white text-slate-600 hover:border-indigo-500 hover:text-indigo-600 hover:shadow-sm"
              }`}
            >
              {num}
            </button>
          ))}
        </div>

        <button
          onClick={() => onPageChange(currPage + 1)}
          disabled={!hasNext}
          className={`${commonBtnClass} ${
            !hasNext
              ? "border-slate-100 bg-slate-50 text-slate-300 cursor-not-allowed"
              : "border-slate-200 bg-white text-slate-600 hover:border-indigo-500 hover:text-indigo-600 hover:shadow-md"
          }`}
          aria-label="Next page"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-slate-500">
          Items per page:
        </span>
        <select
          value={limit}
          onChange={(e) => onLimitChange(Number(e.target.value))}
          className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-600 outline-none transition-all duration-200 hover:border-indigo-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        >
          {[6, 9, 12, 15, 18, 24, 30].map((val) => (
            <option key={val} value={val}>
              {val}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Pagination;
