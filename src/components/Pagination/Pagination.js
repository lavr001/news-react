import React from "react";
import "./Pagination.scss";

const Pagination = ({ currentPage, totalPages, onPrevPage, onNextPage }) => {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="pagination">
      <button onClick={onPrevPage} disabled={currentPage === 1}>
        Previous
      </button>
      <span>
        Page {currentPage} of {totalPages || 1}
      </span>
      <button onClick={onNextPage} disabled={currentPage >= totalPages}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
