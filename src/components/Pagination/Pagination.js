import React from "react";
import "./Pagination.scss";

const Pagination = ({
  currentPage,
  totalPages,
  onPrevPage,
  onNextPage,
  perPage,
  onPerPageChange,
}) => {
  // Condition to render nothing if totalPages is 1 or less, and also no perPage/onPerPageChange is provided (for graceful degradation if used elsewhere without these)
  if (totalPages <= 1 && (!perPage || !onPerPageChange)) {
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
      {perPage && onPerPageChange && (
        <select
          className="per-page-select"
          onChange={onPerPageChange}
          value={perPage}
          aria-label="Items per page"
        >
          <option value="6">6 per page</option>
          <option value="9">9 per page</option>
          <option value="12">12 per page</option>
        </select>
      )}
    </div>
  );
};

export default Pagination;
