"use client";

import React from "react";

interface PaginationProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination: React.FC<PaginationProps> = ({ page, setPage }) => {
  const prev = page > 1 ? page - 1 : 1;

  return (
    <div className="pagination flex flex-col items-center mt-4 p-6">
      <div className="relative inline-flex space-x-1">
        <button
          onClick={() => setPage(Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="w-28 px-6 py-3 bg-[#1ED2AF] font-inter text-[#00003c] rounded-l-full disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="w-28 px-6 py-3 bg-[#1ED2AF] font-inter text-[#00003c] rounded-l-none rounded-r-full"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
