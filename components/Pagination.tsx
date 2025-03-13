import React from "react";

interface PaginationProps {
  currentPage: number;
  totalMovies: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalMovies,
  onPageChange,
}) => {
  const moviesPerPage = 10;
  const totalPages = Math.ceil(totalMovies / moviesPerPage);

  return (
    <div className="pagination flex flex-col items-center mt-4 p-6">
      <div className="flex space-x-4">
        <button
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className={`flex-1 px-4 py-2 rounded-l-full ${
            currentPage === 1
              ? "bg-[#00003C] text-white"
              : "bg-[#54F4D0] text-[#00003C]"
          } disabled:opacity-50 hover:bg-[#54F4D0] hover:text-[#00003C]`}
        >
          Previous
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage * moviesPerPage >= totalMovies}
          className={`flex-1 px-4 py-2 rounded-r-full ${
            currentPage * moviesPerPage >= totalMovies
              ? "bg-[#00003C] text-white"
              : "bg-[#54F4D0] text-[#00003C]"
          } disabled:opacity-50 hover:bg-[#54F4D0] hover:text-[#00003C]`}
        >
          Next
        </button>
      </div>
      <span className="text-white">
        Page {currentPage} of {totalPages}
      </span>
    </div>
  );
};

export default Pagination;
