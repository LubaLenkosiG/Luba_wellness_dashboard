"use client"


import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange ,rowCount}) => {
  return (
    <div className="p-4 items-center justify-between flex max-sm:px-0">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="py-2 px-4 rounded-md bg-slate-200 text-bgSoft text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Prev
      </button>

      {/* Page Indicator */}
      <span className="text-sm font-medium text-white">
        Page {currentPage} of {totalPages} ({rowCount})
      </span>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="py-2 px-4 rounded-md bg-slate-200 text-bgSoft text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
